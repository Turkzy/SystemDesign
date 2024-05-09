import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./AddProduct.css";

const DeletePanel = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-container">
      <h1><ion-icon name="trash-outline"></ion-icon>Delete Products</h1>
      <input
        className="search-text"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stocks</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.stocks}</td>
                <td>{product.buyingPrice}</td>
                <td>{product.sellingPrice}</td>
                <td><img src={product.url} alt="Product" width="50" height="50" /></td>
                <td>
                  <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletePanel;