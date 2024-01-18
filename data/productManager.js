import { promises as fs} from "fs";

export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.id = 1;
        this.products = []
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        // Verifica datos obligatiorios
        if (!title || !description || !price || !thumbnail || !code || (stock === null || stock === undefined)) {
            console.log('Todos los campos son obligatorios');
            return;
        }

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id++
        };
            
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    async readProducts() {
            let respuesta = await fs.readFile(this.patch,"utf-8") 
            return (JSON.parse(respuesta))
    }

    async getProducts() {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }
    
    async findProductById(id) {
        let respuesta3 = await this.readProducts()
        return respuesta3.find(product => product.id === id)
    }

    async getProductsById(id) {
        let respuesta3 = await this.findProductById(id);
        respuesta3 
            ? console.log(respuesta3) 
            : console.log("Producto no encontrado")
    }

    async deleteProductById(id) {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id !== id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto Eliminado") // Agregar mas detalles y validaciones
    }

    async updateProduct({ id, ...product}) {
        await this.deleteProductById(id)
        let productOld = await this.readProducts();
        let productsModif = [{ ...product, id},...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif))
    }

}

const productManager = new ProductManager();

// productManager.getProductsById(4)
// productManager.deleteProductById(2)
// productManager.getProducts()


productManager.updateProduct({
    id: 1,
    title: "NuevaManzana",
    description: "Manzana verde",
    price: 3,
    thumbnail: "img-url",
    code: 4,
    stock: 2
});

// module.exports = productManager

// // Agregar productos
// productManager.addProduct("Manzana", "Manzana roja", 2, "img-url", 1, 1);
// productManager.addProduct("Banana", "Banana ecuador", 2, "img-url", 2, 1);
// productManager.addProduct("Pera", "Pera verde", 5, "img-url", 3, 0);
