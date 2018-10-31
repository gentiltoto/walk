class Monument < ApplicationRecord
  belongs_to :city
  has_many :intermediaires, dependent: :destroy
  has_many :itineraires, through: :intermediaires
end
