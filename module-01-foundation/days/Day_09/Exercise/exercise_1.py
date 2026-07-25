class Node:
    def init(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

balances = [500, 300, 700, 200, 400, 600, 800]

root = None
for value in balances:
    root = insert(root, value)

print("In-order Traversal:")
inorder(root)