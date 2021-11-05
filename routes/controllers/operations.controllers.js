function operationList(req, res) {
    res.send('Las operaciones que puedes realizar son las siguientes: suma, resta, multiplicación y división');
    res.json({
        availableOperations: [
            '/suma',
            '/resta',
            '/multiplicación',
            '/division'
        ],
    });
}

function suma(req, res) {
    const { valor1, valor2 } = req.query ? req.query : 0;

    let result = parseFloat(valor1) + parseFloat(valor2);

    return res.status(200).json({ "success": true, "data": result });
}

function resta(req, res) {
    const { valor1, valor2 } = req.body ? req.body : 0;

    let result = parseFloat(valor1) - parseFloat(valor2);

    return res.status(200).json({ "success": true, "data": result });
}

function multiplicacion(req, res) {
    const { valor1, valor2 } = req.params ? req.params : 0;

    let result = parseFloat(valor1) * parseFloat(valor2);

    return res.status(200).json({ "success": true, "data": result });
}

function division(req, res) {
    const { valor1, valor2 } = req.body ? req.body : 0;

    let result = parseFloat(valor1) / parseFloat(valor2);

    return res.status(200).json({ "success": true, "data": result });
}

module.exports = {
    operationList,
    suma,
    resta,
    multiplicacion,
    division
}