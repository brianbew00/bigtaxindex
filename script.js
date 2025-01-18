
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

    // Display results
    document.getElementById("result").innerText = `
        Income Required to Purchase: $${incomeRequired.toFixed(2)}
        Breakdown:
        - Base Price: $${price.toFixed(2)}
        - Sales Tax Amount: $${salesTaxAmount.toFixed(2)}
        - Income Tax Impact: $${incomeTaxImpact.toFixed(2)}
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
            labels: ["Base Price", "Sales Tax", "Income Tax"],
            datasets: [
                {
                    label: "Income Breakdown",
                    data: [basePrice, salesTax, incomeTax],
                    backgroundColor: ["#007BFF", "#FFC107", "#28A745"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Dollars ($)",
                    },
                },
            },
        },
    });
}
