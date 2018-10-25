class CreateMonuments < ActiveRecord::Migration[5.2]
  def change
    create_table :monuments do |t|
      t.string :name
      t.string :address
      t.string :latitude
      t.string :longitude
      t.string :photo
      t.references :city, foreign_key: true
      t.string :description
      t.string :score

      t.timestamps
    end
  end
end
