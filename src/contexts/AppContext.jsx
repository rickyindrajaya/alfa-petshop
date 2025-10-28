import React, { createContext, useState, useEffect, useContext } from 'react';

// Initial product data
const initialProducts = [
  {
    id: 1,
    name: "Whiskas Adult Tuna",
    brand: "Whiskas",
    category: "Wet Food",
    price: 12500,
    weight: "400g",
    image: "/images/10053416_1.jpg",
    description: "Makanan kucing basah dengan tuna berkualitas"
  },
  {
    id: 2,
    name: "Super Cat Tuna & Chicken",
    brand: "Super Cat",
    category: "Dry Food",
    price: 25000,
    weight: "1kg",
    image: "/images/10130518_1.jpg",
    description: "Makanan kucing kering rasa tuna dan ayam"
  },
  {
    id: 3,
    name: "Me-O Kitten Food",
    brand: "Me-O",
    category: "Wet Food",
    price: 8500,
    weight: "80g",
    image: "/images/10466932_2.jpg",
    description: "Makanan khusus untuk anak kucing"
  },
  {
    id: 4,
    name: "Sheba Chicken with Tuna",
    brand: "Sheba",
    category: "Wet Food",
    price: 15000,
    weight: "70g",
    image: "/images/10467342_1.jpg",
    description: "Premium wet food ayam dengan tuna"
  },
  {
    id: 5,
    name: "Whiskas Junior Pouch",
    brand: "Whiskas",
    category: "Wet Food",
    price: 9500,
    weight: "85g",
    image: "/images/10605612_2.jpg",
    description: "Makanan kucing junior dalam kemasan pouch"
  },
  {
    id: 6,
    name: "Me-O Adult Cat Food",
    brand: "Me-O",
    category: "Dry Food",
    price: 28000,
    weight: "1.2kg",
    image: "/images/10606721_2.jpg",
    description: "Makanan kucing dewasa nutrisi lengkap"
  },
  {
    id: 7,
    name: "Aatas Cat Complete Care",
    brand: "Aatas Cat",
    category: "Wet Food",
    price: 13500,
    weight: "80g",
    image: "/images/10634225_1.jpg",
    description: "Formula lengkap untuk perawatan kucing"
  },
  {
    id: 8,
    name: "Wanpy Grain-Free Chicken",
    brand: "Wanpy",
    category: "Dry Food",
    price: 95000,
    weight: "1.5kg",
    image: "/images/10636877_1.jpg",
    description: "Makanan kucing bebas grain dengan ayam"
  },
  {
    id: 9,
    name: "Me-O Kitten Grain Free",
    brand: "Me-O",
    category: "Dry Food",
    price: 85000,
    weight: "1.3kg",
    image: "/images/10653090_1.jpg",
    description: "Makanan anak kucing bebas grain"
  }
];

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // State
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('alfaPetshopProducts');
    const savedOrders = localStorage.getItem('alfaPetshopOrders');
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('alfaPetshopProducts', JSON.stringify(initialProducts));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('alfaPetshopProducts', JSON.stringify(products));
    }
  }, [products]);

  // Save orders to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('alfaPetshopOrders', JSON.stringify(orders));
    }
  }, [orders]);

  // Cart functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate totals
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Order functions
  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...orderData,
      items: cart,
      total: cartTotal,
      status: 'pending'
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      price: parseFloat(productData.price)
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, ...productData, price: parseFloat(productData.price) } : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Admin auth
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  // Statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const value = {
    // State
    products,
    cart,
    orders,
    isAdmin,
    cartTotal,
    cartItemCount,
    totalRevenue,
    totalOrders,
    totalProducts,
    
    // Cart functions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Order functions
    addOrder,
    
    // Product functions
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Auth functions
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};