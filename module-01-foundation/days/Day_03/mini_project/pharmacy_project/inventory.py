stock = {}
try:
    with open("stock.txt", "r") as f:
        for line in f:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet - starting empty")
def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount
item = input("Enter medicine name: ")
amount = int(input("Enter amount (+ or -): "))
adjust(item, amount)
print("\nCurrent Stock:")
for item, qty in stock.items():
    print(item, qty)
print("\nLow Stock:")
for item, qty in stock.items():
    if qty < 10:
        print(item, qty)
with open("stock.txt", "w") as f:
    for item, qty in stock.items():
        f.write(f"{item},{qty}\n")
print("\nStock saved successfully.")