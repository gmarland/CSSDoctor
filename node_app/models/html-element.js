"use strict"

module.exports.HTMLElement = class HTMLElement {
	constructor(data) {
		this._type = data.type;
		
		this._id = "";
		this._classes = [];
		this._style = "";

		for (var attribute in data.attributes) {
			if (attribute.toLowerCase() == "id") this._id = data.attributes[attribute];
			if (attribute.toLowerCase() == "class") {
				var classes = data.attributes[attribute].split(" ");

				for (var i=0; i<classes.length; i++) {
					this._classes.push(classes[i].trim());
				}
			}
			if (attribute.toLowerCase() == "style") this._style = data.attributes[attribute];
		}

		this._children = [];

		if(data.children) this._children = this._addChildren(data.children);
	}

    // Public Methods

    getIsElementType(elementType) {
        var elements = [];

        if (this._type.toLowerCase() == elementType.toLowerCase()) elements.push(this);

        return elements;
    }

    getIsElementId(elementId) {
        var elements = [];

        if (this._id == elementId) elements.push(this);

        return elements;
    }

    getIsElementClass(elementClass) {
        var elements = [];

        for (var i=0; i<this._classes.length; i++) {
        	if (this._classes[i] == elementClass) {
        		elements.push(this);
        		break;
    		}
        }

        return elements;
    }

    getElementByType(elementType) {
        var elements = [];

        if (this._type.toLowerCase() == elementType.toLowerCase()) elements.push(this);

        for (var i=0; i<this._children.length; i++) {
            elements = elements.concat(this._children[i].getElementByType(elementType));
        }

        return elements;
    }

    getElementById(elementId) {
        var elements = [];

        if (this._id == elementId) elements.push(this);

        for (var i=0; i<this._children.length; i++) {
            elements = elements.concat(this._children[i].getElementById(elementId));
        }

        return elements;
    }

    getElementByClass(elementClass) {
        var elements = [];

        for (var i=0; i<this._classes.length; i++) {
        	if (this._classes[i] == elementClass) {
        		elements.push(this);
        		break;
    		}
        }

        for (var i=0; i<this._children.length; i++) {
            elements = elements.concat(this._children[i].getElementByClass(elementClass));
        }

        return elements;
    }

    // Private Methods

    _addChildren(children) {
    	var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\"":<>\?]/);

    	var returnChildren = [];

    	if (children) {
			for (var i=0; i<children.length; i++) {
	    		if (pattern.test(children[i].name)) {
	    			returnChildren = returnChildren.concat(this._addChildren(children[i].children));
	    		}
	            else if ((children[i].name) && (children[i].name.length)) {
	                returnChildren.push(new HTMLElement({
	                    type: children[i].name,
	                    attributes: children[i].attribs,
	                    children: children[i].children
	                }));
	            }
			}
		}

		return returnChildren;
    }
}