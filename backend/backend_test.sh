rm -f tmp.db db.sqlite3
python3 manage.py migrate

pip3 install requests
python3 manage.py shell < inittest.py
python3 manage.py shell < runtest.py


