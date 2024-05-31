import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import MyCarousel from '../components/MyCarousel';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import { HiOutlineChevronRight } from "react-icons/hi2";
import SuperSaleTitle from '../assets/aside/super-sale-title.webp';
import SuperSale from '../assets/aside/super-sale-title.png';
import SuperSaleBg from '../assets/aside/super-sale-bg.webp';
import SuperS from '../assets/aside/super-sale-bg.jpg';
import productsData from '../data/products.json';
import { FaArrowRightLong } from "react-icons/fa6";
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState(productsData.products);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [selectedSize, setSelectedSize] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [cartItems, setCartItems] = useState([]);
  const [activeButton, setActiveButton] = useState('all');

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, priceRange, selectedSize, sortOrder]);

  useEffect(() => {
    const newFilteredProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);
    setFilteredProducts(newFilteredProducts);
  }, [currentPage, products]);

  const filterProducts = (filterType) => {
    let newProducts = productsData.products;
    const currentDate = new Date();
    if (filterType === 'new') {
      newProducts = newProducts.filter(product => {
        const productDate = new Date(product.arrivalDate);
        return currentDate - productDate <= 30 * 24 * 60 * 60 * 1000;
      });
    } else if (filterType === 'sale') {
      newProducts = newProducts.filter(product => product.onSale === true);
    }
    setProducts(newProducts);
    setCurrentPage(0);
  };

  const sortProducts = (order) => {
    setSortOrder(order);
  };

  const filterAndSortProducts = () => {
    let newProducts = productsData.products;

    if (selectedCategory !== 'all') {
      newProducts = newProducts.filter(product => product.category === selectedCategory);
    }

    newProducts = newProducts.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);

    if (selectedSize !== 'all') {
      newProducts = newProducts.filter(product => product.size === selectedSize);
    }

    if (sortOrder === 'growth') {
      newProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'decrease') {
      newProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(newProducts);
    setCurrentPage(0);
    setFilteredProducts(newProducts.slice(0, productsPerPage));
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filterByPriceRange = (min, max) => {
    setPriceRange({ min, max });
  };

  const filterBySize = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    let filtered = productsData.products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);

    if (selectedSize !== 'all') {
      filtered = filtered.filter(product => product.size === selectedSize);
    }

    setFilteredProducts(filtered.slice(0, productsPerPage));
  }, [selectedCategory, priceRange, selectedSize]);

  return (
    <>
      <main className="main main-home mt-[78px]">
      <section className="_container sm:px-0 px-[24px] ">
           <MyCarousel/>
      </section>
      <div className="_container">
        <div className="flex justify-between mt-[26px] ">
         <aside class="flex flex-col pt-3.5">
  <div class="flex flex-col px-6 pb-9">
    <div class="pb-9">
      <h3 class="capitalize mb-1.5 text-lg font-bold leading-[88.88889%] text-[#3D3D3D]" data-spoiler="">
        Categories
      </h3>
      <nav class="pl-3">
        <ul class="text-base leading-[2.66667] w-[280px]">
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "house" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('House Plants'); setActiveButton('house')}}>
              <span>House Plants</span>
              <span>(33)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <a class={`${activeButton === "potter" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Potter Plants'); setActiveButton('potter')}}>
              <span>Potter Plants</span>
              <span>(12)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "seeds" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Seeds'); setActiveButton('seeds')}}>
              <span>Seeds</span>
              <span>(65)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "small" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Small Plants'); setActiveButton('small')}}>
              <span>Small Plants</span>
              <span>(39)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "big" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Big Plants'); setActiveButton('big')}}>
              <span>Big Plants</span>
              <span>(23)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "succulents" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Succulents'); setActiveButton('succulents')}}>
              <span>Succulents</span>
              <span>(17)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "terrariums" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Terrariums'); setActiveButton('terrariums')}}>
              <span>Terrariums</span>
              <span>(19)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "gardening" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Gardening'); setActiveButton('gardening')}}>
              <span>Gardening</span>
              <span>(13)</span>
            </a>
          </li>
          <li class="flex cursor-pointer justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class={`${activeButton === "accessories" ? "w-full text-[#46A358] inline-flex justify-between duration-200 border-b-[2px] border-[#46A358] h-23px" : "w-full h-23px inline-flex justify-between"}`} onClick={() => {filterByCategory('Accessories'); setActiveButton('accessories')}}>
              <span>Accessories</span>
              <span>(18)</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="pb-11">
      <h3 class="capitalize mb-3.5 text-lg font-bold leading-[88.88889%] text-[#3D3D3D]">
        Price Range
      </h3>
      <div class="mb-6">
        <div class="filter-price__range relative bg-[#FAFAFA] rounded border border-[#D3D3D3] shadow-[inset_0_1px_1px_#f0f0f0,0_3px_6px_-5px_#bbb]">
        </div>
      </div>
      <div class="mb-4 text-base leading-[106.66667%] flex whitespace-nowrap ">
        <span class="text-[#3D3D3D] mr-1.5">Price:</span>
        <span class="font-bold text-[#46A358]" id="price-start">39</span>
        <span class="font-bold text-[#46A358] mx-1.5">-</span>
        <span class="font-bold text-[#46A358]" id="price-end">1230</span>
      </div>
      <a class="inline-block py-2 px-6 text-white bg-green-600 rounded-full" href="#">
        Filter
      </a>
    </div>
    <div class="pb-5">
      <h3 class="capitalize mb-1.5 text-lg font-bold leading-[88.88889%] text-[#3D3D3D]" data-spoiler="">
        Size
      </h3>
      <nav class="pl-3">
        <ul class="text-base leading-[2.66667]">
          <li class="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class="w-full inline-flex justify-between" onClick={() => filterBySize('Small')}>
              <span>Small</span>
              <span>(119)</span>
            </a>
          </li>
          <li class="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class="w-full inline-flex justify-between" onClick={() => filterBySize('Medium')}>
              <span>Medium</span>
              <span>(86)</span>
            </a>
          </li>
          <li class="flex justify-between text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <a class="w-full inline-flex justify-between" onClick={() => filterBySize('Large')}>
              <span>Large</span>
              <span>(78)</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <a class="block relative pt-[151.613%] z-1" href="#">
    <div class="absolute inset-0 flex flex-col items-center">
      <div class="px-5.5 mb-2.5">
        <picture>
          <source srcSet={SuperSaleTitle} type="image/webp"/>
          <img class="object-cover" src={SuperSale} alt="sale"/>
        </picture>
      </div>
      <span class="font-bold text-[23px] leading-[69.56522%] uppercase text-[#3D3D3D]">UP TO 75% OFF</span>
    </div>
    <div class="absolute inset-0 z-[-1]">
      <picture>
        <source srcSet={SuperSaleBg} type="image/webp"/>
        <img class="w-full h-full object-cover" src={SuperS} alt="image"/>
      </picture>
    </div>
  </a>
         </aside>
          <div className="main-home__products flex flex-col max-w-[840px] w-full items-end ">
            <div className="products-home__header flex justify-between w-full">
              <nav className="">
                <ul className="flex gap-x-9">
                  <li >
                     <button className={`${activeButton === 'all' ? ' text-[15px] text-[#46A358] duration-200 border-b-[2px] border-[#46A358] h-23px' : 'text-[15px] h-23px'}`} onClick={() => {
    filterProducts('all');
    setActiveButton('all');
  }}>All Plants</button>
                  </li>
                  <li>
                     <button className={`${activeButton === 'new' ? ' text-[15px] text-[#46A358] duration-200 border-b-[2px] border-[#46A358] h-23px' : 'text-[15px] h-23px'}`} onClick={() => {
    filterProducts('new');
    setActiveButton('new');
  }}>New arrivales</button>
                  </li>
                  <li>
                     <button className={`${activeButton === 'sale' ? ' text-[15px] text-[#46A358] duration-200 border-b-[2px] border-[#46A358] h-23px' : 'text-[15px] h-23px'}`} onClick={() => {
    filterProducts('sale');
    setActiveButton('sale');
  }}>Sale</button>
                  </li>
                </ul>
              </nav>
              <nav className="products-home__sort sort-products">
                <span className="sort-products__title">Short by:</span>
               <select className="sort-products__select" onChange={(e) => sortProducts(e.target.value)}>
                  <option className="sort-products__option" value="default">
                    Default sorting
                  </option>
                  <option className="sort-products__option" value="growth">
                    Growth
                  </option>
                  <option className="sort-products__option" value="decrease">
                    Decreas
                  </option>
                </select>
              </nav>
            </div>

              <div className="grid grid-cols-3 justify-end gap-x-[41px] mt-[31px] w-full  gap-y-[88px] right-0">
               {filteredProducts.map(product => (
          <Card key={product.id} product={product} addToCart={addToCart} />
        ))}
              </div>
                 <ReactPaginate
                 className='flex space-x-2 react-paginate'
        previousLabel={false}
        nextLabel={<HiOutlineChevronRight/>}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(products.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
          </div>
        </div>
            
            <section className="mt-[146px]">
                   <div className="flex gap-x-[28px]">
                    <div className="Products1 pt-[37px] pr-[30px] w-[586px] h-[250px] flex items-end flex-col bg-[#FBFBFB]">
                    <h3 className="  max-w-[150px] text-[#3D3D3D]">
                        <a className="text-[18px] font-[900] max-w-[150px] text-right" href="#">
                             SUMMER CACTUS &amp; SUCCULENTS
                     </a>
                     </h3>
                     <p className="w-[292px] text-[14px] font-[400] text-right">
                               We are an online plant shop offering a wide range of cheap and
                            trendy plants
                    </p>
                    <Link className="info-popular__btn _btn-more hover:bg-green-800 mt-[20px]" href="#">
                    <span className="flex gap-x-1 items-center ">Find More <FaArrowRightLong/></span>
                     </Link>
                   </div>
                    <div className="Products2 pt-[37px] pr-[30px] w-[586px] h-[250px] flex items-end flex-col bg-[#FBFBFB]">
                    <h3 className="  max-w-[150px] text-[#3D3D3D]">
                        <a className="text-[18px] font-[900] max-w-[150px] text-right" href="#">
                             SUMMER CACTUS &amp; SUCCULENTS
                     </a>
                     </h3>
                     <p className="w-[292px] text-[14px] font-[400] text-right">
                               We are an online plant shop offering a wide range of cheap and
                            trendy plants
                    </p>
                    <Link className="info-popular__btn _btn-more hover:bg-green-800 mt-[20px]" href="#">
                    <span className="flex gap-x-1 items-center ">Find More <FaArrowRightLong/></span>
                     </Link>
                   </div>
            </div>
</section>



         <section className="mt-[138px]">
           <div>
               <h2 className='text-center text-[30px] font-[700] text-[#3D3D3D]'>Our Blog Posts</h2>
               <p  className='text-center'>We are an online plant shop offering a wide range of cheap and trendy plants. </p>
           </div>

           <div className='mt-[35px] flex gap-x-[44px]'>
            <div className='max-w-[268px] w-full'>
              <img src="https://s3-alpha-sig.figma.com/img/4f35/4de5/b3a1897ab9540ae4953f1e0f0ace9952?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DZNXneVPd2vcpak5N9~W4hDL2cNjilWYSKFBkz3xkVQU3gAGFs~W7vwYBJCQ7HO8KV9YELgRGRps88KU0nxDmgtQHZAHvnzGXgmxm3MjtB0~Ufnv~BB111J3mn7HCYldP1HOhjFJZy0nGDMwF5oXhfih0NlVMoqOcm1qvVEkgvVRy8NwAR1biAUpSl5uFW1dQv6Y2ocvmLIgQr-dJs999a-4vl1vUJDhmYEHm6E1EHQuroFkDfBs8wdy3wemPJvhpbPxWEdKlALP2AnCeHIMx41GPRZBHRXhriSa05hQxSgi6EyyxyCkwly48uqw9ma6VmIXHSt77qlGqWlr-sy62g__" alt="" />
              <div className='pl-[15px] pt-[9px]'><h4 className='text-[14px] font-[500] text-[#46A358] '>September 12  I Read in 6 minutes</h4>
               <h3 className='text-[20px] font-[700] text-[#3D3D3D] w-[189px] '>Cactus & Succulent Care Tips</h3>
               <p className=' text-[14px] font-[400] '>Cacti are succulents are easy care plants for any home or patio. </p>
               <Link className='flex items-center mt-[9px] gap-x-2 text-[#3D3D3D] hover:text-[#46A358]'>Read More <FaArrowRightLong/></Link></div> 
            </div>
            <div className='max-w-[268px] w-full'>
              <img src="https://s3-alpha-sig.figma.com/img/5d6a/fe05/19b43ea40d6912ed9f6c86bde26ac437?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bLUJnk5aWXrRmn1gn6QQvYbQSv0lIVioltCYkFLQn-zo3Qce-Lce87IgE32dzSjh~vVVtODkLhrrdOj558JJtVbvqwtnsFs1Jnh3x3R5l5rRFXXfu4Q94bTW0faPNOf2TCcqh~Wg-8YtR897-IqA57TQBwlat3r1ZzN5FrUNlBTUEczqVcCGll2ml03PakG8kfefNTzyEsMtaVpCIttuWFrclUVTaJdWE82aGBs4ZHVAnkXgRK~eV~T9SokWtAckoF36sFEPwz3e6vrCrZNBsbnyUDEXa1qTzts~m7O5Lc9PJzRJrD-y5t6JJXkXuaH2OeN9DOK59CvM68vinVL2iA__" alt="" />
              <div className='pl-[15px] pt-[9px]'><h4 className='text-[14px] font-[500] text-[#46A358] '>September 13  I Read in 2 minutes</h4>
               <h3 className='text-[20px] font-[700] text-[#3D3D3D] w-[189px] '>Top 10 Succulents for
Your Home</h3>
               <p className=' text-[14px] font-[400] '>Best in hanging baskets. Prefers medium to high light.</p>
               <Link className='flex items-center mt-[9px] gap-x-2 text-[#3D3D3D] hover:text-[#46A358]'>Read More <FaArrowRightLong/></Link></div> 
            </div>
            <div className='max-w-[268px] w-full'>
              <img src="https://s3-alpha-sig.figma.com/img/708d/5ac3/4916119d54b3f3ce81cb3585303dc87b?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DVD0QjiVFmbs~Wii-G2mWGeAApZJgBAT9ZSinRn75rzkTd7Ica6OyTM8X36XhHT9VIZMrof1NzLfcnLqNAUjIBLSMn-TmcRi9eZi-pq~o12QJMbs9oZ1s5ozEfKRaoo5kGYHlUDxpRkFO3PyBp52nU1KFaNhv7uhj6p7BGPHYHr7flIALO28yD1i622z3X-OzyWbvHrYIjBJZdAsSxakLVfEwq7bLSLuCfeP2GHq8KMvMwgWttsspEECudwses7aR3eQhjZo7mBJI0~EWlYzxXDX0Oq-HP7qt5D5ZLlwrED1tbNv3KCUG8Jwvl1B2iXSfZ--PjBtx7uXu9heIsoeCQ__" alt="" />
              <div className='pl-[15px] pt-[9px]'><h4 className='text-[14px] font-[500] text-[#46A358] '>September 15  I Read in 3 minutes</h4>
               <h3 className='text-[20px] font-[700] text-[#3D3D3D] w-[189px] '>Cacti & Succulent 
Care Tips</h3>
               <p className=' text-[14px] font-[400] '>Cacti and succulents thrive in containers and because most are.. </p>
               <Link className='flex items-center mt-[9px] gap-x-2 text-[#3D3D3D] hover:text-[#46A358]'>Read More <FaArrowRightLong/></Link></div> 
            </div>
            <div className='max-w-[268px] w-full'>
              <img src="https://s3-alpha-sig.figma.com/img/76ec/a5ae/aad8a62909bb4bd3fb02922695ada788?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KbU26EVEtU~Ijwzir-MqjZc79yWHgM8xNRiSEdiD-HZT7GpHGkN3uQ-QopkMPe6pOdvTcVO0LscMJuxVo0qH8fwT7PAm3ujK8nTy54nD50swNlAXxd6MH0v58uy5qsYT5KzKF9KO5Ooc3aDfBqb1dq-7s6QiuvkDqq95gzQMjSsE736~w0VnTut-Q9PlsrWsv0tI4HV1M3ZpP8Z0AiNyNGBu-3Jj2M3wM7dkgwJ3DvdKnGwPc4SqhksDSa4N71CPt5lDYdR6ttan4cpQ0NB-7kSwAeTlHV1TS5XobibEVk7olI9RxnqzS~5Uokteha-EBj1meV7S0rF-R2E22BVjVg__" alt="" />
              <div className='pl-[15px] pt-[9px]'><h4 className='text-[14px] font-[500] text-[#46A358] '>September 15  I Read in 2 minutes</h4>
               <h3 className='text-[20px] font-[700] text-[#3D3D3D] w-[189px] '>Best Houseplants 
Room by Room</h3>
               <p className=' text-[14px] font-[400] '>The benefits of houseplants are endless. In addition to..</p>
               <Link className='flex items-center mt-[9px] gap-x-2 text-[#3D3D3D] hover:text-[#46A358]'>Read More <FaArrowRightLong/></Link></div> 
            </div>
           </div>
        </section>

        
      </div>
    </main>
    </>
  )
}

export default Home