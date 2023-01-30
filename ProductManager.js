import fs from  "fs"
const path = "./productos.json";

export default class ProductManager {
  constructor() {
    this.path = './productos.json';
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productos = await fs.promises.readFile(this.path, "utf-8");
        const productosJSON = JSON.parse(productos);
        return productosJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(produtcs) {
    try {
      const { title, description, price, thumbnail, code, stock } = produtcs;
      const product = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const productFile = await this.getProducts();
      productFile.push(product);
      
      await fs.promises.writeFile(this.path, JSON.stringify(productFile));
      console.log('Tus productos se han guardado con exito')
    } catch (error) {
      console.log(error);
    }
  }

 

  async getProductById(id) {
    let productId = await this.#searchId(id)
    let condicion = await this.getProducts()
    if(productId){
      return console.log(`id ${id}`, condicion.find(prop => prop.id === id))
    }else{
      console.log("no se encontro el producto con el id ingresado")
    }
    return (
      this.path.find((propiedad) => propiedad.id === id) ||
      `El producto con el id ${id} no existe`
    );
  }
    
  updateProduct(id, title){
    try {
      const product = this.getProducts()
      if(product){
        const indice = product.findIndex((pro)=> pro.id === id)
        if(indice >= 0){
          product[indice] = {...product[indice], ...title}
          fs.writeFileSync(this.path, JSON.stringify(product, null))
          console.log('Se actualizo tu producto')
        }else{
          console.log("producto no existente")
        }
      }else{
        console.log("archivo no existente")
      }
    } catch (error) {
      console.log(error)
    }
    }

    async deleteProductById(id) {
    let condicion = await this.getProducts()
    const newCondicion = condicion.filter(prop => prop.id != id)
    await fs.promises.writeFile(this.path, JSON.stringify(newCondicion))
    console.log(`el producto con el id: ${id} se ha borrado exitosamente`)
  }

  #generarId() {
    const count = this.path.length;
    const idIncre = count > 0 ? this.path[count - 1].id + 1 : 1;
    return idIncre;
  }

  async #searchId(id){
    let info = await this.getProducts()
    return info.find((prop)=>prop.id === id)
  }
  
}
const  manager =  new ProductManager();
const usuario1Actualizado = {
  title: "pantalon",
  description: "pantalon negra",
  price: 390,
  thumbnail: 2,
  code: 21098,
  stock: 5,
};

async function prueba() {
  // mostramos el archivo
  console.log(await manager.getProducts());
  console.log("este producto si existe", manager.getProductById(1));
  console.log(manager.getProductById(5));
  // actualizamos un producto
  console.log('actualizado',manager.updateProduct(1, usuario1Actualizado))
  //
  console.log(manager.deleteProductById(2));
}

// prueba();
