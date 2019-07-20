from SunFounder_Ultrasonic_Avoidance import Ultrasonic_Avoidance
from picar import front_wheels
from picar import back_wheels
import threading
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
straight_dir = 92.2
right_dir = straight_dir + 30
left_dir = straight_dir - 30

forward_speed = 70
backward_speed = 70
turn_speed = 50

emergency_stop_distance = 5
find_obstacle = 10
check_obstacle = 0


kill_threads = False

def check_distance():
    global kill_threads
    while True:
        if kill_threads:
            return print('retrun thread')
            #sys.exit()
        distance = ua.get_distance()
        print("distance: %scm" % distance)
        if distance < emergency_stop_distance:
            emergency_stop()
            
def emergency_stop():
    bw.speed = 0
    time.sleep(1)
    global check_obstacle
    global find_obstacle
    check_obstacle += 1
    print(check_obstacle)
    if check_obstacle == find_obstacle:
        print('find obstacle and check new path')
        sys.exit()

def go():
    fw.turn(straight_dir)
    bw.forward()
    bw.speed = forward_speed
    for a in range(3):
        time.sleep(0.533)

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
        time.sleep(0.52)
    for a in range(2):
        fw.turn(straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.4)

def left():
    for a in range(4):
        fw.turn(straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.53)
    for a in range(10):
        fw.turn(left_dir)
        bw.forward()
        bw.speed = turn_speed
        time.sleep(0.5)
    for a in range(2):
        fw.turn(straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.4)

def back():
    stop()
    time.sleep(0.3)
    fw.turn(straight_dir)
    bw.backward()
    bw.speed = backward_speed
    for a in range(3):
        time.sleep(0.543)
        
def stop():
    fw.turn(straight_dir)
    bw.forward()
    bw.speed = 0



def kimtest():
    global kill_threads
    kimtest = "1 2 4 "
    taetest = kimtest.split(' ')
    print (taetest)
    th = threading.Thread(target=check_distance, name="check_thread")
    th.setDaemon(True)
    th.start()
    
    
    for a in taetest:
        if a == '1':
            print('go')
            go()
        elif a == '2':
            print('right')
            right()
        elif a == '3':
            print('left')
            left()
        elif a == '4':
            print('back')
            back()
        else:
            print('stop')
            stop()
            kill_threads = True
    return print('move end')

kimtest()