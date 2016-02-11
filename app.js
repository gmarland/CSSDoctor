var path = require("path");

var StyleSheetSet = require("./node_app/models/stylesheet-set").StyleSheetSet;
	HTMLPageSet = require("./node_app/models/html-page-set").HTMLPageSet;

var cssPath = null,
	htmlPath = null;

if(process.argv.indexOf("-css") != -1) cssPath = process.argv[process.argv.indexOf("-css") + 1];
else console.log("Provide a path to your CSS folder using -css");

if(process.argv.indexOf("-html") != -1) htmlPath = process.argv[process.argv.indexOf("-html") + 1];
else console.log("Provide a path to your HTML folder using -html");

if ((cssPath) && (htmlPath)) {
	var config = require(path.join(__dirname, "package.json")).config;

	console.log("Retrieving stylesheets...");

	var stylesheetSet = new StyleSheetSet({
		location: cssPath
	});

	console.log("Complete");

	console.log("Retrieving HTML...");

	var htmlPageSet = new HTMLPageSet({
		location: htmlPath,
		fileTypes: config.htmlFileTypes
	});

	console.log("Complete");

	console.log("The doctor is in!");
	console.log("");

	// Load the module for checking for unused styles

	var unusedStylesChecker = require("./node_app/controllers/unused-styles-checker");

	console.log(unusedStylesChecker.GetDescription());
	console.log("");
	unusedStylesChecker.Process(stylesheetSet, htmlPageSet);
}