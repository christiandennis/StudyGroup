class User < ActiveRecord::Base
  # Include default devise modules.
  has_and_belongs_to_many :groups
  # :confirmable removed to disable email auth
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User
  #before_save -> { skip_confirmation! }

end
