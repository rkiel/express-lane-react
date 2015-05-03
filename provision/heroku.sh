#!/usr/bin/env bash
echo "Installing Heroku toolbelt"
wget -qO- https://toolbelt.heroku.com/install.sh | /bin/bash
echo "Heroku toolbelt installed"

echo "Adding Heroku toolbelt to bashrc"
echo 'PATH="/usr/local/heroku/bin:$PATH"' >> /home/vagrant/.profile
echo "Heroku toolbelt added to bashrc"

