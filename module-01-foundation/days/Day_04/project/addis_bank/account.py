class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observer = []
    def subscribe(self, observer):
       self._observer.append(observer)
    def _notify(self, message):
        for observer in self._observer: observer.update(message)
    @property
    def balance(self):
        return self.__balance
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        self._notify(f"{amount}ETB deposited")
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
        slef._notify(f"{amount}ETB withdrawn")
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
        config = BankConfig
        self.overdraft = config.overdraft_limit
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded")
        self._Account__balance -= amount
    def statement(self):
        print("Current Account")
        super().statement()

acc1 = AccountFactory.creat("savings", "Abel", "1002", 3000)
acc2 = CurrentAccount.creat("Sara", "1003", 2000)
acc1.add_interest()
sms = SMSAlert()
audit = AuditLog()
acc1.subscribe(sms)
acc1.subscribe(audit)
acc2.subscribe(sms)
acc2.subscribe(audit)
acc2.withdraw(200)
accounts = [acc1, acc2]
for account in accounts:
    account.statement()
    print()

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")

class AuditLog:
    def update(self, message):
        print(f"AUDIT: {message}")

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type")