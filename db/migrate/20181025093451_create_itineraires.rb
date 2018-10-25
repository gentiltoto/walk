class CreateItineraires < ActiveRecord::Migration[5.2]
  def change
    create_table :itineraires do |t|
      t.string :geojson
      t.references :user, foreign_key: true
      t.string :name
      t.string :distance
      t.string :parcours

      t.timestamps
    end
  end
end
