import express from 'express'
const app = express()
// app.use(express.json)
// app.use(express.urlencoded({extended: true}))
import Product from "./ProductManager.js";
const productosManager = new Product("productos.json");

//mostramos todos los productos o limitada
app.get('/productos', async (req,res)=>{
    const {limit} = req.query
    let archivo = await productosManager.getProducts()
    console.log(req.query)
    archivo = archivo.slice(0, limit)
    return res.json(archivo)
})

// buscar un producto en particulas
app.get('/productos/:idProducto', async (req, res)=>{
    let archivo = await productosManager.getProducts()

    const {idProducto}=req.params
    const producto = archivo.find(prop => prop.id === Number(idProducto))
    if(producto){
        res.json({mensaje: 'producto encontrado', producto})
    }else{
        res.json({mensaje: 'producto no encontrado'})

    }
})



app.listen(8080, ()=>{
    console.log('escuchando el puerto 8080');
})