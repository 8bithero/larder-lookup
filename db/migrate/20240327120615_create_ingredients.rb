class CreateIngredients < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.decimal :amount
      t.string :unit
      t.string :note
      t.string :original_text
      t.references :recipe, null: false, foreign_key: true
      t.references :food_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
