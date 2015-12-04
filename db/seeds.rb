# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)





def get_school
    index = rand(0..5)
    schools = ["UC Berkeley", "Stanford", 
               "NYU", "CMU", "Ohio State" ]
    schools[index]
end

def get_class
	index = rand(0..5)
    classes = ["cs169", "cs150", 
               "gws50ac", "EE16a", "EE16b" ]
    classes[index]
end

def rand_num
	rand(5..18)

end

50.times do
     Group.create(
        title: FFaker::Food.fruit,
        subject: get_class,
        description: FFaker::Company.bs,
        date: DateTime.new(2016, 10, 21, 20, 10, 0),
        location: FFaker::Address.city,
        school: get_school,
        capacity: rand_num,
        guestlist: 1,
        host: FFaker::Name.first_name,
      ) 

end 