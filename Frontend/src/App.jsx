import { useState } from 'react'
import './style.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar.jsx';
import Main from './Components/Main.jsx';
import Footer from './Components/Footer.jsx';
import Aboutus from './Components/About/Aboutus.jsx'
import Shop from './Components/Shop.jsx';
import Login from './Components/Auth/Login.jsx'
import BlogSection from './Components/BlogSection/BlogSection.jsx';
import Features from './Components/Features/Features.jsx';
import MegaGroup from './Components/MegaGroup/MegaGroup.jsx';
import Contact from './Components/Contact/Contact.jsx';
import ClothesPage from './Components/Pages/ClothesPage.jsx';
import FootwearPage from './Components/Pages/FootwearPage.jsx';
import HandbagsPage from './Components/Pages/HandbagsPage.jsx';
import AccessoriesPage from './Components/Pages/AccessoriesPage.jsx';
import Fashion from './Components/Pages/Fashion.jsx';
import FragrancesPage from './Components/Pages/FragencesPage.jsx';
import Caphats from './Components/Pages/Caphats.jsx';
import FashionPage from './Components/Pages/FashionPage.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';
import CartItems from './Components/Cartitem/Cartitems.jsx';
import NewCollections from './Components/newcollection/Newcollection.jsx';
import ProductDetailPage from './Components/ProductDisplay/ProductDetailPage.jsx';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder.jsx';
import MyOrders from './Components/Pages/MyOrders.jsx';




// Create a wrapper component to use useLocation
function AppContent() {
  const location = useLocation();
  // List all paths where you do NOT want Navbar/Footer
  const noNavFooter = ['/login'];

  // Check if the current path is in the array
  const hideNavFooter = noNavFooter.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div className="main">
        
        <Routes>
          <Route path="/" element={<><Main /></>} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/features" element={<Features />} />
          <Route path="/mega-group" element={<MegaGroup />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/footwear" element={<FootwearPage />} />
          <Route path="/handbags" element={<HandbagsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/fragence" element={<FragrancesPage />} />
          <Route path="/cap" element={<Caphats />} />
          <Route path="/men" element={< FashionPage/>} />
           <Route path="/product/:id" element={<ProductDetailPage />} />
           <Route path="/cart" element={<CartItems />} />
           <Route path="/newcollection" element={<NewCollections />} />
           <Route path="/placeorder" element={<PlaceOrder />} />
           <Route path="/orders" element={<MyOrders />} />


   











          {/* Add signup route if needed */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

// Use Router on top level
function App() {
  return (
    <ShopContextProvider>
    <Router>
      <AppContent />
    </Router>
    </ShopContextProvider>
  );
}

export default App;
