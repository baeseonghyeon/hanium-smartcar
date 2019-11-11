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

force_turning = 0    # 0 = random direction, 1 = force left, 2 = force right, 3 = orderdly

picar.setup()

ua = Ultrasonic_Avoidance.Ultrasonic_Avoidance(20)
fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
fw.turning_max = 30

forward_speed = 70
backward_speed = 30

stop_distance = 15
slow_distance = 30

timeout = 10

def start_backward():
    print('start_backward')
    while True:
        distance = ua.get_distance()
        bw.backward()
        bw.speed = backward_speed
        time.sleep(2)
        if distance > 5:
            print('ok')
            break

def start_forward():
    print('start_forward')

    count = 0
    while True:
        distance = ua.get_distance()
        print("distance: %scm" % distance)
        if distance > 0:
            count = 0
            if distance < 5:
                start_backward()
                
            elif distance < stop_distance: # stop
                print( "stop")
                bw.speed = 0
                time.sleep(1)
            elif distance < slow_distance: # slow
                print("slow")
                bw.forward()
                bw.speed = 30
                time.sleep(0.5)
            else:
                bw.forward()
                bw.speed = forward_speed
                time.sleep(0.5)

        else:                       # forward
            if count > timeout:  # timeout, stop;
                bw.stop()
            else:
                bw.forward()
                bw.speed = forward_speed
                count += 1

def stop():
    bw.stop()
    print("stop")
    
if __name__ == '__main__':
    try:
        start_forward()
    except KeyboardInterrupt:
        stop()

