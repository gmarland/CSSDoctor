
exports.GetDescription = function() {
	return "- Checking for unused styles";
};

exports.Process = function(stylesheetSet, htmlPageSet) {
	var styles = stylesheetSet.getAllStyles();

	var unusedStyles = [];

	for (var i=0; i<styles.length; i++) {
		var styleTree = styles[i].getStyleTree();

		var elements = null;

		for (var j=0; j<styleTree.length; j++) {
			var immediateChild = false;

			if (styleTree[j] == ">") {
				immediateChild = true;
				j++;
			}
			if (elements === null) {
				if (styleTree[j].startsWith("#")) elements = htmlPageSet.getElementById(styleTree[j].substring(1));
				else if (styleTree[j].startsWith(".")) elements = htmlPageSet.getElementByClass(styleTree[j].substring(1));
				else elements = htmlPageSet.getElementByType(styleTree[j]);
			}
			else {
				foundElements = [];

				for (var k=0; k<elements.length; k++) {
					if (immediateChild) {
						if (styleTree[j].startsWith("#")) foundElements = foundElements.concat(elements[k].getIsElementType(styleTree[j].substring(1)));
						else if (styleTree[j].startsWith(".")) foundElements = foundElements.concat(elements[k].getIsElementClass(styleTree[j].substring(1)));
						else foundElements = foundElements.concat(elements[k].getIsElementType(styleTree[j]));
					}
					else {
						if (styleTree[j].startsWith("#")) foundElements = foundElements.concat(elements[k].getElementById(styleTree[j].substring(1)));
						else if (styleTree[j].startsWith(".")) foundElements = foundElements.concat(elements[k].getElementByClass(styleTree[j].substring(1)));
						else foundElements = foundElements.concat(elements[k].getElementByType(styleTree[j]));	
					}
				}

				elements = foundElements;
			}

			if (elements.length === 0) {
				unusedStyles.push({
					stylesheet: styles[i].getStylesheet(),
					name: styles[i].getName()
				});
				break;
			}
		}
	}

	unusedStyles.sort(function (a, b) {
		return a.stylesheet.trim().toLowerCase() > b.stylesheet.trim().toLowerCase() ? 1 : a.stylesheet.trim().toLowerCase() < b.stylesheet.trim().toLowerCase() ? -1 : 0;
	});

	var currentSS = null;

	for (var i=0; i<unusedStyles.length; i++) {
		if (unusedStyles[i].stylesheet !== currentSS) {
			currentSS = unusedStyles[i].stylesheet;
			console.log("");
			console.log(unusedStyles[i].stylesheet);	
		}

		console.log(unusedStyles[i].name);
	}
};