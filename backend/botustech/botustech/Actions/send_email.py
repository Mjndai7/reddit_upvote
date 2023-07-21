from django.core.mail import send_mail
from django.conf import settings

from celery import shared_task
from botustech.celery import _celery_app


@_celery_app.task
def send_email(email, token):
    url = f"{settings.FRONTEND_URL}/password-reset/{token}"
    message = f"Click the link below to reset your password:\n\n{url}"
    try:
        send_mail(
            "Reset your password",
            message,
            settings.EMAIL_FROM_ADDRESS,
            [email],
            fail_silently=False,
        )
        return True
    
    except Exception as E:
        print(f"ERROR: {E}")
        return False

@_celery_app.task
def send_payment_email(email, package, amount):
    message = f"Thank you for your payment. You have purchased the {package} package for ${amount}"
    try:
        send_mail(
            'Payment Successful',
            message,
            settings.EMAIL_FROM_ADDRESS,
            [email],
            fail_silently=False,
        )
        return True
    
    except Exception as E:
        print(f"ERROR: {E}")
        return False

@_celery_app.task
def send_activation_email(email, token, id):
    url = f"{settings.FRONTEND_URL}/activate/{id}/{token}"
    message =( f"Click the link to activate your account at maxupvote.\n{url}"
    f"\n\n If you did not make this request please check your email security")
    
    try:
        send_mail(
            "Maxupvote account activation.",
            message,
            settings.EMAIL_FROM_ADDRESS,
            [email],
            fail_silently=False,
        )
        return True
    
    except Exception as E:
        print(f"ERROR: {E}")
        return False
    