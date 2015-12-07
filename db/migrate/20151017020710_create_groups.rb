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
      t.integer :guestlist
      t.text :comments
      t.integer :privacy
      t.string :host
      t.string :going

      t.timestamps null: false
    end
  end
end
