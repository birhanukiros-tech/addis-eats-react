# List index
numbers = [10, 20, 30, 40, 50]
print(numbers[2])      # O(1)

# Single loop
for num in numbers:
    print(num)         # O(n)

# Nested loop
for i in numbers:
    for j in numbers:
        print(i, j)    # O(n²)

# Dictionary lookup
accounts = {
    "1001": "Abel",
    "1002": "Birhanu",
    "1003": "John"
}

print(accounts["1002"])    # O(1)

# Binary Search
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

nums = [2, 4, 6, 8, 10, 12, 14, 16]
print(binary_search(nums, 10))    # O(log n)