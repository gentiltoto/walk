class City < ApplicationRecord
  mount_uploader :photo, PhotoUploader

  validates :name, uniqueness: true
end
