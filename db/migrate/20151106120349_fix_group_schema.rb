class FixGroupSchema < ActiveRecord::Migration
  def change
  	add_column :groups, :going, :string
  	change_column  :groups, :date, :float
  end
end
