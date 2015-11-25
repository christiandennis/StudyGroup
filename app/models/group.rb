class Group < ActiveRecord::Base
	after_initialize :init
	has_and_belongs_to_many :users
	has_and_belongs_to_many :comments, dependent: :destroy

	validates :title, presence: true
	validates :subject, presence: true
	validates :description, presence: true
	validates :date, presence: true
	validates :location, presence: true
	validates :school, presence: true
	validates :capacity, presence: true, numericality: { greater_than: 0 }
	validates :guestlist, presence: true, numericality: { greater_than: 0 }
	#validates :comments, presence: true
	#validates :privacy, presence: true, numericality: { greater_than: 0 }
	validates :host, presence: true

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


