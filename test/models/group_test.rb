require 'test_helper'

class GroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
  	@group = Group.new(
  		title: "s",
  		subject: "s",
  		description: "t",
  		date: 1.5,
  		location: "s",
  		school: "s",
  		capacity: 1,
  		guestlist: "t",
  		comments: "t",
  		privacy: 1,
  		host: 1
  		)
  end

  test "should be valid" do
  	assert @group.valid?
  end

  test "title should be present" do
  	@group.title = "     "
  	assert_not @group.valid?
  end

  test "subject should be present" do
  	@group.subject = "     "
  	assert_not @group.valid?
  end

  test "description should be present" do
  	@group.description = "     "
  	assert_not @group.valid?
  end

  test "date should be present" do
  	@group.date = nil
  	assert_not @group.valid?
  end

  test "location should be present" do
  	@group.location = "     "
  	assert_not @group.valid?
  end

  test "school should be present" do
  	@group.school = "     "
  	assert_not @group.valid?
  end

  test "capacity should be present" do
  	@group.capacity = nil
  	assert_not @group.valid?
  end

  test "guestlist should be present" do
  	@group.guestlist = "     "
  	assert_not @group.valid?
  end

  test "privacy should be present" do
  	@group.privacy = nil
  	assert_not @group.valid?
  end

  test "host should be present" do
  	@group.host = nil
  	assert_not @group.valid?
  end

  test "going should be present" do
  	@group.going = "     "
  	assert_not @group.valid?
  end

  test "capacity should be nonnegative" do
  	@group.capacity = -1
  	assert_not @group.valid?
  end

  test "capacity should be nonzero" do
  	@group.capacity = 0
  	assert_not @group.valid?
  end

  test "host should be nonnegative" do
  	@group.host = -1
  	assert_not @group.valid?
  end

  test "host should be nonzero" do
  	@group.host = 0
  	assert_not @group.valid?
  end

end
