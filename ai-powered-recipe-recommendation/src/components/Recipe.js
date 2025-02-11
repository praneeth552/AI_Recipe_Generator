import React, { useState } from "react";

const RecipeGenerator = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    if (!ingredient.trim()) {
      alert("Please enter an ingredient!");
      return;
    }

    setLoading(true);
    setRecipe("");

    try {
      const response = await fetch(`https://e5lv3o4tx8.execute-api.us-east-1.amazonaws.com/ai_recipes/${ingredient}`);
      const data = await response.json();

      if (response.ok) {
        setRecipe(data.ai_recipe);
      } else {
        setRecipe("Error fetching recipe. Please try again.");
      }
    } catch (error) {
      setRecipe("Failed to connect to the backend.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">AI Recipe Generator</h2>
        <input
          type="text"
          placeholder="Enter an ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchRecipe}
          disabled={loading}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Get Recipe"}
        </button>
        {recipe && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700">Recipe:</h3>
            <p className="text-gray-600 whitespace-pre-wrap mt-2">{recipe}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
