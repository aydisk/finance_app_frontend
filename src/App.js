import React, { useState, useEffect } from "react";
import api from "./api";
import Modal from "./components/Modal";
import Calculator from "./components/Calculator";
import CalcIcon from "../src/icons/CalcIcon";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/");
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/transactions", formData);
    fetchTransactions();
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: "",
    });
  };

  return (
    <div>
      <nav className="bg-[#2b70c0] py-[20px] px-[12px] rounded-b-[30px]">
        <div className="max-w-[1024px] mx-auto flex flex-row justify-between items-center">
          <p className="text-[36px] font-bold text-white">Finance App</p>
          <CalcIcon onClick={() => setModalState(true)} />
        </div>
      </nav>

      <div className="max-w-[1024px] mx-auto p-[12px]">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3 flex flex-col gap-[4px]">
            <label
              htmlFor="amount"
              className="text-gray-500 font-medium ml-[4px]"
            >
              Amount ($)
            </label>
            <input
              type="text"
              className="bg-gray-100 p-[12px] rounded-[8px] outline-none"
              placeholder="Enter amount"
              id="amount"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
            />
          </div>

          <div className="mb-3 flex flex-col gap-[4px]">
            <label
              htmlFor="category"
              className="text-gray-500 font-medium ml-[4px]"
            >
              Category
            </label>
            <input
              type="text"
              className="bg-gray-100 p-[12px] rounded-[8px] outline-none"
              placeholder="Enter category"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>

          <div className="mb-3 flex flex-col gap-[4px]">
            <label
              htmlFor="description"
              className="text-gray-500 font-medium ml-[4px]"
            >
              Description
            </label>
            <input
              type="text"
              className="bg-gray-100 p-[12px] rounded-[8px] outline-none"
              placeholder="Enter description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 flex flex-col gap-[4px] items-start">
            <label
              htmlFor="is_income"
              className="text-gray-500 font-medium ml-[4px]"
            >
              Income?
            </label>
            <input
              type="checkbox"
              className="w-[20px] h-[20px]"
              id="is_income"
              name="is_income"
              onChange={handleInputChange}
              checked={formData.is_income}
            />
          </div>

          <div className="mb-3 flex flex-col gap-[4px]">
            <div className="mb-3 flex flex-col gap-[4px]">
              <label
                htmlFor="date"
                className="text-gray-500 font-medium ml-[4px]"
              >
                Date
              </label>
              <input
                type="text"
                className="bg-gray-100 p-[12px] rounded-[8px] outline-none"
                placeholder="Enter description"
                id="date"
                name="date"
                onChange={handleInputChange}
                value={formData.date}
              />
            </div>

            <button
              type="submit"
              className="p-[12px] rounded-[8px] bg-[#2b70c0] hover:bg-[#366499] active:bg-[#2c5380] transition duration-[250ms] text-white font-medium"
            >
              Submit
            </button>
          </div>
        </form>
        <table className="table table-striped table-bordered table-hover w-full">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              {/* <th>Income</th> */}
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`${
                  transaction.is_income
                    ? "bg-green-500 bg-opacity-40"
                    : "bg-red-500 bg-opacity-40"
                } relative border-l-[1px] border-b-[1px] border-black`}
              >
                <td className="p-[10px] border-r-[1px] font-medium text-[#2c2c2c] border-t-[1px] text-center border-black">
                  {transaction.amount}
                </td>
                <td className="p-[10px] border-r-[1px] font-medium text-[#2c2c2c] border-t-[1px] text-center border-black">
                  {transaction.category}
                </td>
                <td className="p-[10px] border-r-[1px] font-medium text-[#2c2c2c] border-t-[1px] text-center border-black">
                  {transaction.description}
                </td>
                {/* <td className="p-[10px] border-r-[1px] font-medium text-[#2c2c2c] border-t-[1px] text-center border-black">
                  {transaction.is_income ? "Yes" : "No"}
                </td> */}
                <td className="p-[10px] border-r-[1px] font-medium text-[#2c2c2c] border-t-[1px] text-center border-black">
                  {transaction.date}
                </td>
                <p
                  className="absolute top-[2px] right-[-25px] text-[24px] font-bold cursor-pointer text-[#404040] hover:text-red-500 active:text-red-700 transition duration-[250ms]"
                  onClick={async () => {
                    await api.post(`/deleteone/${transaction.id}/`);
                    fetchTransactions();
                  }}
                >
                  x
                </p>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <p className="w-full border-[1px] border-black p-[12px] text-gray-500 font-medium text-center">
            There is no records
          </p>
        )}
        <button
          className="mt-[12px] p-[12px] w-full rounded-[8px] bg-[#c02b2b] hover:bg-[#993636] active:bg-[#802c2c] transition duration-[250ms] text-white font-medium"
          onClick={async () => {
            await api.post("/deletetransactions/");
            fetchTransactions();
          }}
        >
          Delete all records
        </button>

        <Modal open={modalState} setClose={() => setModalState(false)}>
          <Calculator data={transactions} />
        </Modal>

        {/* <div className="mt-[12px] flex flex-col gap-[6px]">
          <p className="font-medium text-[24px] text-[#2c2c2c]">
            Summ of income: {summ}
          </p>

          <button
            className="p-[12px] w-full rounded-[8px] bg-[#71c02b] hover:bg-[#429936] active:bg-[#44802c] transition duration-[250ms] text-white font-medium"
            onClick={() => {
              // transactions.map((i) => setSumm(summ + i.amount));
            }}
          >
            Total income $$$🤑
          </button>
          <button
            className="p-[12px] w-full rounded-[8px] bg-[#a7c02b] hover:bg-[#759936] active:bg-[#71802c] transition duration-[250ms] text-white font-medium"
            onClick={() => {
              setSumm(0);
            }}
          >
            Make it 0 again
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default App;
