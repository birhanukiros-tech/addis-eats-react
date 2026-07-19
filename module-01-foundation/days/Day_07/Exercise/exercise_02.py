# List vs Dictionary Lookup

import time

# Create a large list and dictionary
numbers_list = list(range(100000))
numbers_dict = {i: i for i in range(100000)}

target = 99999

# List Lookup
start = time.time()

found = target in numbers_list

end = time.time()

print("List Lookup:")
print("Found:", found)
print("Time:", end - start)


# Dictionary Lookup
start = time.time()

found = target in numbers_dict

end = time.time()

print("\nDictionary Lookup:")
print("Found:", found)
print("Time:", end - start)