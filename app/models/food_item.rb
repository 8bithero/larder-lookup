# frozen_string_literal: true

class FoodItem < ApplicationRecord
  has_many :ingredients
  has_many :recipes, through: :ingredients

  validates :name, uniqueness: true
end