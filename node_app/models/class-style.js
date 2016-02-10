"use strict"

var CSSStyle = require("./css-style").CSSStyle;

module.exports.ClassStyle = class ClassStyle extends CSSStyle {
	constructor(data) {
		super(data);
	}
}