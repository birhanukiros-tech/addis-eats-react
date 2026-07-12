print("--- part A ---")
balance = 500
while balance > 0:
    print(f"Current balance: { balance}")
    balance -= 100
print("\n--- part B ---")
for i in range(1, 11):
    print(f"5 x {i} = {5 * i}")
print("\n--- part C ---")
names = ["Almaz", "Dawit", "Tigist", "Berket"]
for name in names:
    if name == "Tigist":
        continue
    print(f"Hello, {name}!")
print("\n--- part D ---")
for num in range(1, 21):
    if num % 7 == 0:
        print(f"First number divisibel by 7is: {num}")
        break