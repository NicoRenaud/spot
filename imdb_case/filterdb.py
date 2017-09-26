import sqlite3
import pandas
import pandas.io.sql as psql 
from os.path import join, dirname

con = sqlite3.connect('movies.db')
query = open(join(dirname(__file__), 'query_movies.sql')).read()
df = psql.read_sql(query, con)
df.to_csv('movies.csv')

