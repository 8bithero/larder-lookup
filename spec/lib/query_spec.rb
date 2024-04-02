# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Query do
  class TestQueryModel < ApplicationRecord

    def self.load_schema!
      @columns_hash = {}
    end

  end

  def conditions(relation)
    nodes = relation.where_clause.ast.then { |ast| ast.respond_to?(:children) ? ast.children : [ast] }
    nodes.to_h do |child|
      value = child.right.value_before_type_cast
      value = "not_#{value.inspect}" if child.is_a?(Arel::Nodes::NotEqual)
      [child.left.name.to_s, value]
    end
  end

  context 'Scopes functionality' do
    class TestQueryClass < described_class
      set_model TestQueryModel

      module Scopes
        def foo
          where(foo: :bar)
        end

        def not_id(id)
          where.not(id: id)
        end
      end
      extend Scopes
    end

    let(:test_class) { TestQueryClass }

    describe '.foo' do
      subject { conditions(test_class.foo) }

      it 'applies the foo scope correctly' do
        expect(subject).to eq('foo' => :bar)
      end
    end

    describe '.not_id' do
      let(:id_to_exclude) { 1 }
      subject { conditions(test_class.not_id(id_to_exclude)) }

      it 'excludes records with the specified id' do
        expect(subject).to eq('id' => "not_#{id_to_exclude.inspect}")
      end
    end
  end

  describe '.all' do
    class AllTestQueryClass < described_class
      set_model TestQueryModel
    end

    let(:test_class) { AllTestQueryClass }

    it 'returns all records' do
      allow(TestQueryModel).to receive(:all).and_return(TestQueryModel.none)
      expect(test_class.all.to_a).to eq([])
    end
  end

  describe '.set_model and Model Integration' do
    before do
      class ExampleModel < ApplicationRecord; end
      described_class.set_model(ExampleModel)
    end

    it 'uses the set model for queries' do
      expect(described_class.model).to eq(ExampleModel)
      expect(described_class.all.to_sql).to include(ExampleModel.table_name)
    end
  end

end
