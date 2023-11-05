import React, { useState } from 'react';
import "./cart.css";
const WishList = (props) => {
  const {
    products,
    currencyFormatted,
    updateQuantity,
    checkQuantity,
    removeItem,
    promoCode,
    handlePromoCodeChange,
    checkPromoCode,
    subTotal,
    discount,
    discountPrice,
    tax,
    totalPrice,
  } =  {
    "products": [
      {
        "image": "https://via.placeholder.com/200x150",
        "name": "Product 1",
        "description": "Description for Product 1",
        "price": 10.99,
        "quantity": 2
      },
      {
        "image": "https://via.placeholder.com/200x150",
        "name": "Product 2",
        "description": "Description for Product 2",
        "price": 19.99,
        "quantity": 1
      }
    ],
    "currencyFormatted": (index, event) => {
      // Implement your logic to update quantity here
      // Example: 
      // Calculate the new quantity based on user input
      // Update the products array accordingly
    },
    "updateQuantity": (index, event) => {
      // Implement your logic to update quantity here
      // Example: 
      // Calculate the new quantity based on user input
      // Update the products array accordingly
    },
    "checkQuantity": (index, event) => {
      // Implement your logic to check quantity here
      // Example: 
      // If the input is empty, set quantity to 1
      // Update the products array accordingly
    },
    "removeItem": (index) => {
      // Implement your logic to remove an item here
      // Example: 
      // Remove the product at the specified index from the products array
    },
    "promoCode": "",
    "handlePromoCodeChange": (event) => {
      // Implement your logic to handle promo code input change here
      // Example: 
      // Update the promoCode state based on user input
    },
    "checkPromoCode": () => {
      // Implement your logic to check the promo code here
      // Example: 
      // Compare the entered promo code with valid codes and apply discounts
    },
    "subTotal": 40.97,
    "discount": 10,
    "discountPrice": 4.097,
    "tax": 5,
    "totalPrice": 41.87
  }
  
  

  return (
    <div className="wishlist">
      <div style={{width:"100%",display:'flex',justifyContent:'center'}}><h1>Wish List</h1></div>
      <section className="container">
        {products?.length > 0 ? (
          <ul className="products">
            {products?.map((product, index) => (
              <li className="row" key={index}>
                <div className="col left">
                  <div className="thumbnail">
                    <a href="#">
                      <img src={product.image} alt={product.name} />
                    </a>
                  </div>
                  <div className="detail">
                    <div className="name">
                      <a href="#">{product.name}</a>
                    </div>
                    <div className="description">{product.description}</div>
                    <div className="price">{currencyFormatted(product.price)}</div>
                  </div>
                </div>
                <div className="col right">
                  <div className="quantity">
                    <input
                      type="number"
                      className="quantity"
                      step="1"
                      value={product.quantity}
                      onChange={(event) => updateQuantity(index, event)}
                      onBlur={(event) => checkQuantity(index, event)}
                    />
                  </div>
                  <div className="remove">
                    <svg
                      onClick={() => removeItem(index)}
                      version="1.1"
                      className="close"
                      xmlns="//www.w3.org/2000/svg"
                      xmlnsXlink="//www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 60 60"
                      enableBackground="new 0 0 60 60"
                      xmlSpace="preserve"
                    >
                      <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon>
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-product">
            <h3>There are no products in your cart.</h3>
            <button>Shop now</button>
          </div>
        )}
      </section>
      {/* End Product List */}
      {/* Summary */}
      {products?.length > 0 && (
        <section className="container">
          <div className="promotion">
            <label htmlFor="promo-code">Have A Promo Code?</label>
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button type="button" onClick={checkPromoCode}></button>
          </div>
          <div className="summary">
            <ul>
              <li>
                Subtotal <span>{currencyFormatted(subTotal)}</span>
              </li>
              {discount > 0 && (
                <li>
                  Discount <span>{currencyFormatted(discountPrice)}</span>
                </li>
              )}
              <li>
                Tax <span>{currencyFormatted(tax)}</span>
              </li>
              <li className="total">
                Total <span>{currencyFormatted(totalPrice)}</span>
              </li>
            </ul>
          </div>
          <div className="checkout">
            <button type="button">Check Out</button>
          </div>
        </section>
      )}
      {/* End Summary */}
    </div>
  );
};

export default WishList;
