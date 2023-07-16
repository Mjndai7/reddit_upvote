class Payments:

    def __init__(self) -> None:
        pass

    def create_crypto_link(self, username):
        #request api to create user payment crypto link
        return "https://www.paypal.com/signin"
    

    def create_stripe_link(self, username, product):
        #request api to create user stripe link
        print(username, product)

        if product <= "20":
            return "This should be stripe payment link for basic package"
        
        elif product > "20"  and product <= "50":
            return "This should be stripe payment link for standard package"
        
        elif product > "50"  and product <= "100":
            return "This should be stripe payment link for  premium package"
        
        elif product > "100"  and product <= "500":
            return "This should be stripe payment link for gold package"
        
        elif product > "100"  and product <= "500":
            return "This should be stripe payment link for enterprise package"

        elif product > "500":
            return "This should be stripe payment link for enterprice package"
        
        else:
            return "Please select an active package."