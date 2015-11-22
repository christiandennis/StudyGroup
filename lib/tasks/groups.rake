namespace :groups do
  desc "TODO"
  task delete_expired: :environment do
  	puts "YO"
  	Group.where('date <= ?', DateTime.now).destroy_all
  end

end