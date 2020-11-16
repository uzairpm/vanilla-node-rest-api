let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');
const FILEPATH = './data/products.json';

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id);
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);

        writeDataToFile(FILEPATH, products);
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = {id, ...product}

        writeDataToFile(FILEPATH, products);
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        writeDataToFile(FILEPATH, products);
        resolve(id);
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
