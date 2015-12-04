class UsersController < ApplicationController

	def create
		@user = User.new(user_params)
		if @user.name=='' or @user.email==''
			redirect_to('/')
			flash[:notice] = "Please provide a valid email"
		else
			@user.save
			#redirect_to('/feed')
			redirect_to controller: 'main', action: 'index', current_user: @user.name
		end

		
	end

	def show
		@user = User.find(params[:email])
		puts '--------------------------'
		puts 'In User Show'
		puts '--------------------------'
		unless @user.nil?
			redirect_to('/feed')
		end
		#This means the user doesn't exist
		#TODO: Show a modal that says user does not exist
		flash[:notice] = "Please provide a valid email"
		redirect_to('/')

	end

	def update
	end

	def delete
		@user = User.find(params[:email])
		@user.destroy
	end

	def index
		@users = User.all
	end

	def edit
	end

	def new
	end

	private
		def user_params
			params.require(:user).permit(:name, :email, :school)
		end

end
