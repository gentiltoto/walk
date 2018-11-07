class ConvertToIntegerScore < ActiveRecord::Migration[5.2]
  def change
    change_column :monuments, :score, 'float USING CAST(score AS float)'
  end
end
