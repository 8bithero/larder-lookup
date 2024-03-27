# frozen_string_literal: true

RSpec.describe EntryPoint do
  let(:test_class) do
    Class.new do
      include EntryPoint

      def initialize(action)
        self.action = action
      end
    end
  end

  describe '#call' do
    subject { test_class.new(action).call }

    let(:action) { instance_double("Action") }

    before do
      allow(action).to receive(:call)
    end

    it 'calls the action' do
      subject
      expect(action).to have_received(:call)
    end
  end
end
