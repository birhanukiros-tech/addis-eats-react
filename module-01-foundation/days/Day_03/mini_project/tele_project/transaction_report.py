totals = {}
try:
    with open("transactions.txt", "r") as f:
        for line in f:
            name, amount = line.strip().split(",")
            amount = float(amount)
            totals[name] = totals.get(name, 0) + amount
except FileNotFoundError:
    print("Transactions file not found.")
    exit()
# Sort highest first
sorted_totals = sorted(totals.items(), key=lambda x: x[1], reverse=True)
print("Customer Report")
for name, total in sorted_totals:
    print(f"{name}: {total}")
# Write report
with open("report.txt", "w") as f:
    for name, total in sorted_totals:
        f.write(f"{name}: {total}\n")
print("Report saved to report.txt")