from google import genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from mangum import Mangum

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your OpenAI API Key
client = genai.Client(api_key="AIzaSyCJcET2sZtvasRDxcFck00SckgCfc85byc")

@app.get("/ai_recipes/{ingredient}")
def get_ai_recipe(ingredient: str):
    prompt = f"Suggest a unique recipe using {ingredient}. Include ingredients and step-by-step instructions."

    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=prompt
    )
    print(response)
    # ai_recipe = response["choices"][0]["message"]["content"]
    if response and hasattr(response, "text"):
        ai_recipe = response.text
    else:
        ai_recipe = "Sorry, I couldn't generate a recipe at this moment."

    return {"ai_recipe": ai_recipe}

handler = Mangum(app)