"use strict"

var HTMLElement = require("./html-element").HTMLElement,
	FilesHelpers = require("../utils/file-helpers");

module.exports.HTMLPage = class HTMLPage {
	constructor(data) {
        this._location = data.location;

        this._elements = this._parseHTMLElements(FilesHelpers.GetContents(this._location));
	}

    _parseHTMLElements(htmlContents) {
    	var elements = [];

    	var found = htmlContents.match(/(<([^>]+)>)/ig);

    	for (var i=0; i<found.length; i++) {
    		if (!found[i].replace(/ /ig, "").startsWith("</")) elements.push(new HTMLElement({
    			element: found[i]
    		}));
	    }

    	return elements;
    }
}