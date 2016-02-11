"use strict"

var HTMLPage = require("./html-page").HTMLPage,
	FilesHelpers = require("../utils/file-helpers");

module.exports.HTMLPageSet = class HTMLPageSet {
	constructor(data) {
        this._location = data.location;

        this._pages = this._getPages(data.location, data.fileTypes);
	}

    // Public Methods

    getElementByType(elementType) {
    	var elements = [];

    	for (var i=0; i<this._pages.length; i++) {
    		elements = elements.concat(this._pages[i].getElementByType(elementType));
    	}

        return elements;
    }

    getElementById(elementId) {
    	var elements = [];

    	for (var i=0; i<this._pages.length; i++) {
    		elements = elements.concat(this._pages[i].getElementById(elementId));
    	}

        return elements;
    }

    getElementByClass(elementClass) {
    	var elements = [];

    	for (var i=0; i<this._pages.length; i++) {
    		elements = elements.concat(this._pages[i].getElementByClass(elementClass));
    	}

        return elements;
    }

    // Private Methods

    _getPages(location, fileTypes) {
    	var pages = [];

    	var allHTMLFiles = FilesHelpers.GetFiles(location, fileTypes);

		for (var i=0; i<allHTMLFiles.length; i++) {
			pages.push(new HTMLPage({
				location: allHTMLFiles[i]
			}));
		}

		return pages;
    }
}