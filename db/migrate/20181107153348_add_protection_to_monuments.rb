class AddProtectionToMonuments < ActiveRecord::Migration[5.2]
  def change
    add_column :monuments, :protection, :string
  end
end
