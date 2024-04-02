# frozen_string_literal: true

module Search
  module FoodItems
    class Action

      def initialize(q:)
        @q = q
      end

      def call
        return Queries::FoodItem.starting_from_a.limit(20) unless q.present?

        Queries::FoodItem.by_name_similar(q)
      end

      private

      attr_reader :q

    end
  end
end
