# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Search::FoodItems::Action do
  describe '#call' do
    context 'when q is present' do
      let(:action) { described_class.new(q: 'apple') }

      it 'returns food items similar to the query' do
        expect(Queries::FoodItem).to receive(:by_name_similar).with('apple')
        action.call
      end
    end

    context 'when q is not present' do
      let(:action) { described_class.new(q: '') }

      it 'returns food items starting from a' do
        expect(Queries::FoodItem).to receive(:starting_from_a).and_return(Queries::FoodItem.none)
        action.call
      end
    end
  end
end
