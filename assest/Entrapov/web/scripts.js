// Get the input elements
var incomeInput = document.getElementById('income');
var expensesInput = document.getElementById('expenses');
var profitInput = document.getElementById('profit');
var lossInput = document.getElementById('loss');

// Add event listeners to the income and expenses inputs
incomeInput.addEventListener('input', calculateProfitAndLoss);
expensesInput.addEventListener('input', calculateProfitAndLoss);

// Initialize the chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Profit',
            data: [0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Loss',
            data: [0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function calculateProfitAndLoss() {
    // Get the values of income and expenses
    var income = parseFloat(incomeInput.value) || 0;
    var expenses = parseFloat(expensesInput.value) || 0;

    // Calculate profit and loss
    var profit = income - expenses;
    var loss = expenses - income;

    // Update the profit and loss inputs
    profitInput.value = profit > 0 ? profit : 0;
    lossInput.value = loss > 0 ? loss : 0;

    // Update the output paragraphs
    document.getElementById('income-output').textContent = income > 0 ? (income / (income + expenses) * 100).toFixed(2) + '%' : '0%';
    document.getElementById('expenses-output').textContent = expenses > 0 ? (expenses / (income + expenses) * 100).toFixed(2) + '%' : '0%';
    document.getElementById('profit-output').textContent = profit > 0 ? (profit / income * 100).toFixed(2) + '%' : '0%';
    document.getElementById('loss-output').textContent = loss > 0 ? (loss / expenses * 100).toFixed(2) + '%' : '0%';

    // Update the chart data
    myChart.data.datasets[0].data.push(profit);
    myChart.data.datasets[1].data.push(loss);
    // Remove the first data point if there are more than 7
    if (myChart.data.datasets[0].data.length > 7) {
        myChart.data.datasets[0].data.shift();
        myChart.data.datasets[1].data.shift();
    }
    // Update the chart
    myChart.update();
}
