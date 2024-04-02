# frozen_string_literal: true

require 'rails_helper'

describe Queries::Recipe, type: :query do
  describe "Scopes" do
    let(:food_item_1) { create(:food_item, name: 'food_item_1') }
    let(:food_item_2) { create(:food_item, name: 'food_item_2') }

    let!(:recipe_a) { create(:recipe, total_time: 30) }
    let!(:recipe_b) { create(:recipe, total_time: 45) }

    before do
      create(:ingredient, recipe: recipe_a, food_item: food_item_1)
      create(:ingredient, recipe: recipe_a, food_item: food_item_2)

      create(:ingredient, recipe: recipe_b, food_item: food_item_1)
    end

    describe ".by_food_items" do
      let(:food_item_ids) { [food_item_1.id]}

      it "returns recipes that include specific food items" do
        expect(described_class.by_food_items(food_item_ids)).to contain_exactly(recipe_a, recipe_b)
      end
    end

    describe ".containing_all_food_item_ids" do
      let(:food_item_ids) { [food_item_1.id, food_item_2.id]}

      it "returns recipes that include specific food items" do
        expect(described_class.containing_all_food_item_ids(food_item_ids)).to contain_exactly(recipe_a)
      end
    end

    describe ".quick_meals" do
      it "returns recipes with a total time of 35 minutes or less" do
        expect(described_class.quick_meals).to contain_exactly(recipe_a)
      end
    end

    describe ".top_100_rated" do
      let!(:recipes) { create_list(:recipe, 105, rating: rand(1..5)) }

      it "returns the top 100 rated recipes" do
        top_100_recipes = described_class.top_100_rated.to_a
        expect(top_100_recipes.size).to eq(100)
        expect(top_100_recipes).to eq(Recipe.order(rating: :desc).limit(100).to_a)
      end
    end
  end
end
