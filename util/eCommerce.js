import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL, API_URL } from '../Config'
import { BASE_URL} from '../Config';
import { sanitizeLineItems } from "../helper";

// const API_URL = process.env.SERVER_DOMAIN;
const API_URL = process.env.SERVER_DOMAIN;

async function getProducts() {
    console.log("eCommerce getProducts");
    try {
        //retrieve all products
        const response = await axios.get(`${BASE_URL}/products`, {
            headers: {
                'X-Authorization': `${process.env.COMMERCE_PUBLIC}`
            }
        })

        const { data: products } = response.data;
        
        let productsArray = [];

        for (const product of products) {

            //product category array
            const categoryArray = product.categories.map(catObj => catObj.id);

            //product image array
            const imageArray = product.assets.map(asset => {
                if (asset.is_image === true) return asset.url;
            })

            const item = {
                id: product.id,
                title: product.name,
                price: product.price.raw,
                imageUri: product.image.url,
                categories: categoryArray,
                description: product.description,
                soldOut: product.is.sold_out,
                relatedProducts: product.related_products,
                productImages: imageArray,

            }

            productsArray.push(item);

        }

        return productsArray;

    } catch (error) {
        console.error("Error retrieving products:", error);
    }

}

async function getCategories() {
    try {

        const response = await axios.get(`${BASE_URL}/categories`, {
            headers: {

                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const { data: categories } = response.data;

        let categoriesArray = [];

        for (const catItem of categories) {
            const category = {
                id: catItem.id,
                title: catItem.name,
                image: catItem.assets[0].url,
            }

            categoriesArray.push(category);
        }

        return categoriesArray;

    } catch (error) {
        console.error("Error retrieving categories: ", error);
    }

}

async function retrieveCart() {
    let cart_id = '';
    const today = Date.now();
    try {
        // check if cart exists
        const jsonVal = await AsyncStorage.getItem('@cart_id')
        if (jsonVal !== null) {
            //check if cart expired
            let value = JSON.parse(jsonVal);

            //if not expired, update url string with cart id.
            value.expires < today ? cart_id = `/${value.id}` : '';
        }


        const response = await axios.get(`${BASE_URL}/carts${cart_id}`, {
            headers: {

                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const cart = response.data;

        //set data in storage
        const JSONValue = JSON.stringify(cart);
        await AsyncStorage.setItem('@cart_id', JSONValue);

        let productsArray = [];

        for (const product of cart.line_items) {

            const item = {
                lineItemId: product.id,
                id: product.product_id,
                title: product.name,
                price: product.price.raw,
                imageUri: product.image.url,
                description: product.description,
                qty: product.quantity,

            }

            productsArray.push(item);

        }

        const cartObject = {
            cartId: cart.id,
            uniqueItems: cart.total_unique_items,
            totalCount: cart.total_items,
            subtotal: cart.subtotal.raw,
            products: productsArray,
        }

        return (cartObject);

    } catch (error) {
        console.error("Error retrieving cart: ", error);
    }

}

async function addCartProduct(cartId, itemId) {
    console.log("attempting to add product. Cart_id:", cartId, "/n product id:", itemId);

    let body = {
        "id": `${itemId}`,

    }
    try {
        const response = await axios.post(`${BASE_URL}/carts/${cartId}`, body, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },

        })

        let cart = response.data;

        let productsArray = [];

        // format productslist
        for (const product of cart.cart.line_items) {

            const item = {
                lineItemId: product.id,
                id: product.product_id,
                title: product.name,
                price: product.price.raw,
                imageUri: product.image.url,
                description: product.description,
                qty: product.quantity,

            }

            productsArray.push(item);

        }

        const cartObject = {
            uniqueItems: cart.cart.total_unique_items,
            totalCount: cart.cart.total_items,
            subtotal: cart.cart.subtotal.raw,
            products: productsArray,
        }

        return cartObject;

    } catch (error) {
        console.error("Error adding product:", error);
    }
}

async function removeCartProduct(cartId, lineItemId) {

    try {
        const response = await axios.delete(`${BASE_URL}/carts/${cartId}/items/${lineItemId}`, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const cart = response.data;

        let productsArray = [];

        // format productslist
        for (const product of cart.cart.line_items) {

            const item = {
                lineItemId: product.id,
                id: product.product_id,
                title: product.name,
                price: product.price.raw,
                imageUri: product.image.url,
                description: product.description,
                qty: product.quantity,

            }

            productsArray.push(item);

        }

        const cartObject = {
            uniqueItems: cart.cart.total_unique_items,
            totalCount: cart.cart.total_items,
            subtotal: cart.cart.subtotal.raw,
            products: productsArray,
        }

        return cartObject;

    } catch (error) {
        console.error("Error updating cart:", error.response);
    }
}

async function updateCartProduct(cartId, lineItemId, value) {


    const { quantity: qty } = value;

    console.log("Attempting to update cart...quantity:", qty);

    try {
        const response = await axios.put(`${BASE_URL}/carts/${cartId}/items/${lineItemId}`, {
            "quantity": qty,
        }, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const cart = response.data;

        let productsArray = [];

        // format productslist
        for (const product of cart.cart.line_items) {

            const item = {
                lineItemId: product.id,
                id: product.product_id,
                title: product.name,
                price: product.price.raw,
                imageUri: product.image.url,
                description: product.description,
                qty: product.quantity,

            }

            productsArray.push(item);

        }

        const cartObject = {
            uniqueItems: cart.cart.total_unique_items,
            totalCount: cart.cart.total_items,
            subtotal: cart.cart.subtotal.raw,
            products: productsArray,
        }

        return cartObject;

    } catch (error) {
        console.error("Error updating cart:", error.response);
    }
}

async function getCheckoutToken(cartId) {

    try {

        const response = await axios.get(`${BASE_URL}/checkouts/${cartId}?type=cart`, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        const { id, live } = response.data;

        return ({ checkout_token: id, live })

    } catch (error) {
        console.error("Error retrieving checkout token:", error.response.data);
    }
}

async function checkout(checkout_token, shippingInfo, intentId, customerId, live) {

    try {
        console.log("Intent ID:", intentId);
        const response = await axios.post(`${BASE_URL}/checkouts/${checkout_token}`, {
            line_items: sanitizeLineItems(live.line_items),
            customer: {
                firstname: "John",
                lastname: "Smith",
                email: "jSmith@test.com",
            },
            payment: {
                gateway: "test_gateway",
                card: {
                    number: "4242 4242 4242 4242",
                    expiry_month: '01',
                    expiry_year: '2029',
                    cvc: '123',
                    postal_zip_code: '94103'
                },
            },
            shipping: {
                name: "John Smith",
                street: "17 Forever Home Dr.",
                town_city: "Eastland",
                county_state: "MA",
                postal_zip_code: "02451",
                country: "US",
            },
            fulfillment: {
                shipping_method: "ship_LvJjoPpraoe0nO"
            },

            billing: {
                name: "John Smith",
                street: "17 Forever Home Dr.",
                town_city: "Eastland",
                county_state: 'MA',
                postal_zip_code: '00345',
                country: "US",
            },
        }, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        console.log("Success!:", response.data.status_payment);
        await AsyncStorage.removeItem('@cart_id')

        return response.data;

    } catch (error) {
        console.error("Error capturing order:", error.response.data);
    }
}

async function shippingOptions(tokenId, country = 'US') {
    console.log('inside shipping options:', country);
    try {

        const headers = {
            "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        };

        const response = await axios.get(`${BASE_URL}/checkouts/${tokenId}/helper/shipping_options?country=${country}`, {
            headers: headers
        })

        return response.data;



    } catch (error) {
        console.error("Error retrieving shipping methods:", error.response.data);
    }
}


async function getStates(tokenId, country_code) {
    try {

        const response = await axios.get(`${BASE_URL}/services/locale/${tokenId}/countries/${country_code}/subdivisions`, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        return response.data.subdivisions;
    } catch (error) {
        console.error("Error retrieving states:", error.response.data)
    }
}

async function getCountries(tokenId) {
    console.log("Inside getCountries with token:", tokenId);
    try {
        const response = await axios.get(`${BASE_URL}/services/locale/${tokenId}/countries`, {
            headers: {
                "X-Authorization": `${process.env.COMMERCE_PUBLIC}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        return response.data.countries;

    } catch (error) {
        console.error("Error retrieving countries:", error.response.data)
    }
}

const authenticateUser = async(mode, email, password)=>{
    const response = await axios.post(`${API_URL}users/authenticate`,{
        mode: mode,
        email:email,
        password:password,
    })
    console.log("eCommerce: Authenticate:", response.data);
    await AsyncStorage.setItem('@sessionToken', response.data.idToken);
    await AsyncStorage.setItem('@localId',response.data.localId);
    return response.data;
}

const createUser = async(email, password)=>{
    return await authenticateUser('signUp', email, password);
    
}

const loginUser = async (email, password)=>{
    return await authenticateUser('signInWithPassword', email, password);
}

async function saveOrderHistory(order, localId){
    
    //sanitize orderobject:
    let productsArray = [];
    //for items in order:
    for(const product of order.order.line_items){
        const item ={
            lineItemId: product.id,
            id: product.product_id,
            title: product.product_name,
            price: product.price.raw,
            imageUri: product.image.url,
            qty: product.quantity,
        }
        productsArray.push(item);
    }

    cartObject = {
        orderId: order.id,
        orderDate: Date.now(),
        shipping: order.order.shipping.price.raw,
        subtotal:order.order.subtotal.raw,
        total: order.order.total.raw,
        products: productsArray,
    }

    console.log("Cart Object: ",cartObject);

    return await axios.post(`${API_URL}users/${localId}/order-history`,{
        order: cartObject,
    })
}

async function retrieveOrders(userId){
    console.log("ecommerce. localId:", userId);
    try {
         const response = await axios.get(`${API_URL}users/order-history/${userId}`);

    //flatten order object
    let ORDERS = [];
    for(orderId in response.data){
        ORDERS.push(response.data[orderId].order)
    }

    console.log("eCommerce: ORDERS:", ORDERS);
    return ORDERS;
    } catch (error) {
        console.error("Error retrieving history:", error);
    }
   
}

async function updateTokenShipping(ship_id, countryCode, tokenId){
    console.log("eCommerce: updateTokenShipping:", ship_id, countryCode, tokenId);
    try {
        return await axios.post(`${API_URL}checkout/shipping/${tokenId}`,{
            ship_id: ship_id,
            country: countryCode
        })

    } catch (error) {
        console.error("Error updating shipping:", error);
    }
}

export { getProducts, getCategories, retrieveCart, addCartProduct, updateCartProduct, getCheckoutToken, checkout, shippingOptions, getStates, getCountries, removeCartProduct, loginUser,authenticateUser, createUser, saveOrderHistory, retrieveOrders, updateTokenShipping};

