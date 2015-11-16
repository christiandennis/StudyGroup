class User < ActiveRecord::Base
  # Include default devise modules.
  # :confirmable removed to disable email auth
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User
  #before_save -> { skip_confirmation! }

end
