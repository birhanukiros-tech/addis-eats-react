def recursive_total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + recursive_total(nums[1:])


def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)


# Test
numbers = [10, 20, 30, 40]
print("Total:", recursive_total(numbers))

count_down(5)