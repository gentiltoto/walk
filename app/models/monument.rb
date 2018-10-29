class Monument < ApplicationRecord
  belongs_to :city
  has_many :intermediaires
end
