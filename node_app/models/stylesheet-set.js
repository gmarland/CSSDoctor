"use strict"

var StyleSheet = require("./stylesheet").StyleSheet,
	FilesHelpers = require("../utils/file-helpers");

module.exports.StyleSheetSet = class StyleSheetSet {
    constructor(data) {
        this._location = data.location;

        this._stylesheets = this._getStylesheets(data.location);
    }

    // Public Methods

    getAllStyles() {
        var allStyles = [];

        for (var i=0; i<this._stylesheets.length; i++) {
            allStyles = allStyles.concat(this._stylesheets[i].getStyles());
        }

        return allStyles;
    }

    // Private Methods

    _getStylesheets(location) {
    	var stylesheets = [];

    	var allCssFiles = FilesHelpers.GetFiles(location, ".css");

		for (var i=0; i<allCssFiles.length; i++) {
			stylesheets.push(new StyleSheet({
				location: allCssFiles[i]
			}));
		}

		return stylesheets;
    }
}