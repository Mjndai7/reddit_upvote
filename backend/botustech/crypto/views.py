from django.shortcuts import render
from django.core.mail import send_mail
import logging
from rest_framework.response import Response
from coinbase_commerce.client import Client
from coinbase_commerce.error import SignatureVerificationError, WebhookInvalidPayload
from coinbase_commerce.webhook import Webhook
from django.http import HttpResponse
from django.shortcuts import redirect
from .models import Transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.conf import settings

FRONTEND_SUBSCRIPTION_REDIRECT_URL = settings.SUBSCRIPTION_REDIRECT_URL

class CryptoPayment(APIView):
    def post(self, request):
        checkout_session = Client(api_key=settings.COINBASE_COMMERCE_API_KEY)
        checkout = checkout_session.checkout.retrieve(settings.COINBASE_CHECKOUT_ID)
        checkout_link = f'https://commerce.coinbase.com/checkout/{settings.COINBASE_CHECKOUT_ID}'

        response_data = {
            'checkout': checkout,
            'checkout_link': checkout_link
        }

        return Response(response_data)
    





class WebHook(APIView):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request_data = request.body.decode('utf-8')
        request_sig = request.headers.get('X-CC-Webhook-Signature', None)
        webhook_secret = settings.COINBASE_COMMERCE_WEBHOOK_SHARED_SECRET

        try:
            event = Webhook.construct_event(request_data, request_sig, webhook_secret)

            # List all Coinbase Commerce webhook events:
            if event['type'] == 'charge:confirmed':
                logging.info('Payment confirmed.')
                customer_id = event['data']['metadata']['custom']
                amount = event['data']['pricing']['local']['amount']
                package = event['data']['description']

                # Send email notification to the customer
                subject = 'Payment Successful'
                message = f"Thank you for your payment. You have purchased the {package} package for ${amount / 100:.2f}."
                send_mail(subject, message, 'support@upvote.com', [customer_id])

                # Create a Transaction object and save it to the database
                transaction = Transaction(customer_id=customer_id, amount=amount, package=package)
                transaction.save()

        except (SignatureVerificationError, WebhookInvalidPayload) as e:
            return HttpResponse(e, status=400)

        logging.info(f'Received_event: id {event.id}, type={event.type}')

        return HttpResponse('Success')

    