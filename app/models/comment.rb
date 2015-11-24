class Comment < ActiveRecord::Base
	  has_one :groups
	  has_and_belongs_to_many :users

	  validates :userid, presence: true
	  validates :groupid, presence: true, numericality: { greater_than: 0 }
	  validates :content, presence: true

	  def as_json(options={})
	    super(include: {
	            users: {}	          
	        }
    	)
  end

end
