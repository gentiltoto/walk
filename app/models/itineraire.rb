class Itineraire < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_many :intermediaires, dependent: :destroy
  has_many :monuments, through: :intermediaires
end
