class Comment < ActiveRecord::Base
	  has_one :groups
	  has_and_belongs_to_many :users

	  def as_json(options={})
	    super(include: {
	            users: {}	          
	        }
    	)
  end

end
