"use strict"

var htmlparser = require("htmlparser");

var HTMLElement = require("./html-element").HTMLElement,
	FilesHelpers = require("../utils/file-helpers");

module.exports.HTMLPage = class HTMLPage {
	constructor(data) {
        this._location = data.location;

        this._elements = this._parseHTMLElements(FilesHelpers.GetContents(this._location));
	}

    // Public Methods

    getElementByType(elementType) {
        var elements = [];

        for (var i=0; i<this._elements.length; i++) {
            elements = elements.concat(this._elements[i].getElementByType(elementType));
        }

        return elements;
    }

    getElementById(elementId) {
        var elements = [];

        for (var i=0; i<this._elements.length; i++) {
            elements = elements.concat(this._elements[i].getElementById(elementId));
        }

        return elements;
    }

    getElementByClass(elementClass) {
        var elements = [];

        for (var i=0; i<this._elements.length; i++) {
            elements = elements.concat(this._elements[i].getElementByClass(elementClass));
        }

        return elements;
    }

    // Private Methods

    _parseHTMLElements(htmlContents) {
        var elements = [];

        var parser =  new htmlparser.Parser(new htmlparser.DefaultHandler(function (err, dom) {
            if (err) {
                console.log("Unable to parse HTML in " + this._location)
            }
            else {
                for (var i=0; i<dom.length; i++) {
                    if ((dom[i].name) && (dom[i].name.length)) {
                        elements.push(new HTMLElement({
                            type: dom[i].name,
                            attributes: dom[i].attribs,
                            children: dom[i].children
                        }));
                    }
                }
            }
        }));
        parser.parseComplete(htmlContents);

    	return elements;
    }
}