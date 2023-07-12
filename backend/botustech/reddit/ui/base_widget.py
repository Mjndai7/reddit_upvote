from functools import partial
import tkinter
from tkinter import ttk
from tkinter import font
from tkinter.scrolledtext import ScrolledText
from tkinter.filedialog import askopenfilename




class BaseWidget:

    def __init__(self, master, master_row, master_column) -> None:
        self._master = master
        self._master_row = master_row
        self._master_column = master_column
        self.master = tkinter.Frame(master)
        
        self.master.grid(row=master_row, column=master_column, sticky="")
        self.master.grid_rowconfigure(0, weight=1)
        self.master.grid_columnconfigure(0, weight=1)
        
        
    
    def Label(self, text, width, row, column, container=None):
        label = tkinter.Label(container if container else self.master, text=text, width=width)
        label.grid(row=row, column=column)
        return label

    def Message(self, text, width, row, column, container=None):
        message = tkinter.Message(container if container else self.master, text=text, width=width, anchor="w")
        message.grid(row=row, column=column)
        return message

    def Button(self, text, width, row, column, command=None, disabled=False, container=None, font_size=None):
        font_setting = None
        if font_size:
            font_setting = font.Font(size=font_size)
        button = tkinter.Button(container if container else self.master, text=text, width=width, command=command, font=font_setting)
        if disabled:
            button["state"] = "disabled"
        button.grid(row=row, column=column)
        return button


    def Entry(self, text, width, row, column, text_variable=None, container=None):
        entry = tkinter.Entry(container if container else self.master, width=width, textvariable=text_variable)
        entry.insert(0, text)
        entry.grid(row=row, column=column)
        return entry


    def TextBox(self, text, width, height, row, column, container=None):
        textBox = ScrolledText(container if container else self.master, width=width, height=height)
        textBox.insert('1.0', text)
        textBox.grid(row=row, column=column)
        return textBox

    def OptionMenu(self, label, defaultVal, values, row, container=None, setLabel=True, menuColumn = 0):
        if setLabel == True:
            self.Label(label, 20, row, menuColumn)
            menuColumn += 1
        stringVar = tkinter.StringVar(self.master)
        stringVar.set(defaultVal)
        optionMenu = tkinter.OptionMenu(self.master, stringVar, *values)
        optionMenu.grid(row=row, column=menuColumn)

        return optionMenu, stringVar


    def Frame(self, row, column, columnspan=None):
        frame = tkinter.Frame(self.master)
        frame.grid(row=row, column=column, columnspan=columnspan)
        return frame
    
    def Canvas(self, row, column):
        canvas = tkinter.Canvas(self.master)
        canvas.grid(row=row, column=column)
        return canvas
    
    def getDataFromTextBox(self, textbox, split_data=True, split_at="\n", is_int=False, is_bool=False, func=None):
        data_container = []
        raw_data = textbox.get('1.0', 'end-1c').strip()
        if not split_data:
            return raw_data
        for data in raw_data.split(split_at):
            if not data.strip():
                continue
            if is_int:
                data = int(data)
            if is_bool:
                data = True if data.lower() == "true" else False
            if func:
                data = func(data)
            data_container.append(data)
        return data_container

    def getDataFromEntry(self, entry, is_int=False, is_float=False, is_bool=False, is_option=False, func=None):
        data = entry.get().strip()
        if is_int:
            data = int(data)
        if is_float:
            data = float(data)
        if is_bool:
            data = True if entry.get() == "yes" else False
        if func:
            data = func(data)
        if is_option:
            data = entry.get()
        return data


    def createInput(self, label, text, row, text_variable=None, is_textbox=False, is_bool=False, is_option=False, container=None, join_with="\n", column=0, options=None):
        self.Label(label, 23, row, column, container=container)
        column += 1
        if is_bool:
            _, str_var = self.OptionMenu("", "yes" if text else "no", ["yes", "no"], row, setLabel=False, menuColumn=column)
            return str_var
        elif is_option:
            _, str_var = self.OptionMenu("", text, options, row, setLabel=False, menuColumn=column)
            return str_var
        elif not is_textbox:
            return self.Entry(text, 40, row, column, text_variable=text_variable, container=container)
        else:
            if isinstance(text, list):
                text = join_with.join([str(data) for data in text])
            return self.TextBox(text, 40, 7, row, column, container=container)


    def createFileInput(self, label, text, row, label_width=20, entry_width=40, button_width=12, column=0, dialogFunc=askopenfilename):

        def editFileEntry(entry:tkinter.Entry):
            file = dialogFunc()
            entry.delete(0, tkinter.END)
            entry.insert(0, file if isinstance(file, str) else " | ".join(file))
        
        if label != "":
            self.Label(label, label_width, row, column)
            column += 1
        entry = self.Entry(text, entry_width, row, column)
        column += 1 
        self.Button("Open", button_width, row, column, partial(editFileEntry, entry))

        return entry
        

    def retrieveEntries(**kwargs):
        entriesObj = {}
        for entry in kwargs:
            try:
                entriesObj[entry] = kwargs[entry].get().strip()
            except:
                entriesObj[entry] = kwargs[entry].get('1.0', 'end-1c').strip()
        return entriesObj





def ScrollableFrame(frame):

    canvas = tkinter.Canvas(frame)
    canvas.pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=1)

    scrollbar = ttk.Scrollbar(frame, orient=tkinter.VERTICAL, command=canvas.yview)
    scrollbar.pack(side=tkinter.RIGHT, fill=tkinter.Y)

    canvas.configure(yscrollcommand=scrollbar.set)
    canvas.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

    sec_frame = tkinter.Frame(canvas)

    canvas.create_window((0, 0), window=sec_frame, anchor=tkinter.NW)
    return sec_frame
