# frozen_string_literal: true

# Customized from: https://www.eliotsykes.com/test-rails-rake-tasks-with-rspec
# and https://robots.thoughtbot.com/test-rake-tasks-like-a-boss

require 'rake'

# Task names should be used in the top-level describe, with an
# "rake "-prefix for better documentation:
#
#   describe "rake foo:bar", type: :task do ... end
#
# can be used it in nested example group as well
module TaskExampleGroup
  extend ActiveSupport::Concern

  included do
    subject(:task) { rake_app[task_name] }

    def rake_app
      Rake.application
    end

    def task_name
      [self.class, self.class.module_parents]
        .flatten
        .find { |klass| klass.description.starts_with?('rake') }
        .description
        .delete_prefix('rake ')
    end

    before(:all) { Rake::Task.define_task(:environment) }

    after do
      task_instance = task.actions.first.binding.receiver
      task_instance.instance_variables.each { task_instance.remove_instance_variable(_1) }
      task.reenable
    end
  end
end

RSpec.configure do |config|
  # Tag Rake specs with `:task` metadata
  config.include TaskExampleGroup, type: :task

  Rails.application.load_tasks

  # Suppress console output during RSpec tests
  config.before(:each) do
    allow($stdout).to receive(:puts)
    allow($stdout).to receive(:write)
  end
end
