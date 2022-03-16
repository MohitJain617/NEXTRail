#A web scraper integration to scrape https://erail.in/train-enquiry/train_no to populate the sched.csv dataset for trains in train.csv
'''
to do
convert the data into csv format
some trains have been cancelled or does not exist anymore, remove them from train.csv database
'''

import csv

file = open("train.csv")
csvreader = csv.reader(file)
header = next(csvreader)
train_no = []
for row in csvreader:
    train_no.append(row[0])

file.close()


time_table_field = ["train_no","st_code","arrival","departure","dist","day_no"]
def printSched(train_no):
    url = "https://erail.in/rail/getTrains.aspx?TrainNo="+train_no+"&DataSource=0&Language=0&Cache=false"
    response = requests.get(url)
    response = response.text.split("~")
    data1 = "BAD"
    try:
        data1 = response[response.index("DATASOURCE_IR")-3]
    except ValueError:
        try:
            data1 = response[response.index("DATASOURCE_TE")-3]
        except:
            print("No records for train:",train_no,data1)

    if data1 == "BAD":
        print("No records for train:",train_no,data1)
        return

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
    day_no = []
    num = 0
    for stn in sched:
        num += 1
        stn_codes.append(stn[1])
        arrival.append(stn[3].replace('.',':'))
        departure.append(stn[4].replace('.',':'))
        dist.append(stn[6])
        day_no.append(stn[7])

    for i in range(num):
        time_table.append([train_no,stn_codes[i],arrival[i],departure[i],dist[i],day_no[i]])



time_table = []

import requests
k = 0

for no in train_no:
    printSched(no)
    k += 1
    print(k)


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

writeCSV('time_table',time_table_field,time_table)
