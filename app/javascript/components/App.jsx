import React, { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = () => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipes(res))
      .catch((err) => message.error('Error: ' + err));
  };

  useEffect(() => {
      loadRecipes();
  }, []);

  const allRecipes = recipes.map((recipe, index) => (
    <div key={index} className="">
      <p className="card-title">{recipe.title}</p>
    </div>
  ));

  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet.
      </h4>
    </div>
  );

  return (
    <>
      <div>
        <p>You clicked {count} times!</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <hr />
      <div>
      {recipes.length > 0 ? allRecipes : noRecipe}
      </div>
    </>
  );
}

export default App;
