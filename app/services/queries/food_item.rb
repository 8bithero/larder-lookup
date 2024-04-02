# frozen_string_literal: true

module Queries
  class FoodItem < Query

    set_model ::FoodItem

    module Scopes
      include Query::Scopes

      def by_name_similar(name)
        ActiveRecord::Base.connection.execute("SELECT set_limit(0.2);")
        quoted_name = ActiveRecord::Base.connection.quote_string(name)

        where("name % :name", name: name)
          .order(Arel.sql("similarity(name, '#{quoted_name}') DESC"))
      end

      def starting_from_a
        where("name ~* '^[a-zA-Z]'").order(:name)
      end

    end
  end
end
