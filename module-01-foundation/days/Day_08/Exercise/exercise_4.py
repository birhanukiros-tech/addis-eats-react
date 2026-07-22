accounts = [
    ("John", 2000),
    ("Alice", 5000),
    ("Bob", 1500),
    ("Sara", 4000)
]

accounts.sort(key=lambda x: x[1], reverse=True)

print(accounts)