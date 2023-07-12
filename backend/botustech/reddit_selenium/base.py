import os, json
import threading
from queue import Queue

from reddit.reddit_bot import RedditBot
from botustech.celery import app
      
json_file = os.getcwd() + "/reddit/data/state.json"
with open(json_file, "r") as json_file:
    data = json.load(json_file)

#get available accounts that can vote.
accounts = data.get('accounts', [])
count = 0

#create a queue to hold the accounts
accounts_queue = Queue()
for account in accounts:
    accounts_queue.put(account)

@app.task
def upvote(url: str, threads: int, number_of_upvotes: int, rate: float, balance: float):
    semaphore = threading.Semaphore(threads)
    count = 0
    new_balance = balance
    while True:
        account = accounts_queue.get()
        bot = RedditBot(account)
        bot.upvote_post(url)
        accounts_queue.task_done()
        semaphore.release()
        count += 1
        new_balance = new_balance - rate
        
        if new_balance < rate:
            status = "INCOMPLETE"
            break

        if count == number_of_upvotes:
            status = "COMPLETE"
            break
    
    return count, status, new_balance

@app.task
def downvote(url: str, threads: int, number_of_downvotes: int, rate: float, balance: float):
    semaphore = threading.Semaphore(threads)
    count = 0
    new_balance = balance
    while True:
        account = accounts_queue.get()
        bot = RedditBot(account)
        bot.upvote_post(url)
        accounts_queue.task_done()
        semaphore.release()
        count += 1
        new_balance = new_balance - rate
        
        if new_balance < rate:
            status = "INCOMPLETE"
            break

        if count == number_of_downvotes:
            status = "COMPLETE"
            break
    
    return count, status, new_balance

@app.task
def comment(url: str, threads: int, number_of_comments: int, rate: float, balance: float):
    semaphore = threading.Semaphore(threads)
    count = 0
    new_balance = balance
    while True:
        account = accounts_queue.get()
        bot = RedditBot(account)
        bot.upvote_post(url)
        accounts_queue.task_done()
        semaphore.release()
        count += 1
        new_balance = new_balance - rate
        
        if new_balance < rate:
            status = "INCOMPLETE"
            break

        if count == number_of_comments:
            status = "COMPLETE"
            break
    
    return count, status, new_balance
if __name__ == "__main__":
    pass