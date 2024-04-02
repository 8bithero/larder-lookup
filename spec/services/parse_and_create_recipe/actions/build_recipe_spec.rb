# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ParseAndCreateRecipe::Actions::BuildRecipe do
  describe '#call' do
    let(:recipe_data) do
      {
        'title' => 'Chocolate Cake',
        'author' => 'Jane Doe',
        'ratings' => 5,
        'category' => 'Dessert',
        'cuisine' => 'American',
        'cook_time' => 30,
        'prep_time' => 15,
        'image' => 'http://example.com/cake.jpg',
      }
    end

    subject(:build_recipe) { described_class.new(data: recipe_data).call }

    it 'creates a Recipe with calculated total time' do
      expect(build_recipe).to be_a(Recipe)
      expect(build_recipe.title).to eq('Chocolate Cake')
      expect(build_recipe.total_time).to eq(45) # cook_time + prep_time
    end
  end
end
