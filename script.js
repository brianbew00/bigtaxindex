
function calculatePreTaxIncome() {
    // Get values from inputs
    const price = parseFloat(document.getElementById('price').value);
    const salesTax = parseFloat(document.getElementById('salesTax').value) / 100;
    const federalTax = parseFloat(document.getElementById('federalTax').value) / 100;
    const stateTax = parseFloat(document.getElementById('stateTax').value) / 100;

    // Check if inputs are valid
    if (isNaN(price) || isNaN(salesTax) || isNaN(federalTax) || isNaN(stateTax)) {
        document.getElementById('result').innerHTML = "<p>Please enter valid numbers for all fields.</p>";
        return;
    }

    // Calculate combined income tax rate
    const combinedIncomeTaxRate = federalTax + stateTax;

    // Step 1: Calculate price with sales tax
    const priceWithSalesTax = price * (1 + salesTax);

    // Step 2: Calculate pre-tax income required
    const preTaxIncomeRequired = priceWithSalesTax / (1 - combinedIncomeTaxRate);

    // Display results with formatted output
    document.getElementById('result').innerHTML = `
        <div class="result-heading">Pre-tax income required: $${preTaxIncomeRequired.toFixed(2)}</div>
        
        <div class="result-subheading">Price with Sales Tax = Price × (1 + Sales Tax Rate)</div>
        <div class="formula">= $${price.toFixed(2)} × (1 + ${salesTax.toFixed(4)}) = $${priceWithSalesTax.toFixed(2)}</div>

        <div class="result-subheading">Pre-Tax Income Required = Price with Sales Tax / (1 - Combined Income Tax Rate)</div>
        <div class="formula">= $${priceWithSalesTax.toFixed(2)} / (1 - ${combinedIncomeTaxRate.toFixed(2)}) = $${preTaxIncomeRequired.toFixed(2)}</div>
    `;
}
