"use strict"

module.exports.HTMLElement = class HTMLElement {
	constructor(data) {
		this._type = data.type;
		
		this._id = "";
		this._class = "";
		this._style = "";

		for (var attribute in data.attributes) {
			if (attribute.toLowerCase() == "id") this._id = data.attributes[attribute];
			if (attribute.toLowerCase() == "class") this._class = data.attributes[attribute];
			if (attribute.toLowerCase() == "style") this._style = data.attributes[attribute];
		}

		this._children = [];

		if(data.children) {
			for (var i=0; i<data.children.length; i++) {
	            if ((data.children[i].name) && (data.children[i].name.length)) {
	                this._children.push(new HTMLElement({
	                    type: data.children[i].name,
	                    attributes: data.children[i].attribs,
	                    children: data.children[i].children
	                }));
	            }
			}
		}
	}
}