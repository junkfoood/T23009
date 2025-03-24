import psycopg2

try:
    conn = psycopg2.connect("postgresql://postgres:C6VQ0JvmnorqaFwb@db.thkrrdlmxxjcyendplsl.supabase.co:5432/postgres")
    print("Connected successfully!")
    conn.close()
except Exception as e:
    print("Connection failed:", e)
