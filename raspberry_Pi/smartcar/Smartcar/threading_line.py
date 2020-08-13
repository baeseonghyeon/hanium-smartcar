from .SunFounder_Ultrasonic_Avoidance import Ultrasonic_Avoidance
from .SunFounder_Line_Follower import Line_Follower
from picar import front_wheels
from picar import back_wheels
import threading
import time
import picar
import random
import sys
import requests
import json

#picar setting
picar.setup()
ua = Ultrasonic_Avoidance.Ultrasonic_Avoidance(20)
fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
fw.turning_max = 45
right_to_straight_dir = 91.2
right_dir= 135
left_to_straight_dir = 98.6
left_dir = 45

REFERENCES = [287, 288, 270, 270, 285]
max_off_track_count = 40
turning_angle = 45
delay = 0.01
lf = Line_Follower.Line_Follower()



forward_speed = 70
backward_speed = 70
turn_speed = 50

emergency_stop_distance = 10
find_obstacle = 10
check_obstacle = 0
flag = 0
stop_flag = 0
line_flag = True

kill_threads = False

URL = 'http://192.168.0.10:8000/kimtest'


def check_distance():
    global kill_threads
    while True:
        if kill_threads:
            return print('retrun thread')
            sys.exit()
        distance = ua.get_distance()
        print("distance: %scm" % distance)
        if distance < emergency_stop_distance:
            emergency_stop()
            
def emergency_stop():
    global stop_flag
    stop_flag = 1
    print('okokokokokok')
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
    global flag, URL

    if flag == 0:
        flag = 1
        fw.turn(right_to_straight_dir)
        time.sleep(0.26)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(1.36)
    
    elif flag == 1:
        bw.speed = forward_speed
        time.sleep(1.4)
        
    elif flag == 2:
        flag = 1
        fw.turn(right_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(1)
        
    elif flag == 3:
        flag =1
        fw.turn(left_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(1)

def right():
    global flag, URL

    flag = 2
    if flag == 0:
        print(flag)
        fw.turn(right_to_straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.24)
    elif flag == 1:
        print(flag)
        fw.turn(right_to_straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.23)

    
    fw.turn(right_dir)
    fw.turn(right_dir)
    fw.turn(right_dir)
    bw.forward()
    bw.speed = turn_speed
    time.sleep(3.6)
    data = 0

    
def left():
    global flag, URL

    flag = 3
    fw.turn(right_to_straight_dir)
    bw.forward()
    bw.speed = forward_speed
    time.sleep(0.4)
        
    fw.turn(left_dir)
    bw.forward()
    bw.speed = turn_speed
    time.sleep(3)

def back():

    stop()
    time.sleep(1)
    fw.turn(right_to_straight_dir)
    bw.backward()
    bw.speed = backward_speed
    time.sleep(1.44)
    flag = 0
        
def stop():

    fw.turn(right_to_straight_dir)
    bw.forward()
    bw.speed = 0
    flag = 0



def kimtest(aaa):
    global kill_threads, flag, URL, data, lf, line_flag
    kimtest = aaa
    taetest = kimtest.split(' ')
    
    kim = lf.read_analog()
    for i in range(0,5):
        lf.references[i] = REFERENCES[i]
    print(lf.references)
    th = threading.Thread(target=line_follower, name="line_follower")
    th.setDaemon(True)
    th.start()
    kill_threads = False
    line_flag = True
    count = 0
    time.sleep(0.5)
    for a in taetest:
        if stop_flag == 0:
            count += 1
            if a == '1':
                if taetest[count] == 2 or taetest[count] == 3:
                    line_flag = False
                    fw.turn(90)
                line_flag = True
                print('go')
                go()
            elif a == '2':
                line_flag = False
                print('right')
                right()
                line_flag = True
            elif a == '3':
                line_flag = False
                print('left')
                line_flag = True
                left()
            elif a == '4':
                print('back')
                back()
            else:
                line_flag = False
                print('stop')
                stop()
                kill_threads = True
        elif stop_flag == 1:
            time.sleep(10)
    return print('move end')

def adjust_fw(a):
    print(a)
    
    if flag == 1 or flag == 0:
        if int(a) == 1:
            fw.turn(right_dir)
            time.sleep(0.02)
            fw.turn(right_to_straight_dir)
        elif int(a) == 2:
            fw.turn(left_dir)
            time.sleep(0.02)
            fw.turn(left_to_straight_dir)
    elif flag == 2:
        while flag ==2:
            time.sleep(0.2)
    return 0

def fw_check():
    global flag, kill_threads
    time.sleep(0.5)
    a = 1
    while kill_threads == False:
        adjust_fw(a)
        if a == 1:
            a = 2
        elif a == 2:
            a = 1
        time.sleep(0.3)
    sys.exit()
    return

def main_line():
    global turning_angle, lf, line_flag
    off_track_count = 0

    a_step = 3
    b_step = 10
    c_step = 30
    d_step = 45
    bw.forward()
    while True:
        if line_flag:
            lt_status_now = lf.read_digital()
            print(lt_status_now)
            # Angle calculate
            if  lt_status_now == [0,0,1,0,0]:
                step = 0    
            elif lt_status_now == [0,1,1,0,0] or lt_status_now == [0,0,1,1,0]:
                step = a_step
            elif lt_status_now == [0,1,0,0,0] or lt_status_now == [0,0,0,1,0]:
                step = b_step
            elif lt_status_now == [1,1,0,0,0] or lt_status_now == [0,0,0,1,1]:
                step = c_step
            elif lt_status_now == [1,0,0,0,0] or lt_status_now == [0,0,0,0,1]:
                step = d_step

            # Direction calculate
            if  lt_status_now == [0,0,1,0,0]:
                off_track_count = 0
                fw.turn(90)
            # turn right
            elif lt_status_now in ([0,1,1,0,0],[0,1,0,0,0],[1,1,0,0,0],[1,0,0,0,0]):
                off_track_count = 0
                turning_angle = int(90 - step)
            # turn left
            elif lt_status_now in ([0,0,1,1,0],[0,0,0,1,0],[0,0,0,1,1],[0,0,0,0,1]):
                off_track_count = 0
                turning_angle = int(90 + step)
            elif lt_status_now == [0,0,0,0,0]:
                off_track_count += 1

                    

            else:
                off_track_count = 0
        
            fw.turn(turning_angle)
            time.sleep(delay)
        URL = 'http://192.168.0.10:8000/test'
        response = requests.post(URL, {'kim': 'hello'})
        
def destroy():
    bw.stop()
    fw.turn(90)
    

def line_follower():
    
    try:
        time.sleep(0.5)
        main_line()

    except KeyboardInterrupt:
        destroy()
