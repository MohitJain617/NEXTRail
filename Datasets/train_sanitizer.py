#WARNING: THIS CHANGES THE train.csv file, so make sure you know what you're doing
#needs All_Indian_Trains.csv file which can be downloaded from https://www.kaggle.com/ravibhalala217/indiantrains

import csv

fields = ['id','train_name','src','dest','train_type']


file = open("station.csv")
csvreader = csv.reader(file)
header = next(csvreader)
stn = dict()
for row in csvreader:
    stn[row[1].lower()] = row[0]

file.close()


file = open("All_Indian_Trains.csv")
csvreader = csv.reader(file)
header = next(csvreader)
rows = []
for row in csvreader:
    if(len(row[1]) == 5) and row[1:] not in rows:
        #Removing duplicate and invalid/cancelled trains
        ans = row[1:]
        #Converting station names to code
        try:
            ans[2] = stn[ans[2].lower()]
        except KeyError:
            ans[2] = '????'
        try:
            ans[3] = stn[ans[3].lower()]
        except KeyError:
            ans[3] = '????'
        rows.append(ans)

#Adding train type
for row in rows:
    trainType = ''
    trainName = row[1]
    if row[0] in ['12951','12952','12953','12954','12309','12310']:
        trainType = 'TEJRAJ'
    elif 'rajdhani' in trainName.lower():
        trainType = 'RAJ'
    elif 'jan shat' in trainName.lower():
        trainType = 'JSTBDI'
    elif 'shatabdi' in trainName.lower():
        trainType = 'STBDI'
    elif 'gatimaan' in trainName.lower():
        trainType = 'GATI'
    elif 'double' in trainName.lower():
        trainType = 'DD'
    elif 'garib' in trainName.lower():
        trainType = 'GR'
    elif 'spl' in trainName.lower() or 'special' in trainName.lower():
        trainType = 'SPL'
    elif 'duronto' in trainName.lower():
        trainType = 'DUR'
    elif 'superfast' in trainName.lower():
        trainType = 'SF'
    elif 'intercity' in trainName.lower():
        trainType = 'ICE'
    elif 'mail' in trainName.lower():
        trainType = 'MAIL'
    else:
        trainType = 'EXP'
    row.append(trainType)

#adding quotes for CSV (hack)
for row in rows:
    row[1] = ', '+row[1]
    row[2] = ', '+row[2]
    row[3] = ', '+row[3]
    row[4] = ', '+row[4]

#writing into csv
filename = 'train.csv'

#Backing up csv file"
import shutil
shutil.copy('train.csv','train.bak')

with open(filename,'w') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(fields)
    csvwriter.writerows(rows)

file.close()
