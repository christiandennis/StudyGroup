require 'test_helper'

class CommentControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

    def setup
      @user = users(:confirmed_email_user)
        @user.save!

        @auth_headers = @user.create_new_auth_token

        @token     = @auth_headers['access-token']
        @client_id = @auth_headers['client']
        @expiry    = @auth_headers['expiry']

        @request.headers["access-token"] = @auth_headers['access-token']
        @request.headers["client"] = @auth_headers['client']
        @request.headers["uid"] = @auth_headers['uid']
    end

	  test "should get index" do
    	get :index
    	assert_response :success
  	end

  	test "should get create" do
  		get :create
  		assert_response :success
  	end

  	test "should get show" do
  		get :show
  		assert_response :success
  	end

  	test "should get commentsInGroup" do
  		get :commentsInGroup
  		assert_response :success
  	end

end
