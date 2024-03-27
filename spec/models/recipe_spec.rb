# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { is_expected.to have_many(:ingredients).dependent(:destroy) }
  it { is_expected.to have_many(:food_items).through(:ingredients) }
end
