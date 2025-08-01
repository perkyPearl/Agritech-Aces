import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("api_key"))

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 400,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

def generateInsights(data):
    chat_session = model.start_chat(history=[])
    
    prompt = f"Please provide insights on the health and growth potential of my plants based on the following daily sensor readings: temperature, humidity, and soil moisture. Analyze how these factors interact and suggest any necessary actions to optimize plant care. Here is the Data: {data} Give me it in paragraphic way & in simple language and without any symbols or headers"

    response = chat_session.send_message(prompt)

    print(response.text)

    return response.text