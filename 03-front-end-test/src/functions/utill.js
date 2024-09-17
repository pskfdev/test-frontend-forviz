export const getBookingsForWeek = (data, roomId, weekNo) => {
  const currentDate = new Date();
  let startDate = new Date();
  let endDate = new Date();
  let currentDayOfWeek;

  switch (weekNo) {
    case "/thisweek":
      currentDayOfWeek = currentDate.getDay() + 1;
      startDate.setDate(currentDate.getDate() - (currentDayOfWeek - 1));
      endDate.setDate(currentDate.getDate() + (7 - currentDayOfWeek));

      break;

    case "/nextweek":
      let dateNextWeek = new Date();
      dateNextWeek.setDate(currentDate.getDate() + 7);
      currentDayOfWeek = dateNextWeek.getDay() + 1;
      startDate.setDate(dateNextWeek.getDate() - (currentDayOfWeek - 1));
      endDate.setDate(dateNextWeek.getDate() + (7 - currentDayOfWeek));

      break;

    case "/wholemonth":
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); /* เอาวันแรกของเดือนถัดไป */
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0); /* เอาวันสุดท้ายของเดือนถัดไป */

      break;

    default:
      break;
  }

  startDate.setHours(1, 1, 1);
  endDate.setHours(22, 59, 59);
  

  return data.filter((item) => {
    return (
      item.roomId == roomId &&
      !(
        startDate >= new Date(item.endTime) ||
        endDate <= new Date(item.startTime)
      )
    );
  });
  
};
