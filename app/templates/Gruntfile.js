var path = require('path'),
	os = require('os'),
	exec = require('child_process').exec;

/**
 * ���ļ��� Gruntfile.js Ĭ��ģ�壬�������Ҫ��ע����ʾ�����޸�
 */
module.exports = function (grunt) {

	var file = grunt.file;
	var task = grunt.task;
	var pathname = path.basename(__dirname);
	
	var all_files = ['*.js', '*.css', '!node_modules/**/*','!Gruntfile.js', '!build/*'];

	// ======================= ����ÿ������ ==========================
	
	// ��� Gruntfile.js ����Ϊ gbk���򿪴�ע��
	// grunt.file.defaultEncoding = 'gbk';
	//
    grunt.initConfig({
         pkg: grunt.file.readJSON('package.json'),

		// �� abc.json �ж�ȡ������
      //  pkg: grunt.file.readJSON('abc.json'),

        // ��buildĿ¼��������
        clean: {
            build: {
                src: 'build/*'
			}
        },
		
        // ����LESSΪCSS 
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

        // ѹ��JS https://github.com/gruntjs/grunt-contrib-uglify
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

        // ѹ��CSS https://github.com/gruntjs/grunt-contrib-cssmin
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

		// ����JS�ļ���LESS�ļ����޸�
        watch: {
            'all': {
                files: ['./*.js', './*.less'],
                tasks: ['build']
            }
		},

		// �����ļ�
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

	// ======================= ����ʹ�õ���ͨ��NPM��װ��ģ�� ==========================
	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Ĭ�Ϲ�������
	grunt.registerTask('build', 'Ĭ�Ϲ�������', function() {
		task.run(['clean:build', 'less', 'copy','uglify', 'cssmin']);
	});

	/*
	 * ��ȡ��ǰ�����Ϣ
	 **/
	grunt.registerTask('info', '��ȡ���·��', function() {
		var abcJSON = {};
		try {
			abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
			console.log('\n'+abcJSON.repository.url);
		} catch (e){
			console.log('δ�ҵ�abc.json');
		}
	});
};
