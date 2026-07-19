# Build a Stack
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)
        print(f"{item} pushed to stack")

    def pop(self):
        if len(self.items) == 0:
            return "Stack is empty"
        return self.items.pop()

    def peek(self):
        if len(self.items) == 0:
            return "Stack is empty"
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)


# Test the Stack
stack = Stack()

stack.push(10)
stack.push(20)
stack.push(30)

print("Top item:", stack.peek())
print("Popped:", stack.pop())
print("Top item:", stack.peek())
print("Size:", stack.size())
print("Is Empty:", stack.is_empty())