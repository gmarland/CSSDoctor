"use strict"

var ElementStyle = require("./element-style").ElementStyle,
	IdStyle = require("./id-style").IdStyle,
	ClassStyle = require("./class-style").ClassStyle,
	CSSHelpers = require("../utils/css-helpers"),
    FilesHelpers = require("../utils/file-helpers");

module.exports.StyleSheet = class StyleSheet {
    constructor(data) {
        this._location = data.location;

        this._styles = this._parseStyles(FilesHelpers.GetContents(this._location));
    }

    // Public Methods

    getStyles() {
        return this._styles;
    }

    // Private Methods

    _parseStyles(cssContents) {
    	var styles = [];

    	var found = cssContents.match(/([\#\.][a-z0-9\-_]*)(.*?){([^}]*)}/ig);

        if (found) {
        	for (var i=0; i<found.length; i++) {
        		var styleContents = found[i].match(/{([^}]*)}/ig),
        			allStylesNames = CSSHelpers.CleanStyleNames(found[i].replace(styleContents, "").trim().split(","));

        		for (var j=0; j<allStylesNames.length; j++) {
        			var styleData = {
                        stylesheet: this._location,
    	    			name: allStylesNames[j],
    	    			group: allStylesNames,
    	    			styles: styleContents[0]
    	    		};

        			switch (CSSHelpers.GetStyleType(allStylesNames[j])) {
        				case "element":
    		    			styles.push(new ElementStyle(styleData));
    		    			break;
        				case "class":
    		    			styles.push(new ClassStyle(styleData));
    		    			break;
        				case "id":
    		    			styles.push(new IdStyle(styleData));
    		    			break;
    		    	}
        		}
        	}
        }

    	return styles;
    }
}