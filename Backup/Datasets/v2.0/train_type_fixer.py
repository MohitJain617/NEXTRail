import csv

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

file = open("train.csv")
csvreader = csv.reader(file)
header = next(csvreader)
data = []
for row in csvreader:
    data.append(row)
file.close()

types = {
    "Duranto":"DUR",
    "Super Fast":"SF",
    "Passenger":"PASS",
    "Mail & Express":"EXP",
    "Jan Shatabdi":"JSTBDI",
    "Garib Rath":"GR",
    "Special":"SPL",
    "Intercity Express":"ICE",
    "Shatabdi":"STBDI",
    "Sampark Kranti":"EXP",
    "Express Cum ordinary":"MAIL",
    "Rajdhani":"RAJ",
    "Link":"MAIL",
    "Hill Train":"HILL",
    "Humsafar":"EXP"
    }

for row in data:
    row[-1] = types[row[-1]]

writeCSV("train",header,data)


