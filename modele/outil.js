const { ObjectID } = require("bson")
const nodemailer = require('nodemailer')

async function SendMail(userEmail, subject, content, DataHTML) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mical.garage266@gmail.com',
            pass: 'bcwshztyoymyavbk',
        },
    });
    const mailOptions = {
        from: 'mical.garage266@gmail.com',
        to: userEmail,
        subject: subject,
        text: content,
        html: DataHTML
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

const TriageDataReceptionne = (data, valeur) => {
    dataFinal = data.map(res => {
        if (res.receptionne === valeur) {
            return res
        } else {
            return []
        }
    })
    return dataFinal
}

const CalculTotal = (jsonData) => {
    try {
        toArr = Object.values(jsonData)
        somme = 0
        for (let i = 0; i < toArr.length; i++) {
            somme += parseInt(toArr[i]);
        }
        return somme
    } catch (error) {
        return 0
    }
}

const CalculHalf = (data) => {
    if (data > 0) {
        return data / 2
    } else {
        return 0
    }
}

const TriageDataFactureAdmin = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true && resultat.facture) {
            return {
                id: resultat._id,
                validationClient: resultat.validationClient,
                paiement: resultat.paiement,
                facture: resultat.facture,
                reparation: resultat.reparation,
                sortie: resultat.sortie,
                voiture: {
                    numero: resultat.numero,
                    marque: resultat.marque,
                    modele: resultat.modele,
                    annee: resultat.annee,
                },
                client: resultat.client,
                admin: resultat.admin,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                message: "DATA EMPTY"
            }
        }
    })
    return Newdata
}

const TriageDataFacture = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                id: resultat._id,
                validationClient: resultat.validationClient,
                paiement: resultat.paiement,
                facture: resultat.facture,
                reparation: resultat.reparation,
                sortie: resultat.sortie,
                voiture: {
                    numero: resultat.numero,
                    marque: resultat.marque,
                    modele: resultat.modele,
                    annee: resultat.annee,
                },
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {}
        }
    })
    return Newdata
}


const TriageDataFactureOne = (resultat) => {
    if (resultat.receptionne === true) {
        return {
            id: resultat._id,
            validationClient: resultat.validationClient,
            paiement: resultat.paiement,
            facture: resultat.facture,
            reparation: resultat.reparation,
            sortie: resultat.sortie,
            voiture: {
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
            },
            dateDepot: resultat.dateDepot,
        }
    } else {
        return {
            message: "DATA EMPTY"
        }
    }
}

const TriageDataCarOut = (data) => {
    Newdata = data.map(resultat => {
        diffDate = dateDiff(new Date(resultat.dateDepot), new Date(resultat.Datesortie))
        return {
            TempsReparation: {
                jour: diffDate.day,
            },
            dateDepot: resultat.dateDepot,
            Datesortie: resultat.Datesortie,
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            reparation: resultat.reparation,
            client: resultat.client,
            adminAtelier: resultat.admin,
            adminFinancier: resultat.adminPaiement,
        }
    })
    return Newdata
}


const dateDiff = (date1, date2) => {
    var diff = {}
    var tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp - diff.sec) / 60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp - diff.min) / 60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp - diff.hour) / 24);
    diff.day = tmp;

    return diff;
}

const TriageDataCar = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                admin: resultat.admin,
                reparation: resultat.reparation,
                facture: resultat.facture,
                validation: resultat.validation,
                sortie: resultat.sortie,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                reparation: resultat.reparation,
                dateDepot: resultat.dateDepot,
            }
        }
    })
    return Newdata
}

const TriageDataCarOne = (resultat) => {
    if (resultat.receptionne === true) {
        return [{
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            admin: resultat.admin,
            reparation: resultat.reparation,
            facture: resultat.facture,
            validation: resultat.validation,
            sortie: resultat.sortie,
            dateDepot: resultat.dateDepot,
        }]
    } else {
        return [
            {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                reparation: resultat.reparation,
                dateDepot: resultat.dateDepot,
            }
        ]
    }
}


const TriageDataCarAdmin = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                admin: resultat.admin,
                client: resultat.client,
                reparation: resultat.reparation,
                facture: resultat.facture,
                validation: resultat.validation,
                sortie: resultat.sortie,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                reparation: resultat.reparation,
                client: resultat.client,
                dateDepot: resultat.dateDepot,
            }
        }
    })
    return Newdata
}

const TriageDataCarOneAdmin = (resultat) => {
    if (resultat.receptionne === true) {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            admin: resultat.admin,
            client: resultat.client,
            reparation: resultat.reparation,
            facture: resultat.facture,
            validation: resultat.validation,
            sortie: resultat.sortie,
            dateDepot: resultat.dateDepot,
        }
    } else {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            reparation: resultat.reparation,
            client: resultat.client,
            dateDepot: resultat.dateDepot,
        }
    }
}

exports.TriageDataReceptionne = TriageDataReceptionne
exports.TriageDataCar = TriageDataCar
exports.TriageDataCarOut = TriageDataCarOut
exports.TriageDataCarAdmin = TriageDataCarAdmin
exports.dateDiff = dateDiff
exports.TriageDataCarOne = TriageDataCarOne
exports.TriageDataCarOneAdmin = TriageDataCarOneAdmin
exports.CalculTotal = CalculTotal
exports.CalculHalf = CalculHalf
exports.TriageDataFactureAdmin = TriageDataFactureAdmin
exports.TriageDataFacture = TriageDataFacture
exports.TriageDataFactureOne = TriageDataFactureOne
exports.SendMail = SendMail