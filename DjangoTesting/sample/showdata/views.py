from django.shortcuts import render
from MySQLdb import _mysql

db = _mysql.connect(host='localhost',user='root',port=3306,password='0>&a8KvQ',database='reservation_system')
db.query("""SELECT * FROM reservation_system.time_table;""")
x = db.store_result().fetch_row(how=1,maxrows=0)
print(x)

# Create your views here.
def index(request):
	return render(request, 'showdata/index.html',dict({'query':x,}))
