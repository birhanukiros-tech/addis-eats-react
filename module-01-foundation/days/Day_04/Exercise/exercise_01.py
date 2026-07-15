class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    def describe(self):
        print(f"{self.title} by {self.author} - {self.pages} pages")
book1 = Book("Python Basics", "John", 250)
book2 = Book("AI Guide", "Sara", 300)
book1.describe()
book2.describe()