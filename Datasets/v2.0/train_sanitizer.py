#WARNING: THIS CHANGES THE train.csv file, so make sure you know what you're doing
#scraped https://www.cleartrip.com/trains/amp/

import csv
import requests
import datetime

file = open("run_results.csv")
csvreader = csv.reader(file)
header = next(csvreader)
train_no = []
i = 0
for row in csvreader:
    i+=1
    if (row[0] not in train_no):
        train_no.append(row[0])
file.close()

def getSched(train_id,data1,sched_data):
    sched_url = "https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1="+data1+"&Data2=0&Cache=true"
    response = requests.get(sched_url)
    response = response.text.split("^")
    sched = []
    for rows in response:
        rows = rows.split("~")
        sched.append(rows)
    sched = sched[1:]
    stn_codes = []
    arrival = []
    departure = []
    dist = []
    day = []
    booking_window = 7
    start_date = datetime.datetime.today()
    for stn in sched:
        if(stn[3] == 'First'):
            stn[3] = stn[4]
        if(stn[4] == 'Last'):
            stn[4] = stn[3]
        stn_codes.append(stn[1])
        arrival.append(stn[3])
        departure.append(stn[4])
        dist.append(stn[6])
        day.append(int(stn[7]))

    for trip_no in range(1,booking_window+1):
        for i in range(len(stn_codes)):
            arrival_datetime = start_date+datetime.timedelta(days=trip_no-1+day[i]-1)
            temp = arrival[i].split('.')
            arrival_datetime = arrival_datetime.replace(hour=int(temp[0]),minute=int(temp[1]),second=0)
            temp = arrival_datetime.strftime("%Y-%m-%d %H:%M:%S")

            departure_datetime = start_date+datetime.timedelta(days=trip_no-1+day[i]-1)
            temp2 = departure[i].split('.')
            departure_datetime = departure_datetime.replace(hour=int(temp2[0]),minute=int(temp2[1]),second=0)
            temp2 = departure_datetime.strftime("%Y-%m-%d %H:%M:%S")

            row = [train_id,stn_codes[i],trip_no,temp,temp2,dist[i]]
            sched_data.append(row)

def writeCSV(filename,fields,rows):
    bak= filename +'.bak'
    filename = filename+'.csv'
#writing into csv
#Backing up csv file"
    import shutil
    shutil.copy(filename,bak)

    with open(filename,'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(fields)
        csvwriter.writerows(rows)

not_found = 'Train not found'

train_fields = ['id','train_name','src','dest','train_type']
sched_fields = ['train_id','st_code','trip_no','arrival','departure','dist']
struct_fields = ['train_id','class_type','size']

struct_type = ['A','B','C','D','E','H','S','BE']
train_dataset = []
sched_dataset = []
struct_dataset = []

train_count = 1
for no in train_no:
    url = "https://erail.in/rail/getTrains.aspx?TrainNo="+no+"&DataSource=0&Language=0&Cache=true"
    response = requests.get(url)
    response = response.text.split('~')
    if response[-1] == not_found:
        continue
    print(train_count)
    train_count+= 1
    train_id = no
    train_name = response[-7]
    src = response[12]
    dest = response[14]
    train_type = response[59]
    data1 = response[42]
    class_layout = response[68]
    for class_type in struct_type:
        coach = class_layout.count(class_type+',')
        if(coach != 0 and class_type == 'E' and class_layout.count('BE,') != 0):
            continue
        if (coach != 0):
            struct_dataset.append([train_id,class_type,coach])
    row = [train_id,train_name,src,dest,train_type]
    train_dataset.append(row)
    getSched(train_id,data1,sched_dataset)

writeCSV('train',train_fields,train_dataset)
writeCSV('sched',sched_fields,sched_dataset)
writeCSV('struct',struct_fields,struct_dataset)


##Adding train type
#for row in rows:
    #trainType = ''
    #trainName = row[1]
    #if row[0] in ['12951','12952','12953','12954','12309','12310']:
        #trainType = 'TEJRAJ'
    #elif 'rajdhani' in trainName.lower():
        #trainType = 'RAJ'
    #elif 'jan shat' in trainName.lower():
        #trainType = 'JSTBDI'
    #elif 'shatabdi' in trainName.lower():
        #trainType = 'STBDI'
    #elif 'gatimaan' in trainName.lower():
        #trainType = 'GATI'
    #elif 'double' in trainName.lower():
        #trainType = 'DD'
    #elif 'garib' in trainName.lower():
        #trainType = 'GR'
    #elif 'spl' in trainName.lower() or 'special' in trainName.lower():
        #trainType = 'SPL'
    #elif 'duronto' in trainName.lower():
        #trainType = 'DUR'
    #elif 'superfast' in trainName.lower():
        #trainType = 'SF'
    #elif 'intercity' in trainName.lower():
        #trainType = 'ICE'
    #elif 'mail' in trainName.lower():
        #trainType = 'MAIL'
    #else:
        #trainType = 'EXP'
    #row.append(trainType)

