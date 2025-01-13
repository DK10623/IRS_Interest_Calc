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
        <p>For Tax Year: ${taxYear}</p>
        <p>Due Date Used: April 15, ${parseInt(taxYear) + 1}</p>
        <p class="disclaimer"><em>Disclaimer: This calculator provides estimates only. Please consult with your tax professional for accurate calculations and advice.</em></p>
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
    const caTaxYearSelect = document.getElementById('ca-taxYear');
    const currentYear = new Date().getFullYear();
    
    // Function to populate dropdown
    function populateYears(selectElement) {
        for (let year = currentYear; year >= currentYear - 5; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            selectElement.appendChild(option);
        }
        selectElement.value = currentYear - 1; // Select previous tax year by default
    }
    
    // Populate both dropdowns
    populateYears(taxYearSelect);
    populateYears(caTaxYearSelect);
};

function switchTab(tab) {
    // Hide all calculator contents
    document.querySelectorAll('.calculator-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected calculator and activate tab
    document.getElementById(`${tab}-calculator`).classList.add('active');
    event.target.classList.add('active');
}

// California interest rates (example - update with actual rates)
const caInterestRates = {
    '2024': 0.07,
    '2023': 0.07,
    '2022': 0.05,
    '2021': 0.03,
    '2020': 0.05,
    // Add more years as needed
};

function calculateCAInterest() {
    const balance = parseFloat(document.getElementById('ca-balance').value);
    const taxYear = parseInt(document.getElementById('ca-taxYear').value);
    const dueDate = new Date(taxYear + 1, 3, 15); // April 15th of year after tax year
    const today = new Date();
    
    if (isNaN(balance) || isNaN(taxYear)) {
        alert('Please enter valid values');
        return;
    }

    // Simple interest calculation for CA
    const rate = caInterestRates[taxYear] || 0.07; // Default to current rate
    const days = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    const totalInterest = (balance * rate * days) / 365;

    const resultDiv = document.getElementById('ca-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Calculation Results:</h3>
        <p>Original Balance: $${balance.toFixed(2)}</p>
        <p>Interest Accrued: $${totalInterest.toFixed(2)}</p>
        <p>Total Amount Due: $${(balance + totalInterest).toFixed(2)}</p>
        <p>Calculated as of: ${today.toLocaleDateString()}</p>
        <p>For Tax Year: ${taxYear}</p>
        <p>Due Date Used: April 15, ${parseInt(taxYear) + 1}</p>
        <p class="disclaimer"><em>Disclaimer: This calculator provides estimates only. Please consult with your tax professional or the FTB for accurate calculations and advice.</em></p>
    `;
} 