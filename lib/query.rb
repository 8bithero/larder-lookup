# frozen_string_literal: true

class Query

  @model = nil
  attr_reader :relation

  class << self
    attr_reader :model

    def set_model(model)
      @model = model
    end

    def all(relation = nil)
      query = new(relation)
      query.relation
    end

  end

  def initialize(relation = nil)
    if self.class.model.nil?
      relation ||= self.class.superclass.model.all
      modules = [self.class::Scopes, self.class.superclass::Scopes]
    else
      relation ||= self.class.model.all
      modules = self.class::Scopes
    end

    @relation = relation.extending(modules)
  end

  module Scopes
    def find_by!(args)
      find_by(args).tap do |object|
        raise NotFoundError, args unless object
      end
    end

    def last!
      last.tap do |object|
        raise NotFoundError, nil unless object
      end
    end

    def find_by_excluding_id(args, id)
      not_id(id).find_by(args)
    end

    def not_id(id)
      where.not(id: id)
    end

    def by_id(id)
      where(id: id)
    end
  end

  module MetaMethods
    def method_missing(method_name, *args, **kwargs, &block)
      query_instance = all

      if query_instance.respond_to?(method_name)
        query_instance.public_send(method_name, *args, **kwargs, &block)
      else
        super
      end
    end

    def respond_to_missing?(method_name, include_all = false)
      all.respond_to?(method_name, include_all) || super
    end
  end

  extend MetaMethods

end
