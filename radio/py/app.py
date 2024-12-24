from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/request", methods=["POST"])
def handle_request():
    song = request.form["song"]
    artist = request.form["artist"]
    print(f"Song Request: {song} by {artist}")  # Log the request
    return "Request received! Thank you."

if __name__ == "__main__":
    app.run(debug=True)
