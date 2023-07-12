from ui.base_widget import BaseWidget
from reddit_bot_manager import RedditBotManager
from ui.navbar_widget import NavBarWidget
from ui.setting_widget import SettingWidget
from ui.upvote_widget import UpvoteWidget
from ui.add_account_widget import AddAccountWidget
from ui.load_accounts_widget import LoadAccountsWidget
from ui.comment_widget import CommentWidget

class RootWidget(BaseWidget):
    def __init__(self, master, master_row, master_column) -> None:
        super().__init__(master, master_row, master_column)
        self.bot_manager = RedditBotManager()

        self.main_frame = None
        self.main_widget = None
        self.configureNavBar()
        self.configureSettingsWidget()

    def changeFrameContent(self, content_class, *args):
        if self.main_frame:
            self.main_frame.destroy()
        self.main_frame = self.Frame(1, 0)
        self.main_widget = content_class(self.main_frame, 0, 0, *args)

    def configureNavBar(self):
        btn_configuration = [
            {"name": "Settings", "command": self.configureSettingsWidget},
            {"name": "Add Account", "command": self.configureAddAccountWidget},
            {"name": "Load Accounts", "command": self.configureLoadAccountsWidget},
            {"name": "Start Upvoting", "command": self.configureUpvoteWidget},
            {"name": "Start Comment", "command": self.configureCommentWidget},
        ]
        self.navbar = NavBarWidget(self.master, 0, 0, btn_configuration)
    
    def configureSettingsWidget(self):
        settings_configuration = [
            {"name":"sleep_after_post_load_from", "label":"Sleep after post load from", "is_int":True},
            {"name":"sleep_after_post_load_to", "label":"Sleep after post load to", "is_int":True},
            {"name":"sleep_after_post_upvote_from", "label":"Sleep after upvote from", "is_int":True},
            {"name":"sleep_after_post_upvote_to", "label":"sleep after upvote to", "is_int":True},
            {"name":"upvote_count", "label":"Upvote Count", "is_int":True},
            {"name":"thread_count", "label":"Thread Count", "is_int":True},
            {"name":"targets", "label":"Targets", "is_textbox":True},
            {"name":"comments", "label":"Comments", "is_textbox":True, "split_at": "\n_end_\n", "join_with":"\n_end_\n"},
        ]
        
        self.changeFrameContent(SettingWidget, settings_configuration, self.bot_manager.s, self.bot_manager.saveState)
    
    
    def configureUpvoteWidget(self):
        self.changeFrameContent(UpvoteWidget, self.bot_manager)

    def configureAddAccountWidget(self):
        self.changeFrameContent(AddAccountWidget, self.bot_manager)

    def configureLoadAccountsWidget(self):
        self.changeFrameContent(LoadAccountsWidget, self.bot_manager)

    def configureCommentWidget(self):
        self.changeFrameContent(CommentWidget, self.bot_manager)