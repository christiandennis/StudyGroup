class Group < ActiveRecord::Base
	after_initialize :init

    def init
      self.host  ||= 'anonymous'           #will set the default value only if it's nil
      self.guestlist ||= 0 #let's you set a default association
    end
end
