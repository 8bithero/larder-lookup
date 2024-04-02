# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Search::Recipes::Action do
  describe '#call' do
    let(:scope) { Queries::Recipe.all }
    let(:action) { described_class.new(food_item_ids: [1], presets: [:quick_meals]) }

    before do
      allow(Queries::Recipe).to receive(:includes).and_return(scope)
      allow(scope).to receive(:containing_all_food_item_ids).and_return(scope)
      allow(scope).to receive(:quick_meals).and_return(scope)
    end

    it 'applies presets and food item filters to the scope' do
      expect(scope).to receive(:quick_meals)
      expect(scope).to receive(:containing_all_food_item_ids).with([1])
      action.call
    end
  end
end
