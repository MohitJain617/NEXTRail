from django.shortcuts import render
from MySQLdb import _mysql
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

c_host = os.getenv('HOST')
c_user = os.getenv('USER')
c_pass = os.getenv('PASSWORD')
c_db = os.getenv('DATABASE')
c_port = os.getenv('DB_PORT')

db = _mysql.connect(host=c_host,user=c_user,port=int(c_port),password=c_pass,database=c_db)

# Create your views here.
def index(request):
	db.query("""SELECT * FROM reservation_system.time_table;""")
	x = db.store_result().fetch_row(how=1,maxrows=0)
	return render(request, 'showdata/index.html',dict({'query':x,}))

