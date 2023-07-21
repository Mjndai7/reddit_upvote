from django.shortcuts import render
from botustech import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from django.shortcuts import redirect
import json
from django.http import JsonResponse, HttpResponse
from botustech.models import Transaction
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_secret = settings.STRIPE_WEBHOOK_SECRET

FRONTEND_SUBSCRIPTION_SUCCESS_URL = settings.SUBSCRIPTION_SUCCESS_URL
FRONTEND_SUBSCRIPTION_CANCEL_URL = settings.SUBSCRIPTION_FAILED_URL



class CreateSubscription(APIView):
    def post(self, request):
        try:
            price  = request.POST.get('price_id')
            print("price", price)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price,
                        'quantity': 1
                    }
                ],
                payment_method_types=['card'],
                mode='payment',
                success_url=FRONTEND_SUBSCRIPTION_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=FRONTEND_SUBSCRIPTION_CANCEL_URL
            )
        
            return redirect(checkout_session.url, status=303)
        
        except Exception as err:
            raise err

class WebHook(APIView):
    @csrf_exempt
    def post(self, request):
        """
        This API handles the webhook.

        :return: returns event details as a JSON response.
        """
        request_data = json.loads(request.body)
        payload = request.body.decode('utf-8')
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        if not sig_header:
            return JsonResponse({'success': False, 'error': 'Stripe-Signature header is missing'}, status=400)

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            # Invalid payload
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return JsonResponse({'success': False, 'error': str(e)}, status=400)

        event_type = event['type']
        data_object = event['data']['object']

        if event_type == 'checkout.session.completed':
            # Payment is successful and a subscription is created.
            # Provision the subscription and save the customer ID to your database.
            customer_id = data_object['customer']
            amount = data_object['amount_total']
            package = data_object['metadata'].get['package']

            # Send email notification to the customer
            subject = 'Payment Successful'
            message = f"Thank you for your payment. You have purchased the {package} package for ${amount}"
            send_mail(subject, message, 'support@maxupvote.com', [data_object['customer_email']])

            # Create a Transaction object and save it to the database
            transaction = Transaction(customer_id=customer_id,amount=amount, package=package, status='completed')
            transaction.save()

        elif event_type == 'invoice.paid':
            # Continue to provision the subscription as payments continue to be made.
            # Store the status in your database and check when a user accesses your service.
            invoice_id = data_object['id']
            customer_id = data_object['customer']
            amount = data_object['amount_paid']
            package = data_object['metadata'].get['package']

            # Send email notification to the customer
            subject = 'Payment Successful'
            message = f"Thank you for your payment. You have purchased the {package} for ${amount}."
            send_mail(subject, message, 'support@maxupvote.com', [data_object['customer_email']])
            
            # Create a Transaction object and save it to the database
            transaction = Transaction(customer_id=customer_id, amount=amount, package=package, status='completed')
            transaction.save()

        elif event_type == 'invoice.payment_failed':
            # customer portal updates their payment information
            customer_id = data_object['customer']
            package = data_object['metadata'].get('package')

            # Send email notification to the customer
            subject = 'Payment Failed'
            message = f"Payment for the {package} package failed. Please update your information."
            send_mail(subject, message, "support@maxupvote", [data_object['customer_email']])

            # Create a transaction object and update it in the database
            transaction = Transaction(customer_id=customer_id, package=package, status='failed')
            transaction.save()

        else:
            print('unhandled event type {}'.format(event_type))

        return JsonResponse({'success': True})
    





