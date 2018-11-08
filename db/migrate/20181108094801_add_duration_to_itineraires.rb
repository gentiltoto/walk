class AddDurationToItineraires < ActiveRecord::Migration[5.2]
  def change
    add_column :itineraires, :duration, :string
  end
end
