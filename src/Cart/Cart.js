"use strict";

const EmptyCartException = require("../Cart/EmptyCartException.js");
const UpdateCartException = require("../Cart/UpdateCartException");
const InvalidPriceException = require("../CartItem/InvalidPriceException.js");

module.exports = class Cart {
    
        //region private attributes
        #items;
        //endregion private attributes
    
        //region public methods
        constructor(items) {
            this.#items = items;
        }
    
        get items() {
            if (this.#items == null) {
                throw new EmptyCartException();
            }
            return this.#items;
        }
    
        get total() {
            if (this.#items == null) {
                throw new EmptyCartException();
            }
    
            let total = 0;
            for (let i = 0; i < this.#items.length; i++) {
                total += this.#items[i].quantity * this.#items[i].price;
            }
            return total;
        }

        count(distinct = false) {
            if (this.#items == null) {
                throw new EmptyCartException();
            }
            let count = 0;
            if (distinct) {
                return this.#items.length;
            }
            this.#items.forEach(item => {
                count += item.quantity;
            });
            return count;
        }    
    
        add(items) {
            if (items == null) {
                throw new UpdateCartException();
            }
            this.#items = items;
        }
        //endregion public methods
}