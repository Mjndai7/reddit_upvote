from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from django.shortcuts import redirect
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = settings.STRIPE_SECRET_KEY
webhook_secret = settings.STRIPE_WEBHOOK_SECRET

FRONTEND_SUBSCRIPTION_SUCCESS_URL = settings.SUBSCRIPTION_SUCCESS_URL
FRONTEND_SUBSCRIPTION_CANCEL_URL = settings.SUBSCRIPTION_FAILED_URL



class CreateSubscription(APIView):
    def post(self, request):
        try:
            prices = [
                'price_1NTKsZDTMi1SAp13fxJuEVb6',
                'price_1NT73cDTMi1SAp13ptOQU2Ft',
                'price_1NTKoTDTMi1SAp13AI5woVHx',
                'price_1NTKqdDTMi1SAp13xdH2SwDC',
            ]

            checkout_sessions = []
            for price in prices:
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
                checkout_sessions.append(checkout_session)
            
            # Redirect to the first checkout session url
            return redirect(checkout_sessions[0].url, code=303)
        except Exception as err:
            raise err



class WebHook(APIView):
    @csrf_exempt
    def post(self , request):
        """
            This API handles the webhook.

            :return: returns event details as json response .
        """
        request_data = json.loads(request.body)
        if webhook_secret:
            # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
            signature = request.META['HTTP_STRIPE_SIGNATURE']
            try:
                event = stripe.Webhook.construct_event(
                    payload=request.body, 
                    sig_header=signature, 
                    secret=webhook_secret
                    )
                data = event['data']
            except ValueError as err:
                raise err
            except stripe.error.SignatureVerificationError as err:
                raise err
            # Get the type of webhook event sent - used to check the status of PaymentIntents.
            event_type = event['type']
        else:
            data = request_data['data']
            event_type = request_data['type']
        data_object = data['object']

        if event_type == 'checkout.session.completed':
        # Payment is successful and the subscription is created.
        # You should provision the subscription and save the customer ID to your database.
            print("-----checkout.session.completed----->",data['object']['customer'])
        elif event_type == 'invoice.paid':
        # Continue to provision the subscription as payments continue to be made.
        # Store the status in your database and check when a user accesses your service.
        # This approach helps you avoid hitting rate limits.
            print("-----invoice.paid----->", data)
        elif event_type == 'invoice.payment_failed':
        # The payment failed or the customer does not have a valid payment method.
        # The subscription becomes past_due. Notify your customer and send them to the
        # customer portal to update their payment information.
            print("-----invoice.payment_failed----->",data)
        else:
            print('Unhandled event type {}'.format(event_type))
        
        return JsonResponse(success=True, safe=False)