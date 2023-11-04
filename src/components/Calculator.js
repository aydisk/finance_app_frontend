import React, { useState } from "react";

const Calculator = ({ data }) => {
  const [summ, setSumm] = useState(0);

  return (
    <div className="flex flex-col gap-[12px]">
      {data.length === 0 ? (
        <p className="px-[40px] w-full text-center text-[#5a5a5a] font-medium text-[16px]">
          У вас нет записей
        </p>
      ) : (
        <>
          <p className="px-[40px] w-full text-center text-[#2c2c2c] font-medium text-[16px]">
            {summ === 0
              ? 'Для расчёта нажмите кнопку "Расчитать"'
              : "Расчёт финансов: " + summ}
          </p>

          {summ === 0 ? (
            <button
              className="p-[12px] w-full rounded-[8px] bg-[#71c02b] hover:bg-[#429936] active:bg-[#44802c] transition duration-[250ms] text-white font-medium"
              onClick={() => {
                data.map((i) =>
                  i.is_income
                    ? setSumm(summ + i.amount)
                    : setSumm(summ - i.amount)
                );
              }}
            >
              Расчитать
            </button>
          ) : (
            <button
              className="p-[12px] w-full rounded-[8px] bg-[#a7c02b] hover:bg-[#759936] active:bg-[#71802c] transition duration-[250ms] text-white font-medium"
              onClick={() => {
                setSumm(0);
              }}
            >
              Сброс
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Calculator;
