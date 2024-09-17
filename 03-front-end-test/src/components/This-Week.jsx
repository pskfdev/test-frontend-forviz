import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import moment from "moment";

/* Json */
import jsonData from "../assets/data.json";
/* Functions */
import { getBookingsForWeek } from "../functions/utill";

function ThisWeek() {
  /* prop */
  const [weekNo, roomId] = useOutletContext();
  const [dataThisweek, setDataThisweek] = useState([]);

  /* Format date for moment.js */
  const formattedDate = {
    sameDay: "[Today]", // วันนี้: แสดงแค่ "Today"
    nextDay: "[Tomorrow]", // พรุ่งนี้: แสดงแค่ "Tomorrow"
    nextWeek: "dddd", // ภายในสัปดาห์นี้: แสดงชื่อวัน
    lastDay: "[Yesterday]", // เมื่อวาน: แสดงแค่ "Yesterday"
    lastWeek: "[Last] dddd", // สัปดาห์ที่แล้ว: แสดงว่า "Last" + ชื่อวัน
    sameElse: "DD/MM/YYYY", // ค่าอื่นๆ: แสดงวันที่ปกติ
  };

  useEffect(() => {
    const result = getBookingsForWeek(jsonData, roomId, weekNo);
    setDataThisweek(result);
  }, []);

  return (
    <>
      {/* Left */}
      <div className="w-2/5 bg-[#46529D] py-20 pl-16 space-y-14 text-white">
        <p className="text-sm text-start">Upcoming</p>

        {dataThisweek.length != 0 && (
          <>
            <div>
              <h1 className="opacity-50">
                {moment(dataThisweek[0]?.startTime).calendar(
                  null,
                  formattedDate
                )}
              </h1>
              <h1>{moment(dataThisweek[0]?.startTime).format("D MMM")}</h1>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm opacity-50">
                  {moment(dataThisweek[0]?.startTime).format("LT")} -{" "}
                  {moment(dataThisweek[0]?.endTime)
                    .format("LT")
                    .replace(/AM|PM/, "")
                    .trim()}{" "}
                  PM
                </p>
                <p>{dataThisweek[0]?.title}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right */}
      <div className="w-3/5">
        <div className="h-[600px] bg-white shadow-[0px_-9px_15px_-5px_#c1c5cf] overflow-auto">
          <div className="h-10 w-full">
            <div className="ms-16 h-full border-l-2 border-[#ECECEC]"></div>
          </div>
          {dataThisweek.length != 0 &&
            dataThisweek.map((item) => (
              <div key={item.id}>
                <div className="w-full pl-20 py-2 flex space-x-1 bg-[#ECECEC]">
                  <p className="text-[#787878] font-bold">
                    {moment(item.startTime).calendar(null, formattedDate)}
                  </p>
                  <p className="text-[#787878] font-bold">
                    ({moment(item.startTime).format("ddd, D MMM")})
                  </p>
                </div>

                <div className="ms-16 ps-5 py-10 h-full border-l-2 space-y-5 border-[#ECECEC]">
                  <div>
                    <p className="text-sm opacity-50 relative">
                      <span className="absolute -left-[25px] text-blue-500">
                        ●
                      </span>
                      {moment(item.startTime).format("LT")} -{" "}
                      {moment(item.endTime)
                        .format("LT")
                        .replace(/AM|PM/, "")
                        .trim()}{" "}
                      PM
                    </p>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ThisWeek;
