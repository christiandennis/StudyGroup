class GroupsController < ApplicationController
	skip_before_filter :verify_authenticity_token
  	clear_respond_to
  	respond_to :json

	def create
		status = 1 #intially set status to OK
		error_messages = [] #List of all errors
		
		title = params[:title]
		subject = params[:subject]
		location = params[:location]
		description = params[:description]
		date = params[:date]
		time = params[:time]
		capacity = params[:capacity]
		host = params[:host]
		privacy = params[:privacy]

		if title.nil? || title.length==0
			status = -1
			error_messages << "Please enter a title"
		elsif title.length > 30
			status = -1
			error_messages << "Please enter title less than 30 characters" 
		end

		if subject.nil? || subject.length==0
			status = -1
			error_messages << "Please enter a class"
		elsif subject.length > 10
			status = -1
			error_messages << "Please enter a class less than 10 characters" 
		end

		if description.nil? || description.length==0
			status = -1
			error_messages << "Please enter a description"
		elsif description.length > 256
			status = -1
			error_messages << "Please enter description less than 256 characters" 
		end

		if host.nil?
			status=-1
			error_messages << "Please pass in a host id"
		end

		if privacy != '0' and privacy != '1'
			status=-1
			error_messages << "Please set privacy of 0 or 1"
		end

		@enduser = Enduser.find_by_id(host)

		if @enduser.nil?
			status=-1
			error_messages << 'Could not find user with passed in host id'
		else
			params[:host] = @enduser.username
		end



		if status == 1
			@group = Group.new(group_params)
			@group.guestlist+=1
			@group.going = @group.going + ','+host + ','
			if @group.save
				render json: {'status' => 1, 'group' => @group}
			end
		else
			render json: {'status'=> -1, 'errors' => error_messages}
		end
	end 

	def index
		@groups = Group.all
		render json: {'status'=>1,'groups' => @groups}
	end

	def userindex
		#based on school/user
		# what to initially show
		@groups = Group.all
		@enduser = Enduser.find_by_id(params[:id])
		render json: {'status'=>1,'groups' => @groups}
	end

	def usergroups
		@groups = Group.all
		@enduser = Enduser.find_by_id(params[:id])
		id_formatted = ','+params[:id]+','
		displayed_groups = []

		for group in @groups
			if group.going.include? id_formatted
				displayed_groups.push(group)
			end 
		end 
		render json: {'status'=>1,'groups' => displayed_groups} 
	end

	def delete
		@group = Group.find(params[:id])
		@group.destroy
	end

	def addremoveuser
		#add or remove a user
		act = params[:command]
		groupid = params[:groupid]
		userid = params[:userid]
		id_formatted = ','+userid+','

		@group = Group.find(groupid)

		if act == 'add'
			if not @group.going.include? id_formatted
				@group.going = @group.going+','+userid+','
				@group.guestlist+=1
			end	
		else #remove
			going = @group.going

			if going.include? id_formatted and @group.guestlist>0
				@group.guestlist-=1
			end
			remove_this = ','+userid+','
			going.slice! remove_this
			@group.going = going
		end

		@group.save
		render json: {'status'=>1,'going' => @group}
	end

	def update
		
	end

	def show
		@group = Group.find(params[:id])
	end

	private
	  def group_params
	    params.permit(:title, :subject, :description, :date, :location, :capacity,:host, :privacy)
	  end

	  def group_params_nested

	  end
end
