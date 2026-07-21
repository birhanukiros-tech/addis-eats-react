def is_even(number):
    return number % 2 == 0

def add_tax(price, rate=0.15):
    return price + (price * rate)
print("Tax with default rate (15%):", add_tax(1000))
print("Tax with specific rate (10%):", add_tax(1000, rate=0.10))
def describe_balance(balance):
    if balance >= 1000:
        tier = "Premium"
    elif balance >= 500:
        tier = "Standard"
    else:
        tier = "Basic"
    return tier
print("\nBalance 1200 is:", describe_balance(1200))
print("Balance 600 is:", describe_balance(600))
print("Balance 200 is:", describe_balance(200))
