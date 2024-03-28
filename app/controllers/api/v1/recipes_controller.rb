class Api::V1::RecipesController < ApplicationController
  def index
    recipes = Recipe.includes(:ingredients).all.order(created_at: :desc)
    render json: recipes.as_json(include: :ingredients)
  end
end
