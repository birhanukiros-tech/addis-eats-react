import heapq

tasks = []

heapq.heappush(tasks, (3, "Write report"))
heapq.heappush(tasks, (1, "Answer email"))
heapq.heappush(tasks, (5, "Go home"))
heapq.heappush(tasks, (2, "Attend meeting"))
heapq.heappush(tasks, (4, "Study Python"))

print("Tasks by priority:")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, "-", task)