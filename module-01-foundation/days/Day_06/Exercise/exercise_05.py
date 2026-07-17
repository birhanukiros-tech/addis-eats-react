class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, message):
        for subscriber in self.subscribers:
            subscriber.update(message)

class EmailSubscriber:
    def update(self, message):
        print(f"Email received: {message}")

class SMSSubscriber:
    def update(self, message):
        print(f"SMS received: {message}")

agency = NewsAgency()

email = EmailSubscriber()
sms = SMSSubscriber()

agency.subscribe(email)
agency.subscribe(sms)

agency.notify("Breaking News!")