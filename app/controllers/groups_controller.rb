class GroupsController < ApplicationController
	def create
		@group = Group.new(group_params)

		@group.save
		redirect_to url_for(:controller => :main, :action => :index)
	end 

	def index
		@groups = Group.all
	end

	def 

	def new

	end

	def show
		@group = Group.find(params[:id])
	end

	private
	  def group_params
	    params.require(:group).permit(:title, :subject, :description, :date, :location)
	  end
end
