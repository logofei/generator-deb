'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var DebGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        //this.installDependencies();
      }
    });
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
	
	var dirsrc = path.join(this.widgetName + '/');
	
    this.mkdir(path.join(dirsrc , 'build'));
    this.mkdir(path.join(dirsrc , 'demo'));
	
	this.template('index.html',path.join(dirsrc , 'demo/index.html'));
	this.template('index.js',path.join(dirsrc , 'index.js'));
	this.copy('index.less',path.join(dirsrc , 'index.less'));
	
	this.copy('.gitignore',path.join(dirsrc , '.gitignore'));
	this.copy('Gruntfile.js',path.join(dirsrc , 'Gruntfile.js'));
	this.template('_package.json', path.join(dirsrc , 'package.json'));
	
//	this.template('abc.json',path.join(dirsrc , 'abc.json'));
    this.copy('README.md',path.join(dirsrc , 'README.md'));
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

//util.inherits(DebGenerator,yeoman.generators.NamedBase);

module.exports = DebGenerator;
