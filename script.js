let priceHistory = [];
let timeLabels = [];
const maxDataPoints = 10;

// Initialize Chart.js
const ctx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: timeLabels,
        datasets: [{
            label: "BTC Price ($)",
            data: priceHistory,
            borderColor: "black",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderWidth: 2,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { display: true },
            y: { beginAtZero: false }
        }
    }
});

async function getTradingData() {
    try {
        let response = await fetch("http://127.0.0.1:8000/status");
        let data = await response.json();
        let price = data.last_price.toFixed(2);
        
        document.getElementById("status").innerText = data.status;
        document.getElementById("balance").innerText = data.balance;
        document.getElementById("price").innerText = price;

        updateChart(price);
    } catch (error) {
        document.getElementById("status").innerText = "Error!";
        console.error("Error fetching data:", error);
    }
}

function updateChart(price) {
    let now = new Date().toLocaleTimeString();
    
    if (priceHistory.length >= maxDataPoints) {
        priceHistory.shift();
        timeLabels.shift();
    }

    priceHistory.push(price);
    timeLabels.push(now);
    
    priceChart.update();
}

setInterval(getTradingData, 5000);
getTradingData();
