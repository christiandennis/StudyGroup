require 'test_helper'

class CommentControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

	test "should get index" do
    	get :index
    	assert_response :success
  	end

end
