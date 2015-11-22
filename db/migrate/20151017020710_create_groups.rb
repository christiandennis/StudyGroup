class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title
      t.string :subject
      t.text :description
      t.datetime :date
      t.string :location
      t.string :school
      t.integer :capacity
      t.text :guestlist
      t.text :comments
      t.integer :privacy
      t.integer :host

      t.timestamps null: false
    end
  end
end
