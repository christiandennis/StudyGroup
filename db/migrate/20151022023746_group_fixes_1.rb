class GroupFixes1 < ActiveRecord::Migration
  def change
  	change_column :groups, :host, :string
  	change_column :groups, :guestlist, :integer
  	#change_column :groups, :date, :string
  end
end
