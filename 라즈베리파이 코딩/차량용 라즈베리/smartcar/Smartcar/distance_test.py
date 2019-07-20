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
straight_dir = 93.5
right_dir = straight_dir + 30
left_dir = straight_dir - 30


forward_speed = 70
backward_speed = 60
turn_speed = 50

back_distance = 15
turn_distance = 30

timeout = 10

def right():
    for a in range(4):
        fw.turn(straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.53)
    for a in range(10):
        fw.turn(right_dir)
        bw.forward()
        bw.speed = turn_speed
        time.sleep(0.495)
    for a in range(2):
        fw.turn(straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.4)

def stop():
    fw.turn_straight()
    bw.forward()
    bw.speed = 0


def start_check():
    time.sleep(3)
    right()
    stop()

start_check()