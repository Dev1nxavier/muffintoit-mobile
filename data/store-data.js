import Category from "../models/category";
import Product from "../models/products";

export const CATEGORIES = [
    new Category('c1', 'Muffins', '#f5428d'),
    new Category('c2', 'Cakes', '#f54242'), 
    new Category('c3', 'Vegan', '#f5a442'), 
    new Category('c4', 'French', '#f5d142'), 
    new Category('c5', 'Bread', '#368dff'), 
    new Category('c6', 'Cookies', '#41d95d'), 
    new Category('c7', 'Ice-cream', '#9eecff'), 
    new Category('c8', 'Pastry', '#b9ffb0'), 
    new Category('c9', 'Baking Tools', '#ffc7ff'), 
    new Category('c10', 'Ingredients', '#47fced'), 
]

export const PRODUCTS = [
    new Product('p1', 'Chocolate Cake', 100, 'local', require('../assets/images/strawberry_cake.jpeg'), ['c1, c2']),
    new Product('p2', 'Oatmeal Cookies', 100, 'local', require('../assets/images/sunday_drizzle.jpeg'),['c2']),
    new Product('p3', 'Sugar Cookies', 100, 'local', require('../assets/images/cupcake_pink.jpeg'),['c1, c2']),
    new Product('p4', 'Gingerbread Cookies', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c3']),
    new Product('p5', 'Strawberry Shortcake', 100, 'local', require('../assets/images/cupcake_pink.jpeg'),['c2', 'c10']),
    new Product('p6', 'Marble Cake', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c4']),
    new Product('p7', 'French Bread', 100, 'local', require('../assets/images/french_toast.jpeg'),['c5']),
    new Product('p8', 'Hala', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c6', 'c7']),
    new Product('p9', 'Birthday-cake ice-cream', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c7']),
    new Product('p10', 'Banana Walnut Muffins', 100, 'local', require('../assets/images/french_toast.jpeg'),['c8', 'c10', 'c1']),
    new Product('p11', 'Rolling Pin', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c9']),
    new Product('p12', 'Cutting Board', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c1', 'c3']),
    new Product('p13', 'Apple Struessel', 100, 'local', require('../assets/images/icecreambar_nobg.png'),['c10', 'c3']),
]