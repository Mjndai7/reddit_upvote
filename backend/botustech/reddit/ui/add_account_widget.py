import os
from reddit.reddit_bot import RedditBot
from reddit.reddit_bot_manager import RedditBotManager
from reddit.ui.base_widget import BaseWidget
from  reddit import constants

class AddAccountWidget(BaseWidget):

    def __init__(self,  bot_manager:RedditBotManager) -> None:
        self.bot_manager = bot_manager
    
    def parse_proxy(self, proxy):
        
        _proxy = proxy.split(":")
        print(_proxy)
        if len(_proxy) == 2:
            return ":".join(_proxy)
        elif len(_proxy) == 4:
            return ":".join(_proxy[2:]) + "@" + ":".join(_proxy[:2])
        else:
            raise ValueError(
                f"Proxy({proxy}) is invalid. Correct format: hostname:port:user:pass")
    
    def add_account(self, username, proxy, useragent):
        username = username
        if not username or [a for a in self.bot_manager.s["accounts"] if a["username"] == username]:
            print(f'=> {username} is invalid or a account with same username already exists.')
            return
        
        proxy = proxy
        if proxy:
            try:
                self.parse_proxy(proxy)
            except:
                print(f'=> {proxy} is invalid.')
                return       

        user_agent = useragent
        date, time = constants.Log.get_current_date()
        account = {
            "username":username,
            "proxy":proxy,
            "user_agent":user_agent,
            "date":date,
            "time":time
        }

        bot = RedditBot(account, self.bot_manager.s)
        bot.driver.get('https://www.reddit.com/login')

        self.bot_manager.s["accounts"].append(account)
        self.bot_manager.saveState()
        print(f"=> Account: {account['username']} added.")