from flask import Flask, request, jsonify
from flask_cors import CORS
from mbti_test import calculate_mbti

app = Flask(__name__)
CORS(app) 

@app.route("/mbti-test", methods=["POST"])
def mbti_test():
    try:
        data = request.json
        answers = data.get("answers", [])

        if not answers or len(answers) != 40:
            return jsonify({"error": "Invalid input, must have 40 answers"}), 400

        result = calculate_mbti(answers)
        return jsonify({"mbti_result": result})  

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
