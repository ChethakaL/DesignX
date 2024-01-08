import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';

function Shop() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleShop = (productId) => {
        navigate(`/product/${productId}`)
      };

    useEffect(() => {
        // Fetch products from the backend when the component mounts
        const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };

        fetchProducts();
    }, []);
  return (
    <div style={{display:'flex'}}>
        <Sidebar height={'100%'}/>

        {/* Shop */}
        <section className="shop-page">
            <h1 className='heading-text'>Shop</h1>
            <div style={{width:'145vh', display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'center', marginTop: 50}}>
                <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={6}>
                {products.map((product) => (
                    <Grid key={product._id} item>
                        <div onClick={() => handleShop(product._id)} style={{width:'290px', height:'320px', backgroundColor:'white'}}>
                            <img src={product.productImage} alt={product.productName} style={{ width: '300px', height:'398.59px',marginBottom: '8px', }} />
                        </div>
                        <div style={{ margin: 0, padding: 0, color: 'white' }}>
                            <h4 style={{marginTop:10}}>{product.productName}</h4>
                            <h5 style={{ margin: 0, padding: 0, color: 'white' }}>Rs.{product.productPrice}</h5>
                        </div>
                    </Grid>
                ))}
                </Grid>
                </Grid>
            </div>
        </section>
    </div>
  )
}

export default Shop





// import { Divider } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Review from '../components/Review';
// import { Input, Select } from 'antd';
// import PaypalButton from '../components/PaypalButton';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../components/CartContext';

// function Product() {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [selectedOptions, setSelectedOptions] = useState({ color: '', size: '' });
//   const [quantity, setQuantity] = useState(1);
//   const [availableStock, setAvailableStock] = useState(0);
//   const [isOutOfStock, setIsOutOfStock] = useState(false);
//   const [colorOptions, setColorOptions] = useState([]);
//   const [sizeOptions, setSizeOptions] = useState([]);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/products/by${id}`);
//         setProduct(response.data);

//         const { quantity } = response.data;
//         const colorOptions = Array.from(new Set(quantity.map((item) => item.color)));
//         const sizeOptions = Array.from(new Set(quantity.map((item) => item.size)));

//         setColorOptions(colorOptions);
//         setSizeOptions(sizeOptions);

//         setAvailableStock(quantity[0].stock);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   const handleQuantityChange = (event) => {
//     const newQuantity = parseInt(event.target.value, 10);
//     setQuantity(newQuantity);
//   };

//   const handleChange = (value, optionType) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [optionType]: value === undefined ? '' : value,
//     }));
//   };
  
  

//   const onApprove = async () => {
//     try {
//       console.log('Selected Options:', selectedOptions);
  
//       const response = await axios.post(
//         'http://localhost:4000/api/purchase/create',
//         {
//           productCode: product.productCode,
//           quantity: quantity,
//           color: selectedOptions.color,
//           size: selectedOptions.size,
//           totalAmount: product.productPrice * quantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
  
//       if (response.status === 201) {
//         console.log('Purchase order created:', response.data);
//         // Additional logic or UI updates on successful order creation
//       } else {
//         console.error('Error creating purchase order:', response.data.error);
//         // Handle error scenarios
//       }
//     } catch (error) {
//       console.error('Error creating purchase order:', error);
//       // Handle error scenarios
//     }
//   };
  

//   const handleAddToCart = () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       // Redirect to login if no token
//       navigate('/customer-login');
//       return;
//     }

//     // Check if color, size, and quantity are selected
//     if (selectedOptions.color && selectedOptions.size && quantity > 0 && !isOutOfStock) {
//       addToCart({
//         id: product._id,
//         name: product.productName,
//         quantity: quantity,
//         price: product.productPrice,
//         color: selectedOptions.color,
//         size: selectedOptions.size,
//         // Add other product details as needed
//       });
//     } else {
//       // Handle cases where color, size, or quantity is not selected or product is out of stock
//       console.log('Invalid selection or out of stock');
//     }
//   };

//   useEffect(() => {
//     setIsOutOfStock(quantity > availableStock);
//   }, [quantity, availableStock]);

//   return (
//     <div className="product-container">
//       <div className="product-start">
//         <div className="product-image">
//           <img src={product.productImage} alt={product.productName} width='330px'/>
//         </div>
//         <div className="product-details">
//           <h2>{product.productName}</h2>
//           <p>{product.productDescription}</p>
//           <p>Choose Your Options</p>
//           <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <Select
//               value={selectedOptions.color}
//               placeholder="Color"
//               style={{ width: 120, marginRight: 20, color: 'black' }}
//               onChange={(value) => handleChange(value, 'color')}
//               options={colorOptions.map((color) => ({ value: color, label: color }))}
//               optionLabelProp="label"
//             />
//             <Select
//               value={selectedOptions.size}
//               placeholder="Size"
//               style={{ width: 120, color: 'black' }}
//               onChange={(value) => handleChange(value, 'size')}
//               options={sizeOptions.map((size) => ({ value: size, label: size }))}
//               optionLabelProp="label"
//             />
//           </div>
//           <div>
//             <label>Quantity</label>
//             <Input
//               style={{ width: '140px', margin: '10px' }}
//               type="number"
//               placeholder="Quantity"
//               value={quantity}
//               onChange={handleQuantityChange}
//             />
//             <button onClick={handleAddToCart} disabled={!localStorage.getItem('token') || isOutOfStock}>
//               Add to Cart
//             </button>
//             {isOutOfStock && <p style={{ color: 'red' }}>No Stock</p>}
//           </div>
//           <h2>Rs. {product.productPrice}</h2>
//           <PaypalButton onApprove={onApprove} disabled={!localStorage.getItem('token') || isOutOfStock} productPrice={product.productPrice} quantity={quantity} />
//           <Divider style={{ marginTop: 20 }}></Divider>
//         </div>
//       </div>
//       <h1 className="heading-text" style={{ marginTop: 50, marginBottom: 20 }}>
//         Reviews
//       </h1>
//       <div className="product-reviews">
//         <Review productId={product.productCode} />
//       </div>
//     </div>
//   );
// }

// export default Product;
