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
        this.#currency = this.getItemsCurrency(items);
        this.add(items);
    }

    get items() {
        if (this.#items === null) {
            throw new EmptyCartException();
        }
        return this.#items;
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

    get currency() {
        return this.#currency;
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
        if (this.#items === null && items === null) {
            throw new UpdateCartException();
        }
        items.forEach(item => {
            if (item.currency !== this.#currency) {
                throw new MultipleCurrenciesException();
            }
        });
        this.#items = items;
    }

    getItemsCurrency(items, defaultCurrency = "CHF") {
        if (items.length === 0) {
            return defaultCurrency
        }
        const selectedCurrency = items[0].currency
        items.forEach((item) => {
          if (item.currency !== selectedCurrency) {
            throw new MultipleCurrenciesException()
          }
        })
        return selectedCurrency
    }
    //endregion public methods
}