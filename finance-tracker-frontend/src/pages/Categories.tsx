import { useState, type FC } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import {
  Form,
  type ActionFunctionArgs,
  useLoaderData,
  redirect,
} from "react-router";
import { CategoryModal } from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import type { ICategory } from "../types/types";

export const categoriesAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = (formData.get("_method") ?? "post").toString().toUpperCase();

  switch (method) {
    case "POST": {
      const title = {
        title: formData.get("title"),
      };

      await instance.post("/categories", title);
      return redirect("/categories");
    }
    case "PATCH": {
      const data = {
        categoryId: formData.get("categoryId"),
        title: formData.get("title"),
      };

      await instance.patch(`/categories/${data.categoryId}`, data);
      return redirect("/categories");
    }
    case "DELETE": {
      const categoryId = formData.get("categoryId");

      await instance.delete(`/categories/${categoryId}`);
      return redirect("/categories");
    }
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get("/categories");

  return data;
};

export const Categories: FC = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [categoryId, setCategoryId] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(false);
  const categories = useLoaderData() as ICategory[];

  return (
    <>
      <div className="mt-10 px-4 text-white max-w-7xl mx-auto">
        <h1 className="text-xl mb-4 text-center font-semibold">
          Your categories:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-full max-w-xs bg-slate-700 rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition"
            >
              <div className="text-lg font-semibold truncate text-center">
                {category.title}
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsVisibleModal(true);
                    setCategoryId(category.id);
                    setIsEdit(true);
                  }}
                  className="p-2 rounded hover:bg-slate-600 transition"
                  aria-label="Edit category"
                >
                  <AiFillEdit size={18} />
                </button>

                <Form method="post" action="/categories">
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="categoryId" value={category.id} />
                  <button
                    type="submit"
                    className="p-2 rounded hover:bg-red-600 transition"
                    aria-label="Delete category"
                  >
                    <AiFillCloseCircle size={18} />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsVisibleModal(true)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
          >
            <FaPlus />
            <span>Create new category</span>
          </button>
        </div>
      </div>

      {isVisibleModal && (
        <CategoryModal
          type={isEdit ? "patch" : "post"}
          id={isEdit ? categoryId : null}
          setVisibleModal={(visible) => {
            setIsVisibleModal(visible);
            if (!visible) {
              setIsEdit(false);
              setCategoryId(null);
            }
          }}
        />
      )}
    </>
  );
};
