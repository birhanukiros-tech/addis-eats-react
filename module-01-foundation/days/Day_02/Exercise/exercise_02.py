score = 78
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"score: {score} -> Grade: {grade}")
if score >= 70 and score < 80:
    print("You're in the C range -close to B!")