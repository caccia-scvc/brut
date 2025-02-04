async function getTradingData() {
    try {
        let response = await fetch("http://127.0.0.1:8000/status");
        let data = await response.json();
        document.getElementById("status").innerText = data.status;
        document.getElementById("balance").innerText = data.balance;
        document.getElementById("price").innerText = data.last_price.toFixed(2);
    } catch (error) {
        document.getElementById("status").innerText = "Error!";
        console.error("Error fetching data:", error);
    }
}

setInterval(getTradingData, 5000); // Auto-refresh every 5 seconds
getTradingData(); // Fetch data on page load
