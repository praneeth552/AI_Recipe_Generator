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
      const response = await fetch(`http://127.0.0.1:8000/ai_recipes/${ingredient}`);
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>AI Recipe Generator</h2>
      <input
        type="text"
        placeholder="Enter an ingredient"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={fetchRecipe} disabled={loading}>
        {loading ? "Generating..." : "Get Recipe"}
      </button>
      
      {recipe && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;