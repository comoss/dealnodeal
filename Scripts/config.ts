/// <reference path="./main.ts" />

require.config({
    baseUrl: 'Scripts/Dist/Scripts',
 
    paths: {},
 
    shim: {}
});
 
// load AMD module main.ts (compiled to main.js) 

require(['main'], (main) => {
 
    var app = main;
    app.run();
 
});