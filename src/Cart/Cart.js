"use strict";

const EmptyCartException = require("../Cart/EmptyCartException.js");
const UpdateCartException = require("../Cart/UpdateCartException");

module.exports = class Cart {

    //region private attributes
    #items;
    //endregion private attributes

    //region public methods
    constructor(items) {
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
        this.#items = items;
    }
    //endregion public methods
}