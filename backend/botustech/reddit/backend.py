from flask import Flask, request

from  reddit_bot import  RedditBot
from ui.add_account_widget import AddAccountWidget
from reddit_bot_manager import RedditBotManager
import threading, os, json
from queue import Queue

app = Flask(__name__)


json_file = os.getcwd() + "/data/state.json"
with open(json_file, "r") as json_file:
    data = json.load(json_file)

#get available accounts that can vote.
accounts = data.get('accounts', [])
count = 0
bot_manager = RedditBotManager()
_account = AddAccountWidget(bot_manager)

#create a queue to hold the accounts
accounts_queue = Queue()
for account in accounts:
    accounts_queue.put(account)

@app.route('/add_account', methods=['GET'])
def add_account():
    try:
        name = request.args.get('name')
        proxy = request.args.get('proxy')
        user_agent = request.args.get('user_agent')
        account = _account.add_account(name, proxy, user_agent)
        response_data = {
            'count': count,
            'status' : "LOGED IN"
            # Include any other relevant data you want to return
        }
        return response_data, 200   
    
    except Exception as Error:
        print(Error)
        response_data = {
            'count': count,
            'status' : "NOT LOGED"
            # Include any other relevant data you want to return
        }
        return response_data, 200 

@app.route('/upvote', methods=['GET'])
def upvote():
    try:
        url = request.args.get('url')
        number_of_upvotes = request.args.get('number_of_upvotes')
        rate = request.args.get('rate')
        balance = request.args.get('balance')
        if float(rate) <= 0.07:
            threads = 40
        
        elif float(rate) <= 0.10 and float(rate) > 0.07:
            threads = 20
        
        elif float(rate) <= 0.15 and float(rate) > 0.10:
            threads = 10
        
        else:
            threads = 1
        
        semaphore = threading.Semaphore(int(threads))
        count = 0
        new_balance = balance

        print(url, threads, number_of_upvotes, rate, balance, count)
        while True:
            account = accounts_queue.get()
            bot = RedditBot(account)
            status = bot.upvote_post(url)
            accounts_queue.task_done()
            semaphore.release()
            count += 1
            if status == True:
                new_balance = float(new_balance) - float(rate)
            
            if status == False:
                new_balance = float(new_balance)
            
            if float(new_balance) < float(rate):
                status = "INCOMPLETE"
                break

            if count == int(number_of_upvotes):
                status = "COMPLETE"
                break
        
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200   
    
    except Exception as Error:
        print(Error)
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200 


@app.route("/downvote",  methods=['GET'])
def downvote():
    try:
        url = request.args.get('url')
        number_of_upvotes = request.args.get('number_of_downvotes')
        rate = request.args.get('rate')
        balance = request.args.get('balance')
        if float(rate) <= 0.07:
            threads = 40
        
        elif float(rate) <= 0.10 and float(rate) > 0.07:
            threads = 20
        
        elif float(rate) <= 0.15 and float(rate) > 0.10:
            threads = 10
        
        else:
            threads = 1
        semaphore = threading.Semaphore(int(threads))
        count = 0
        new_balance = balance

        print(url, threads, number_of_upvotes, rate, balance, count)
        while True:
            account = accounts_queue.get()
            bot = RedditBot(account)
            status = bot.downvote_post(url)
            accounts_queue.task_done()
            semaphore.release()
            count += 1
            if status == True:
                new_balance = float(new_balance) - float(rate)
            
            if status == False:
                new_balance = float(new_balance)
            
            if float(new_balance) < float(rate):
                status = "INCOMPLETE"
                break

            if count == int(number_of_upvotes):
                status = "COMPLETE"
                break
        
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200   
    
    except Exception as Error:
        print(Error)
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200 

@app.route("/comment/",  methods=['GET'])
def comment():
    try:
        url = request.args.get('url')
        number_of_upvotes = request.args.get('number_of_comments')
        rate = request.args.get('rate')
        balance = request.args.get('balance')
        comment = request.args.get("comment")

        if float(rate) <= 0.07:
            threads = 40
        
        elif float(rate) <= 0.10 and float(rate) > 0.07:
            threads = 20
        
        elif float(rate) <= 0.15 and float(rate) > 0.10:
            threads = 10
        
        else:
            threads = 1
        semaphore = threading.Semaphore(int(threads))
        count = 0
        new_balance = balance

        print(url, threads, number_of_upvotes, rate, balance, count)
        while True:
            account = accounts_queue.get()
            bot = RedditBot(account)
            status = bot.comment_post(url, comment)
            accounts_queue.task_done()
            semaphore.release()
            count += 1
            if status == True:
                new_balance = float(new_balance) - float(rate)
            
            if status == False:
                new_balance = float(new_balance)
            
            if float(new_balance) < float(rate):
                status = "INCOMPLETE"
                break

            if count == int(number_of_upvotes):
                status = "COMPLETE"
                break
        
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200   
    
    except Exception as Error:
        print(Error)
        response_data = {
            'count': count,
            'balance' : new_balance,
            'status' : status
            # Include any other relevant data you want to return
        }
        bot.close()
        return response_data, 200 


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
