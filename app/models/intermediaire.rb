class Intermediaire < ApplicationRecord
  belongs_to :itineraire
  belongs_to :monument

  validates :itineraire, uniqueness: { scope: :monument }
end
