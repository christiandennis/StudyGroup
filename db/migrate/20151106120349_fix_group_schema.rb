class FixGroupSchema < ActiveRecord::Migration
  def change
  	add_column :groups, :going, :string
  	#change_column  :groups, :date, :float
  end

  def up
  	drop_table :users
  end
end
