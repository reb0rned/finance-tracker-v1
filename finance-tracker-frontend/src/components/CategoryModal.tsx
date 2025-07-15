import { useState, type FC, useEffect } from "react";
import { Form } from "react-router";
import { instance } from "../api/axios.api";

interface ICategoryModalProps {
  type: "post" | "patch";
  id?: number | null;
  setVisibleModal: (visible: boolean) => void;
}

const getTitleToEdit = async (id: number): Promise<string | null> => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data.title;
  } catch (error) {
    console.error("Failed to fetch category title:", error);
    return null;
  }
};

export const CategoryModal: FC<ICategoryModalProps> = ({
  type,
  id,
  setVisibleModal,
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (type === "patch") {
      getTitleToEdit(id as number).then((fetchedTitle) => {
        if (fetchedTitle) setTitle(fetchedTitle);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <Form
        action="/categories"
        method="POST"
        onSubmit={() => setVisibleModal(false)}
        className="w-full max-w-sm space-y-4 rounded-xl bg-slate-800 p-6 shadow-xl ring-1 ring-white/10 text-white"
      >
        <div>
          <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
            Category title
          </label>
          {type === "post" ? (
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Input title..."
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              required
            />
          ) : (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              name="title"
              type="text"
              placeholder="Input title..."
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              required
            />
          )}
          <input type="hidden" name="_method" value={type} />
          {type === "patch" && (
            <input
              id="id"
              name="categoryId"
              value={id as number}
              type="hidden"
            />
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
          >
            {type === "patch" ? "Save" : "Create"}
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            onClick={() => {
              setVisibleModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};
