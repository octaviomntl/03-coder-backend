// const express = require('express')

import express from 'express';
import ProductManager from '../data/productManager.js';

const productManager = new ProductManager();

const app = express();
const PORT = 8080;

// 

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    try {
        const products = await productManager.readProducts();

        if(limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        } 
    }  catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos'})
    }
})

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.findProductById(productId);

        if(product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto'});
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})

// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

// Aspectos a incluir
// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados

// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.