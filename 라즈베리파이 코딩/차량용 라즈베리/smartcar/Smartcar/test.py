from SunFounder_Line_Follower import Line_Follower
from picar import front_wheels
from picar import back_wheels
import time
import picar

picar.setup()

REFERENCES = [200, 200, 200, 200, 200]
forward_speed = 70
backward_speed = 70
turning_angle = 45

max_off_track_count = 40

delay = 0.0005

fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
lf = Line_Follower.Line_Follower()

lf.references = REFERENCES
fw.ready()
bw.ready()
fw.turning_max = 45

kim = lf.read_analog()

flag = True

for i in range(0,5):
    lf.references[i] = kim[i] - 3
print(lf.references)

def main():
    print('main on')
    global turning_angle
    off_track_count = 0
    bw.speed = forward_speed

    a_step = 3
    b_step = 10
    c_step = 30
    d_step = 45
    bw.forward()
    while True:
        if flag:
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
                if off_track_count > max_off_track_count:
                    bw.speed = forward_speed
                    bw.backward()
                    
                    lf.wait_tile_center()
                    bw.stop()

                    time.sleep(0.2)
                    bw.speed = forward_speed
                    bw.forward()
                    time.sleep(0.2)

                    

            else:
                off_track_count = 0
        
            fw.turn(turning_angle)
            time.sleep(delay)
        
def destroy():
    bw.stop()
    fw.turn(90)
    
@property
def set_flag(new_flag):
    flag = new_flag
    
try:
    time.sleep(4)
    main()
except KeyboardInterrupt:
    destroy()