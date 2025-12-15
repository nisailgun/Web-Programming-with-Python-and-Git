from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# MODEL YÜKLE (uygulama başlarken bir kez yüklenir)
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="savasy/bert-base-turkish-sentiment-cased"
)

@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({
            "error": "Lütfen 'text' alanı gönderin"
        }), 400

    text = data["text"]

    result = sentiment_analyzer(text)

    response = {
        "text": text,
        "sentiment": result[0]["label"],
        "confidence": round(result[0]["score"], 3)
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
