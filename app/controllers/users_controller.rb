class UsersController < ApplicationController

	def create
		@user = User.new(user_params)
		@user.save
	end

	def read
		@user = User.find(params[:email])
	end

	def update
	end

	def delete
		@user = User.find(params[:email])
		@user.destroy
	end

	def index
	end

	def show
	end

	def new
	end

	private
		def user_params
			params.permit(:name, :email, :school)
		end

end
