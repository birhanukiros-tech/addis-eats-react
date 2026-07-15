class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    @quantity.setter
    def quantity(self, value):
        if value >= 0:
            self.__quantity = value
        else:
            print("Quantity cannot be negative")
p = Product("Mouse", 500, 5)
p.quantity = 3
print(p.quantity)
p.quantity = -2
print(p.quantity)