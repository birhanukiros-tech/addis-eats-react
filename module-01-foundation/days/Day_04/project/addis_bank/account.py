class BankConfig:
    _instance = None

    def new(cls):
        if cls._instance is None:
            cls._instance = super().new(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.history = []
        self.observers = []

    @property
    def balance(self):
        return self.__balance

    def subscribe(self, observer):
        self.observers.append(observer)

    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.__balance += amount
        self.history.append(("deposit", amount))
        self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient balance")

        self.__balance -= amount
        self.history.append(("withdraw", amount))
        self._notify(f"{self.owner} withdrew {amount} ETB")

    def undo_last(self):
        if not self.history:
            raise ValueError("No transaction")

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount

        elif action == "withdraw":
            self.__balance += amount

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().init(owner, account_number, balance)

        config = BankConfig()
        self.rate = config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("Type: Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().init(owner, account_number, balance)

        config = BankConfig()
        self.overdraft_limit = config.overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if self.balance - amount < -self.overdraft_limit:
            raise ValueError("Overdraft limit exceeded")

        # access private balance through protected method
        self._Account__balance -= amount

        self.history.append(("withdraw", amount))
        self._notify(f"{self.owner} withdrew {amount} ETB")

    def statement(self):
        print("Type: Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")


class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, account_number, balance)

        elif kind == "current":
            return CurrentAccount(owner, account_number, balance)

        else:
            raise ValueError("Unknown account type")


class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")


class AuditLog:
    def update(self, message):
        print(f"Audit Log: {message}")

def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left <= right:
        middle = (left + right) // 2

        if numbers[middle] == target:
            return middle

        elif numbers[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1


class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        accounts = []

        for number in self.order:
            accounts.append(self.by_number[number])

        return accounts

    def top_by_balance(self, n=5):
        accounts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )

        return accounts[:n]

    def find_by_number(self, number):
        numbers = sorted(self.by_number)

        index = binary_search(numbers, number)

        if index >= 0:
            return self.by_number[numbers[index]]

        return None

    def total_transactions(self, number):

        account = self.find(number)

        if account is None:
            return 0

        def count(history):

            if len(history) == 0:
                return 0

            return 1 + count(history[1:])

        return count(account.history)

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []     # sub branches
        self.accounts = []     # accounts in this branch

    def total_balance(self):
        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


def bfs(transfers, start):
    visited = []
    queue = [start]

    while queue:
        current = queue.pop(0)

        if current not in visited:
            visited.append(current)

            for account in transfers.get(current, []):
                queue.append(account)

    return visited