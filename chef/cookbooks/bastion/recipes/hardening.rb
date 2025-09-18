# Disable root SSH login
execute 'disable_root_ssh' do
  command "sed -i '' 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config && systemsetup -f -setremotelogin off" 
  only_if "grep -q 'PermitRootLogin yes' /etc/ssh/sshd_config" 
end

# Update system packages
execute 'update_system' do
  command 'softwareupdate -ia'
end
