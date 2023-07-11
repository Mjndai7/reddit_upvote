from django.core.mail import send_mail
from django.conf import settings


class SendEmail:

    def __init__(self) -> None:
        pass

    def send_email(self, email, name, action, message):
        _email = "support@botustech.com"
        message = f"\nName : {name}\nEmail: {email}\nRequires: {action}\n{message}."
        try:
            send_mail(
                "New databse record",
                message,
                settings.EMAIL_FROM_ADDRESS,
                [_email],
                fail_silently=False,
            )
            return True
        
        except Exception as E:
            print(f"ERROR: {E}")
            return False
        
        