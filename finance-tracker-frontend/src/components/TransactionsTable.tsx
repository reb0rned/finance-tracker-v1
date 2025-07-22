import type { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router";
import type { IResponseTransactionLoader } from "../types/types";

export const TransactionsTable: FC = () => {
  const { transactions } = useLoaderData() as IResponseTransactionLoader;
  console.log(transactions);

  return (
    <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
      <table className="w-full">
        <thead>
          <tr>
            <td className="font-bold"> N </td>
            <td className="font-bold"> Title </td>
            <td className="font-bold"> Amount ($)</td>
            <td className="font-bold"> Category </td>
            <td className="font-bold"> Date </td>
            <td className="text-right"> Action </td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((el) => (
            <tr key={el.id}>
              <td className="font-bold"> {el.id} </td>
              <td className="font-bold"> {el.title} </td>
              <td className="font-bold"> {el.amount} </td>
              <td className="font-bold"> {el.category.title} </td>
              <td className="font-bold">
                {new Date(el.createdAt).toLocaleString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                <Form action="/transactions" method="POST">
                  <input type="hidden" name="transactionId" value={el.id} />
                  <input type="hidden" name="_method" value="DELETE" />
                  <button className="btn hover:btn-red ml-auto">
                    <FaTrash />
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
