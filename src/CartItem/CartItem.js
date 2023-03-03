"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");
const InvalidCurrencyException = require("./InvalidCurrencyException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    #currency;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price, currency = "CHF") {
        if (articleId < 1) {
            throw new InvalidArticleIdException();
        }
        if (currency.length !== 3) {
            throw new InvalidCurrencyException();
        }
        this.#articleId = articleId;
        this.#name = name;
        this.quantity = quantity;
        this.price = price;
        this.#currency = currency;
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        if (value < 1) {
            throw new InvalidQuantityException();
        }
        this.#quantity = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (value < 10) {
            throw new InvalidPriceException();
        }
        this.#price = value;
    }

    get currency() {
        return this.#currency;
    }

    get total() {
        return this.#quantity * this.#price;
    }
    //endregion public methods

    //region private methods
    //endregion private methods
}



