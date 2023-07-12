
def split_list(lst, n):
    start = 0
    end = start + n
    final_lst = []
    
    while True:
        final_lst.append(lst[start:end])
        start = end
        end = start + n
        if start >= len(lst):
            break
    
    return final_lst

