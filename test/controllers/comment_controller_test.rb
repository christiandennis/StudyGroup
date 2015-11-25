require 'test_helper'

class CommentControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

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
