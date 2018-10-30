class Monument < ApplicationRecord
  belongs_to :city
  has_many :intermediaires
  has_many :itineraires, through: :intermediaires
end
