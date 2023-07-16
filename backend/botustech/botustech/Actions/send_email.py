from django.core.mail import send_mail
from django.conf import settings


class SendEmail:

    def __init__(self) -> None:
        pass

    def send_email(self, email, token):
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
        
    def send_activation_email(self, email, token, id):
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
        