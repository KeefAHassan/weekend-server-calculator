console.log('client.js is sourced!');
renderHistory()
let operation = "+"

function submitCalculation(event) {
    event.preventDefault()
    console.log("hello")
    const firstInput = document.getElementById("firstNumber")
    const secondInput = document.getElementById("secondNumber")
    const newcalculation = {
        numOne: firstInput.value,
        numTwo: secondInput.value,
        operator: operation,
    }
    axios({
        method: 'POST',
        url: '/calculations',
        data: newcalculation
          
        
    })
        .then(function (response) {
          console.log(response.data)  
            renderHistory();
        })
        .catch(function (error) {
            console.error('Request to POST /guesses failed:', error);
        });
}

function captureOperation(event, operationSign) {
    event.preventDefault()
    operation = operationSign
}

function fetchHistory() {
    console.log("hello")

}

function renderHistory() {
    console.log("hello")
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.
            console.log(response);
            // quotesFromServer will be an Array of quotes
            let calculationHistory = response.data;
            let contentDiv = document.querySelector('#resultHistory');
            contentDiv.innerHTML = ""
            let recentResultDiv = document.querySelector('#recentResult')
            recentResultDiv.innerHTML =`${calculationHistory[calculationHistory.length -1].result}`
            for (let history of calculationHistory) {
                contentDiv.innerHTML += `
                <p>
                   ${history.numOne} ${history.operator} ${history.numTwo} = ${history.result}

                </p>
            `;
            }
        }).catch(function (error) {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });


}
function clearInput(event) {
    event.preventDefault()
    console.log("hello")
    const firstInput = document.getElementById("firstNumber")
    const secondInput = document.getElementById("secondNumber")
    firstInput.value =""
    secondInput.value=""


}
