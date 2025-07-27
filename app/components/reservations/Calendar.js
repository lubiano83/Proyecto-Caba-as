'use client';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function getDatesInRange(start, end) {
  const date = new Date(start);
  const dates = [];

  while (date <= new Date(end)) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export default function Calendar({ setArrive, setLeave, lodgeId, reservations }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setArrive(startDate);
  }, [startDate]);

  useEffect(() => {
    setLeave(endDate);
  }, [endDate]);

  const reservedDates = reservations?.filter(reservation => reservation?.lodge?._id === lodgeId).flatMap(reservation => getDatesInRange(reservation.arrive, reservation.leave));

  return (
    <div className="w-full flex gap-4">
      <div className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          excludeDates={reservedDates}
          dateFormat="yyyy-MM-dd"
          dayClassName={date =>
            reservedDates.some(
              reserved =>
                reserved.getFullYear() === date.getFullYear() &&
                reserved.getMonth() === date.getMonth() &&
                reserved.getDate() === date.getDate()
            )
              ? "bg-red-500 text-white rounded-full"
              : ""
          }
          placeholderText="Fecha de inicio.."
        />
      </div>

      <div className="border-2 border-dark rounded-lg bg-white text-gray-700 px-2 py-1 w-full">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          excludeDates={reservedDates}
          dateFormat="yyyy-MM-dd"
          dayClassName={date =>
            reservedDates.some(
              reserved =>
                reserved.getFullYear() === date.getFullYear() &&
                reserved.getMonth() === date.getMonth() &&
                reserved.getDate() === date.getDate()
            )
              ? "bg-red-500 text-white rounded-full"
              : ""
          }
          placeholderText="Fecha de término.."
        />
      </div>
    </div>
  );
}