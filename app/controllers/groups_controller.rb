class GroupsController < ApplicationController
	def create
		
		puts 'Fuck it'
		puts '-----------------------'
		puts params
		puts '-----------------------'
		#@group.save
		#@group = Group.new(:title=>params[:title], :subject=>params[:subject])
		@group = Group.new(group_params)
		@group.save
		redirect_to('/')
	end 

	def index
		@groups = Group.all
	end

	def 

	def new

	end

	def delete
		@group = Group.find(params[:id])
		@group.destroy
	end

	def update
		
	end

	def show
		@group = Group.find(params[:id])
	end

	private
	  def group_params
	    params.permit(:title, :subject, :description, :date, :location, :capacity)
	  end
end
