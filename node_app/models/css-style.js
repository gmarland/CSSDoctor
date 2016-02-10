"use strict"

var Property = require("./property").Property;

module.exports.CSSStyle = class CSSStyle {
	constructor(data) {
		this._name = data.name;
		this._group = data.group;

		this._properties = this._parseProperties(data.styles);
	}

	_parseProperties(styles) {
		var trimmedStyles = styles.replace(/\r?\n|\r/g, "").replace(/ +(?= )/g, "").trim();
		trimmedStyles = trimmedStyles.substring(1, (trimmedStyles.length-1))

		var properties = [];

		var allStyles = trimmedStyles.split(";");

		for (var i=0; i<allStyles.length; i++) {
			if ((allStyles[i].length) && (allStyles[i].indexOf(":") > -1)) {
				var styleParts = allStyles[i].split(":");

				properties.push(new Property({
					type: styleParts[0].trim(),
					value: styleParts[1].trim()
				}));
			}
		}

		return properties;
	}
}