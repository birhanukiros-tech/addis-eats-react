class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return f"{self.make} {self.model}"
class Car(Vehicle):
    pass
class Truck(Vehicle):
    pass
car = Car("Toyota", "Corolla")
truck = Truck("Volvo", "FH16")
print(car.describe())
print(truck.describe())