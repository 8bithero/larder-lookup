# frozen_string_literal: true

FactoryBot.define do
  factory :recipe do
    title { "Chili Dish" }
    author { "Chilango" }
    rating { "4.5" }
    category { "MyCategory" }
    cuisine { "MyCuisine" }
    cook_time { 20 }
    prep_time { 10 }
    total_time { 30 }
    image_url { "https://loremflickr.com/520/340/food,dish/all" }
    ingredients_count { 1 }
  end
end
