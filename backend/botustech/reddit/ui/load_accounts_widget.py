import shutil 
from functools import partial
import pyperclip
from tkinter.messagebox import askyesno
from reddit_bot_manager import RedditBotManager
from ui.base_widget import BaseWidget



class LoadAccountsWidget(BaseWidget):
    def __init__(self, master, master_row, master_column, botManager:RedditBotManager) -> None:
        super().__init__(master, master_row, master_column)
        
        self.current_page = 0
        self.logs_per_page = 15
        self.s_index = self.current_page * self.logs_per_page
        self.e_index = self.s_index + self.logs_per_page

        self.botManager = botManager
        self.table_data = self.botManager.s["accounts"][:]
        self.widgetHolder = []
        self.loadTableData()
        
    def loadTableData(self):
        self.widgetHolder.clear()
        for _ in self.master.winfo_children():
            _.destroy()
    
        if len(self.botManager.s["accounts"]) == 0:
            self.Label("No accounts added!", 20, 0, 0)
            return


        _, self.currentPageFilterVar = self.OptionMenu("", self.current_page, [i for i in range(0, int(len(self.table_data)/self.logs_per_page) + 1)], 0,  setLabel=False, menuColumn=4)
        self.Button("Load Page", 15, 0, 5, self.changePage)

        self.Label("Username", 12, 1, 1)
        self.Label("Proxy", 15, 1, 2)
        self.Label("User Agent", 15, 1, 3)
        self.Label(f"Total: {len(self.table_data)}", 15, 1, 5)
        self.Button("Delete All", 15, 1, 6, self.removeAllTableData)

        row = 3
        for data in self.table_data[self.s_index:self.e_index]:  
            widget = [
                self.Label(data["username"], 15, row, 1),
                self.TextBox(data["proxy"], 30, 3, row, 2),
                self.TextBox(data["user_agent"], 30, 3, row, 3)
            ]
            self.Button("📋", 2, row, 0, partial(pyperclip.copy, data["username"]))
            self.Button("Save", 15, row, 5, partial(self.editTableData, row-3))
            self.Button("Delete", 15, row, 6, partial(self.removeTableData, data))
            self.widgetHolder.append(widget)
            row+=1
        
    
    def changePage(self):
        currentPage = int(self.currentPageFilterVar.get())
        if self.current_page == currentPage:
            print("=> Page not changed.")
            return
        self.current_page = currentPage
        self.s_index = self.current_page * self.logs_per_page
        self.e_index = self.s_index + self.logs_per_page

        self.loadTableData()

   
    def editTableData(self, index):
        username, proxy, user_agent = self.widgetHolder[index]
        data = {}
        data["username"] = username["text"]
        data["proxy"]  = self.getDataFromTextBox(proxy, split_data=False)
        data["user_agent"] = self.getDataFromTextBox(user_agent, split_data=False)
        
        index = (self.current_page * self.logs_per_page) + index
        self.table_data[index] = {**self.table_data[index], **data}

        a_index = 0
        for account in self.botManager.s["accounts"]:
            if account["username"] == data["username"]:
                break
            a_index += 1

        self.botManager.s["accounts"][a_index] = {**self.table_data[index], **data}
        self.botManager.saveState()
        self.loadTableData()


    def removeTableData(self, data):
        self.table_data.remove(data)
        self.botManager.s["accounts"].remove(data)
        self.botManager.saveState()
        try:shutil.rmtree(f'profiles/{data["username"]}')
        except:pass
        self.loadTableData()
    

    def removeAllTableData(self):
        delete_confirm = askyesno("Delete Accounts", "Are you sure you want to delete the selected accounts?")
        if delete_confirm == False:
            return
        for data in self.table_data[:]:
            self.table_data.remove(data)
            self.botManager.s["accounts"].remove(data)
            try: shutil.rmtree(f'profiles/{data["username"]}')
            except: pass
        self.botManager.saveState()
        self.current_page = 0
        self.loadTableData()
