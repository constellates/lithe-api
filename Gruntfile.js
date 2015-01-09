module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-jsdoc');

    // Project configuration.
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ['app.js', './routes/*.js', './config/*.js'],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'docs',
                    template: './node_modules/grunt-jsdoc/node_modules/ink-docstrap/template'
                }
            }
        }
    });

};