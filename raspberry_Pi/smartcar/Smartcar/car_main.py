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
import picamera

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
delay = 0.006
lf = Line_Follower.Line_Follower()

for i in range(0, 5):
    lf.references[i] = REFERENCES[i]
print(lf.references)

forward_speed = 70
backward_speed = 70
turn_speed = 50

emergency_stop_distance = 30
find_obstacle = 10
check_obstacle = 0
time_flag = 0
stop_flag = 0
move_controll_flag = 0
line_flag = False
emergency_stop_flag = 0
OpenCV_flag = '0'
OpenCV_count = 0


kill_threads = False

    


def main(path, car_id, emer):
    global lf, line_flag, move_controll_flag, time_flag, emergency_stop_flag, kill_threads, OpenCV_flag
    
    index = 0
    print(path)
    temp = path
    main_path = temp.split(' ')
    check_emergency = 0
    line_flag = True
    kill_threads = False
    
    # threading
    line_thread = threading.Thread(target=line_follower, name="line_follower")
    line_thread.setDaemon(True)
    line_thread.start()
        
    distance_thread = threading.Thread(target=check_distance, name="check_distance")
    distance_thread.setDaemon(True)
#    distance_thread.start()
    
    time.sleep(0.5)

    print('start moving')

    # main move controll section
    for controll in main_path:
        print(controll)
        while emergency_stop_flag == 0:
            if move_controll_flag == 0:
                
                # straight dir
                if controll == '1':
                    line_flag = True
                    go_straight()

                # right dir 
                elif controll == '2':
                    line_flag = False
                    go_right()
                    line_flag = True

                # left dir
                elif controll == '3':
                    line_flag = False
                    go_left()
                    line_flag = True

                # go back dir
                elif controll == '4':
                    line_flag = False
                    line_flag = False
                    go_back()

                # stop
                elif controll == '':
                    line_flag = False
                    stop()
                    kill_threads = True
                    time.sleep(0.5)
                    kill_threads = True
                    index += 2
                    time.sleep(0.5)
                    data = {
#                        'code': '0',
                        'index': index,
                        'pi_id': car_id,
                        'finish': '99'
                    }
                    URL = 'http://192.168.0.7:8000/main/pi_test6'
                    request = requests.post(URL, params=data, allow_redirects=False)
                    
                    sys.exit()


                emergency_stop_flag = 1

            # emergency stop
            else:
                bw.speed = 0
                fw.turn(right_to_straight_dir)
                time.sleep(1)
                if check_emergency == 10:
                    
                    # stop and send message to main server
                    main_server_url = 'http://192.168.0.6/main/'
                    response = requests.post(main_server_url, params = "emergency stop")
                    kill_threads = True
                    time.sleep(2)
                    sys.exit()

                check_emergency += 1
                                
        index += 2
        data = {
            'code': controll,
            'index': index,
            'pi_id': car_id
        }
        print(data)
        URL = 'http://192.168.0.7:8000/main/pi_test5'
        print(URL)
        response = requests.post(URL, params = data, allow_redirects=False)

        emergency_stop_flag = 0
    return

# straight dir
def go_straight():
    global time_flag, line_flag, OpenCV_flag, OpenCV_count
    line_flag = True
    print('go straight')
    # first time go
    
    if time_flag == 0:
        time_flag = 1
        fw.turn(right_to_straight_dir)
        time.sleep(0.2)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(1.5)

    # keep going
    elif time_flag == 1:
        if OpenCV_flag == '0':
            bw.speed = forward_speed
            time.sleep(1.25)
        elif OpenCV_flag == '1' and OpenCV_count < 3:
            bw.speed = 35
            print('slow')
            OpenCV_count = OpenCV_count + 1
            if OpenCV_count == 3:
                OpenCV_flag = '0'
                OpenCV_count = 0
            time.sleep(3.2)

    # right to straight
    elif time_flag == 2:
        time_flag = 1
        fw.turn(right_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(1.2)

    # left to straight
    elif time_flag == 3:
        time_flag = 1
        fw.turn(left_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(1)

# right dir
def go_right():
    global time_flag, line_flag
    print('right')
    if time_flag == 0:
        fw.turn(right_to_straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.6)

    elif time_flag == 1:
        fw.turn(right_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(0.2)

    time_flag = 2
    fw.turn(right_dir)
    bw.speed = turn_speed
    time.sleep(3.25)
    line_flag = True

# left dir
def go_left():
    global time_flag, line_flag

    if time_flag == 0:
        fw.turn(left_to_straight_dir)
        bw.forward()
        bw.speed = forward_speed
        time.sleep(0.3)

    elif time_flag == 1:
        fw.turn(left_to_straight_dir)
        bw.speed = forward_speed
        time.sleep(0.2)

    time_flag = 3
    fw.turn(left_dir)
    bw.speed = turn_speed
    time.sleep(3.8)
    line_flag = True

# go back dir
def go_back():
    global time_flag

    fw.turn(right_dir)
    time.sleep(0.3)
    fw.turn(right_to_straight_dir)
    bw.backward()
    bw.speed = backward_speed
    time.sleep(1.3)
    time_flag = 0

# stop
def stop():
    global time_flag
    fw.turn(right_to_straight_dir)
    bw.forward()
    bw.speed = 0
    time_flag = 0

def line_follower():
    global turning_angle, lf, line_flag, kill_threads
    off_track_count = 0

    a_step = 5
    b_step = 10
    c_step = 18
    d_step = 28
    bw.forward()
    while True:
        if line_flag:
            lt_status_now = lf.read_digital()
            #print(lt_status_now)
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
        if kill_threads:
            fw.turn(right_to_straight_dir)
            print('line_over')
            sys.exit()

# check obstacle's distance
def check_distance():
    global kill_threads, move_controll_flag, line_flag, emergency_stop_distance
    
    while True:
        time.sleep(0.05)
        if kill_threads:
            print('Ulstarsonic over')
            sys.exit()
        
        distance = ua.get_distance()
        print(distance)
        if line_flag:
            if distance < emergency_stop_distance and move_controll_flag == 0:
                emergency_stop()
                sys.exit()
# too close and stop
def emergency_stop():
    global move_controll_flag, line_flag
    if line_flag:
        print('emergency_stop on')
        move_controll_flag = 1
        time.sleep(5)
        avoid_move()
    return

# handling car
def handling_car(path):
    global lf, line_flag, move_controll_flag, time_flag, emergency_stop_flag, kill_threads
    temp = path
    main_path = temp.split(' ')
    print(main_path)
    line_flag = True
    
    # threading
    line_thread = threading.Thread(target=line_follower, name="line_follower")
    line_thread.setDaemon(True)
    line_thread.start()
    
    distance_thread = threading.Thread(target=check_distance, name="check_distance")
    distance_thread.setDaemon(True)
#    distance_thread.start()
    
    time.sleep(1)

    kill_threads = False
    line_flag = True

    for controll in main_path:
        emergency_stop_flag = 0
        while emergency_stop_flag == 0:
            if move_controll_flag == 0:
                if controll == '1':
                    line_flag = True
                    go_straight()

                elif controll == '2':
                    line_flag = False
                    go_right()
                    line_flag = True

                elif controll == '3':
                    line_flag = False
                    go_left()
                    line_flag = True

                elif controll == '4':
                    line_flag = False
                    go_back()
                    line_flag = False

                else:
                    stop()
                    sys.exit()
                    
                emergency_stop_flag = 1
                
                
# change drive mode by OpenCV result
def change_OpenCV_flag(data):
    global OpenCV_flag
    print('OpenCV_flag')
    OpenCV_flag = data
    print(OpenCV_flag)
    return

def avoid_move():
    global move_controll_flag, line_flag
    move_controll_flag = 0
    fw.turn(right_dir)
    time.sleep(0.5)
    fw.turn(right_to_straight_dir)
    time.sleep(0.8)
    fw.turn(left_dir)
    time.sleep(0.5)
    fw.turn(left_to_straight_dir)
    time.sleep(0.8)
    fw.turn(left_dir)
    time.sleep(0.5)
    fw.turn(left_to_straight_dir)
    time.sleep(0.8)
    fw.turn(right_dir)
    time.sleep(0.5)
    fw.turn(right_to_straight_dir)
    time.sleep(0.8)
    