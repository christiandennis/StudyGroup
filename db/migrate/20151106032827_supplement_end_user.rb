class SupplementEndUser < ActiveRecord::Migration
  def change
  	add_column :endusers, :school, :string
  	add_column :endusers, :name, :string
  	add_column :endusers, :username, :string
  end
end
