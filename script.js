
let chart;

function calculateAndUpdateChart() {
    const price = parseFloat(document.getElementById("price").value) || 0;
    const salesTax = parseFloat(document.getElementById("salesTax").value) || 0;
    const stateTax = parseFloat(document.getElementById("stateTax").value) || 0;
    const federalTax = parseFloat(document.getElementById("federalTax").value) || 0;

    // Calculate sales tax adjustment
    const adjustedPrice = price * (1 + salesTax / 100);

    // Combined income tax rate
    const combinedTaxRate = (stateTax + federalTax) / 100;

    // Gross up for income tax
    const incomeRequired = adjustedPrice / (1 - combinedTaxRate);

    // Tax amounts for breakdown
    const salesTaxAmount = adjustedPrice - price;
    const incomeTaxImpact = incomeRequired - adjustedPrice;

    // Calculate purchasing power
    const purchasingPower = (price / incomeRequired) * 100;

    // Format values as USD
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Display results
    document.getElementById("result").innerHTML = `
        <div class="summary">
            Income Required to Purchase: ${formatter.format(incomeRequired)}
        </div>
        <div>
            Your purchasing power on income: ${purchasingPower.toFixed(1)}%
        </div>
        <div class="breakdown">
            Base Price: ${formatter.format(price)}<br>
            Sales Tax Amount: ${formatter.format(salesTaxAmount)}<br>
            Income Tax Impact: ${formatter.format(incomeTaxImpact)}
        </div>
    `;

    // Update the chart
    updateChart(price, salesTaxAmount, incomeTaxImpact);
}

function updateChart(basePrice, salesTax, incomeTax) {
    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) {
        chart.destroy(); // Destroy the previous chart instance to update it
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [""], // Empty labels to remove the x-axis label
            datasets: [
                {
                    label: "Base Price",
                    data: [basePrice],
                    backgroundColor: "#007BFF",
                },
                {
                    label: "Sales Tax",
                    data: [salesTax],
                    backgroundColor: "#FFC107",
                },
                {
                    label: "Income Tax",
                    data: [incomeTax],
                    backgroundColor: "#28A745",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Adjust height dynamically
            plugins: {
                tooltip: {
                    mode: "index",
                    intersect: false,
                },
                legend: {
                    position: "top",
                },
            },
            scales: {
                x: {
                    stacked: true,
                    display: false, // Remove x-axis labels
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(value); // Format as USD
                        },
                    },
                },
            },
        },
    });
}
