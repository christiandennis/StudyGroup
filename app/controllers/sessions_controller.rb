# app/controllers/sessions_controller.rb
# Code from https://hackhands.com/sign-users-ajax-using-devise-rails/

class SessionsController < Devise::SessionsController
  skip_before_filter :verify_authenticity_token
  clear_respond_to
  respond_to :json
end