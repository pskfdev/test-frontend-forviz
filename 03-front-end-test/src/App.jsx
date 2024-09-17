import { useState, useEffect } from "react";
import "./App.css";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let weekNo;
  /* Get weekNo */
  weekNo = location.pathname;
  /* Get roomId (Query String)  */
  let roomId = searchParams.get("roomId");
  const typeRoom = ["A101", "A102", "Auditorium"];

  // เปลี่ยนเส้นทางจาก "/" ไป "/thisweek?roomId=${roomId}" เมื่อ Component โหลด
  useEffect(() => {
    navigate(`thisweek?roomId=${roomId}`);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#B9BDC8]">
      <main className="h-[650px] w-11/12 drop-shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="w-full flex">
          {/* Left */}
          <div className="w-2/5 h-28 pl-16 bg-[#46529D]">
            <h1 className="pl-8 pt-12 h-full text-white bg-[#2EBAEE]">
              {typeRoom.includes(roomId) ? roomId : "กรุณาใส่ roomId"}
            </h1>
          </div>

          {/* Right */}
          <div className="w-3/5 h-28 pl-16 pt-10 flex space-x-10 bg-[#EFEEEC]">
            {/* Navigation */}
            <div
              className={`py-5 cursor-pointer ${
                location.pathname == "/thisweek" &&
                "border-b-4 border-indigo-600"
              }`}
            >
              <Link
                to={`thisweek?roomId=${roomId}`}
                className={`uppercase font-bold  ${
                  location.pathname == "/thisweek" ? "text-black" : "opacity-50"
                }`}
              >
                This week
              </Link>
            </div>
            <div
              className={`py-5 cursor-pointer ${
                location.pathname == "/nextweek" &&
                "border-b-4 border-indigo-600"
              }`}
            >
              <Link
                to={`nextweek?roomId=${roomId}`}
                className={`uppercase font-bold  ${
                  location.pathname == "/nextweek" ? "text-black" : "opacity-50"
                }`}
              >
                Next week
              </Link>
            </div>
            <div
              className={`py-5 cursor-pointer ${
                location.pathname == "/wholemonth" &&
                "border-b-4 border-indigo-600"
              }`}
            >
              <Link
                to={`wholemonth?roomId=${roomId}`}
                className={`uppercase font-bold ${
                  location.pathname == "/wholemonth"
                    ? "text-black"
                    : "opacity-50"
                }`}
              >
                WHOLE MONTH
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="flex w-full">
          <Outlet context={[weekNo, roomId]} />
        </section>
      </main>
    </div>
  );
}

export default App;
