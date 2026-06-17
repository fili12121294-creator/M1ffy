import math
from turtle import *


# Налаштування екрану
def setup_window():
    setup(800, 800)
    bgcolor("black")
    title("Магія Python ❤️")
    speed(0)  # Найвища швидкість малювання
    delay(0)


# Математичні формули для координат серця
def heart_x(t):
    return 16 * math.sin(t) ** 3


def heart_y(t):
    return (
        13 * math.cos(t)
        - 5 * math.cos(2 * t)
        - 2 * math.cos(3 * t)
        - math.cos(4 * t)
    )


# ВИПРАВЛЕНА ФУНКЦІЯ: тепер без зайвих ліній по центру
def draw_heart():
    pensize(2)

    for i in range(1, 15):
        penup()
        goto(0, 0)
        pendown()

        color_val = i / 15
        pencolor(color_val, 0, 0.3)

        for t in range(0, 630, 2):
            t_rad = t / 100
            x = heart_x(t_rad) * i * 1.5
            y = heart_y(t_rad) * i * 1.5
            goto(x, y)

        penup()  # Ось ця команда ховає лінію при поверненні в центр!


def write_text():
    penup()
    goto(0, -30)
    color("white")
    write(
        "I love you", align="center", font=("Arial", 20, "bold")
    )


# Запуск програми
if __name__ == "__main__":
    setup_window()
    draw_heart()
    write_text()
    hideturtle()
    done()