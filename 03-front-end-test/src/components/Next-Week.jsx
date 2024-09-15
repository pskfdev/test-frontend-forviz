import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

/* Json */
import jsonData from "../assets/data.json";
/* Functions */
import { getBookingsForWeek } from "../functions/utill";

function NextWeek() {
  /* prop */
  const [weekNo, roomId] = useOutletContext();
  const [dataNextweek, setDataNextweek] = useState([]);


  useEffect(() => {
    const result = getBookingsForWeek(jsonData, roomId, weekNo);
    setDataNextweek(result);

  }, []);

  return (
    <div>
      {/* Header Time */}
      <div className="w-full pl-14 py-2 bg-[#ECECEC]">
        <p className="text-[#787878] font-bold">Nextweek</p>
      </div>

      {/* Item list room */}
      <div className="ms-8 ps-5 py-10 h-full border-l-2 space-y-5 border-[#ECECEC]">
        {/* map Data */}
        {dataNextweek.length != 0 &&
          dataNextweek.map((item) => (
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

export default NextWeek;
