def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        total = nums[left] + nums[right]

        if total == target:
            return True
        elif total < target:
            left += 1
        else:
            right -= 1

    return False


# Test
numbers = [1, 2, 3, 4, 5, 6, 7]

print(has_pair(numbers, 9))
print(has_pair(numbers, 20))