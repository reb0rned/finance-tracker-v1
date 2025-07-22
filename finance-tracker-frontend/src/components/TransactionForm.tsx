import { useRef, type FC, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, Link, useActionData, useLoaderData } from "react-router";
import type { IResponseTransactionLoader } from "../types/types";

export const TransactionForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  const actionData = useActionData() as { success?: boolean };

  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData]);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form
        ref={formRef}
        className="grid gap-2"
        method="POST"
        action="/transactions"
      >
        <input type="hidden" value="POST" name="_method" />
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="input border-slate-700 placeholder:text-white/50"
            placeholder="title..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            className="input border-slate-700 placeholder:text-white/50"
            placeholder="amount..."
            name="amount"
            required
          />
        </label>

        <label htmlFor="category" className="grid">
          <span>Category</span>
          {categories.length ? (
            <select name="category" className="input border-slate-700" required>
              {categories.map((ctg, idx) => (
                <option key={idx} value={ctg.id}>
                  {ctg.title}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold bg-red-50 border border-red-200 px-3 py-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M12 4.5l7 13H5l7-13z"
                />
              </svg>
              Please create a category first
            </div>
          )}
        </label>

        <Link
          to="/categories"
          className="mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage categories</span>
        </Link>

        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="income"
              className="form-radio text-blue-600"
              required
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="expense"
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        <button type="submit" className="btn btn-green max-w-fit mt-2">
          Submit
        </button>
      </Form>
    </div>
  );
};
