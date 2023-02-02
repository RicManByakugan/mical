const { ObjectID } = require("bson");
const crypto = require('crypto')
const outil = require('../../modele/outil')


async function HomeClient(clientConnex, req, res) {
    if (this.session) {
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resultat => {
                res.send([{ message: "USER CONNECTED", user: resultat, session: this.session }])
            })
            .catch(err => {
                res.send([{ message: "REQUEST ERROR" }])
            })
    } else {
        res.send([{ message: "USER NOT CONNECTED", session: this.session }])
    }
}

async function NotificationClient(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var resUserN = {}
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resUser => {
                if (resUser) {
                    delete resUser._id
                    delete resUser.password
                    delete resUser.username
                    delete resUser.dateSubscribe
                    resUserN = resUser
                    continueVar = true
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                    continueVar = false
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar) {
            await clientConnex.db("Garage").collection('NotificationClient').find({ client: resUserN }).toArray()
                .then(resNotif => {
                    if (resNotif) {
                        res.send(resNotif)
                    } else {
                        res.send({ message: "Aucune notification pour le moment" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function GetCarClient(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var resClientN = {}
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resClient => {
                if (resClient) {
                    delete resClient._id
                    delete resClient.password
                    delete resClient.username
                    delete resClient.dateSubscribe
                    resClientN = resClient
                    continueVar = true
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                    continueVar = false
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar) {
            await clientConnex.db("Garage").collection('Voiture').find({ client: resClientN }).toArray()
                .then(resultatVoiture => {
                    valeurAffiche = outil.TriageDataCar(resultatVoiture)
                    res.send(valeurAffiche)
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function GetCarOne(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var resClientN = {}
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resClient => {
                if (resClient) {
                    delete resClient._id
                    delete resClient.password
                    delete resClient.username
                    delete resClient.dateSubscribe
                    continueVar = true
                    resClientN = resClient
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar) {
            await clientConnex.db("Garage").collection('Voiture').findOne({
                $and: [
                    { _id: new ObjectID(req.params.id) },
                    { client: resClientN },
                ]
            })
                .then(resultatVoiture => {
                    valeurAffiche = outil.TriageDataCarOne(resultatVoiture)
                    res.send(valeurAffiche)
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR", detailled: "TRAITEMENT ERROR" })
                })
        }

    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}


async function GetFactureClient(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var resClientN = {}
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resClient => {
                if (resClient) {
                    delete resClient._id
                    delete resClient.password
                    delete resClient.username
                    delete resClient.dateSubscribe
                    continueVar = true
                    resClientN = resClient
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar) {
            await clientConnex.db("Garage").collection('Voiture').find({ client: resClientN }).toArray()
                .then(resultatVoiture => {
                    valeurAffiche = outil.TriageDataFacture(resultatVoiture)
                    res.send(valeurAffiche)
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function GetFactureIdClient(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var resClientN = {}
        if (req.params.id !== undefined && typeof req.params.id === "string") {
            try {
                await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
                    .then(resClient => {
                        if (resClient) {
                            delete resClient._id
                            delete resClient.password
                            delete resClient.username
                            delete resClient.dateSubscribe
                            continueVar = true
                            resClientN = resClient
                        } else {
                            res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                        }
                    })
                    .catch(err => {
                        res.send({ message: "REQUEST ERROR" })
                    })
            } catch (error) {
                res.send({ message: "REQUEST ERROR" })
            }

            if (continueVar) {
                try {
                    await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ _id: new ObjectID(req.params.id) }, { client: resClientN }] })
                        .then(resultatVoiture => {
                            valeurAffiche = outil.TriageDataFactureOne(resultatVoiture)
                            res.send(valeurAffiche)
                        })
                        .catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                } catch (error) {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                }
            }
        } else {
            res.send({ message: "REQUEST ERROR", detailled: "FACTURE NOT FOUND" })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function GetCarClientReception(clientConnex, req, res) {
    if (this.session) {
        try {
            var continueVar = false
            var resClientN = {}
            if (req.params.valeur === undefined && req.params.valeur) {
                res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
            } else {
                await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
                    .then(resClient => {
                        if (resClient) {
                            delete resClient._id
                            delete resClient.password
                            delete resClient.username
                            delete resClient.dateSubscribe
                            continueVar = true
                            resClientN = resClient
                        } else {
                            res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                        }
                    })
                    .catch(err => {
                        res.send({ message: "REQUEST ERROR" })
                    })

                if (continueVar) {
                    await clientConnex.db("Garage").collection('Voiture').find({ client: resClientN }).toArray()
                        .then(resultatVoiture => {
                            valeurAffiche = outil.TriageDataReceptionne(resultatVoiture, JSON.parse(req.params.valeur))
                            res.send(valeurAffiche)
                        })
                        .catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                }

            }
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function ValidateCar(clientConnex, req, res) {
    if (this.session) {
        var continueVar = false
        var continueVar1 = false
        var continueVar2 = false
        var resClientN = {}
        var updateDoc = {}
        var options = {}
        var dataActivite = {}
        var resVoitureR = {}
        await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
            .then(resClient => {
                if (resClient) {
                    if (req.params.idVoiture !== undefined) {
                        delete resClient._id
                        delete resClient.password
                        delete resClient.username
                        delete resClient.dateSubscribe
                        continueVar = true
                        resClientN = resClient
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                    }
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar && resClientN) {
            await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ _id: new ObjectID(req.params.idVoiture) }, { client: resClientN }] })
                .then(resVoiture => {
                    resVoitureR = resVoiture
                    if (!resVoiture.validationClient) {
                        updateDoc = {
                            $set: {
                                validationClient: true,
                            }
                        };
                        options = { upsert: true };
                        continueVar1 = true
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "ALREADY VALIDATE" })
                    }
                }).catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })

            if (continueVar1 && updateDoc && options) {
                await clientConnex.db("Garage").collection('Voiture').updateOne({ _id: new ObjectID(req.params.idVoiture) }, updateDoc, options)
                    .then(resUpdate => {
                        dataActivite = {
                            activite: "VALIDATION FACTURE VOITURE",
                            client: resClientN,
                            voiture: {
                                numero: resVoitureR.numero,
                                marque: resVoitureR.marque,
                                modele: resVoitureR.modele,
                                annee: resVoitureR.annee,
                            },
                            admin: resVoitureR.admin,
                            reparation: resVoitureR.reparation,
                            facture: resVoitureR.facture,
                            dateDepot: resVoitureR.dateDepot,
                        }
                        continueVar2 = true
                    })
                    .catch(err => {
                        res.send({ message: "REQUEST ERROR" })
                    })
                if (continueVar2 && dataActivite) {
                    await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                        .then(resActivite => {
                            console.log("Continue...");
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                        .then(resNotifClient => {
                            res.send({ message: "VALIDATION FACTURE DONE" })
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                }
            }
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function carCancelControlle(clientConnex, req, res) {
    if (this.session) {
        if (req.body.carId !== undefined) {
            var continueVar = false
            var continueVar1 = false
            var resClientN = {}
            var resCar = {}
            await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
                .then(resClient => {
                    resClientN = resClient
                    if (resClient) {
                        continueVar = true
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })

            if (continueVar) {
                delete resClientN._id
                delete resClientN.password
                delete resClientN.username
                delete resClientN.dateSubscribe
                await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ _id: new ObjectID(req.body.carId) }, { client: resClientN }] })
                    .then(resTwo => {
                        resCar = resTwo
                        continueVar1 = true
                    }).catch(err => {
                        res.send({ message: "REQUEST ERROR VOITURE" })
                    })

                if (continueVar1) {
                    await clientConnex.db("Garage").collection('Voiture').deleteOne({ _id: new ObjectID(req.body.carId) })
                        .then(resFinal => {
                            res.send({ message: "DELETE SUCCESSFULLY" })
                        }).catch(err => {
                            res.send({ message: "REQUEST ERROR VOITURE" })
                        })
                }
            }

        } else {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}
async function AddCarClient(clientConnex, req, res) {
    if (this.session) {
        if (req.body.numero !== undefined && req.body.marque !== undefined && req.body.modele !== undefined && req.body.annee !== undefined) {
            var continueVar = false
            var continueVar1 = false
            var continueVar2 = false
            var resClientN = {}
            await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(this.session) })
                .then(resClient => {
                    resClientN = resClient
                    if (resClient) {
                        continueVar = true
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })

            if (continueVar) {
                var dataCar = {}
                await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ numero: req.body.numero }, { receptionne: false }] })
                    .then(resTwo => {
                        if (resTwo) {
                            res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY ADDED" })
                        } else {
                            req.body.user = resClientN
                            delete req.body.user.password
                            delete req.body.user.username
                            delete req.body.user._id
                            delete req.body.user.dateSubscribe
                            dataCar = {
                                numero: req.body.numero,
                                marque: req.body.marque,
                                modele: req.body.modele,
                                annee: req.body.annee,
                                receptionne: false,
                                admin: {},
                                client: req.body.user,
                                reparation: {},
                                facture: {},
                                dateDepot: new Date()
                            }
                            continueVar1 = true
                        }
                    }).catch(err => {
                        res.send({ message: "REQUEST ERROR VOITURE" })
                    })

                if (continueVar1) {
                    var dataActivite = {}
                    await clientConnex.db("Garage").collection('Voiture').insertOne(dataCar)
                        .then(resFinal => {
                            dataActivite = {
                                activite: "DEPOT VOITURE",
                                client: req.body.user,
                                voiture: {
                                    numero: req.body.numero,
                                    marque: req.body.marque,
                                    modele: req.body.modele,
                                    annee: req.body.annee,
                                },
                                dateDepot: dataCar.dateDepot
                            }
                            continueVar2 = true
                        })
                        .catch(err => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    if (continueVar2) {
                        await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                            .then(resActivite => {
                                console.log("Continue...");
                            })
                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                        await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                            .then(resNotifClient => {
                                res.send({ message: "NEW CAR ADDED", client: req.body.user })
                            })
                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    }
                }
            }
        } else {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function carSearchControlle(clientConnex, req, res) {
    if (this.session) {
        if (req.body.cleSearch) {
            var continueVar = false
            var valRecherche = {}
            await clientConnex.db("Garage").collection('Voiture').findOne({
                $or: [
                    { numero: req.body.cleSearch },
                    { modele: req.body.cleSearch },
                    { marque: req.body.cleSearch },
                    { annee: req.body.cleSearch }
                ]
            })
                .then(resRecherche => {
                    valRecherche = resRecherche
                    continueVar = true
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
            if (continueVar) {
                if (valRecherche) {
                    await clientConnex.db("Garage").collection("Client").findOne({ _id: new ObjectID(this.session) })
                        .then(resClient => {
                            if (resClient) {
                                if (resClient.nom === valRecherche.client.nom) {
                                    if (valRecherche) {
                                        valeurAffiche = outil.TriageDataCarOne(valRecherche)
                                        res.send(valeurAffiche)
                                    } else {
                                        res.send({ message: "DATA EMPTY" })
                                    }
                                } else {
                                    res.send({ message: "DATA EMPTY" })
                                }
                            } else {
                                res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                            }
                        })
                } else {
                    res.send([{ message: "DATA NOT FOUND", cleSearch: req.body.cleSearch }])
                }
            }
        } else {
            res.send([{ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }])
        }
    } else {
        res.send([{ message: "USER NOT CONNECTED" }])
    }
}

async function LoginClient(clientConnex, res, req) {
    if (!req.session.clientId) {
        await clientConnex.db("Garage").collection('Client').findOne({ email: req.body.email })
            .then(resultat => {
                if (resultat) {
                    if (req.body.email !== undefined) {
                        req.session.clientId = resultat._id
                        let hashPassword = crypto.createHash('md5').update(req.body.password).digest("hex")
                        if (resultat.email === req.body.email && resultat.password === hashPassword) {
                            req.session.clientId = resultat._id
                            this.session = resultat._id
                            res.send({ message: "LOGIN SUCCESSFULLY", session: req.session.clientId })
                        } else {
                            res.send({ message: "LOGIN FAILED", detailled: "EMAIL OR PASSWORD INVALID" })
                        }
                    } else {
                        res.send({ message: "LOGIN FAILED", detailled: "EMAIL INVALID" })
                    }
                } else {
                    res.send({ message: "LOGIN FAILED", detailled: "INFORMATION NOT FOUND" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })
    } else {
        res.send([{ message: "USER CONNECTED" }])
    }

}

async function SubScribeClient(clientConnex, res, req) {
    if (req.body.username !== undefined && req.body.password !== undefined && req.body.nom !== undefined && req.body.prenom !== undefined && req.body.adress !== undefined && req.body.phone !== undefined && req.body.email !== undefined) {
        req.body.dateSubscribe = new Date()
        let hashPassword = crypto.createHash('md5').update(req.body.password).digest("hex")
        req.body.password = hashPassword
        continueVar = false
        await clientConnex.db("Garage")
            .collection('Client').findOne({ email: req.body.email })
            .then(resUser => {
                if (resUser) {
                    res.send({ message: "SUBSCRIBE FAILED", detailled: "EMAIL ALREADY USED" })
                    req.body.nom = req.body.nom.toUpperCase()
                    req.body.prenom = req.body.prenom.toUpperCase()
                    continueVar = false
                } else {
                    continueVar = true
                }
            })
            .catch(err => res.send({ message: "SUBSCRIBE FAILED", detailled: "TRAITEMENT FAILED" }))

        if (continueVar) {
            await clientConnex.db("Garage").collection('Client').insertOne(req.body)
                .then(resultat => {
                    res.send({ message: "SUBSCRIBE SUCCESSFULLY" })
                })
                .catch(err => res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION", err: err }))
        }
    } else {
        res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION" })
    }
}

function LogoutClient(res, req) {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.HomeClient = HomeClient
exports.NotificationClient = NotificationClient
exports.GetCarClient = GetCarClient
exports.GetCarOne = GetCarOne
exports.carSearchControlle = carSearchControlle
exports.GetFactureClient = GetFactureClient
exports.GetFactureIdClient = GetFactureIdClient
exports.GetCarClientReception = GetCarClientReception
exports.AddCarClient = AddCarClient
exports.ValidateCar = ValidateCar
exports.carCancelControlle = carCancelControlle

exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient