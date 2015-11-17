class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :userid
      t.integer :groupid
      t.text :content
      t.string :title

      t.timestamps null: false
    end
  end
end
