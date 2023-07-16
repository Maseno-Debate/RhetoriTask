from flask import Flask, render_template, jsonify
from ggsheets import get_data

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    values = get_data()
    print(values)
    return render_template("sheetsIndex.html", data=values)

@app.route('/data')
def update_data():
    values = get_data()
    return jsonify(values)

    

if __name__ == "__main__":
    app.run(debut=True)