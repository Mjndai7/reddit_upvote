import base64
import hashlib
import hmac
import time


class TokensMaker:

    def __init__(self, secret_key: str) -> None:
        self.SECRET_KEY = secret_key
        self.TOKEN_VALIDITY_PERIOD = 360 # in seconds


    def generate_token(self, user_id):
        timestamp = int(time.time())
        message = f'{user_id}.{timestamp}'
        h = hmac.new(self.SECRET_KEY.encode(), message.encode(), hashlib.sha256)
        token = base64.urlsafe_b64encode(f'{message}.{h.hexdigest()}'.encode()).decode()
        return token


    def decode_token(self, token):
        try:
            decoded_token = base64.urlsafe_b64decode(token.encode()).decode()
            user_id, timestamp, signature = decoded_token.split('.')
            if int(time.time()) - int(timestamp) > self.TOKEN_VALIDITY_PERIOD:
                return None # token has expired
            h = hmac.new(self.SECRET_KEY.encode(), f'{user_id}.{timestamp}'.encode(), hashlib.sha256)
            if h.hexdigest() == signature:
                return int(user_id) # return the user_id if the signature is valid
            else:
                return None # signature is not valid
        except:
            return None # invalid token format