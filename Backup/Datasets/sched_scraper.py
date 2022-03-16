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


fields = ["train_id","st_code","trip_no","arrival","departure","dist"]

def printSched(train_no):
    url = "https://erail.in/rail/getTrains.aspx?TrainNo="+train_no+"&DataSource=0&Language=0&Cache=false"
    response = requests.get(url)
    response = response.text.split("~")
    try:
        data1 = response[response.index("DATASOURCE_IR")-3]
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
        num = 0
        for stn in sched:
            num += 1
            stn_codes.append(stn[1])
            arrival.append(stn[3])
            departure.append(stn[4])
            dist.append(stn[-2])

    except ValueError:
        print("No records for train:",train_no)

    #for f in fields:
        #print(f,end=' ')
    #print()
    #for i in range(num):
        #print(train_no,stn_codes[i],"1",arrival[i],departure[i],dist[i])




import requests
for no in train_no:
    printSched(no)



