import datetime as dt

def show_time(): 
    Element("today").write(str(dt.date.today()))
  
show_time()
