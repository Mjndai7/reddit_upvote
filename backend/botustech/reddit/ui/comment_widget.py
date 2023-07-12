from ui.base_widget import BaseWidget
from reddit_bot_manager import RedditBotManager
from threading import Thread

class CommentWidget(BaseWidget):

    def __init__(self, master, master_row, master_column, botManager:RedditBotManager) -> None:
        super().__init__(master, master_row, master_column)
        self.botManager = botManager
        
        # GUI Components
        self.Button("Start", 20, 10, 0, self.startCommenting)
        self.Button("Close", 20, 10, 2, self.closeProcess)


 
    def startCommenting(self):
        # Start Scraping
        if self.botManager.s["running"] == True:
            print("=> Process already running.")
            return
        thread = Thread(target=self.botManager.comment_first_post)
        thread.start()


    def closeProcess(self):
        if self.botManager.s["running"] == False:
            print("=> No process running.")
        else:
            self.botManager.s["running"] = False
            print("=> Stopping running process.")
        

