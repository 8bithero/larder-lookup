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
      Actions::BuildRecipe.new(data: recipe_data).call
    end

    def build_ingredient(ingredient)
      Actions::BuildIngredient.new(text: ingredient).call
    end

  end
end
