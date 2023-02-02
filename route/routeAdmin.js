const controllerAdminClient = require('../controller/admin/controller.admin.client')
var clientCo

function sendDb(client) {
    clientCo = client
}

async function home(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.HomeAdmin(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function facture(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getAllFacture(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function ChiffreAffaireJournalier(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.ChiffreAffaireControllerJounalier(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function ChiffreAffaireMensuel(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.ChiffreAffaireControllerMensuel(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function factureTF(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.getAllFactureTr(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function factureValidate(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.ValidFacture(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carOut(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.CarClientOut(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carOutList(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.ListCarClientOut(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function client(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getAllClient(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function clientOne(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getOneClient(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carSearchAdmin(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.carSearchControlleAdmin(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function clientSearchAdmin(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.clientSearchControlleAdmin(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carList(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getAllCar(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function tempsReparation(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.tempsReparationController(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function Benefice(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.BeneficeController(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function notificationAdmin(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.NotificationAdminC(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}
async function carReceptionList(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getAllCarReception(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function carReceptionListAll(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getAllCarReceptionNotriage(clientCo, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carOne(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.getOneCar(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carreparation(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.AddCarReparation(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}
async function carReception(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.AddCarReception(clientCo, req, res)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function carReceptionneFacture(req, res) {

    try {
        await clientCo.connect();
        await controllerAdminClient.receptionneCarFacture(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }

}

async function login(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.LoginAdmin(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function add(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.AddAdmin(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

function logout(req, res) {
    controllerAdminClient.LogoutAdmin(res, req)
}

exports.home = home
exports.carreparation = carreparation
exports.carReception = carReception
exports.client = client
exports.ChiffreAffaireJournalier = ChiffreAffaireJournalier
exports.ChiffreAffaireMensuel = ChiffreAffaireMensuel
exports.tempsReparation = tempsReparation
exports.facture = facture
exports.factureTF = factureTF
exports.Benefice = Benefice
exports.carSearchAdmin = carSearchAdmin
exports.carOut = carOut
exports.carOutList = carOutList
exports.factureValidate = factureValidate
exports.clientOne = clientOne
exports.carList = carList
exports.notificationAdmin = notificationAdmin
exports.carReceptionList = carReceptionList
exports.carOne = carOne
exports.carReceptionneFacture = carReceptionneFacture
exports.clientSearchAdmin = clientSearchAdmin
exports.add = add
exports.login = login
exports.logout = logout
exports.sendDb = sendDb
exports.carReceptionListAll = carReceptionListAll