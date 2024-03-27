# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Callable do
  let(:test_class) do
    Class.new do
      include Callable
      def initialize(*args); @args = args; end
      def call; "Called with #{@args.inspect}"; end
    end
  end
  let(:args) { [1, { foo: 'bar' }, 'baz'] }
  let(:instance) { test_class.new(*args) }

  before do
    allow(test_class).to receive(:new).with(*args).and_return(instance)
    allow(instance).to receive(:call).and_call_original
  end

  describe '.call' do
    it 'calls #call on a new instance with the provided arguments' do
      expect(test_class.call(*args)).to eq("Called with #{args.inspect}")
      expect(test_class).to have_received(:new).with(*args)
      expect(instance).to have_received(:call)
    end
  end

  describe '#call' do
    context 'when #call is not implemented' do
      let(:test_class_without_call) { Class.new { include Callable } }

      it 'raises NotImplementedError' do
        expect { test_class_without_call.new.call }.to raise_error(NotImplementedError)
      end
    end
  end
end
