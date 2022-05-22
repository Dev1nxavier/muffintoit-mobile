import Category from "../models/category";
import Product from "../models/products";

export const CATEGORIES = [
    new Category('c1', 'Cupcakes', '#f5428d', require('../assets/images/cupcake.jpeg')),
    new Category('c2', 'Cakes', '#42d4f5', require('../assets/images/cakes_small.jpeg')), 
    new Category('c3', 'Bread', '#368dff', require('../assets/images/bread_small.jpeg')), 
    new Category('c4', 'Cookies', '#41d95d', require('../assets/images/cookies_small.jpeg')), 
    new Category('c5', 'Baking Tools', '#ffc7ff', require('../assets/images/baking_tools_small.jpeg')), 
    new Category('c6', 'Ingredients', '#47fced', require('../assets/images/ingredients.jpeg')), 
]

export const PRODUCTS = [
    new Product('p1', 'Chocolate Cake', 100, 'local', require('../assets/images/strawberry_cake.jpeg'), ['c1, c2']),
    new Product('p2', 'Oatmeal Cookies', 100, 'local', require('../assets/images/sunday_drizzle.jpeg'),['c2']),
    new Product('p3', 'Sugar Cookies', 100, 'local', require('../assets/images/cupcake_pink.jpeg'),['c1, c2']),
    new Product('p4', 'Gingerbread Cookies', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c3']),
    new Product('p5', 'Strawberry Shortcake', 100, 'local', require('../assets/images/cupcake_pink.jpeg'),['c2', 'c6']),
    new Product('p6', 'Marble Cake', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c4']),
    new Product('p7', 'French Bread', 100, 'local', require('../assets/images/french_toast.jpeg'),['c5']),
    new Product('p8', 'Hala', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c6', 'c4']),
    new Product('p9', 'Birthday-cake ice-cream', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c6']),
    new Product('p10', 'Banana Walnut Muffins', 100, 'local', require('../assets/images/french_toast.jpeg'),['c2', 'c3', 'c1']),
    new Product('p11', 'Rolling Pin', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c4']),
    new Product('p12', 'Cutting Board', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c4', 'c5']),
    new Product('p13', 'Apple Struessel', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c1', 'c3']),
]