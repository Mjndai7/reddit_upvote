
if __name__ == "__main__":
        
    import tkinter
    from ui.base_widget import ScrollableFrame
    from ui.root_widget import RootWidget
    

    def main():
        root = tkinter.Tk()
        root.title('Reddit Upvote Bot')
        root.geometry('1000x400')
        root_frame = ScrollableFrame(root)
        RootWidget(root_frame, 0, 0)
        root.mainloop()
    
    
    main()

