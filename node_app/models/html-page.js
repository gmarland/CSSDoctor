"use strict"

var htmlparser = require("htmlparser");

var HTMLElement = require("./html-element").HTMLElement,
	FilesHelpers = require("../utils/file-helpers");

module.exports.HTMLPage = class HTMLPage {
	constructor(data) {
        this._location = data.location;

        this._elements = this._parseHTMLElements(FilesHelpers.GetContents(this._location));
        console.log(this._elements);
	}

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