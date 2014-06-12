'use strict';
var util = require('util');
var path = require('path');
//var exec = require('child_process').exec;
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var DebGenerator = yeoman.generators.Base.extend({
  init: function () {
    //this.pkg = require('../package.json');
	
	 this.on('end', function () {
		var cb = this.async();
		var that = this;
		this.prompt([{
				name: 'npm_install',
				message: 'Install node_modules for grunt now?',
				default: 'Y/n',
				warning: ''
			}], function (props,err) {
				if (err) {
					return this.emit('error', err);
				}
				this.npm_install = (/^y/i).test(props.npm_install);
				if(this.npm_install){
					this.installDependencies();
				} else {
					console.log('\n\nplease run "npm install" before grunt\n');
				}
			}.bind(this));
    }.bind(this));
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Deb generator!'));

    var prompts = [{
        name: 'author',
        message: 'author of component:',
        default: 'author'
    },{
        name: 'email',
        message: 'email of author:',
        default: 'email'
    },{
        name: 'debName',
        message: 'name of widget',
		default: 'slide'
    }];

    this.prompt(prompts, function (props) {
	  this.author = props.author;
	  this.email = props.email;
      this.widgetName = (props.debName).toLowerCase(); //模块名 全部小写
	  this.className = this.widgetName.substr(0,1).toUpperCase() + this.widgetName.substring(1);  //类名 第一个字母大写

      done();
    }.bind(this));
  },

  app: function () {
	this.mkdir(this.widgetName);
	process.chdir('./' + this.widgetName);
	
    this.mkdir('build');
    this.mkdir('demo');
	this.mkdir('img');
	
    this.copy('index.html','demo/index.html');
    this.copy('index.js','index.js');
    this.copy('index.less','index.less');
	
    this.copy('_.gitignore','.gitignore');
    this.copy('_Gruntfile.js','Gruntfile.js');
    this.copy('_package.json', 'package.json');
	
    //this.template('abc.json',path.join(dirsrc , 'abc.json'));
    this.copy('_README.md','README.md');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});


//util.inherits(DebGenerator,yeoman.generators.NamedBase);

module.exports = DebGenerator;
