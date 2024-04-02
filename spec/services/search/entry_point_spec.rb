# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Search::EntryPoint do
  describe '#initialize' do
    context 'with resource recipes' do
      it 'initializes Search::Recipes::Action' do
        expect(Search::Recipes::Action).to receive(:new).with(hash_including(food_item_ids: [1], presets: [:quick_meals]))
        described_class.new(resource: :recipes, params: { food_item_ids: [1], presets: [:quick_meals] })
      end
    end

    context 'with resource food_items' do
      it 'initializes Search::FoodItems::Action' do
        expect(Search::FoodItems::Action).to receive(:new).with(hash_including(q: 'apple'))
        described_class.new(resource: :food_items, params: { q: 'apple' })
      end
    end
  end
end
