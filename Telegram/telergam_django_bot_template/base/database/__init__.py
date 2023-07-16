class DataBaseOperations:

    def __init__(self) -> None:
        pass


    def is_a_member(self, username) -> bool:
        #check if the user name is in the database
        _is_member = True
        user_data = {
            "user_email" : "developer@gmail.com",
            "balance"    : "0.00",
            "username"    : "developer",
            "package"   : "basic",
            "date_created" : "12.0.2021"
        }
        return _is_member, user_data
