import { useState } from "react";

const ProductList = ({
  products,
  setProductList,
  fitlerProducts,
  productList,
}) => {
  const [errorText, setErrorText] = useState("");

  const deleteHandler = (id) => {
    const filteredItem = products.filter((item) => item.id !== id);
    setProductList(filteredItem);
    localStorage.setItem("products", JSON.stringify(filteredItem));
  };

  const errorHandler = () => {
    if (fitlerProducts.length === 0 && productList.length === 0) {
      return "add some product";
    } else if (fitlerProducts.length === 0) {
      return " Your searched item not found";
    } else if (productList.length === 0) {
      return "add some products...";
    }
  };

  var
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  fixNumbers = function (str)
  {
    if(typeof str === 'string')
    {
      for(var i=0; i<10; i++)
      {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="container max-w-xl px-7">
          <h1 className="mb-5 font-bold text-left text-white text-md">
            Product list
          </h1>

          <h1 className="text-xs text-center text-white">{errorHandler()}</h1>

          <div className="overflow-x-scroll md:overflow-auto">
            {products.map((p) => {
              return (
                <div key={p.id} className="mb-2 min-w-sm">
                  <div className="flex justify-between">
                    <div className=" min-w-sm">
                      <span className=" text-slate-500">{p.title}</span>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                      <span className="text-sm data text-slate-500">
                        {/* {new Date(p.createdAt).toLocaleDateString("fa-IR")} */}
                        {fixNumbers(new Date(p.createdAt).toLocaleDateString("fa-IR"))}
                      </span>
                      <div className="py-0.5 px-2 rounded-2xl text-slate-400 border border-slate-400 text-xs">
                        {p.category}
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 border-2 rounded-full bg-slate-400 border-slate-700">
                        <span className="text-xs text-slate-700">
                          {p.quantity}
                        </span>
                      </div>
                      <div
                        onClick={() => deleteHandler(p.id)}
                        className="deleteBtn py-0.5 px-2 rounded-2xl text-red-400 border border-red-400 text-xs cursor-pointer"
                      >
                        delete
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
