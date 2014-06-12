var path = require('path'),
	os = require('os'),
	exec = require('child_process').exec;

/**
 * 本文件是 Gruntfile.js 默认模板，请根据需要和注释提示自行修改
 */
module.exports = function (grunt) {

	var file = grunt.file;
	var task = grunt.task;
	var pathname = path.basename(__dirname);
	
	var all_files = ['*.js', '*.css', '!node_modules/**/*','!Gruntfile.js', '!build/*'];

	// ======================= 配置每个任务 ==========================
	
	// 如果 Gruntfile.js 编码为 gbk，打开此注释
	// grunt.file.defaultEncoding = 'gbk';
	//
    grunt.initConfig({
         pkg: grunt.file.readJSON('package.json'),

		// 从 abc.json 中读取配置项
      //  pkg: grunt.file.readJSON('abc.json'),

        // 对build目录进行清理
        clean: {
            build: {
                src: 'build/*'
			}
        },
		
        // 编译LESS为CSS 
		// https://github.com/gruntjs/grunt-contrib-less
        less: {
            options: {
                paths: './'
            },
            main: {
                files: [
                    {
                        expand: true,
						cwd:'./',
                        src: ['*.less'],
                        dest: 'build/',
                        ext: '.css'
                    },{
                        expand: true,
                        cwd:'demo/',
                        src: ['*.less'],
                        dest: 'demo/',
                        ext: '.css'
                    }
                ]
            }
        },

        // 压缩JS https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %><%= grunt.template.today("yyyy-mm-dd") %> */',
                beautify: {
                    ascii_only: true
                }
            },
            main:{
                files:[
                    {
                        expand:true,
                        cwd:'./',
                        src: ['*.js','!*-min.js','!Gruntfile.js'],
                        dest: 'build/',
                        ext:'-min.js'
                    }
                ]
            }
        },

        // 压缩CSS https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['*.css', '!*-min.css'],
                        dest: 'build/',
                        ext: '-min.css'
                    }
                ]
            }
        },

		// 监听JS文件和LESS文件的修改
        watch: {
            'all': {
                files: ['./*.js', './*.less'],
                tasks: ['build']
            }
		},

		// 拷贝文件
		copy : {
			main: {
				files:[
					{
						expand:true,
						src: all_files, 
						dest: 'build/', 
						cwd:'./',
						filter: 'isFile'
					}
				]
			}
		}
    });

	// ======================= 载入使用到的通过NPM安装的模块 ==========================
	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// 默认构建任务
	grunt.registerTask('build', '默认构建任务', function() {
		task.run(['clean:build', 'less', 'copy','uglify', 'cssmin']);
	});

	/*
	 * 获取当前库的信息
	 **/
	grunt.registerTask('info', '获取库的路径', function() {
		var abcJSON = {};
		try {
			abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
			console.log('\n'+abcJSON.repository.url);
		} catch (e){
			console.log('未找到abc.json');
		}
	});
};
