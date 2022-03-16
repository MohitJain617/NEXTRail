import csv
file = open("train.csv")
csvreader = csv.reader(file)
header = next(csvreader)
train = []
for row in csvreader:
    train.append(row)

import requests
not_found = 'Train not found'
remover = []
sched = []
file = open("train.csv")
csvreader = csv.reader(file)
header = next(csvreader)

for row in train:
    no = row[0]
    url = "https://erail.in/rail/getTrains.aspx?TrainNo="+no+"&DataSource=0&Language=0&Cache=true"
    response = requests.get(url)
    response = response.text.split('~')
    if response[-1] == not_found:
        continue
    class_layout = response[68]
    if 'PC' in class_layout:
        pantry_avl = 1
    else:
        pantry_avl = 0
    row.append(pantry_avl)

header.append('pantry_avl')


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


writeCSV('train',header,train)



#for row in time_table:
    #print(row)
