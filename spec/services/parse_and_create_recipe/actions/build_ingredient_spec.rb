# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ParseAndCreateRecipe::Actions::BuildIngredient do
  describe '#call' do
    let(:ingredient_text) { "½ cup sugar" }
    let!(:food_item) { create(:food_item, name: 'sugar') }

    subject(:build_ingredient) { described_class.new(text: ingredient_text).call }

    before do
      eye_of_newt_double = double(names: ['sugar'], amount: '0.5', unit: 'cup', note: nil, style: nil)
      allow(EyeOfNewt).to receive(:parse).and_return(eye_of_newt_double)
    end

    it 'creates an Ingredient with parsed data' do
      ingredient = build_ingredient
      expect(ingredient).to be_a(Ingredient)
      expect(ingredient.name).to eq('sugar')
      expect(ingredient.amount).to eq(0.5)
      expect(ingredient.unit).to eq('cup')
      expect(ingredient.note).to be_nil
      expect(ingredient.original_text).to eq(ingredient_text)
      expect(ingredient.food_item).to eq(food_item)
    end
  end
end
