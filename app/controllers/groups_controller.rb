class GroupsController < ApplicationController
	skip_before_filter :verify_authenticity_token
	before_action :authenticate_user!
  	clear_respond_to
  	respond_to :json
  	#before_action :authenticate_user!

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
		#host = params[:host]
		privacy = params[:privacy]
		uid = params[:uid]

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

		# if host.nil?
		# 	status=-1
		# 	error_messages << "Please pass in a host id"
		# end

		@user = nil

		if privacy != '0' and privacy != '1'
			status=-1
			error_messages << "Please set privacy of 0 or 1"
		end

		if uid.nil?
			status = -1
			error_messages << "Please pass in a uid"
		else
			@user = User.find_by_uid(uid)
			if @user.nil?
				status = -1
				error_messages << "Couldn't find user with given uid"
			end

			params[:host] = uid
		end

		if status == 1
			@group = Group.new(group_params)
			@group.guestlist+=1
			@group.going = @group.going + ','+@user.id.to_s + ','
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
		@user = nil
		if params[:uid].nil?
			render json: {'status'=>-1, 'errors'=>['Please enter a uid']}
			return
		else
			@user = User.find_by_uid(params[:uid])
			if @user.nil?
				render json: {'status'=>-1, 'errors'=>["Can't find user with given uid"]}
				return
			end
		end
		@user = User.find_by_uid(params[:uid])
		render json: {'status'=>1,'groups' => @groups}
	end

	def usergroups
		@groups = Group.all
		@user=nil
		if params[:uid].nil?
			render json: {'status'=>-1, 'errors'=>['Please enter a uid']}
			return
		else
			@user = User.find_by_uid(params[:uid])
			if @user.nil?
				render json: {'status'=>-1, 'errors'=>["Can't find user with given uid"]}
				return
			end
		end
		
		id_formatted = ','+@user.id.to_s+','
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
		id_formatted = nil

		status = 1
		err = []

		@group = nil
		@user = nil

		if act.nil?
			status = -1
			err << 'Please add a command that is either add or remove'
		end

		if groupid.nil?
			status = -1
			err << 'Please pass in a group id'
		else
			@group = Group.find(groupid)
			status = -1
			err << 'Could not find groupd with id'
		end

		if userid.nil?
			status = -1
			err << 'Please pass in a uid'
		else
			@user = User.find_by_uid(userid)
			status = -1
			err << 'Could not find user with uid'
		end

		if status == -1
			id_formatted = ','+@user.id.to_s+','
		end

		if act == 'add'
			if not @group.going.include? id_formatted
				@group.going = @group.going+','+@user.id.to_s+','
				@group.guestlist+=1
			end	
		else #remove
			going = @group.going

			if going.include? id_formatted and @group.guestlist>0
				@group.guestlist-=1
			end
			remove_this = ','+@user.id.to_s+','
			going.slice! remove_this
			@group.going = going
		end

		@group.save
		render json: {'status'=>1,'going' => @group}
	end

	def update
		id = params[:id]
		@group = nil
		if id.nil?
			render json: {'status'=>-1,'errors:'=>['Please pass in a valid group id']}
			return
		else
			@group = Group.find(params[:id])
			if @group.nil?
				render json: {'status'=>-1,'errors:'=>['Could not find group with id']}
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
		host = params[:host]
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
		if not host.nil?
			@user = User.find_by_uid(host)
			if @user.nil?
				render json: {'status'=>-1, 'errors'=>['Could not find passed in host']}
				return
			end
			@group.host = host
		end
		if not privacy.nil?
			@group.privacy = privacy
		end
		if not school.nil?
			@group.school = school
		end

		@group.save

		render json: {'status'=>1,'group'=>@group}




	end

	def show
		@group = Group.find(params[:id])
		if not @group.nil?
			render json: {'status'=>1, 'group'=>@group}
		else
			render json: {'status'=>-1,'errors'=>['Could not find group with id']}
		end
	end

	private
	  def group_params
	    params.permit(:title, :subject, :description, :date, :location, :capacity,:host, :privacy)
	  end

	  def group_params_nested

	  end
end
