class Api::V1::FoodItemsController < ApplicationController
  def index
    food_items = Search::EntryPoint.call(
      resource: :food_items,
      params: {
        q: index_params[:q],
      }
    )

    render json: food_items.as_json
  end

  private
  def index_params
    params.permit(:q)
  end
end
