class AddTrigramIndexToFoodItems < ActiveRecord::Migration[7.1]
  def change
    add_index :food_items, :name, using: :gin, opclass: :gin_trgm_ops
  end
end
