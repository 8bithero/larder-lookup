# frozen_string_literal: true

FactoryBot.define do
  factory :ingredient do
    name { "chili flakes" }
    amount { "3" }
    unit { "tsp" }
    note { "or to taste" }
    original_text { "1 tsp of chili flakes, or to taste" }
    association :recipe
    association :food_item
  end
end
