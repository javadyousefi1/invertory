import { useState } from "react";
import { toast } from "react-hot-toast";

const CategoryForm = ({ categoryList, setCategoryList }) => {
  const [isShow, setIsShow] = useState(false);
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
  });

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  const changeHandler = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (newCategory.title === "" || newCategory.description === "") {
      toast.error("Please fill in all the fields ", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // ? check for dublicated category

    let availableCategory = false;

    categoryList.forEach((item) => {
      if (item.title === newCategory.title) {
        availableCategory = true;
        toast.error("this category already exists", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });

    if (availableCategory === true) {
      return;
    }

    setCategoryList([
      ...categoryList,
      {
        ...newCategory,
        createdAt: new Date().toISOString(),
        id: new Date().getTime(),
      },
    ]);
    toast.success(`category ${newCategory.title} added`, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setNewCategory({
      title: "",
      description: "",
    });
    setIsShow(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="container max-w-xl px-4 mb-4">
          <h1
            onClick={() => setIsShow(!isShow)}
            className={`mb-3 font-bold text-left cursor-pointer text-slate-500 text-md category-toggle inline ${
              isShow ? "hidden" : "block"
            }`}
          >
            Add new category ?
          </h1>

          <div className={` category-section ${isShow ? "block" : "hidden"}`}>
            <h1 className="mb-3 font-bold text-left text-white text-md">
              Add new category
            </h1>
            <div className="w-full p-3 rounded-xl bg-slate-700">
              <form action="">
                <label className="">
                  <span className="block mb-2 text-slate-400">title</span>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    value={newCategory.title}
                    className="bg-transparent border rounded-xl border-slate-500 text-slate-400 h-[37px] mb-3"
                    onChange={(e) => changeHandler(e)}
                  />
                </label>

                <label>
                  <span className="block mb-2 text-slate-400">description</span>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => changeHandler(e)}
                    name="description"
                    id="description"
                    className="w-full mb-4 bg-transparent border rounded-xl border-slate-500 text-slate-400"
                  ></textarea>
                </label>

                <div className="flex items-center justify-between gap-x-2">
                  <button
                    onClick={(e) => cancelHandler(e)}
                    className="flex-1 p-2 transition-all duration-150 ease-linear border text-slate-300 border-slate-500 rounded-xl hover:border-red-400 hover:text-red-400"
                  >
                    cancel
                  </button>
                  <button
                    onClick={(e) => submitHandler(e)}
                    id="addNewCategoryBtn"
                    className="flex-1 p-2 transition-all duration-150 ease-linear border-2 bg-slate-500 text-slate-200 rounded-xl hover:border-green-600 border-slate-500 hover:text-green-400"
                  >
                    Add new category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
