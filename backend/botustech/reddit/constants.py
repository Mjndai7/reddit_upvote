from datetime import datetime
import os

def getAccountIndex(session, a_list):
    for i in range(0, len(a_list)):
        if a_list[i]["session"] == session:
            return i

class Paths:
    STATE_FILE = f'{os.getcwd()}/reddit/data/state.json'

class Log:
    DATE_FORMAT = "%Y-%m-%d"
    TIME_FORMAT = "%H:%M:%S"

    def get_current_date() -> "tuple[str, str]":
        d = datetime.now()
        return d.strftime(Log.DATE_FORMAT), d.strftime(Log.TIME_FORMAT)

