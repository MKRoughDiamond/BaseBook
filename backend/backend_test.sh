rm -rf ../backend/tmp.db ../backend/db.sqlite3
python3 ../backend/manage.py migrate

pip3 install requests
python3 ../backend/manage.py shell < inittest.py
python3 ../backend/manage.py shell < runtest.py


