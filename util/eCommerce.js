import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL as baseURL, BASE_URL } from '../Config'
import { sanitizeLineItems } from "../helper";

async function getProducts() {
    try {
        //retrieve all products
        const response = await axios.get(`${baseURL}/products`, {
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

        const response = await axios.get(`${baseURL}/categories`, {
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

            value.expires < today ? cart_id = `/${value.id}` : '';
        }


        const response = await axios.get(`${baseURL}/carts${cart_id}`, {
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
        const response = await axios.post(`${baseURL}/carts/${cartId}`, body, {
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
    console.log("removing product: ", lineItemId, cartId);
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
        const response = await axios.put(`${baseURL}/carts/${cartId}/items/${lineItemId}`, {
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
                firstname: "Sean",
                lastname: "Greene",
                email: "SGreene@test.com",
            },
            payment: {
                gateway: "test_gateway",
                card: {
                    number: "4242 4242 4242 4242",
                    expiry_month: '01',
                    expiry_year: '2023',
                    cvc: '123',
                    postal_zip_code: '94103'
                },
            },
            shipping: {
                name: "Sean Greene",
                street: "17 Plympton St",
                town_city: "Weston",
                county_state: "MA",
                postal_zip_code: "02493",
                country: "US",
            },
            fulfillment: {
                shipping_method: "ship_LvJjoPpraoe0nO"
            },

            billing: {
                name: "Sean Greene",
                street: "17 Plympton Street",
                town_city: "Weston",
                county_state: 'CA',
                postal_zip_code: '101043',
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


export { getProducts, getCategories, retrieveCart, addCartProduct, updateCartProduct, getCheckoutToken, checkout, shippingOptions, getStates, getCountries, removeCartProduct };

