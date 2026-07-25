class Node:
    def init(self, value):
        self.value = value
        self.left = None
        self.right = None


def height(node):
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return max(left_height, right_height) + 1


root = Node(10)
root.left = Node(5)
root.right = Node(15)
root.left.left = Node(3)
root.left.right = Node(7)

print("Tree depth:", height(root))