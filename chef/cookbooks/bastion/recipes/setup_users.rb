# Create bastion user
user 'bastion' do
  comment 'Bastion User'
  home '/home/bastion'
  shell '/bin/bash'
  manage_home true
  action :create
end

# Add user to admin group
group 'admin' do
  action :modify
  members ['bastion']
  append true
end
