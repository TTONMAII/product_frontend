const URL = "http://localhost:5000";

window.onload = async () => {
  await loadData();
};

const loadData = async () => {
  try {
    const response = await axios.get(`${URL}/api/v1/posts`);
    console.log(response.data); // ตรวจสอบโครงสร้างข้อมูลที่ได้รับจาก API
    const data = response.data.data; // เข้าถึงอาร์เรย์ข้อมูลภายในคีย์ data

    if (Array.isArray(data)) {
      const productTable = document
        .getElementById("productTable")
        .getElementsByTagName("tbody")[0];

      data.forEach((item) => {
        const row = productTable.insertRow();
        row.insertCell(0).innerText = item.idproduct;
        row.insertCell(1).innerText = item.brand;
        row.insertCell(2).innerText = item.Nproduct;
        row.insertCell(3).innerText = item.type;
        row.insertCell(4).innerText = item.quantity;
      });
    } else {
      console.error("Data is not an array:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const saveData = async () => {
  const brand = document.getElementById("brand");
  const productName = document.getElementById("productName");
  const type = document.getElementById("type");
  const quantity = document.getElementById("quantity");

  let product = {
    idproduct: generateRandomId(),
    brand: brand.value,
    Nproduct: productName.value,
    type: type.value,
    quantity: quantity.value,
  };
  console.log(product);
  try {
    const response = await axios.post(`${URL}/api/v1/posts/post`, product);
    console.log("response", response.data);
    clear();
    
    // หลังจากบันทึกข้อมูลเสร็จสิ้น เรียกใช้ loadData() เพื่อโหลดข้อมูลใหม่
    await loadData();
  } catch (error) {
    console.error("Error saving data:", error);
  }

};

// ฟังก์ชันสุ่ม ID
const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};



const clear = () => {
    const brand = document.getElementById("brand");
  const productName = document.getElementById("productName");
  const type = document.getElementById("type");
  const quantity = document.getElementById("quantity");
  
    brand.value = "";
    productName.value = "";
    type.value = "";
    quantity.value = "";
  
  };