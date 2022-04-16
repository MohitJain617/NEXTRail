import csv
from typing import Dict
from fuzzywuzzy import process

file = open("station.csv")
csvreader = csv.reader(file)
header = next(csvreader)
st_code = []
st_name = []
for row in csvreader:
    st_code.append(row[0])
    st_name.append(row[1])

file.close()
q = input("Enter the station name: ")
print(process.extract(q,st_name))
