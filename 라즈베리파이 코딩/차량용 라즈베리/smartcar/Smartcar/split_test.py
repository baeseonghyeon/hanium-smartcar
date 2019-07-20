from SunFounder_Ultrasonic_Avoidance import Ultrasonic_Avoidance
from picar import front_wheels
from picar import back_wheels
import time
import picar
import random
import sys

#picar setting
picar.setup()
ua = Ultrasonic_Avoidance.Ultrasonic_Avoidance(20)
fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
fw.turning_max = 30

forward_speed = 70
backward_speed = 50
turn_speed = 50

emergency_stop_distance = 5
find_obstacle = 10
check_obstacle = 0

def kimtest():
    
    kimtest = "1 1 3 4 1 1 1 3 1 1 2 1 1 2 1 3 1 3 3 1 "
    taetest = kimtest.split(' ')
    print (taetest)
    

    
    for a in taetest:
        if a == '1':
            print('go')
            go()
        elif a == '2':
            print('right')
        elif a == '3':
            print('left')
        elif a == '4':
            print('back')
        else:
            print('stop')
            return

def check_distance():
    distance = ua.get_distance()
    print("distance: %scm" % distance)
    if distance < emergency_stop_distance:
        bw.speed = 0
        time.sleep(1)
        global check_obstacle
        global find_obstacle
        check_obstacle += 1
        print(check_obstacle)
        if check_obstacle == find_obstacle:
            print('find obstacle and check new path')
            sys.exit(1)



def go():
    fw.turn_straight()
    bw.forward()
    #bw.speed = forward_speed
    for a in range(6):
        check_distance()
        time.sleep(0.5)

kim = kimtest()
kim




