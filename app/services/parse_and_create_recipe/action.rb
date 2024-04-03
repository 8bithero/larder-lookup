# frozen_string_literal: true

module ParseAndCreateRecipe
  class Action

    def initialize(recipe_data:)
      @recipe_data = recipe_data
    end

    def call
      recipe = build_recipe

      recipe_data['ingredients'].each do |ingredient|
        recipe.ingredients << build_ingredient(ingredient)
      end

      recipe.save!
    end

    private

    attr_reader :recipe_data

    def build_recipe
      Actions::BuildRecipe.call(data: recipe_data)
    end

    def build_ingredient(ingredient)
      Actions::BuildIngredient.call(text: ingredient)
    end

  end
end
