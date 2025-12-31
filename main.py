from flask import Flask, request, jsonify, render_template
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow all origins

@app.route("/")
def home():
    return render_template("index.html")

# LOAD ENGLISH SENTIMENT MODEL
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({
            "error": "Please provide a 'text' field"
        }), 400

    text = data["text"]

    # FORCE SINGLE STRING INPUT
    result = sentiment_analyzer([text])[0]

    response = {
        "text": text,
        "sentiment": result["label"],
        "confidence": round(float(result["score"]), 3)
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
