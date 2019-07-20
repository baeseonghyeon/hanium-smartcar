from SunFounder_Ultrasonic_Avoidance import Ultrasonic_Avoidance
from picar import front_wheels
from picar import back_wheels
import time
import picar
import random

force_turning = 0    # 0 = random direction, 1 = force left, 2 = force right, 3 = orderdly

picar.setup()

ua = Ultrasonic_Avoidance.Ultrasonic_Avoidance(20)
fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
fw.turning_max = 30

forward_speed = 70
backward_speed = 50
turn_speed = 50

back_distance = 15
turn_distance = 30

timeout = 10

def right():
    for a in range(9):
        fw.turn_right()
        bw.forward()
        bw.speed = turn_speed
        time.sleep(0.56)

def stop():
    fw.turn_straight()
    bw.forward()
    bw.speed = 0


def start_check():
    time.sleep(15)
    right()
    stop()

start_check()