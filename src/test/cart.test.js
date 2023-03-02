/**
 * @file      cart.test.js
 * @brief     This class is designed to test the behaviour of a cart.
 * @author    Created by Nicolas.GLASSEY
 * @version   13-02-2022 - original (dedicated to RIA1)
 * @version   27-02-2023 - update for first eval
 */

"use strict";

let Cart = require('../Cart/Cart.js');
const CartItem = require("../CartItem/CartItem.js");
const MultipleCurrenciesException = require("../Cart/MultipleCurrenciesException");

test('allProperties_AfterInstantiationEmptyCart_ReturnCorrectValues', () => {
    //given
    let expectedItems = [];
    let expectedCurrency = "CHF";
    let expectedTotal = 0;
    let cart = new Cart();

    //when
    //Assertion will trigger the events

    //then
    expect(cart.items).toEqual(expectedItems);
    expect(cart.currency).toEqual(expectedCurrency);
    expect(cart.total).toEqual(expectedTotal);
})

test('allProperties_AfterInstantiationWithDefaultCurrency_ReturnCorrectValues', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27", 1,10);
    let cartItem2= new CartItem(2,"Iphone 28",2,20);
    let expectedItems = [cartItem1, cartItem2];
    let expectedCurrency = "CHF";
    let expectedTotal = 50;
    let cart = new Cart(expectedItems);

    //when
    //Assertion will trigger the events

    //then
    for (let i = 0 ; i <= cart.items.length ; i++)
    {
        expect(cart.items[i]).toEqual(expectedItems[i]);
    }
    expect(cart.currency).toEqual(expectedCurrency);
    expect(cart.total).toEqual(expectedTotal);
})

test('allProperties_AfterInstantiationWithCustomCurrency_ReturnCorrectValues', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27", 1,10, "USD");
    let cartItem2= new CartItem(2,"Iphone 28",2,20, "USD");
    let expectedItems = [cartItem1, cartItem2];
    let expectedCurrency = "USD";
    let expectedTotal = 50;
    let cart = new Cart(expectedItems);

    //when
    //Assertion will trigger the events

    //then
    for (let i = 0 ; i <= cart.items.length ; i++)
    {
        expect(cart.items[i]).toEqual(expectedItems[i]);
    }
    expect(cart.currency).toEqual(expectedCurrency);
    expect(cart.total).toEqual(expectedTotal);
})

test('cart_InstantiationWithMultipleCurrencies_ThrowException', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27", 1,10, "USD");
    let cartItem2= new CartItem(2,"Iphone 28",2,20, "EUR");
    let expectedItems = [cartItem1, cartItem2];

    //when
    expect(() => new Cart(expectedItems)).toThrow(MultipleCurrenciesException);

    //then
    //Exception is thrown
})

test('items_NominalCaseCustomCurrency_GetItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27", 1,10, "USD");
    let cartItem2= new CartItem(2,"Iphone 28",2,20, "USD");
    let expectedItems = [cartItem1, cartItem2];
    let cart = new Cart(expectedItems);

    //when
    let actualItems = cart.items;

    //then
    for (let i = 0 ; i <= expectedItems.length ; i++)
    {
        expect(actualItems[i]).toEqual(expectedItems[i]);
    }
})

test('total_NominalCase_GetsSum', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28",2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let totalPriceExpected = 50;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.total).toEqual(totalPriceExpected);
})

test('count_OnlySingleQuantityProduct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 1,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.count()).toEqual(countExpected);
})

test('count_MixSingleAndMultipleQuantityProduct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 3;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.count()).toEqual(countExpected);
})

test('count_MixSingleAndMultipleQuantityProductDistinct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.count(true)).toEqual(countExpected);
})

test('add_AddFirstSingleCartItem_GetsUpdatedNumberOfItems', () => {
    //given
    let cart = new Cart();
    let expectedTotalPrice = 10;
    let cartItem1 = new CartItem(1,"Iphone 27",1,expectedTotalPrice);
    let items = [cartItem1];

    //when
    cart.add(items);

    //then
    expect(expectedTotalPrice).toEqual(cart.total);
})

test('add_AddMoreItemsWithAnotherCurrency_ThrowException', () => {
    //given
    let expectedTotalPrice = 10;
    let cartItem1 = new CartItem(1,"Iphone 27",1,expectedTotalPrice);
    let itemsFirstAdd = [cartItem1];
    let cart = new Cart(itemsFirstAdd);
    let cartItem2 = new CartItem(3,"Iphone 27",1,expectedTotalPrice, "USD");
    let itemsSecondAdd = [cartItem2];

    //when
    expect(() => cart.add(itemsSecondAdd)).toThrow(MultipleCurrenciesException);

    //then
    //Exception is thrown
})