class LandingController < ApplicationController
  def index
  end

  def create
  	render :main => 'index'
  end
end
