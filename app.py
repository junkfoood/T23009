from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database configuration (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:C6VQ0JvmnorqaFwb@db.thkrrdlmxxjcyendplsl.supabase.co:5432/postgres'

db = SQLAlchemy(app)

# Database Model
class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    supplier = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.String(50), nullable=False)
    end_date = db.Column(db.String(50), nullable=False)
    base_cost = db.Column(db.Float, nullable=False)
    discounted_cost = db.Column(db.Float, nullable=False)

# Create the database before running the app
with app.app_context():
    db.create_all()

# Route to display summary.html
@app.route('/summary')
def summary():
    specialists = Specialist.query.all()
    return render_template('summary.html', specialists=specialists)

if __name__ == '__main__':
    app.run(debug=True)
