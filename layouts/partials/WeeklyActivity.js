"use client";

import { useState, useMemo } from "react";
import ImageFallback from "@components/ImageFallback";
import Circle from "@components/Circle";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mission = {
  image: "/images/about/02.jpg",
};

function generateDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    days.push({ day: d, currentMonth: false, dateStr: `${year}-${month - 1}-${d}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, currentMonth: true, dateStr: `${year}-${month}-${d}` });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, currentMonth: false, dateStr: `${year}-${month + 1}-${d}` });
  }
  return days;
}

const MONTH_NAMES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

const WeeklyActivity = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  );

  const days = useMemo(
    () => generateDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Our Latest News
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">
            Weekly Activity
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-[#d4a017]" />
        </div>
        <div className="row items-start justify-center">

 
           {/* Linhas decorativas abaixo do card, canto direito */}
  <div className="flex flex-col gap-2 mt-4 items-end pr-2">
    <div className="h-[3px] w-64 rounded-full bg-[#d4a017]" />
    <div className="h-[3px] w-40 rounded-full bg-[#d4a017]" />
    <div className="h-[3px] w-24 rounded-full bg-[#d4a017]" />
  </div>
          {/* Coluna da imagem */}
          <div className="animate md:col-6 lg:col-5">
            <div className="about-image relative p-[60px]">
              <div className="relative rounded-[20px] overflow-hidden shadow-xl">
                <ImageFallback
                  className="animate relative w-full object-cover"
                  src={mission.image}
                  width={425}
                  height={487}
                  alt="Mission Image"
                />

                {/* Rodapé com recorte diagonal */}
                <div className="absolute bottom-0 left-0 right-0 h-[120px]">
                  <div
                    className="absolute inset-0 bg-[#d4a017]"
                    style={{ clipPath: "polygon(0 0%, 100% 38%, 100% 100%, 0% 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 flex flex-col gap-0.5">
                    <span className="text-white font-semibold text-[15px] leading-snug">João Silva</span>
                    <span className="text-white/80 text-xs tracking-wide">Diretor de Operações</span>
                    <span className="text-white/70 text-[11px] flex items-center gap-1 mt-1">
                      <span className="inline-flex h-4 w-4 items-center justify-center">📞</span> +123 456 78900
                    </span>
                  </div>
                </div>
              </div>
              <Circle className="left-4 top-4 z-[-1]" width={85} height={85} />
              <Circle width={37} height={37} fill={false} className="right-10 top-20 z-[-1]" />
              <Circle className="right-12 top-1/2 -z-[1]" width={24} height={24} />
              <Circle className="bottom-6 right-6 z-[-1]" width={85} height={85} />
              <Circle className="left-12 top-1/2 z-[-1]" width={20} height={20} />
              <Circle className="bottom-12 left-8 z-[1]" width={47} height={47} fill={false} />
            </div>
</div>

          {/* Coluna do calendário */}
          <div className="animate md:col-6 lg:col-6">
            <div className="bg-white rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </p>
             
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="w-11 h-11 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="w-11 h-11 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Dias da semana */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400 mb-3">
                {["D","S","T","Q","Q","S","S"].map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              {/* Grid de dias */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {days.map((item, index) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`rounded-2xl h-12 flex items-center justify-center text-sm font-semibold transition
                        ${!item.currentMonth ? "text-gray-300" : "text-[#222222]"}
                        ${isSelected ? "bg-[#d4a017] text-white shadow-lg" : "hover:bg-gray-100"}
                      `}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>


             {/* Linhas decorativas abaixo do card, canto esquerdo */}
  <div className="flex flex-col gap-2 mt-4 items-start pl-2 mt-8">
    <div className="h-[3px] w-64 rounded-full bg-[#1a7a6e]" />
    <div className="h-[3px] w-40 rounded-full bg-[#1a7a6e]" />
    <div className="h-[3px] w-24 rounded-full bg-[#1a7a6e]" />
  </div>
          </div>



        </div>
      </div>
    </section>
  );
};

export default WeeklyActivity;