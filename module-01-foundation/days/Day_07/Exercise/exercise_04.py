# Build a Queue
class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)
        print(f"{item} added to queue")

    def dequeue(self):
        if len(self.items) == 0:
            return "Queue is empty"
        return self.items.pop(0)

    def front(self):
        if len(self.items) == 0:
            return "Queue is empty"
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)


# Test the Queue
queue = Queue()

queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print("Front item:", queue.front())
print("Dequeued:", queue.dequeue())
print("Front item:", queue.front())
print("Size:", queue.size())
print("Is Empty:", queue.is_empty())