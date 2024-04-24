
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Load the LSTM model
lstm_model = load_model('lstm_model.h5')
# Load your tokenizer here (update the path or loading mechanism as necessary)
# For example, if using a Tokenizer saved with Keras' `save` method:
import pickle
with open('lstm_tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define maximum sequence length (ensure this matches the training setup)
max_seq_length = 128  # adjust this based on how the model was trained

def prepare_input_for_lstm(text):
    """Preprocess text input for LSTM prediction."""
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequences, maxlen=max_seq_length)
    return padded_sequence
 
 

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET','POST'])
def predict():
    """Endpoint to receive text and return the LSTM model prediction."""
    if request.method =='POST':
        text = request.form.get('text')
        if text:
            lstm_input = prepare_input_for_lstm(text)
            prediction = lstm_model.predict(lstm_input)
            if prediction[0][0] > 0.3:
                result = 'Hate Speech'
                confidence: float(prediction[0][0])
            else:
                result = 'Non-Hate Speech', 
                confidence: float(1 - prediction[0][0])
            return jsonify(({'prediction': result, 'confidence': confidence}))
        else:
            return jsonify({'error': 'No text provided'}), 400
    return render_template('index.html')

    #return jsonify({'error': 'Input text not provided.'})
        #return render_template (results.html)   # Format prediction response
    

if __name__ == '__main__':
    app.run(debug=True)
