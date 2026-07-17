class ReportBuilder:
    def build(self):
        return "Monthly Report"

class ReportSaver:
    def save(self, report):
        print(f"Saving: {report}")

class ReportEmailer:
    def email(self, report):
        print(f"Emailing: {report}")

builder = ReportBuilder()
report = builder.build()

saver = ReportSaver()
saver.save(report)

emailer = ReportEmailer()
emailer.email(report)