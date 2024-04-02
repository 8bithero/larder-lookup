# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ParseAndCreateRecipe::Action do
  describe '#call' do
    let(:recipe_data) { { 'title' => 'Chocolate Cake', 'ingredients' => ['1 cup flour', '2 eggs'] } }
    let(:mock_recipe) { instance_double(Recipe, ingredients: [], save!: true) } # Allow `save!`

    before do
      allow(ParseAndCreateRecipe::Actions::BuildRecipe).to receive(:new).and_return(double(call: mock_recipe))
      allow(ParseAndCreateRecipe::Actions::BuildIngredient).to receive(:new).and_return(double(call: Ingredient.new))
    end

    subject(:perform_action) { described_class.new(recipe_data: recipe_data).call }

    it 'builds a recipe and associates ingredients' do
      perform_action
      expect(mock_recipe.ingredients.size).to eq(2)
      expect(mock_recipe).to have_received(:save!)
    end
  end
end
