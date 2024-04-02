# frozen_string_literal: true

module Queries
  class Recipe < Query

    set_model ::Recipe

    module Scopes
      include Query::Scopes

      def by_food_items(food_items)
        joins(:food_items)
          .where(food_items: food_items)
          .group('recipes.id')
      end

      def containing_all_food_item_ids(food_item_ids)
        by_food_items(food_item_ids)
          .having('COUNT(DISTINCT food_items.id) = ?', food_item_ids.uniq.size)
      end

      def quick_meals
        where('total_time <= ?', 35)
      end

      def top_100_rated
        order(rating: :desc).limit(100)
      end

    end
  end
end
