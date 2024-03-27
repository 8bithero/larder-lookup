# frozen_string_literal: true

namespace :recipes do
  desc "Import recipes from a JSON file, optionally limited by the number of recipes to import."
  task :import, [:limit] => :environment do |_t, args|
    file_path = Rails.root.join('db', 'recipes-en.json')
    file = File.read(file_path)
    recipes = JSON.parse(file)

    limit = args[:limit] ? args[:limit].to_i : recipes.count
    batch_size = 500

    recipes.first(limit).each_slice(batch_size).with_index do |batch, batch_index|
      batch.each_with_index do |recipe, i|
        global_index = batch_index * batch_size + i + 1
        puts "(#{global_index}/#{limit}) Importing recipe: #{recipe['title']}"
        ParseAndCreateRecipe::EntryPoint.call(recipe_data: recipe)
      end
    end
  end

end
