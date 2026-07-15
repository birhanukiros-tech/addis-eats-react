with open("names.txt", "w") as file:
    file.write("Abel\n")
    file.write("Birhanu\n")
    file.write("Sara\n")
with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())