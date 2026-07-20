def applay_discount(price, percent =10):
    discount = price * percent / 100
    return price - discount

print(applay_discount(1000))
print(applay_discount(1000,20))
