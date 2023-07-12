import random
import time 
import json
from threading import Thread
from reddit.reddit_bot import RedditBot
from reddit import constants

class RedditBotManager: 

    def __init__(self) -> None:
        self.s = self.loadState()


    def loadState(self, file=constants.Paths.STATE_FILE):
        with open(file, 'r') as (file):
            state = json.load(file)
        return state


    def saveState(self, file=constants.Paths.STATE_FILE, updatedValues={}, save_state=True):
        # start_t = time.time()
        data = self.s
        for key in updatedValues:
            data[key] = updatedValues[key]
        else:
            if save_state:
                with open(file, 'w') as file_data:
                    json.dump(data, file_data)
    
    
    def waitForThreadToClose(self, threads:'list[Thread]') -> None:
        while self.s["running"]:
            for thread in threads:
                if thread.is_alive() == False:
                    threads.remove(thread)
                    return
            time.sleep(1)

    
    def _upvote_post(self, account, post):
        bot = RedditBot(account, self.s)
        try:
            bot.upvote_post(post)
        
        except Exception as err:
            print(f"=> Account: {account['username']} Action Type: POST Action Message: UNKNOWN_ERROR Errr")    
        
        finally:
            bot.close()

    def upvote_post(self, target:str):    
        threads = []
        if self.s["upvote_count"] > len(self.s["accounts"]):
            self.s["upvote_count"] = len(self.s["accounts"])
            
        accounts = random.sample(self.s["accounts"], self.s["upvote_count"])
        for account in accounts:
            thread = Thread(target=self._upvote_post, args=(account, target))
            threads.append(thread)
            thread.start()
            if len(threads) == self.s["thread_count"]:
                self.waitForThreadToClose(threads)
            if self.s["running"] == False:
                break
        for thread in threads:
            thread.join()
        self.saveState()


    def upvote_posts(self):
        self.s["running"] = True
        if self.s["thread_count"] <= 0:
            print("=> Error: Thread count can not be 0 or a negative integer")

        for target in self.s["targets"]:
            self.upvote_post(target)
            if not self.s["running"]: break
        
        self.s["running"] = False
        print("=> Process Completed.")

    
    def _comment_first_post(self, account):
        bot = RedditBot(account, self.s)
        try:
            for link in self.s["targets"]:
                bot.comment_post(link, random.choice(self.s["comments"]))
                #bot.comment_first_post(random.choice(self.s["comments"]))
           
           
        
        except Exception as err:
            print(f"=> Account: {account['username']} Action Type: POST Action Message: UNKNOWN_ERROR Error")
            
        finally:
            bot.close()

    def comment_first_post(self):
        self.s["running"] = True
        if self.s["thread_count"] <= 0:
            print("=> Error: Thread count can not be 0 or a negative integer")

        
        threads = []
       
        for account in self.s["accounts"]:
            thread = Thread(target=self._comment_first_post, args=(account,))
            threads.append(thread)
            thread.start()
            if len(threads) == self.s["thread_count"]:
                self.waitForThreadToClose(threads)
            if self.s["running"] == False:
                break

        for thread in threads:
            thread.join()

        self.saveState()
        
        self.s["running"] = False
        print("=> Process Completed.")