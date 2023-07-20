import os
import time
import random
from seleniumwire.undetected_chromedriver.v2 import Chrome, ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains


current_dir = os.getcwd()


class BotBase:
    def __init__(self, account) -> None:
        self._account = account
        try:
            self.driver = self.create_driver()
        
        except Exception as e:
            try:
                self.driver = self.create_driver()
                print(f"Error creating driver:")
            
            except Exception:
                raise


    def parse_proxy(self):
        proxy = self._account["proxy"]
        _proxy = proxy.split(":")
        if len(_proxy) == 2:
            return ":".join(_proxy)
        elif len(_proxy) == 4:
            return ":".join(_proxy[2:]) + "@" + ":".join(_proxy[:2])
        else:
            raise ValueError(
                f"Proxy({proxy}) is invalid. Correct format: hostname:port:user:pass")


    def create_driver(self):
        seleniumwire_options = None
        if self._account["proxy"]:
            proxy = self.parse_proxy()
            seleniumwire_options = {
                'proxy': {
                    'http': f'http://{proxy}',
                    'https': f'http://{proxy}'
                }
            }

        options = ChromeOptions()
        user_agent = self._account["user_agent"]
        if user_agent:
            options.add_argument(f'--user-agent="{user_agent}"')
        
        driver = Chrome(options=options,
                        user_data_dir=f"{current_dir}/reddit/profiles/{self._account['username']}", seleniumwire_options=seleniumwire_options)
        driver.set_window_size(950, 1080)
        return driver



class RedditBot(BotBase):
    def __init__(self, account,) -> None:
        super().__init__(account)  

    def sleep(self, sleep_after_action):
        sleep_for = random.randint(*sleep_after_action)
        print(f'=> Account: {self._account["username"]} Action Type: SLEEP Action Message: Sleeping for {sleep_for}')
        time.sleep(sleep_for)


    def upvote_post(self, post_url:str) -> bool:
        try:
            self.driver.get(post_url)
            self.sleep(5)
            upvote_button = self.driver.find_element(By.CLASS_NAME, "Post").find_elements(By.CLASS_NAME, "voteButton")[0]
            ariaPressed = self.driver.execute_script('return arguments[0].ariaPressed', upvote_button)
            if ariaPressed == "true":
                print(f"=> Account: {self._account['username']} Action Type: UPVOTE Action Message: POST_ALREADY_UPVOTED")
                status = False

            else:
                upvote_button.click()
                self.sleep(4)
                print(f"=> Account: {self._account['username']} Action Type: UPVOTE Action Message: POST_UPVOTED")
                status = True
        
        except Exception as Error:
            status = False
    
        return status
        
    def downvote_post(self, post_url:str) -> bool:
        try:
            self.driver.get(post_url)
            self.sleep(5)
            upvote_button = self.driver.find_element(By.CLASS_NAME, "Post").find_elements(By.CLASS_NAME, "voteButton")[1]
            ariaPressed = self.driver.execute_script('return arguments[0].ariaPressed', upvote_button)
            if ariaPressed == "true":
                print(f"=> Account: {self._account['username']} Action Type: UPVOTE Action Message: POST_ALREADY_UPVOTED")
                status = False
            
            else:
                upvote_button.click()
                self.sleep(4)
                print(f"=> Account: {self._account['username']} Action Type: UPVOTE Action Message: POST_UPVOTED")
                status = True
        
        except Exception as Error:
            print(Error)
            status = False
        
        return status


    def comment_post(self, post_url:str, comment:str):
        try:
            self.driver.get(post_url)
            self.sleep(5)
            commentInput = self.driver.find_element(By.CLASS_NAME, "public-DraftEditor-content")
            self.driver.execute_script('arguments[0].scrollIntoView()', commentInput)
            time.sleep(1)
            commentInput.click()
            action_chain = ActionChains(self.driver)
            for letter in comment: 
                action_chain.send_keys(letter)
                action_chain.pause(random.randint(6, 15)/100)
            action_chain.perform()
            submitButton = [e for e in self.driver.find_elements(By.TAG_NAME, "button") if "comment" in e.text.lower()][-1]
            submitButton.click()

            # s_time = time.time()
            # print("Comment done waiting")
            for _ in range(10):
                time.sleep(1)
                if self.driver.find_element(By.CLASS_NAME, "public-DraftEditor-content").find_elements(By.TAG_NAME, "span")[0].text.strip() == "":
                    print(f"=> Account: {self._account['username']} Action Type: COMMENT Action Message: COMMENT_DONE")
                    self.sleep[2, 4]
                return True
            else:
                status =  False

        except Exception as Error:
            print(f"Error occured while commenting , {post_url}")
            status =  False
        
        return status

    def comment_first_post(self, comment:str):
        self.driver.get('https://www.reddit.com')
        first_post = self.driver.find_element(By.CLASS_NAME, "rpBJOHq2PR60pnwJlUyP0").find_elements(By.XPATH, "./*")[0]
        post_url = first_post.find_elements(By.TAG_NAME, "a")[3].get_attribute("href")
        self.comment_post(post_url, comment)

    def close(self):
        self.driver.quit()

        