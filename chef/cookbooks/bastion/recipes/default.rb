#
# Cookbook:: bastion
# Recipe:: default
#

# Include other recipes
include_recipe 'bastion::setup_users'
include_recipe 'bastion::hardening'
