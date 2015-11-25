require 'test_helper'

class GroupTest < ActiveSupport::TestCase

  def setup
  	@group = Group.new(
  		title: "Help write tests!",
  		subject: "cs169",
  		description: "Wow this is great",
  		date: DateTime.new(2016, 07, 11, 20, 10, 0),
  		location: "Bechtel",
  		school: "UC Berkeley",
  		capacity: 1,
  		guestlist: 1,
  		#comments: ["t"],
  		privacy: 1,
  		host: "host_name"
  		)
  end

  test "assert true" do
    assert true
  end

  test "should be valid" do
  	assert @group.valid?
  end

  test "title should be present" do
  	@group.title = ""
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
  	@group.guestlist = nil
  	assert_not @group.valid?
  end

  test "host should be present" do
  	@group.host = nil
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

  test "capacity should be a number" do
    @group.capacity = "s"
    assert_not @group.valid?
  end

  test "guestlist should be nonnegative" do
    @group.guestlist = -1
    assert_not @group.valid?
  end

  test "guestlist should be nonzero" do
    @group.guestlist = 0
    assert_not @group.valid?
  end

  test "guestlist should be a number" do
    @group.guestlist = "s"
    assert_not @group.valid?
  end

end
