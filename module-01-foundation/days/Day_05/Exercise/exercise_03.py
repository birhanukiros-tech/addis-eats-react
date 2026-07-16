class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return f"{self.make} {self.model}"

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        return f"{self.make} {self.model}, Capacity: {self.capacity}"

truck = Truck("Volvo", "FH16", "20 tons")
print(truck.describe())