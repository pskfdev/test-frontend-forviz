import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

/* Json */
import jsonData from "../assets/data.json";

/* Functions */
import { getBookingsForWeek } from "../functions/utill";

function ThisWeek() {
  /* prop */
  const [weekNo, roomId] = useOutletContext();
  const [dataThisweek, setDataThisweek] = useState([]);

  useEffect(() => {
    const result = getBookingsForWeek(jsonData, roomId, weekNo);
    setDataThisweek(result);
  }, []);

  return (
    <div>
      {/* Header Time */}
      <div className="w-full pl-14 py-2 bg-[#ECECEC]">
        <p className="text-[#787878] font-bold">This Week</p>
      </div>

      {/* Item list room */}
      <div className="ms-8 ps-5 py-10 h-full border-l-2 space-y-5 border-[#ECECEC]">
        {/* map Data */}
        {dataThisweek.length != 0 &&
          dataThisweek.map((item) => (
            <div key={item.id}>
              <p className="text-sm opacity-50 relative">
                <span className="absolute -left-[25px] text-blue-500">●</span>
                {item.startTime} - {item.endTime}
              </p>
              <p>{item.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ThisWeek;
