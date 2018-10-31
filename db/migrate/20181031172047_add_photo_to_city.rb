class AddPhotoToCity < ActiveRecord::Migration[5.2]
  def change
    add_column :cities, :photo, :string
  end
end
