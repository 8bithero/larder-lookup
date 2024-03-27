# frozen_string_literal: true

module ParseAndCreateRecipe
  module Actions
    class BuildRecipe

      def initialize(data:)
        @data = data
      end

      def call
        Recipe.new(
          title: data['title'],
          author: data['author'],
          rating: data['ratings'],
          category: data['category'],
          cuisine: data['cuisine'],
          cook_time: data['cook_time'],
          prep_time: data['prep_time'],
          total_time: total_time,
          image_url: data['image'],
        )
      end

      private

      attr_reader :data

      def total_time
        data['cook_time'] + data['prep_time']
      end

    end
  end
end
