class CreateFoodItems < ActiveRecord::Migration[7.1]
  def change
    create_table :food_items do |t|
      t.string :name

      t.timestamps
    end
    add_index :food_items, :name, unique: true
  end
end
