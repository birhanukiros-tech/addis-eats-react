def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


# Test
balances = [100, 200, 300, 400, 500]

print(binary_search(balances, 300))
print(binary_search(balances, 600))