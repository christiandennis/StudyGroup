class CommentController < ApplicationController

	skip_before_filter :verify_authenticity_token
  	clear_respond_to
  	respond_to :json

  	def create
		status = 1 #intially set status to OK
		error_messages = [] #List of all errors

		userid = params[:userid]
		groupid = params[:groupid]
		content = params[:content]
		title = params[:title]
		

		if title.nil? || title.length==0
			status = -1
			error_messages << "Please enter a title"
		elsif title.length > 30
			status = -1
			error_messages << "Please enter title less than 30 characters" 
		end

		if content.nil? || content.length==0
			status = -1
			error_messages << "Please enter content"
		elsif content.length > 256
			status = -1
			error_messages << "Please enter content less than 256 characters" 
		end

		if userid.nil?
			status = -1
			error_messages << "Please pass in a userid"
		else
			@user = User.find_by_uid(userid)
			if @user.nil?
				status = -1
				error_messages << "Couldn't find user with given uid"
			end
		end

		if groupid.nil?
			status = -1
			error_messages << "Please pass in a groupid"
		else
			@group = Group.find(groupid)
			if @group.nil?
				status = -1
				error_messages << "Couldn't find group with given groupid"
			end
		end

		if status == -1
			render json: {'status'=>-1,'errors'=>error_messages}
		else
			@comment = Comment.new(comment_params)
			if @comment.save
				render json: {'status' => 1, 'comment' => @comment}
				return
			end
			render json: {'status'=> -1, 'errors' => error_messages}
		end
	end

	def index
		@comments = Comment.all
		render json: {'status'=>1,'comments' => @comments}
	end

	def show
		@comment = Comment.find(params[:id])
		if not @comment.nil?
			render json: {'status'=>1,'comment'=>@comment}
			return
		end
		render json: {'status'=>1, 'errors'=>['Could not find comment with id']}
	end


	private
	  def comment_params
	    params.permit(:userid, :groupid, :content, :title)
	  end 

end
