# frozen_string_literal: true

module EntryPoint
  extend ActiveSupport::Concern

  def call
    action.call
  end

  included do
    attr_accessor :action
  end

  class_methods do
    def call(...)
      new(...).call
    end
  end
end
