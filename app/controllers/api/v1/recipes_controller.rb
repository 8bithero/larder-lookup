class Api::V1::RecipesController < ApplicationController
  def index
    recipes = Search::EntryPoint.call(
      resource: :recipes,
      params: {
        food_item_ids: index_params[:food_item_ids],
        presets: index_params[:presets]
      }
    )

    render json: recipes.as_json(include: :ingredients)
  end

  private

  def index_params
    params.permit(food_item_ids: [], presets: [])
  end
end
