import { useState, type FC, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import type { ITransaction } from "../types/types";
import { normilizeDate } from "../helpers/date.helper";
import { convertNumberToUSD } from "../helpers/currencyConvert.helper";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router";

interface TransactionsTableProps {
  limit?: number;
}

export const TransactionsTable: FC<TransactionsTableProps> = ({
  limit = 5,
}) => {
  const [data, setData] = useState<ITransaction[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const revalidator = useRevalidator();

  const fetchPaginatedTrans = async (page: number) => {
    const response = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setData(response.data.data);
    setTotalPages(Math.ceil(response.data.totalPages));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/transactions/${id}`);
      toast.success("Transaction deleted successfully!");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
      toast.error("Failed to delete transaction!");
    }
  };

  useEffect(() => {
    fetchPaginatedTrans(currentPage);
    revalidator.revalidate();
  }, [currentPage]);

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-md"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-md"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
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
            {data?.map((el) => (
              <tr key={el.id}>
                <td> {el.id} </td>
                <td> {el.title} </td>
                <td
                  className={
                    el.type === "income" ? "text-green-500" : "text-red-500"
                  }
                >
                  {el.type === "income"
                    ? `+ ${convertNumberToUSD(el.amount)}`
                    : `- ${convertNumberToUSD(el.amount)}`}
                </td>
                <td>
                  {el.category && el.category.title
                    ? el.category.title
                    : "Other"}
                </td>
                <td>{normilizeDate(el.createdAt)}</td>
                <td className="text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(el.id)}
                    className="p-2 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
