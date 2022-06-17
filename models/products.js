class Product {
    constructor(id, title, price, shippingMethod, imageUri, categories,description){
        this.id=id;
        this.title=title;
        this.price = price;
        this.imageUri=imageUri;
        this.categories=categories;
        this.description=description;
    }
}

export default Product;