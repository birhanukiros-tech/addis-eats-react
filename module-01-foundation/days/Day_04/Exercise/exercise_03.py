class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    def restock(self, n):
        self.__quantity += n

    def sell(self, n):
        self.__quantity -= n
p = Product("Phone", 20000, 8)
print(p.quantity)