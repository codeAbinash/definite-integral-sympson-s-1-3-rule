import { } from './lib/fontawesome.js'
import { integration } from './core/integration.js'
import debounce from './lib/debounce.js'



const calculateButton = document.querySelector('.form .calculate')
const resultDOM = document.querySelector('.form .result')
const inputDOM = document.querySelectorAll('.form .inputElem')
const accuracy = document.querySelector('#main .form #acc')
const accuracyNum = document.querySelector('#main .form #accNum')

calculateButton.onclick = calculateResult
inputDOM.forEach(elem => { elem.oninput = hideResult })


accuracy.addEventListener("input", debounce(() => { accuracyNum.textContent = accuracy.value }, 10, true))





function calculateResult() {
    // resultDOM.style.display = 'flex'
    resultDOM.classList.remove('err')
    resultDOM.textContent = 'Calculating . . .'

    const func = document.querySelector('#main .form #func')
    const up = document.querySelector('#main .form #up')
    const low = document.querySelector('#main .form #low')
    // const accuracy = document.querySelector('#main .form #acc')

    let integrationData = {
        func: func.value,
        up: +up.value,
        low: +low.value,
        accuracy: +accuracy.value
    }
    try {
        const result = integration(integrationData)
        resultDOM.innerHTML = `<span class="inSymbol">&Integral; </span> f(x) dx = ${result}`
    } catch (error) {
        resultDOM.classList.add('err')
        resultDOM.textContent = error
    }
}

function hideResult() {
    resultDOM.textContent = ''
}



// Registers a service worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            // Change the service worker URL to see what happens when the SW doesn't exist
            const registration = await navigator.serviceWorker.register("./sw.js");
            // console.log('Service worker registered')
        } catch (error) {
            showResult("Error while registering: " + error.message);
            console.log(error)
        }
    } else {
        showResult("Service workers API not available");
    }
};
registerSW()


function showResult(data) {
    console.log(data)
}