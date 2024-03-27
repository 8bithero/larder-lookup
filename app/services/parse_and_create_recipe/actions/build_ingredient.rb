# frozen_string_literal: true

module ParseAndCreateRecipe
  module Actions
    class BuildIngredient

      FRACTIONS = {
        "\u215b" => '1/8',
        "\u215c" => '3/8',
        "\u215d" => '5/8',
        "\u215e" => '7/8',
        "\u2159" => '1/6',
        "\u215a" => '5/6',
        "\u2155" => '1/5',
        "\u2156" => '2/5',
        "\u2157" => '3/5',
        "\u2158" => '4/5',
        "\u00bc" => '1/4',
        "\u00be" => '3/4',
        "\u2153" => '1/3',
        "\u2154" => '2/3',
        "\u00bd" => '1/2',
      }

      def initialize(text:)
        @text = text
      end

      def call
        Ingredient.new(
          name: ingredient_data[:name],
          amount: ingredient_data[:amount],
          unit: ingredient_data[:unit],
          note: ingredient_data[:note],
          original_text: text,
          food_item: create_food_item(ingredient_data[:name])
        )
      end

      private

      attr_reader :text

      def create_food_item(name)
        FoodItem.find_or_create_by(name: name.downcase.singularize)
      end

      def ingredient_data
        @ingredient_data ||= parse_with_eye_of_newt
      rescue StandardError
        parse_with_ingreedy
      end

      def parse_with_eye_of_newt
        parsed = EyeOfNewt.parse(sanitized_text)
        {
          name: parsed.names[0],
          amount: parsed.amount,
          unit: parsed.unit,
          note: (parsed.note || parsed.style),
        }
      end

      def parse_with_ingreedy
        parsed = Ingreedy.parse(sanitized_text)
        {
          name: parsed.ingredient,
          amount: parsed.amount,
          unit: parsed.unit,
          note: nil, # Ingreedy does not provide a note field
        }
      end

      def sanitized_text
        @sanitized_text ||= begin
          str = text.dup
          str.gsub!(/\s+-\s+/, ' ') # Removes dashes surrounded by whitespace
          str.gsub!(/\s*\([^)]*\)[a-zA-Z]?/, '') # Removes anything in parenthesis and adjoining characters
          str.gsub!(/[™®']/, '')
          str.gsub!('&', 'and')

          FRACTIONS.each do |unicode_fraction, plain_fraction|
            str.gsub!(unicode_fraction, plain_fraction)
          end

          str
        end
      end

    end
  end
end
