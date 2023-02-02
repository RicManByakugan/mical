const controllerClient = require('../controller/client/controller.client')
var clientCo

function sendDb(client) {
    clientCo = client
}

async function home(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.HomeClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function car(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.AddCarClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function notificationClient(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.NotificationClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function carOne(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.GetCarOne(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function facture(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.GetFactureClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function factureId(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.GetFactureIdClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function carClient(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.GetCarClient(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function carClientReception(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.GetCarClientReception(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function validateCarFacture(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.ValidateCar(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function carSearch(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.carSearchControlle(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}


async function carCanceled(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.carCancelControlle(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}


async function login(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.LoginClient(clientCo, res, req, false)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function subscribe(req, res) {
    try {
        await clientCo.connect();
        await controllerClient.SubScribeClient(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

function logout(req, res) {
    controllerClient.LogoutClient(res, req)
}

exports.home = home
exports.car = car
exports.notificationClient = notificationClient
exports.facture = facture
exports.factureId = factureId
exports.carClient = carClient
exports.carOne = carOne
exports.carSearch = carSearch
exports.carCanceled = carCanceled
exports.carClientReception = carClientReception
exports.validateCarFacture = validateCarFacture

exports.subscribe = subscribe
exports.login = login
exports.logout = logout
exports.sendDb = sendDb