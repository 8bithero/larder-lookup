# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'rake recipes:import', type: :task do
  before do
    allow(File).to receive(:read).and_return(file_content)
    allow(JSON).to receive(:parse).and_return(json_data)
  end

  let(:file_content) { '{"recipes":[]}' }
  let(:json_data) { [{'title' => 'Recipe 1'}, {'title' => 'Recipe 2'}, {'title' => 'Recipe 3'}] }

  subject(:import_recipes) { Rake::Task['recipes:import'].invoke(limit) }

  describe 'without a limit' do
    let(:limit) { nil }

    it 'processes all recipes' do
      expect(ParseAndCreateRecipe::EntryPoint).to receive(:call).exactly(json_data.length).times
      import_recipes
    end
  end

  describe 'with a limit' do
    let(:limit) { '2' }

    it 'processes only the limited number of recipes' do
      expect(ParseAndCreateRecipe::EntryPoint).to receive(:call).exactly(limit.to_i).times
      import_recipes
    end
  end
end
