"use strict";

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: './app',
        routers: './routers',
        templates: './templates',
        views: './views',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        jquerymobile: 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min'
    }
});

// Start the main app logic.
define([
    'jquery',
    'underscore',
    'backbone',
    'routers/router'
    ],
function($, _, Backbone, Router) {

    $(document).ready(function() {
        console.log("app");
        var router = new Router();
    });
});