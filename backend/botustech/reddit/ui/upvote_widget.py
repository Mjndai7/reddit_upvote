from ui.base_widget import BaseWidget
from reddit_bot_manager import RedditBotManager
from threading import Thread

class UpvoteWidget(BaseWidget):

    def __init__(self, master, master_row, master_column, botManager:RedditBotManager) -> None:
        super().__init__(master, master_row, master_column)
        self.botManager = botManager
        
        # GUI Components
        self.Button("Start", 20, 10, 0, self.startUpvoting)
        self.Button("Close", 20, 10, 2, self.closeProcess)


 
    def startUpvoting(self):
        # Start Scraping
        if self.botManager.s["running"] == True:
            print("=> Process already running.")
        
        thread = Thread(target=self.botManager.upvote_posts)
        thread.start()


    def closeProcess(self):
        if self.botManager.s["running"] == False:
            print("=> No process running.")
        
        else:
            self.botManager.s["running"] = False
            print("=> Stopping running process.")
        

