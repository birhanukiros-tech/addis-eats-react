class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
p1 = Product("Pen", 10, 20)
p2 = Product("Book", 50, 15)
p3 = Product("Bag", 300, 5)
p1.quantity = 100
print(p1.name, p1.quantity)
print(p2.name, p2.quantity)
print(p3.name, p3.quantity)