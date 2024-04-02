# frozen_string_literal: true

require 'rails_helper'

describe Queries::FoodItem, type: :query do
  describe "Scopes" do
    let!(:food_item_apple) { create(:food_item, name: 'Apple') }
    let!(:food_item_apricot) { create(:food_item, name: 'Apricot') }
    let!(:food_item_banana) { create(:food_item, name: 'Banana') }

    describe ".by_name_similar" do
      it "returns food items similar to the given name" do
        expect(described_class.by_name_similar("Appl")).to contain_exactly(food_item_apple)
      end
    end

    describe ".starting_from_a" do
      let!(:food_item_banana_x) { create(:food_item, name: '1 Apple') }

      it "returns food items starting with the letter 'a' (case-insensitive)" do
        expect(described_class.starting_from_a).to contain_exactly(food_item_apple, food_item_apricot, food_item_banana)
      end
    end

  end
end
