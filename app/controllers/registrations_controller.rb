class RegistrationsController < Devise::RegistrationsController
  
  skip_before_filter :verify_authenticity_token, :only => :create
  clear_respond_to
  respond_to :json
  
end