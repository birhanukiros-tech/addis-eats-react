def merge(left, right):
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)


# Test
numbers = [8, 3, 1, 7, 5, 2, 6, 4]

print("Merge Sort:", merge_sort(numbers))
print("Python Sorted:", sorted(numbers))