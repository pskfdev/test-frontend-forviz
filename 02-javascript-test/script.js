import dataJson from "./data.json" with { type: "json" };


// Function to handle form submission
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const reqRoomId = document.getElementById('roomId').value;
    const reqStartTime = document.getElementById('startTime').value;
    const reqEndTime = document.getElementById('endTime').value;

    checkAvailability(reqRoomId, reqStartTime, reqEndTime)

    // Clear the form after submission
    document.getElementById('myForm').reset();
});


/* ฟังก์ชั่นตรวจสอบห้องว่าง */
function checkAvailability(roomId, starttime, endtime) {

  const listData = dataJson.filter((item)=>{
    return (item.roomId == roomId)
  });

  if (listData.length == 0) {
    alert(`ไม่มีห้อง ${roomId} ในระบบ`);
    return
  }

  const dataFilter = dataJson.filter((listData) => {
    /* แปลงข้อมูล Json ให้เป็นรูปแบบวันที่ */
    const jsonStartTime = new Date(listData.startTime)
    const jsonEndTime = new Date(listData.endTime);

    /* แปลงข้อมูลจาก Input ให้เป็นรูปแบบวันที่ */  
    const reqStartTime = new Date(starttime);
    const reqEndTime = new Date(endtime);

    const isRoomAvailable =  !(reqStartTime >= jsonEndTime || reqEndTime <= jsonStartTime)

    return (listData.roomId == roomId && isRoomAvailable);
  });

  
  if (dataFilter.length > 0) {
    alert(`ห้อง ${roomId} ไม่ว่างในวันที่ดังกล่าว !!`);
  } else {
    alert(`ห้อง ${roomId} ว่าง และพร้อมสำหรับการจอง`);
  }
}