class Api::V1::FoodItemsController < ApplicationController
  def index
    food_items = FoodItem.all.order(name: :asc)
    render json: food_items
  end
end
