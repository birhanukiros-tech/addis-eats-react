class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self.observers = []
        self.histroy = []
    
    @property
    def balance(self):
        return self._balance

    def subscribe(self, observe):
        self.observers.append(observe)

    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)

def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self._notify(f"{amount} ETB deposited")
        self.history.append(("deposit", amount))


def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
        self._notify(f"{amount} ETB withdrawn")
        self.history.append(("withdraw", amount))
def undo_last(self):

    if not self.history:
        print("No transaction to undo")
        return

    action, amount = self.history.pop()

    if action == "deposit":
        self.balance -= amount

    elif action == "withdraw":
        self.balance += amount
    
def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance} ETB")



class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print("Savings Account")
        super().statement()


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded")
        self._balance -= amount

    def statement(self):
        print("Current Account")
        super().statement()

saving1 = SavingsAccount("Birhanu", "001", 5000, 0.05)

current1 = CurrentAccount("Abel", "002", 3000, 1000)

accounts = [saving1, current1]

for account in accounts:
    account.statement()

class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind =="Current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type")
        
class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")

class AuditLog:
    def update(self, message):
        print(f"LOG: {message}")

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
      return [self.by_number[number] for number in self.order]


class AccountRegistry:
    def top_by_balance(self, n=5):
        accts = sorted(self.by_number.values(),
                       key=lambda a: a.balance, reverse=True)
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number)        
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None
