class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    def restock(self, n):
        self.quantity += n
    def sell(self, n):
        self.quantity -= n
p1 = Product("Laptop", 50000, 10)
p1.restock(5)
p1.sell(3)
print(p1.quantity)