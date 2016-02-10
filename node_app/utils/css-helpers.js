
exports.CleanStyleNames = function(classNames) {
	var cleanedNames = [];

	for (var i=0; i<classNames.length; i++) {
		cleanedNames.push(classNames[i].trim());
	}

	return cleanedNames;
};

exports.GetStyleType = function(name) {
	var className = name;

	if(name.indexOf(" ") > -1) {
		var nameParts = name.split(" ");

		className = nameParts[nameParts.length-1];
	}

	var indexOfId = className.lastIndexOf("#"),
		indexOfClass = className.lastIndexOf(".");

	if ((indexOfId == -1) && (indexOfClass == -1)) return "element";
	else if (indexOfClass > indexOfId) return "class";
	else return "id";
}