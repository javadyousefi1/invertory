import { useEffect, useState } from "react";
import CategoryForm from "./components/category";
import Filter from "./components/filter";
import NavBar from "./components/navBar";
import Product from "./components/product";
import ProductList from "./components/productList";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [fitlerProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(productList);
  }, [productList]);

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem("products")) || [];
    setProductList(savedProduct);

    const savedcategory = JSON.parse(localStorage.getItem("category")) || [];
    setCategoryList(savedcategory);
  }, []);

  useEffect(() => {
    if (productList.length) {
      localStorage.setItem("products", JSON.stringify(productList));
    }
  }, [productList]);

  useEffect(() => {
    if (categoryList.length) {
      localStorage.setItem("category", JSON.stringify(categoryList));
    }
  }, [categoryList]);

  return (
    <div className="pb-4 bg-slate-800">
      <div>
        <Toaster />
      </div>
      <NavBar />
      <CategoryForm
        categoryList={categoryList}
        setCategoryList={setCategoryList}
      />
      <Product
        categoryList={categoryList}
        productList={productList}
        setProductList={setProductList}
      />

      <Filter
        fitlerProducts={fitlerProducts}
        productList={productList}
        setFilterProducts={setFilterProducts}
      />

      <ProductList
        products={fitlerProducts}
        productList={productList}
        setProductList={setProductList}
        fitlerProducts={fitlerProducts}
      />
    </div>
  );
};

export default App;
