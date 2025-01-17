
function calculatePreTaxIncome() {
    // Get values from inputs
    const price = parseFloat(document.getElementById('price').value);
    const salesTax = parseFloat(document.getElementById('salesTax').value) / 100;
    const federalTax = parseFloat(document.getElementById('federalTax').value) / 100;
    const stateTax = parseFloat(document.getElementById('stateTax').value) / 100;

    // Check if inputs are valid
    if (isNaN(price) || isNaN(salesTax) || isNaN(federalTax) || isNaN(stateTax)) {
        document.getElementById('result').innerHTML = "<p>Please enter valid numbers for all fields.</p>";
        document.getElementById('chart-container').style.display = 'none';
        return;
    }

    // Calculate combined income tax rate
    const combinedIncomeTaxRate = federalTax + stateTax;

    // Step 1: Calculate price with sales tax
    const priceWithSalesTax = price * (1 + salesTax);

    // Step 2: Calculate pre-tax income required
    const preTaxIncomeRequired = priceWithSalesTax / (1 - combinedIncomeTaxRate);

    // Calculate components
    const salesTaxAmount = price * salesTax;
    const federalTaxAmount = preTaxIncomeRequired * federalTax;
    const stateTaxAmount = preTaxIncomeRequired * stateTax;
    const netIncome = price; // The actual price of the item

    // Display results with formatted output
    document.getElementById('result').innerHTML = `
        <div class="result-heading">Pre-tax income required: $${preTaxIncomeRequired.toFixed(2)}</div>
        
        <div class="result-subheading">Step 1: Calculate Price with Sales Tax</div>
        <div class="formula">
            Price with Sales Tax = Price × (1 + Sales Tax Rate)<br>
            = $${price.toFixed(2)} × (1 + ${salesTax.toFixed(4)})<br>
            = $${priceWithSalesTax.toFixed(2)}
        </div>

        <div class="result-subheading">Step 2: Calculate Pre-Tax Income Required</div>
        <div class="formula">
            Pre-Tax Income Required = Price with Sales Tax / (1 - Combined Income Tax Rate)<br>
            = $${priceWithSalesTax.toFixed(2)} / (1 - ${combinedIncomeTaxRate.toFixed(2)})<br>
            = $${preTaxIncomeRequired.toFixed(2)}
        </div>
    `;

    // Display chart
    document.getElementById('chart-container').style.display = 'block';
    renderChart([salesTaxAmount, federalTaxAmount, stateTaxAmount, netIncome]);
}

function renderChart(data) {
    const ctx = document.getElementById('incomeChart').getContext('2d');

    // Destroy existing chart if it exists
    if (window.incomeChart) {
        window.incomeChart.destroy();
    }

    // Create new chart
    window.incomeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sales Tax', 'Federal Tax', 'State Tax', 'Net Income'],
            datasets: [{
                label: 'Income Components ($)',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Components'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                }
            }
        }
    });
}
