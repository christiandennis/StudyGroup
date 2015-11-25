require 'test_helper'

class GroupsControllerTest < ActionController::TestCase
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
  	end

	test "should get index" do
    	get :index
    	assert_response :success
 	end

 	test "should get handle weird error" do
 		get :handle_weird_error
 		assert_response :success
 	end

 	test "should get create" do
 		get :create
 		assert_response :success
 	end

 	test "should get userindex" do
 		get :userindex
 		assert_response :success
 	end

 	test "should get deletewithid" do
 		get :deletewithid
 		assert_response :success
 	end

 	test "should get usergroups" do
 		get :usergroups
 		assert_response :success
 	end

 	test "should get addremoveuser" do
 		get :addremoveuser
 		assert_response :success
 	end

 	test "should get update" do
 		get :update
 		assert_response :success
 	end

 	test "should get show" do
 		get :show
 		assert_response :success
 	end

 	test "should get search" do
 		get :search
 		assert_response :success
 	end

end
