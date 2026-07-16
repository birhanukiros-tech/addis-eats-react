class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return f"{self.make} {self.model}"

class Car(Vehicle):
    pass

class Truck(Vehicle):
    def describe(self):
        return f"Truck: {self.make} {self.model}"

vehicles = [
    Car("Toyota", "Corolla"),
    Truck("Volvo", "FH16"),
    Car("Honda", "Civic")
]
for vehicle in vehicles:
    print(vehicle.describe())