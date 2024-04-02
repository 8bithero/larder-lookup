# frozen_string_literal: true

module Search
  class EntryPoint

    include ::EntryPoint

    def initialize(resource:, params:)
      self.action = search_action_klass(resource).new(**params)
    end

    private

    def search_action_klass(resource)
      "Search::#{resource.to_s.camelize}::Action".constantize
    end
  end

end
