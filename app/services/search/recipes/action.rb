# frozen_string_literal: true

module Search
  module Recipes
    class Action
      PRESETS = Set.new([:quick_meals, :top_100_rated]).freeze

      def initialize(food_item_ids:, presets:)
        @food_item_ids = Array(food_item_ids)
        @presets = build_presets(Array(presets))
      end

      def call
        return [] if food_item_ids.none? && presets.none?

        scope = Queries::Recipe.includes(:ingredients)
        scope = apply_presets_filter(scope) unless presets.none?
        scope = apply_food_item_filter(scope) unless food_item_ids.none?

        scope
      end

      private

      attr_reader :food_item_ids, :presets

      def build_presets(input_values)
        input_values.filter_map { |str| str.to_sym if PRESETS.include?(str.to_sym) }
      end

      def apply_presets_filter(scope)
        presets.reduce(scope, &:public_send)
      end

      def apply_food_item_filter(scope)
        scope.containing_all_food_item_ids(food_item_ids)
      end

    end
  end
end
