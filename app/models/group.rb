class Group < ActiveRecord::Base
	after_initialize :init
	has_and_belongs_to_many :users
	has_and_belongs_to_many :comments, dependent: :destroy


    def init
      self.host  ||= ''           #will set the default value only if it's nil
      self.guestlist ||= 0 #let's you set a default association
    end

    def as_json(options={})
	    super(include: {
	            users: {},
	            comments: {:include => :users}
	          }
    	)


  end

end
