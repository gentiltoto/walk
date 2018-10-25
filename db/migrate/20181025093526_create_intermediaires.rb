class CreateIntermediaires < ActiveRecord::Migration[5.2]
  def change
    create_table :intermediaires do |t|
      t.references :itineraire, foreign_key: true
      t.references :monument, foreign_key: true

      t.timestamps
    end
  end
end
