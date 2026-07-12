customers = [
    ("Almaz", 1500),
    ("Dawit", 800),
    ("Tigist", 300),
    ("Bereket", 1200)
]
def get_tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"
def apply_tax(balance, rate=0.15):
    return balance + (balance * rate)
total_customers = 0
total_balance = 0
print("--- Customer Billing Summary ---\n")
for name, balance in customers:
    tier = get_tier(balance)
    balance_with_tax = apply_tax(balance)
    if tier == "Premium":
        print(f"* Congratulations {name}, you are a valued Premium customer! *")
    print(f"{name}: {tier} | Balance: {balance} ETB | With tax: {balance_with_tax} ETB")
    print("-" * 50)
    total_customers += 1
    total_balance += balance
print("\n--- Final Totals ---")
print(f"Total customers processed: {total_customers}")
print(f"Combined balance of all customers: {total_balance} ETB")