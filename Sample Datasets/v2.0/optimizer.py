import csv
'''
file = open("sched.csv")
csvreader = csv.reader(file)
header = next(csvreader)
time_table = []
remover = []
for row in csvreader:
    if row[0:2] not in remover:
        if(row[4][0:10] == '2022-03-02'):
            row[2] = str(2)
        row[3] = row[3][11:]
        row[4] = row[4][11:]
        row = row[0:2]+row[3:]+list(row[2])
        time_table.append(row)
        remover.append(row[0:2])

#for row in time_table:
    #print(row)

header = ['train_id','st_code','arrival','departure','dist','day_no']
'''
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

#writeCSV('time_table',header,time_table)

'''
#print(time_table[0][4][0:10])
file.close()
'''
import requests
not_found = 'Train not found'
remover = []
sched = []
file = open("time_table.csv")
csvreader = csv.reader(file)
header = next(csvreader)
for row in csvreader:
    no = row[0]
    if no in remover:
        continue
    remover.append(no)
    url = "https://erail.in/rail/getTrains.aspx?TrainNo="+no+"&DataSource=0&Language=0&Cache=true"
    response = requests.get(url)
    response = response.text.split('~')
    if response[-1] == not_found:
        continue
    for i in range(7):
        if(response[22][i] == '1'):
            sched.append([no,i+1])
    #print(response[22])
sched_header = ['train_id','trip_no']

writeCSV('sched',sched_header,sched)
#for row in sched:
        #print(row)

file.close()
