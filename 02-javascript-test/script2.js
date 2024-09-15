import dataJson from "./data.json" with { type: "json" };

let reqRoomId = "A101";
const typeRoom = ["A101", "A102", "Auditorium"]

document.addEventListener('DOMContentLoaded', function() {

    /* Set default input roomId */
    document.getElementById('roomId').value = reqRoomId;

    /* function handle submit for set value reqRoomId */
    document.getElementById('formGetRoomId').addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Get form data
      reqRoomId = document.getElementById('roomId').value;

      /* Set style active defalut when submit new value input */
      const tabContent = document.querySelectorAll('.tab-content');
      tabContent.forEach(content => content.style.display = 'none');
      const tabButtons = document.querySelectorAll('.tab-button');
      tabButtons.forEach(button => button.classList.remove('active'));
      document.getElementById("today").style.display = 'block';
      document.getElementById("today-btn").classList.add('active');

      /* new call data by argument defalut when submit new value input */
      if (typeRoom.includes(reqRoomId)) {
        getBookingsForWeek(reqRoomId, "today")
      } else {
        alert("ไม่มี Room ID นี้")
        getBookingsForWeek(reqRoomId, "today")
      }
    });

    /* function click tab */
    function openTab(evt, tabId) {
        const tabContent = document.querySelectorAll('.tab-content');
        tabContent.forEach(content => content.style.display = 'none');

        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabId).style.display = 'block';
        evt.currentTarget.classList.add('active');


        if (reqRoomId) {
          getBookingsForWeek(reqRoomId, tabId)
        } else {
          alert("กรุณากรอก Room Id เช่น A101")
        }
    }

    /* call data default reqRoomId = "A101", weekNo = "today" */
    getBookingsForWeek(reqRoomId, "today")

    document.getElementById('today').style.display = 'block';
    document.getElementById('today-btn').classList.add('active');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function(evt) {
            const tabId = button.id.replace('-btn', '');
            openTab(evt, tabId);
        });
    });
});


function getBookingsForWeek(roomId, weekNo) {
    const currentDate = new Date()
    let startDate = new Date();
    let endDate = new Date();
    let currentDayOfWeek;

    let divContent = document.getElementById('content-today');

    switch (weekNo) {

      case "today":
        divContent = document.getElementById('content-today');
      break;

      case "thisweek":
        divContent = document.getElementById('content-thisweek');
        currentDayOfWeek = currentDate.getDay() + 1;
        startDate.setDate(currentDate.getDate() - (currentDayOfWeek - 1));
        endDate.setDate(currentDate.getDate() + (7 - currentDayOfWeek));
        
      break;

      case "nextweek":
        divContent = document.getElementById('content-nextweek');
        let dateNextWeek = new Date();
        dateNextWeek.setDate(currentDate.getDate() + 7)
        currentDayOfWeek = dateNextWeek.getDay() + 1 /* 6 */
        startDate.setDate(dateNextWeek.getDate() - (currentDayOfWeek - 1));
        endDate.setDate(dateNextWeek.getDate() + (7 - currentDayOfWeek));

      break;
        
      default:
        break;
    }

    startDate.setHours(1,1,1)
    endDate.setHours(22,59,59)


    const result = dataJson.filter((item) => {
      return item.roomId == roomId && !(startDate >= new Date(item.endTime) || endDate <= new Date(item.startTime)) 
    })


    let htmlRender = ""
    result.forEach((item) => {
        htmlRender += `
        <h3><strong>Room Id:</strong> ${item.roomId}</h3>
        <p><strong>StartTime:</strong> ${item.startTime}</p>
        <p><strong>EndTime:</strong> ${item.endTime}</p>
        <br />
    `
    })

    /* Render HTML Content */
    if (result.length == 0) {
      divContent.innerHTML = `<h3>ไม่มีการจอง</h3>`
    } else {
      divContent.innerHTML = htmlRender
    }
};



        



