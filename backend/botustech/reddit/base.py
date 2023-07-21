from botustech.celery import _celery_app
import requests

base_url = "http://86.48.26.167:5000"  # Replace with the actual base URL of your Flask app

@_celery_app.task
def add_account(name, proxies, user_agent):
    endpoint = f"{base_url}/add_account"

    params = {
        'name': name,
        'proxy': proxies,
        'user_agent': user_agent,
    }

    response = requests.get(endpoint, params=params)
    if response.status_code == 200:
        print("Response:", response.json())
    
    else:
        print("Request failed with status code:", response.status_code)


@_celery_app.task
def upvote(url, threads, number_of_upvotes, rate, balance):
    print(threads)
    endpoint = f"{base_url}/upvote"

    params = {
        'url': url,
        'threads': threads,
        'number_of_upvotes': number_of_upvotes,
        'rate': rate,
        'balance': balance
    }

    response = requests.get(endpoint, params=params)
    if response.status_code == 200:
        print("Response:", response.json())
    
    else:
        print("Request failed with status code:", response.status_code)

@_celery_app.task
def downvote(url, threads, number_of_upvotes, rate, balance):
    print(threads)
    endpoint = f"{base_url}/downvote"

    params = {
        'url': url,
        'threads': threads,
        'number_of_downvotes': number_of_upvotes,
        'rate': rate,
        'balance': balance
    }

    response = requests.get(endpoint, params=params)
    if response.status_code == 200:
        print("Response:", response.json())
    
    else:
        print("Request failed with status code:", response.status_code)

@_celery_app.task
def comment(url, comment, threads, number_of_upvotes, rate, balance):
    print(threads)
    endpoint = f"{base_url}/comment"

    params = {
        'url': url,
        'threads': threads,
        'number_of_comments': number_of_upvotes,
        'rate': rate,
        'balance': balance,
        'comment' : comment
    }

    response = requests.get(endpoint, params=params)
    if response.status_code == 200:
        print("Response:", response.json())
    
    else:
        print("Request failed with status code:", response.status_code)
