class Circle:
    def draw(self):
        print("Drawing Circle")

class Square:
    def draw(self):
        print("Drawing Square")

class Triangle:
    def draw(self):
        print("Drawing Triangle")

class ShapeFactory:
    @staticmethod
    def create(kind):
        if kind == "circle":
            return Circle()
        elif kind == "square":
            return Square()
        elif kind == "triangle":
            return Triangle()
        else:
            return None

shape = ShapeFactory.create("circle")
shape.draw()