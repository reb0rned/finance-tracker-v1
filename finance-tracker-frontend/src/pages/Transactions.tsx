import { type FC } from "react";
import { TransactionForm } from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import { toast } from "react-toastify";
import { TransactionsTable } from "../components/TransactionsTable";

export const TransactionLoader = async () => {
  const categories = await instance.get("/categories");
  const transactions = await instance.get("transactions");

  const data = {
    categories: categories.data,
    transactions: transactions.data,
  };

  return data;
};

export const TransactionAction = async ({ request }: any) => {
  const formData = await request.formData();
  const method = formData.get("_method");

  switch (method) {
    case "POST": {
      const newTransaction = {
        title: formData.get("title"),
        amount: Number(formData.get("amount")),
        type: formData.get("type"),
        category: Number(formData.get("category")),
      };

      try {
        await instance.post("/transactions", newTransaction);
        toast.success("Transaction added!");
        return { success: true };
      } catch (error: any) {
        console.error(
          "Failed to add transaction:",
          error.response?.data || error.message
        );
        toast.error("Failed to add transaction");
        return { success: false };
      }
    }
    case "DELETE": {
      const transactionId = formData.get("transactionId");
      try {
        await instance.delete(`/transactions/${transactionId}`);
        toast.success("Transaction deleted successfuly!");
      } catch (error: any) {
        console.error("Failed to delete transaction!");
        toast.error("Failed to delete transaction!");
      }
    }
  }
};

export const Transactions: FC = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-4 items-start">
        <div className="grid col-span-2">
          <TransactionForm />
        </div>

        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total income:
              </p>
              <p className="bg-green-600 p-1 rounded-sm text-center mt-2">
                1000$
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total expence:
              </p>
              <p className="bg-red-500 p-1 rounded-sm text-center mt-2">
                1000$
              </p>
            </div>
          </div>
          <>Chart</>
        </div>
      </div>

      <h1 className="my-5">
        <TransactionsTable />
      </h1>
    </>
  );
};
