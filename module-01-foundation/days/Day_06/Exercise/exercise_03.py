class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance

a = AppSettings()
b = AppSettings()

print(a.currency)
print(a is b)