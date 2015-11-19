class GroupsController < ApplicationController
	skip_before_filter :verify_authenticity_token
	before_action :authenticate_user!
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
		privacy = params[:privacy]
		params[:host] = current_user.nickname
		@name = current_user

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

		if location.nil? || location.length==0
			status = -1
			error_messages << "Please enter a location"
		elsif location.length > 30
			status = -1
			error_messages << "Please enter location less than 30 characters" 
		end

		if capacity.nil? || capacity.length==0
			status = -1
			error_messages << "Please enter capacity" 
		end

		if privacy != '0' and privacy != '1'
			status=-1
			error_messages << "Please set privacy of 0 or 1"
		end


		if status == 1
			@group = Group.new(group_params.merge(:school=> current_user.school))
			@group.guestlist+=1
			@group.going = @group.going + ' '+@name.nickname.to_s + ' '
			if @group.save
				render json: {'status' => 1, 'group' => @group}
			end
		else
			render json: {'status'=> -1, 'errors' => error_messages}, status: 400
		end
	end 

	#TODO: order groups by date
	def index
		@groups = Group.all.order("date")
		render json: {'status'=>1,'groups' => @groups}
	end

	#TODO: Order based on date
	#TODO: Actually select things user should see
	def userindex
		#based on school/user
		# what to initially show
		@groups = Group.where(:school => current_user.school).order("date")
		@user = current_user

		render json: {'status'=>1,'groups' => @groups}
	end

	#TODO: Order displayed_groups by date
	def usergroups
		@groups = Group.all.order("date")
		@user = current_user
		
		id_formatted = ' '+@user.nickname.to_s+' '
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


	#TODO?: Make sure you can't remove host
	def addremoveuser
		#add or remove a user
		act = params[:command]
		groupid = params[:groupid]
		status = 1
		err = []

		@group = nil
		@user = current_user

		id_formatted = id_formatted = ' '+@user.nickname.to_s+' '

		if act.nil?
			status = -1
			err << 'Please add a command that is either add or remove'
		end

		if groupid.nil?
			status = -1
			err << 'Please pass in a group id'
		else
			@group = Group.find(groupid)
			if @group.nil?
				status = -1
				err << 'Could not find groupd with id'
			end
		end

		if status == -1
			render json: {'status'=>-1,'errors'=>err}, status: 400
			return
		end

		if act == 'add'
			if not @group.going.include? id_formatted
				@group.going = @group.going+id_formatted
				@group.guestlist+=1
			end	
		else #remove
			going = @group.going

			if going.include? id_formatted and @group.guestlist>0
				@group.guestlist-=1
			end
			going.slice! id_formatted
			@group.going = going
		end

		@group.save
		render json: {'status'=>1,'going' => @group}
	end

	def update
		id = params[:id]
		@group = nil
		if id.nil?
			render json: {'status'=>-1,'errors:'=>['Please pass in a valid group id']}, status: 400
			return
		else
			@group = Group.find(params[:id])
			if @group.nil?
				render json: {'status'=>-1,'errors:'=>['Could not find group with id']}, status: 400
				return
			end
		end

		title = params[:title]
		subject = params[:subject]
		description = params[:description]
		date = params[:date]
		location = params[:location]
		time = params[:time]
		capacity = params[:capacity]
		privacy = params[:privacy]
		school = params[:school]

		if not title.nil?
			@group.title = title
		end
		if not subject.nil?
			@group.subject = subject
		end
		if not description.nil?
			@group.description = description
		end
		if not date.nil?
			@group.date = date
		end
		if not location.nil?
			@group.location = location
		end
		if not time.nil?
			@group.time = time
		end
		if not capacity.nil?
			@group.capacity = capacity
		end

		if not privacy.nil?
			@group.privacy = privacy
		end
		if not school.nil?
			@group.school = school
		end

		if @group.host != current_user.nickname
			render json: {'status'=>-1, 'errors'=>['You can only edit group you host']}, status: 400
		else
			@group.save
			render json: {'status'=>1,'group'=>@group}
		end
	end

	def show
		@group = Group.find(params[:id])
		if not @group.nil?
			render json: {'status'=>1, 'group'=>@group}
		else
			render json: {'status'=>-1,'errors'=>['Could not find group with id']}, status: 400
		end
	end

	private
	  def group_params
	    params.permit(:title, :subject, :description, :date, :location, :capacity,:host, :privacy, :location, :school, :host)
	  end

	  def group_params_nested

	  end
end
