class City < ApplicationRecord
  mount_uploader :photo, PhotoUploader
end
