import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import Header from './Header';
import HeroSection from './HeroSection';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import CartSidebar from './CartSidebar';
import CheckoutModal from './CheckoutModal';
import ProductDetailModal from './ProductDetailModal';
import Footer from './Footer';
import LoginModal from './LoginModal';

export default function CustomerView() {
  const { products, addToCart } = useApp();
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Check URL parameter for admin access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowLogin(true);
      // Clean URL after opening login modal
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleOrderSuccess = () => {
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleCloseDetail = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setShowCart(true)} />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <ProductGrid 
        products={filteredProducts} 
        onAddToCart={addToCart}
        onViewDetail={handleViewDetail}
      />
      <Footer onAdminClick={() => setShowLogin(true)} />

      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => setShowCheckout(true)}
      />

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleOrderSuccess}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={handleCloseDetail}
        onAddToCart={addToCart}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />

      {/* Success Message */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md animate-bounce">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h3>
            <p className="text-gray-600">Terima kasih telah berbelanja di ALFA PETSHOP</p>
          </div>
        </div>
      )}
    </div>
  );
}