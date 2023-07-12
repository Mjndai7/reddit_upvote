from ui.base_widget import BaseWidget


class SettingWidget(BaseWidget):
    
    def __init__(self, master, master_row, master_column, settings, state, saveStateFunc) -> None:
        super().__init__(master, master_row, master_column)
        self.settings = settings
        self.s = state
        self.saveState = saveStateFunc
        self.settingsContainer = []
        self.handleSettings()
        self.Button("Save Settings", 25, 100, 0, self.updateState)

    def updateState(self):
        for setting in self.settingsContainer:
            if setting["is_textbox"]:
                data = self.getDataFromTextBox(setting["widget"], split_data=setting["split_data"], split_at=setting["split_at"], is_int=setting["is_int"], func=setting["func"])
            else:
                data = self.getDataFromEntry(setting["widget"], is_int=setting["is_int"], is_bool=setting["is_bool"], func=setting["func"], is_option=setting["is_option"])
            self.s[setting["name"]] = data
        self.saveState()
    

    def createSettingWidget(self, setting, row):
        return self.createInput(setting["label"], self.s[setting["name"]], row, is_bool=setting["is_bool"], is_textbox=setting["is_textbox"], is_option=setting["is_option"], join_with=setting["join_with"], options=setting["options"])
    
    def handleSettings(self, row = 0):
        base_setting_dict = {
            "name":"setting_name",
            "label":"Setting",
            "text":"",
            "is_int":False,
            "is_bool":False,
            "is_textbox":False,
            "is_option":False,
            "split_data":True,
            "join_with":"\n",
            "split_at":"\n",
            "func":None,
            "options":None
        }

        for setting in self.settings:
            setting_obj = base_setting_dict.copy()
            for key in setting: #Updating the values for setting dict
                setting_obj[key] = setting[key]
            setting_obj["widget"] = self.createSettingWidget(setting_obj, row)
            self.settingsContainer.append(setting_obj)
            row += 1

