# frozen_string_literal: true

module ParseAndCreateRecipe
  class EntryPoint

    include ::EntryPoint

    def initialize(recipe_data:)
      self.action = Action.new(recipe_data: recipe_data)
    end
  end

end
