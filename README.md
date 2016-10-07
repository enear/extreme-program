# Near Extreme Program app

# Getting Started

1. Install Tool Dependencies
 - Install Node.js on your machine ( version? )
 - [Install Grunt on your machine](http://gruntjs.com/getting-started#installing-the-cli)
 - [Install Ruby on your machine](http://www.ruby-lang.org/en/documentation/installation/)
 - [Install Sass](http://sass-lang.com/install)
   - Note: Certificate issue - Use "gem install sass --source http://rubygems.org"
 - [Install Bower on your machine](https://bower.io/#install-bower)
 - [Install MongoDB on your machine](https://www.mongodb.com/download-center#community)
   - Note: Set up MongoDB environment
     - Create a Folder on "C:\data\db" to old the db files or set your dbpaths
     - Launch your DB process, i.e. Windows: "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
 
 
2. Download Code Dependencies
   - Run `npm install` on the root folder
   - Run `bower install` on the root folder

3. Configure your server
   - Add a `config.js` to your root folder
   - Copy the following into the file and edit accordingly: 
 ```javascript
  module.exports = function(){
     process.env.MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/app_test';
     process.env.IP_ADDRESS = '127.0.0.1';
     process.env.PORT_NUMBER = 3000;

     process.env.APP_SECRET = 'Secret';
  }();
  ```
 
4. Transform your code to run
 - Run `grunt` on the root folder

5. Access the app on a HTTP server
 - Launch a browser and navigate to the ip and port you specified i.e. "127.0.0.1:3000"