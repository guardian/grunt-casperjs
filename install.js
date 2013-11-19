'use strict'

var cp = require('child_process')
var fs = require('fs')
var path = require('path')


// Note that "which" doesn't work on windows.
cp.exec("casperjs --version", function(error, stdout, stderr) {
    if ( error ) {
        console.log("Casperjs not installed.  Please add as a dependency to your package.json.");
    } else {
        var casperVersion = stdout.replace(/^\s+|\s+$/g,'');
        cp.exec("casperjs '" + path.join(__dirname, "tasks", "lib", "casperjs-path.js") + "'", function(error, stdout, stderr) {
            var casperPath = stdout.replace(/^\s+|\s+$/g,'');
            console.log("Casperjs version " + casperVersion + " installed at " + casperPath);
            var casperExecutable = path.join(casperPath, "bin", "casperjs");
            fs.symlinkSync(casperExecutable, './casperjs');
        });
    }
}
