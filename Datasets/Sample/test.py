import csv

file = open("time_table.csv")
csvreader = csv.reader(file)
header = next(csvreader)
train_no = []
for row in csvreader:
    if(row[2] == "First"):
        row[2] = row[3]
    if(row[3] == "Last"):
        row[3] = row[2]
    train_no.append(row)

file.close()


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

time_table_field = ['train_no','st_code','arrival','departure','dist','day_no']

writeCSV("time_table",time_table_field,train_no)
