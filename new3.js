const data = [
    { token: 'token1', service: 'service1', usageSeconds: 120, costPerSecond: 0.05 },
    { token: 'token1', service: 'service2', usageSeconds: 300, costPerSecond: 0.10 },
    { token: 'token2', service: 'service1', usageSeconds: 60, costPerSecond: 0.05 },
    { token: 'token2', service: 'service2', usageSeconds: 90, costPerSecond: 0.10 }
];

function createRow(entry) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${entry.token}</td>
        <td>${entry.service}</td>
        <td>${entry.usageSeconds}</td>
        <td><input type="number" value="${entry.costPerSecond.toFixed(2)}" step="0.01" min="0" onchange="updateCostOfUsage(this, ${entry.usageSeconds})"></td>
        <td class="cost-of-usage">$${(entry.usageSeconds * entry.costPerSecond).toFixed(2)}</td>
    `;
    return row;
}

function populateInvoice() {
    const invoiceBody = document.getElementById('invoice-body');
    data.forEach(entry => {
        const row = createRow(entry);
        invoiceBody.appendChild(row);
    });
    calculateTotalCost();
}

function calculateTotalCost() {
    const costsOfUsage = document.querySelectorAll('.cost-of-usage');
    let totalCost = 0;

    costsOfUsage.forEach(cost => {
        totalCost += parseFloat(cost.textContent.slice(1)); // Remove '$' and convert to number
    });

    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

function updateCostOfUsage(input, usageSeconds) {
    const costPerSecond = parseFloat(input.value);
    const costOfUsage = (costPerSecond * usageSeconds).toFixed(2);

    const row = input.closest('tr');
    const costOfUsageCell = row.querySelector('.cost-of-usage');

    costOfUsageCell.textContent = `$${costOfUsage}`;

    calculateTotalCost();
}

document.addEventListener('DOMContentLoaded', populateInvoice);