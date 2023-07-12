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
        
        