class EndusersController < ApplicationController
	
	skip_before_filter :verify_authenticity_token
  	clear_respond_to
  	respond_to :json

	def update
		id = params[:id]
		school = params[:school]
		name = params[:name]
		username = params[:username]

		@enduser = Enduser.find_by_id(id)

		if @enduser.nil?
			render json: {'status'=>-1, 'error'=>'User with given id not found'}
		
		else
			if not school.nil?
				@enduser.school = school
			end

			if not name.nil?
				@enduser.name = name
			end

			if not username.nil?
				@enduser.username = username
			end

			@enduser.save

			render json: {'status'=>1, 'user'=>@enduser}
		end

		
	end
end