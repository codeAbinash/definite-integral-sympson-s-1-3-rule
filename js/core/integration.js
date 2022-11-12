// Sympson's 1/3 rule function
// (c) Abinash Karmakar 12-11-2022

export function integration(data) {
    const upperLimit = data.up
    const lowerLimit = data.low
    const steps = data.accuracy
    const h = (upperLimit - lowerLimit) / steps
    const func = processFunc(data.func)

    let startResult, endResult

    try {
        // Check if the function is valid
        startResult = calculate(func, lowerLimit)
        endResult = calculate(func, upperLimit)
    } catch (error) {
        throw "Function is Invalid"
    }

    if (upperLimit == lowerLimit)
        return 0

    let sum = 0
    for (let i = 1; i <= steps; i++) {
        let x = lowerLimit + i * h
        if (i % 2 == 0)
            sum += 2 * calculate(func, x)
        else
            sum += 4 * calculate(func, x)
    }

    return (h / 3) * (startResult + endResult + sum)
}


function calculate(func, x) {
    return eval(func)
}

function processFunc(func = '') {
    // return func.replace(//g, 'Math.')
    func = func.replace(/(E|LN2|LN10|LOG2E|LOG10E|PI|SQRT1_2|SQRT2|abs|acos|acosh|asin|asinh|atan|atanh|atan2|cbrt|ceil|clz32|cos|cosh|exp|expm1|floor|fround|imul|log|log1p|log10|log2|max|min|pow|random|sign|sin|sinh|sqrt|tan|tanh|trunc)/gi, 'Math.$1')
    return func.replaceAll('^', '**')
}
