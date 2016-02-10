"use strict"

module.exports.Property = class Property {
    constructor(data) {
        this._name = data.type;
        this._value = data.value;
    }
}