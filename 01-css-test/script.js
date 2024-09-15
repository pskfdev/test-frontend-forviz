const apiUrl = "https://picsum.photos/v2/list";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("การดึงข้อมูลล้มเหลว");
    }

    const data = await response.json();

    const dataContainer = document.getElementById("data");

    data.forEach((item) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      div.className = "div-image";
      img.className = "api-image";
      img.src = item.download_url;

      div.appendChild(img);
      dataContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

window.onload = fetchData;
