import datetime as dt

print("Let's compute π:")
def compute_pi(n):
    pi = 2
    for i in range(1,n):
        pi *= 4 * i ** 2 / (4 * i ** 2 - 1)
    return pi

pi = compute_pi(100000)
s = f"π is approximately {pi:.3f}"
Element('hi').write(str(s))
print(s)

def show_time(): 
    Element("today").write(str(dt.date.today()))
  
show_time()
