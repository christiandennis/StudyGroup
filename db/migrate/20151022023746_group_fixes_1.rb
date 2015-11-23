class GroupFixes1 < ActiveRecord::Migration
  def change
  	# change_column :groups, :host, :string
  	remove_column :groups, :host
  	add_column :groups, :host, :string

  	# change_column :groups, :guestlist, :integer
  	remove_column :groups, :guestlist
  	add_column :groups, :guestlist, :integer
  	#change_column :groups, :date, :string
  end
end
