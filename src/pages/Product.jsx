import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import jsonData from '../data/products.json'; 
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FiSearch } from "react-icons/fi";
import StarRatings from 'react-star-ratings';
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
   const [isZoomed, setIsZoomed] = useState(false);

   useEffect(() => {
    const productData = jsonData.products.find(p => p.id.toString() === id);
    if (productData) {
      setProduct(productData);
      setSelectedImage(productData.image);
    }
  }, [id]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(prev + change, 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (!product) {
    return <div className="text-center mt-5">Mahsulot topilmadi</div>;
  }

  return (
    <div className="wrapper  mt-24">
      <div className='grid grid-cols-2'>
        <div className='max-w-[603px] w-full gap-x-[46px] grid grid-cols-2 md:w-1/2'>
          <div className='flex flex-col items-center'>
            {[product.image, product.image2, product.image3, product.image4].map((img, index) => (
              <img key={index} src={img} alt={product.title} onClick={() => handleImageSelect(img)} className={`cursor-pointer m-1 duration-200 h-[100px] w-[100px] ${selectedImage === img ? 'border-2 border-[#46A358]' : 'border-2 border-transparent'}`} />
            ))}
          </div>
          <div className='flex justify-center w-[404px]'>
             {isZoomed ? (
            <TransformWrapper>
              <TransformComponent>
                <img src={selectedImage} alt="Selected Product" className='w-[404px] h-[404px]' />
              </TransformComponent>
            </TransformWrapper>
          ) : (
            <img src={selectedImage} alt="Selected Product" className="max-w-full h-auto" />
          )}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`h-[30px] w-[30px] rounded-[50px] top-0 right-0 p-2 ${isZoomed ? 'text-green-500 bg-gray-100' : 'bg-gray-100'}`}
          >
            <FiSearch />
          </button>
          </div>
        </div>
        <div className='w-full md:w-1/2 flex flex-col justify-start'>
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="font-[700] mb-4 text-[#46A358] text-[22px] ">${product.price}</p>
           <StarRatings
        rating={product.rating}
        starDimension="40px"
        starSpacing="15px"
      />
          <div className='flex items-center mb-4'>
            <button onClick={() => handleQuantityChange(-1)} className="text-lg px-3 py-1 border rounded-l">-</button>
            <span className="text-lg px-4 py-1 border-t border-b">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="text-lg px-3 py-1 border rounded-r">+</button>
          </div>
          <button onClick={handleBuyNow} className="bg-green-500 text-white px-5 py-2 rounded mb-4">BUY NOW</button>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-5 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
