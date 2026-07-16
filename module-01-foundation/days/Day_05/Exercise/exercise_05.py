from abc import ABC, abstractmethod
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model
    @abstractmethod
    def wheels(self):
        pass
class Car(Vehicle):
    def wheels(self):
        return 4
class Truck(Vehicle):
    def wheels(self):
        return 6
car = Car("Toyota", "Corolla")
truck = Truck("Volvo", "FH16")
print(car.wheels())
print(truck.wheels())