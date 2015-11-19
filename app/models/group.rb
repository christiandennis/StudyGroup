class Group < ActiveRecord::Base
	serialize :comments, Array
	after_initialize :init

    def init
      self.host  ||= ''           #will set the default value only if it's nil
      self.guestlist ||= 0 #let's you set a default association
      self.going ||=' '
    end
end
