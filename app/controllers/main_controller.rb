class MainController < ApplicationController
  def index
  	@groups = Group.all
  end
end
