class Beer < ApplicationRecord
  belongs_to :brewery
  validates_presence_of :name
end
