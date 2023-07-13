from django.shortcuts import render

import logging
from rest_framework.response import Response
from coinbase_commerce.client import Client
from coinbase_commerce.error import SignatureVerificationError, WebhookInvalidPayload
from coinbase_commerce.webhook import Webhook
from django.http import HttpResponse
from django.shortcuts import redirect

from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
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
    def coinbase_webhook(request):

        request_data = request.body.decode('utf-8')
        request_sig = request.headers.get('X-CC-Webhook-Signature', None)
        webhook_secret = settings.COINBASE_COMMERCE_WEBHOOK_SHARED_SECRET

        try:
            event = Webhook.construct_event(request_data, request_sig, webhook_secret)

            # List all coinbase webhook events:
            if event['type'] == 'charge:confirmed':
                logging.info('Payment confirmed.')
                customer_id = event['data']['metadata']['custom']
            
        except (SignatureVerificationError, WebhookInvalidPayload) as e:
            return HttpResponse(e, status=400)
        
        logging.info(f'Received_event: id {event.id}, type={event.type}')
            
   

    