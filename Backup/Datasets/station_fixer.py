import csv
file = open("station.csv")
csvreader = csv.reader(file)
header = next(csvreader)
header = ['st_code','st_name']
stn = []
for row in csvreader:
    if row not in stn:
        stn.append(row)
file.close()

for i in range(len(stn)):
    stn[i] = [stn[i][1],stn[i][0]]

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

writeCSV("station",header,stn)
