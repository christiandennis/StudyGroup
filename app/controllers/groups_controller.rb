class GroupsController < ApplicationController
	skip_before_filter :verify_authenticity_token
  	clear_respond_to
  	respond_to :json

	def create
		status = 1 #intially set status to OK
		err = [] #List of all errors
		
		title = params[:title]
		subject = params[:subject]
		location = params[:location]
		description = params[:description]
		date = params[:date]
		time = params[:time]
		capacity = params[:capacity]

		if title.nil? || title.length==0
			status = -1
			err << "Please enter a title"
		elsif title.length > 30
			status = -1
			error_messages << "Please enter title less than 30 characters" 
		end

		if subject.nil? || subject.length==0
			status = -1
			err << "Please enter a class"
		elsif subject.length > 10
			status = -1
			error_messages << "Please enter a class less than 10 characters" 
		end

		if description.nil? || description.length==0
			status = -1
			err << "Please enter a description"
		elsif description.length > 256
			status = -1
			error_messages << "Please enter description less than 256 characters" 
		end


		if status == 1
			@group = Group.new(group_params)
			if @group.save
				render json: {'status' => 1, 'group' => @group}
			end
		else
			render json: {'status'=> -1, 'errors' => err}
		end
	end 

	def index
		@groups = Group.all
		render json: {'groups' => @groups}
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
	    params.permit(:title, :subject, :description, :date, :school, :capacity,:host)
	  end

	  def group_params_nested

	  end
end
