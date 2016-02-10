"use strict"

var CSSStyle = require("./css-style").CSSStyle;

module.exports.ElementStyle = class ElementStyle extends CSSStyle {
	constructor(data) {
		super(data);
	}
}