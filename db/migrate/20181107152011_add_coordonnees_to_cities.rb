class AddCoordonneesToCities < ActiveRecord::Migration[5.2]
  def change
    add_column :cities, :latitude, :string
    add_column :cities, :longitude, :string
  end
end
