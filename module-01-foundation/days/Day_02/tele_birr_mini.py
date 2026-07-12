customers = [
    ("Almaz", 1500),
    ("Dawit", 700),
    ("Tigist", 200),
    ("Hanna", 1200),
    ("Samuel", 450)
]
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"
premium_count = 0
standard_count = 0
basic_count = 0
print("--- TeleBirr Customer Report ---\n")
for name, balance in customers:
    customer_tier = tier(balance)
    print(f"{name}: {customer_tier} ({balance} ETB)")
    if customer_tier == "Premium":
        premium_count += 1
    elif customer_tier == "Standard":
        standard_count += 1
    elif customer_tier == "Basic":
        basic_count += 1
print("\n--- Summary Count ---")
print(f"Premium customers: {premium_count}")
print(f"Standard customers: {standard_count}")
print(f"Basic customers: {basic_count}")