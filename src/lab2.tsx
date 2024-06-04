/**
 * 1. Use the useState hook to create an empty recipe array
 * 2. Iterate over the recipes state variable to render a list of RecipeCard components
 * 3. Use an onSubmit handler to update recipes state
 * 4. Leverage built-in form validation
 */

import { ReactNode, useState } from "react";

type Recipe = {
  name: string;
  ingredients: string;
};

export function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl">Recipes</h1>
      <RecipeBook setRecipes={setRecipes}>
        {recipes.map(({ name, ingredients }) => (
          <RecipeCard key={name} name={name} ingredients={ingredients} />
        ))}
      </RecipeBook>
    </div>
  );
}

type RecipeBookProps = {
  children?: ReactNode;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

function RecipeBook({ children, setRecipes }: RecipeBookProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRecipe: Recipe = {
      name: formData.get("name")?.toString() ?? "",
      ingredients: formData.get("ingredients")?.toString() ?? "",
    };
    setRecipes((recipes) => [...recipes, newRecipe]);
  }
  
  return (
    <div className="flex flex-col gap-8 w-64">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            className="block border border-gray-500 px-1 rounded w-full bg-gray-100"
            required
          />
        </label>
        <label>
          Ingredients
          <textarea
            name="ingredients"
            className="block border border-gray-500 px-1 rounded w-full bg-gray-100"
            required
          />
        </label>
        <button
          type="submit"
          className="border border-blue-700 px-1 mt-4 rounded w-full bg-blue-300"
        >
          Add
        </button>
      </form>
      <hr className="border-gray-500" />
      <ul className="flex flex-col gap-4">{children}</ul>
    </div>
  );
}

type RecipeCardProps = {
  name: string;
  ingredients: string;
};

function RecipeCard({ name, ingredients }: RecipeCardProps) {
  return (
    <li className="border border-double border-gray-500 rounded divide-y divide-gray-500">
      <h1 className="text-2xl text-center p-2">{name}</h1>
      <div className="p-2">{ingredients}</div>
    </li>
  );
}
