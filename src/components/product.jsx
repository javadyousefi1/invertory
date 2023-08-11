import { useState } from "react";
import { toast } from "react-hot-toast";

const Product = ({ categoryList, productList, setProductList }) => {
  const [productFormData, setProductFormData] = useState({
    title: "",
    category: "",
    quantity: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (categoryList.length === 0) {
      toast.error("at first add some category");
      return;
    }

    if (
      productFormData.category === "" ||
      productFormData.product === "" ||
      productFormData.title === ""
    ) {
      toast.error("Please fill in all the fields ", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const dublicate = productList.find(
      (item) =>
        item.title === productFormData.title &&
        item.category === productFormData.category
    );

    if (dublicate) {
      toast.error("this product with this category already exists", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    setProductList([
      ...productList,
      {
        ...productFormData,
        createdAt: new Date().toISOString(),
        id: new Date().getTime(),
      },
    ]);

    toast.success(`product added`, {
      icon: "🥳",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setProductFormData({
      title: "",
      category: "",
      quantity: "",
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="container max-w-xl px-4 mb-4">
          <h1 className="mb-3 font-bold text-left text-white text-md">
            Add new product
          </h1>
          <div className="w-full p-3 rounded-xl bg-slate-700">
            <form action="">
              <label className="">
                <span className="block mb-2 text-slate-400">title</span>
                <input
                  onChange={(e) => changeHandler(e)}
                  value={productFormData.title}
                  type="text"
                  name="title"
                  className="bg-transparent border rounded-xl border-slate-500 text-slate-400 h-[37px] mb-3 productTitle"
                />
              </label>

              <label className="">
                <span className="block mb-2 text-slate-400">quantity</span>
                <input
                  onChange={(e) => changeHandler(e)}
                  name="quantity"
                  value={productFormData.quantity}
                  type="number"
                  className="bg-transparent border rounded-xl border-slate-500 text-slate-400 h-[37px] mb-3 productQnitiy"
                />
              </label>

              <label className="">
                <span className="block mb-2 text-slate-400">category</span>

                <select
                  name="category"
                  value={productFormData.category}
                  onChange={(e) => changeHandler(e)}
                  className="w-full p-2 mb-4 bg-transparent selectTag text-slate-400 rounded-xl selectedCategory"
                >
                  <option className="bg-slate-500 text-slate-400 " value="">
                    select category...
                  </option>
                  {categoryList.map((c, index) => {
                    return (
                      <option
                        key={index}
                        className="bg-slate-500 text-slate-400 "
                        value={c.title}
                      >
                        {c.title}
                      </option>
                    );
                  })}
                </select>
              </label>

              <div className="flex items-center justify-between gap-x-2">
                <button
                  onClick={(e) => submitHandler(e)}
                  className="flex-1 p-2 transition-all duration-150 ease-linear border-2 bg-slate-500 border-slate-500 hover:bg-green-400 text-slate-200 rounded-xl addNewProductBtn hover:border-green-400 "
                >
                  Add new product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
