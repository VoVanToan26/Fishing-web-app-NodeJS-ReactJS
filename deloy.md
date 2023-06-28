#install apache
sudo apt update
sudo apt install apache2

#install mysql : 
sudo apt install mysql-server

#test mysql : 
sudo mysql -u root -p
mysql> exit

#instal php 8.1
sudo apt install php libapache2-mod-php php-mysql
php -v 


#install php extention
sudo apt-get install php libapache2-mod-php php-dev php-zip php-curl php-pear php-mbstring php-mysql php-gd php-xml curl -y 

#install composser
curl -sS https://getcomposer.org/installer | php sudo mv composer.phar /usr/local/bin/composer sudo chmod +x /usr/local/bin/composer 
composer --version

#Creat project
/var/www/html

# setting virtual host
# Setting đường link , tới thư mục góc và khi bị lỗi NOT FOUND
https://tailieu.hostingviet.vn/cach-sua-loi-the-requested-url-was-not-found-on-this-server-laravel/


# Lỗi acess denied 
# SQLSTATE[HY000] [1698] Access denied for user 'root'@'localhost'
 sudo mysql -u root -p
	# Xem bảng thông tin 
	select user, host, plugin from mysql.user;
	# Sửa plugin cho user root 
	 update mysql.user set plugin='mysql_native_password' where user='root';
	# Check lại 
	select user, host, plugin from mysql.user;
	flush privileges;	
	exit;

## install NODe js
sudo apt update
sudo apt-get install nodejs
sudo apt install npm

# sudo apt remove nodejs
# sudo apt remove npm


#
/etc/apache2/sites-available# sudo nano ecommert.conf 

## Open upload s folder 
<VirtualHost *:80>
    ServerName ecommerce-app.vantoanvo.vntp.com
    DocumentRoot /var/www/html/ecommerce/frontend/build
    <Directory /var/www/html/ecommerce>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
Alias /uploads /var/www/html/ecommerce/uploads
<Directory /var/www/html/ecommerce/uploads>
    Options Indexes FollowSymLinks
    Require all granted
</Directory>

</VirtualHost>

sudo a2ensite ecommert-app.conf
sudo service apache2 restart

### in cliet or working directory
# edit file in frontend/public/.htcasee 
    Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]

## in root folder 

# Use Filzilla to chaneg 
# send root folder except frontend 
# send frontend/build folder

# add cors fro backend and front end
# add base for axios libraries in App.js
# Config file env

cd frontend && npm install && npm run build  
# npm install serve -g   
# serve -s build     => to test 


### in sever 
cd /var/www/ecommerce/ 
npm start 

Let start 


!/bin/bash

cd /var/www/html/ecommerce
npm start
https://chat.openai.com/?model=text-davinci-002-render-sha
