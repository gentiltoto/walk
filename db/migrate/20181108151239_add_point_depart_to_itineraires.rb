class AddPointDepartToItineraires < ActiveRecord::Migration[5.2]
  def change
    add_column :itineraires, :point_depart, :string, default: ""
  end
end
