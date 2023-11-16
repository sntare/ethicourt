from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = OpenAI()
# Initialize your OpenAI API here

@app.route('/get-response', methods=['POST'])
def get_response():
    prompt = request.json.get("prompt")

    # Call ChatGPT with the prompt
    response = client.chat.completions.create(
        model="gpt-3.5-turbo", # Adjust the model as needed
        messages=[{"role": "user", "content": prompt}]
    )

    # Return the response to the frontend
    print(response.choices[0].message.content)
    return jsonify({"response": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True)

