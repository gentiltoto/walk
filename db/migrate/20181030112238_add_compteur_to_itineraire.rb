class AddCompteurToItineraire < ActiveRecord::Migration[5.2]
  def change
    add_column :itineraires, :compteur, :integer, default: 0
  end
end
