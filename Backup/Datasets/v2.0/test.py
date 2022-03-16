import csv,random


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

file = open("run_results.csv")
csvreader = csv.reader(file)
header = next(csvreader)
data = []
train_no = []
for row in csvreader:
    if (row[0] not in train_no):
        train_no.append(row[0])
        data.append(row)
file.close()

sample = random.sample(data,500)
writeCSV("run_results",header,sample)

