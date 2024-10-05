# 간단한 덧셈 및 뺄셈 프로그램

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# 사용자 입력 받기
num1 = float(input("첫 번째 숫자를 입력하세요: "))
num2 = float(input("두 번째 숫자를 입력하세요: "))

# 결과 출력
print(f"{num1} + {num2} = {add(num1, num2)}")
print(f"{num1} - {num2} = {subtract(num1, num2)}")
