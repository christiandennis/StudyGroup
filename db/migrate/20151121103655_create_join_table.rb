class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :comments, :groups do |t|
      # t.index [:comment_id, :group_id]
      # t.index [:group_id, :comment_id]
    end
  end
end
