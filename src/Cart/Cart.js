"use strict";

const EmptyCartException = require("../Cart/EmptyCartException.js");
const UpdateCartException = require("../Cart/UpdateCartException");
const MultipleCurrenciesException = require("../Cart/MultipleCurrenciesException");

module.exports = class Cart {

    //region private attributes
    #items;
    #currency;
    //endregion private attributes

    //region public methods
    constructor(items = []) {
        this.currency = this.getItemsCurrency(items);
        this.add(items);
    }

    get items() {
        if (this.#items === null) {
            throw new EmptyCartException();
        }
        return this.#items;
    }

    get currency() {
        return this.#currency;
    }

    set currency(currency) {
        this.#currency = currency;
    }

    get total() {
        if (this.#items === null) {
            throw new EmptyCartException();
        }
        let total = 0;
        this.#items.forEach(item => {
            total += item.quantity * item.price;
        });
        return total;
    }

    priceAverage() {
        if (this.#items === null) {
            throw new EmptyCartException();
        }
        return this.total / this.count();
    }

    count(distinct = false) {
        if (this.#items === null) {
            throw new EmptyCartException();
        } else if (distinct) {
            return this.#items.length;
        }
        let count = 0;
        this.#items.forEach(item => {
            count += item.quantity;
        });
        return count;
    }

    add(items) {
        items.forEach(item => {
            if (item.currency !== this.getItemsCurrency(items)) {
                throw new MultipleCurrenciesException();
            }
        });
        this.#items = items;
    }

    getItemsCurrency(items, defaultCurrency = "CHF") {
        if (items.length === 0) {
            return defaultCurrency
        }
        let selectedCurrency = items[0].currency
        items.forEach((item) => {
          if (item.currency !== selectedCurrency) {
            throw new MultipleCurrenciesException()
          }
        });
        return selectedCurrency
    }

    reset() {
        this.#items = [];
    }
    //endregion public methods
}