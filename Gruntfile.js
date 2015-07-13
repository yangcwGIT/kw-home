/**
 * Created by Guoxing.han on 2015/7/7 0007.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //clean: {
        //    all: ['dist/*']
        //},

        less: {
            task1:{
                options: {
                    compress: false,
                    yuicompress: false
                },
                expand: true,
                src   : ['styles/*.less'],
                dest  : './',
                ext   : '.css'
            }
        },

        jshint    : {
            //files: ['src/pages/<%= grunt.config.get("page") %>/*.js'],
            files: {
                options: {
                    force  : true,
                    globals: {
                        jQuery : true,
                        console: true,
                        module : true
                    }
                },
                src    : ['scripts/index.js']
            }

        },
        copy      : {

            files: {
                src   : [
                    'bower_components/**/**/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                    'bower_components/**/**/js/swiper.jquery.min.js',
                    'bower_components/**/**/js/maps/swiper.jquery.min.js.map',
                    'bower_components/**/**/css/swiper.min.css',
                    'favicon.ico'
                ],
                dest  : 'dist/',
                filter: 'isFile'
            }

        },
        uglify    : {
            common: {

                options: {
                    banner: '/* \n *@name: <%= pkg.name %>\n *@author: <%= pkg.author %>\n *@date: <%= grunt.template.today("dd-mm-yyyy") %>\n*/\n'
                },
                files  : [{
                    expand: true,
                    src   : ['scripts/*.js'],
                    dest  : 'dist',
                    ext   : '-<%= pkg.timestamp %>.js'
                }]
            }
        },
        cssmin    : {

            common: {
                options: {
                    banner: '/* \n *@name: <%= pkg.name %>\n *@author: <%= pkg.author %>\n *@date: <%= grunt.template.today("dd-mm-yyyy") %>\n*/\n'
                },
                files  : [{
                    expand: true,
                    src   : ['styles/*.css'],
                    dest  : 'dist',
                    ext   : '-<%= pkg.timestamp %>.css'
                }]
            }
        },
        imagemin  : {
            common: {
                files: [{
                    expand: true,
                    src   : ['images/*.{png,jpg,gif,jpeg}', 'images/**/*.{png,jpg,gif,jpeg}'],
                    dest  : 'dist'
                }]
            }

        },
        dom_munger: {
            index  : {
                options: {
                    remove : ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append : [
                        {
                            selector: 'body',
                            html    : '<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>' +
                            '<script type="text/javascript" src="scripts/index-<%= pkg.timestamp %>.js"></script>' +
                            '<script type="text/javascript" src="scripts/jquery-fadethis-<%= pkg.timestamp %>.js"></script>'+
                            '<script type="text/javascript" src="scripts/statistics-<%= pkg.timestamp %>.js"></script>'

                        }
                    ],
                    prepend: [
                        {
                            selector: 'head',
                            html    : '<link rel="stylesheet" href="styles/reset-<%= pkg.timestamp %>.css" type="text/css"/>' + '<link rel="stylesheet" href="styles/index-<%= pkg.timestamp %>.css" type="text/css"/>'
                        }
                    ]
                },
                src    : 'index.html',
                dest   : 'dist/index.html'
            },
            about  : {
                options: {
                    remove : ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append : [
                        {
                            selector: 'body',
                            html    : '<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>' +
                            '<script type="text/javascript" src="bower_components/swiper/dist/js/swiper.jquery.min.js"></script>' +
                            '<script type="text/javascript" src="scripts/index-<%= pkg.timestamp %>.js"></script>'+
                            '<script type="text/javascript" src="scripts/statistics-<%= pkg.timestamp %>.js"></script>'
                        }
                    ],
                    prepend: [
                        {
                            selector: 'head',
                            html    : '<link rel="stylesheet" href="styles/reset-<%= pkg.timestamp %>.css" type="text/css"/>' +'<link rel="stylesheet" href="bower_components/swiper/dist/css/swiper.min.css" type="text/css"/>' + '<link rel="stylesheet" href="styles/index-<%= pkg.timestamp %>.css" type="text/css"/>'
                        }
                    ]
                },
                src    : 'about.html',
                dest   : 'dist/about.html'
            },
            contact: {
                options: {
                    remove : ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append : [
                        {
                            selector: 'body',
                            html    : '<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>' +
                            '<script type="text/javascript" src="scripts/superslide-<%= pkg.timestamp %>.js"></script>'+
                            '<script type="text/javascript" src="scripts/index-<%= pkg.timestamp %>.js"></script>'+
                            '<script type="text/javascript" src="scripts/statistics-<%= pkg.timestamp %>.js"></script>'

                        }
                    ],
                    prepend: [
                        {
                            selector: 'head',
                            html    : '<link rel="stylesheet" href="styles/reset-<%= pkg.timestamp %>.css" type="text/css"/>' + '<link rel="stylesheet" href="styles/index-<%= pkg.timestamp %>.css" type="text/css"/>'
                        }
                    ]
                },
                src    : 'contact.html',
                dest   : 'dist/contact.html'
            },

        },

        htmlmin: {
            options: {
                removeComments    : true,
                collapseWhitespace: true
            },
            html   : {
                files: [{
                    expand: true,
                    cwd   : 'dist',
                    src   : ['*.html'],
                    dest  : 'dist'
                }]
            }
        },

    });

    /**
     * 载入使用到的通过NPM安装的模块
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * 注册基本任务
     */

    grunt.registerTask('build', [
        'less:task1',
        'jshint:files',
        'copy:files',
        'uglify:common',
        'imagemin:common',
        'cssmin:common',
        'dom_munger:index',
        'dom_munger:about',
        'dom_munger:contact',
        'htmlmin'
    ]);
    grunt.registerTask('dist', ['build']);
}