# HELPER CONTROLLER FOR USER AUTH

class AuthorizationController < ApplicationController
	skip_before_filter :verify_authenticity_token
  	clear_respond_to
  	respond_to :json

  	def set_user_fields
  		status = 1 #intially set status to OK
		error_messages = [] #List of all errors

		uid = params[:uid]
		school = params[:school]
		name = params[:name]
		nickname = params[:nickname]

		@user = nil

		if school.nil?
			status = -1
			error_messages << 'Please enter a school'
		end

		if name.nil?
			status = -1
			error_messages << 'Please enter a name'
		end

		if nickname.nil?
			status = -1
			error_messages << 'Please enter a name'
		end

		if uid.nil?
			status = -1
			error_messages << 'Please enter a valid uid'
		else
			@user = User.find_by_uid(uid)
			if @user.nil?
				status = -1
				error_messages << 'Could not find user with uid'
			end
		end

		if status == -1
			render json: {'status'=>-1, 'errors'=>error_messages}
		else
			@user.school = school
			@user.name = name
			@user.nickname = nickname
			@user.save
			render json: {'status'=>1, 'user'=>@user}
		end


  	end
end
