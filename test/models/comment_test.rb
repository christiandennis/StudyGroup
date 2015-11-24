require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
  	@comment = Comment.new(
  		userid: "s",
  		groupid: 1,
  		content: "t"
  		)
  end

  test "should be valid" do
  	assert @comment.valid?
  end

  test "userid should be present" do
  	@comment.userid = "     "
  	assert_not @comment.valid?
  end

  test "groupid should be present" do
  	@comment.groupid = nil
  	assert_not @comment.valid?
  end

  test "content should be present" do
  	@comment.content = "     "
  	assert_not @comment.valid?
  end

  test "groupid should be nonnegative" do
  	@comment.groupid = -1
  	assert_not @comment.valid?
  end

  test "groupid should be nonzero" do
  	@comment.groupid = 0
  	assert_not @comment.valid?
  end

  test "groupid should be a number" do
    @comment.groupid = "s"
    assert_not @comment.valid?
  end

end
