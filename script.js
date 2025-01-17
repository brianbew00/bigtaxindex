
function calculate() {
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
}
