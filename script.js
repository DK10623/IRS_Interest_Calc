// IRS quarterly interest rates (historical)
const interestRates = {
    '2024-Q1': 0.08,
    '2023-Q4': 0.08,
    '2023-Q3': 0.08,
    '2023-Q2': 0.07,
    '2023-Q1': 0.07,
    '2022-Q4': 0.06,
    '2022-Q3': 0.05,
    '2022-Q2': 0.04,
    '2022-Q1': 0.03,
    '2021-Q4': 0.03,
    '2021-Q3': 0.03,
    '2021-Q2': 0.03,
    '2021-Q1': 0.03,
    '2020-Q4': 0.03,
    '2020-Q3': 0.03,
    '2020-Q2': 0.05,
    '2020-Q1': 0.05,
    '2019-Q4': 0.05,
    '2019-Q3': 0.05,
    '2019-Q2': 0.06,
    '2019-Q1': 0.06
};

function calculateInterest() {
    const balance = parseFloat(document.getElementById('balance').value);
    const taxYear = parseInt(document.getElementById('taxYear').value);
    // Due date is April 15th of the following year
    const dueDate = new Date(taxYear + 1, 3, 15); // April 15th of year after tax year
    const today = new Date();
    
    if (isNaN(balance) || isNaN(taxYear)) {
        alert('Please enter valid values');
        return;
    }

    let totalInterest = 0;
    let currentBalance = balance;
    let currentDate = new Date(dueDate);
    
    // Calculate interest for each quarter
    while (currentDate < today) {
        const quarter = getQuarter(currentDate);
        const rate = interestRates[quarter] || 0.08; // Default to current rate if not found
        
        // Calculate days until next quarter or today
        const nextQuarter = getNextQuarterDate(currentDate);
        const endDate = nextQuarter > today ? today : nextQuarter;
        const days = (endDate - currentDate) / (1000 * 60 * 60 * 24);
        
        // Calculate interest for this period
        const periodInterest = (currentBalance * rate * days) / 365;
        totalInterest += periodInterest;
        
        currentDate = nextQuarter;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Calculation Results:</h3>
        <p>Original Balance: $${balance.toFixed(2)}</p>
        <p>Interest Accrued: $${totalInterest.toFixed(2)}</p>
        <p>Total Amount Due: $${(balance + totalInterest).toFixed(2)}</p>
        <p>Calculated as of: ${today.toLocaleDateString()}</p>
        <p>Due Date Used: April 15, ${taxYear + 1}</p>
    `;
}

function getQuarter(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const quarter = Math.floor(month / 3) + 1;
    return `${year}-Q${quarter}`;
}

function getNextQuarterDate(date) {
    const nextQuarter = new Date(date);
    nextQuarter.setMonth(Math.floor((date.getMonth() / 3) + 1) * 3);
    nextQuarter.setDate(1);
    return nextQuarter;
}

// Initialize the form when the page loads
window.onload = function() {
    const taxYearSelect = document.getElementById('taxYear');
    const currentYear = new Date().getFullYear();
    
    // Add options for the last 5 tax years
    for (let year = currentYear; year >= currentYear - 5; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        taxYearSelect.appendChild(option);
    }
    
    // Select previous tax year by default
    taxYearSelect.value = currentYear - 1;
}; 