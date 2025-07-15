import { type FC } from "react";
import { TransactionForm } from "../components/TransactionForm";

export const TransactionLoader = async () => {};

export const TransactionAction = async ({ request }: any) => {};

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

      <h1 className="my-5">TABLE</h1>
    </>
  );
};
