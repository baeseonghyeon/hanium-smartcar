#!/usr/bin/env python
'''
**********************************************************************
* Filename    : ultra_sonic_avoidance.py
* Description : An example for sensor car kit to followe light
* Author      : Dream
* Brand       : SunFounder
* E-mail      : service@sunfounder.com
* Website     : www.sunfounder.com
* Update      : Dream    2016-09-27    New release
**********************************************************************
'''

    
from SunFounder_Ultrasonic_Avoidance import Ultrasonic_Avoidance
from picar import front_wheels
from picar import back_wheels
import time
import picar
import random

print('ok?')
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
    fw.turn_right()
    bw.forward()
    bw.speed = turn_speed
    time.sleep(0.5)
    
def straight():
    fw.turn_straight()
    bw.forward()
    bw.speed = forward_speed
    time.sleep(0.5)

def backward():
    fw.turn_straight()
    bw.backward()
    bw.speed = backward_speed
    time.sleep(0.5)
    
def stop():
    bw.stop()
    time.sleep(0.5)
    
def check_distance():
    global count
    while True:
        distance = ua.get_distance()
        print("distance: %scm" % distance)
        if distance > 0:
            count = 0
            if distance < back_distance: # backward
                stop()
            elif distance < turn_distance: # turn
                right()
            else:
                straight()

        else:                       # forward
            fw.turn_straight()
            if count > timeout:  # timeout, stop;
                bw.stop()
            else:
                backward()
                count += 1     

def start_avoidance():
    print('start_avoidance')
    count = 0
    check_distance()


def stop():
    bw.stop()
    fw.turn_straight()

def kimtest():
    print('gogogogogo')
    try:
        start_avoidance()
    except KeyboardInterrupt:
        stop()

fw.turn_straight()
time.sleep(1)
#fw.turn_right()
time.sleep(1)
