
var path = require("path"),
	fs = require("fs");

var getFiles = function (location, filter) {
	var returnFiles = [];

	var files = fs.readdirSync(location),
		filters = [];

	if (filter) filters = filter.split(",");

	for (var i=0; i<files.length; i++) {
		var absPath = path.join(location, files[i]),
			dirItem = fs.statSync(absPath);
		
		if (dirItem.isDirectory()) {
			var childFiles = getFiles(absPath, filter);

			for (var j=0; j<childFiles.length; j++) {
				returnFiles.push(childFiles[j]);
			}
		}
		else {
			if (filters.length > 0) {
				var includeFile = false;

				for (var j=0; j<filters.length; j++) {
					if (absPath.endsWith(filters[j].trim())) {
						includeFile = true;
						break;
					}
				}

				if (includeFile) returnFiles.push(absPath);
			}
			else returnFiles.push(absPath);
		}
	}

	return returnFiles;
}


exports.GetFiles = getFiles;

exports.GetContents = function(location) {
	return fs.readFileSync(location).toString();
}