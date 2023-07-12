from ui.base_widget import BaseWidget


class NavBarWidget(BaseWidget):
    def __init__(self, master, master_row, master_column, btn_configuration, btn_width:int=14) -> None:
        super().__init__(master, master_row, master_column)
        
        column = 0
        for btn in btn_configuration:
            self.Button(btn["name"], btn_width, 0, column, btn["command"])
            column += 1
