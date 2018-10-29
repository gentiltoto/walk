class Itineraire < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_many :intermediaires
  has_many :monuments, through: :intermediaires
end
