class MainController < ApplicationController
  def index
  	@groups = Group.all
  	@current_user = params[:current_user]
  end
end
