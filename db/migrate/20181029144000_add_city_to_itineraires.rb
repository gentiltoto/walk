class AddCityToItineraires < ActiveRecord::Migration[5.2]
  def change
    add_reference :itineraires, :city, foreign_key: true
  end
end
