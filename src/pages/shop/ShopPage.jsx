import React, { useState } from 'react'
import ProductsCard from './ProductsCard';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'gold', 'blue', 'green', 'silver', 'biege', 'red'],
    priceRanges: [
        { label: 'under Ksh50', min: 0, max: 50 },
        { label: 'Ksh50 - Ksh100', min: 50, max: 100 },
        { label: 'Ksh100 -Ksh500', min: 100, max: 500 },
        { label: 'Ksh500 - Ksh1000', min: 500, max: 1000 },
        { label: 'Ksh2000 and above', min: 1000, max: Infinity },
    ]
}

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRanges: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { category, color, priceRanges } = filtersState;
    const [minPrice, maxPrice] = priceRanges.split("-").map(Number);

    const { data: {products = [], totalPages,totalProducts} = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    });

    // const products = data?.products || [];
    // const totalPages = data?.totalPages || 0;
    // const totalProducts = data?.totalProducts || 0;

    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRanges: ''
        });
    };

    const handlePageChange = (pageNumber) => {
      if(pageNumber > 0 && pageNumber <=totalPages){
        setCurrentPage(pageNumber)
      }
    }


    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Error Loading products: {error.message}</div>;

    const startProduct = (currentPage - 1)* ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Shop Page</h2>
                <p className='section__subheader'>Browse a diverse range of categories</p>
            </section>
            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* Leftside */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />
                    {/* right side */}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-3">
                      Showing <span className="text-blue-600">{startProduct}</span> <i className="ri-arrow-drop-right-line"></i><span className="text-blue-600">{endProduct}</span> of <span className="text-blue-600">{totalProducts}</span>
                      </h3>
                       
  
                        <ProductsCard products={products} />
                        {/* Pagination controls */}
                        <div className='mt-6 flex justify-center'>
                          <button 
                          disabled = { currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                          {
                              [...Array(totalPages)].map((_, index) => (
                                <button
                                onClick={() => handlePageChange(index + 1)}
                                  key={index}
                                  className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                                >
                                  {index + 1}
                                </button>
                              ))
                            
                          }
                          <button 
                          disabled = { currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Next</button>

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;