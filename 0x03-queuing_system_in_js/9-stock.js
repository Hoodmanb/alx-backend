import express from 'express'
import { createClient } from 'redis';
const app = express()
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(() => {
    console.log('Connected to Redis');
});

const listProducts = [
    { Id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

const getItemById = (id) => {
    return listProducts.filter(product => product.Id === id);
};

const reserveStockById = (itemId, stock) => {
    client.set(`item.${itemId}`, stock)
}

const getCurrentReservedStockById = async (itemId) => {
    const stock = await client.get(`item.${itemId}`);
    return stock ? parseInt(stock) : null;
};
const port = 1245;

app.get('/list_products', (req, res) => {
    const newList = []
    const available = listProducts.map((item) => {
        newList.push({
            "itemId": item.Id, "itemName": item.name, "price": item.price, "initialAvailableQuantity": item.stock, "currentQuantity": 4
        })
    })
    res.json(newList)
})

app.get('/list_products/:itemId', async (req, res) => {
    const id = req.params.itemId;
    const stock = await getCurrentReservedStockById(id)
    if (!stock) {
        return res.json({ "status": "Product not found" })
    }
    res.json({
        "itemId": stock.id,
        "itemName": stock.name,
        "price": stock.price,
        "initialAvailableQuantity": stock.stock,
        "currentQuantity": stock.stock
    })

})

app.listen(port, () => {
    console.log('app is listening on port ...')
})