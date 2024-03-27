class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :author
      t.decimal :rating
      t.string :category
      t.string :cuisine
      t.integer :cook_time
      t.integer :prep_time
      t.integer :total_time
      t.string :image_url
      t.integer :ingredients_count

      t.timestamps
    end
  end
end