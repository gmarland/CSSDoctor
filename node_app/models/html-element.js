"use strict"

module.exports.HTMLElement = class HTMLElement {
	constructor(data) {
		this._element = data.element;

		this._type = this._getElementType(data.element);
		this._id = this._getElementId(data.element);
		this._class = this._getElementClass(data.element);
		this._style = this._getElementStyle(data.element);
	}

	_getElementType(element) {
		var elementParts = [];

		if (element.endsWith("/>")) elementParts = element.substring(1,element.length-2).split(" ");
		else elementParts = element.substring(1,element.length-1).split(" ");

		if (elementParts.length > 0) return elementParts[0];
		else return "";
	}

	_getElementId(element) {
		var found = element.match(/id="([^"]*?)"/);

		if (found) return found[1];
		else return "";
	}

	_getElementClass(element) {
		var found = element.match(/class="([^"]*?)"/);

		if (found) return found[1];
		else return "";
	}

	_getElementStyle(element) {
		var found = element.match(/style="([^"]*?)"/);

		if (found) return found[1];
		else return "";
	}
}