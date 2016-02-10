"use strict"

var HTMLPage = require("./html-page").HTMLPage,
	FilesHelpers = require("../utils/file-helpers");

module.exports.HTMLPageSet = class HTMLPageSet {
	constructor(data) {
        this._location = data.location;

        this._pages = this._getPages(data.location, data.fileTypes);
	}

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