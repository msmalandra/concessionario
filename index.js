//Matheus dos Santos Malandra - progetto nodeJS
//Importa i pacchetti che saranno usati
const express = require("express");
const bodyParser = require("body-parser");

//Inizializza express
const app = express();

//Seleziona le funzionalità dei pacchetti importati
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

//Determina il host e la porta che saranno usati per l'applicazione
const host = "127.0.0.1";
const port = 4000;

//Banca dati in mock per fare le prove dell'applicazione
let concessionarioList = [
    {
        "idMacchina": "macc1",
        "marca": "toyota",
        "modello": "aygo",
        "anno": 2015,
        "colore": "bianco",
        "categoria": "berlina"
    },
    {
        "idMacchina": "macc2",
        "marca": "volkswagen",
        "modello": "amarok",
        "anno": 2020,
        "colore": "blu",
        "categoria": "utilitaria"
    },
    {
        "idMacchina": "macc3",
        "marca": "jeep",
        "modello": "wrangler",
        "anno": 2022,
        "colore": "rosso",
        "categoria": "fuoristrada"
    }
]

//Avvia la comunicazione server
app.listen(port, host, () => {
    console.log("Sono in ascolto sul host: ", host,", nella porta: ", port);
})

//CRUD MACCHINE
//cRud - Ricerca tutti i veicoli
app.get("/veicoli", (req, res) => {
    res.json({
        status: "Success!!!",
        data: concessionarioList
    });
})

//cRud - Ricerca veicolo BY identificativo Univoco
app.get("/veicoli/:id", (req, res) => {
    //Prende l'id della url
    let veicolo = req.params.id;

    //Ciclo ForOf per cercare l'elemento corrispondente all'id ricercato
    for(let [idx, item] of concessionarioList.entries()){
        if(item.idMacchina == veicolo){
            res.json({
                status: "Success!!!",
                data: item
            });
            return;
        }
    }

    //Caso non trovato l'elemento
    res.status(400).json({
        status: "Error!!!",
        data: "Errore, l'elemento ricercato non è stato trovato"
    });
    return;
})

//Crud - Aggiunge nuovo veicolo
app.post("/veicoli", (req, res) => {
    //Nuovo elemento
    let veicolo = {
        "idMacchina": "macc" + (concessionarioList.length + 1), //Incrementa automaticamente l'identificativo univoco
        "marca": req.body.marca,
        "modello": req.body.modello,
        "anno": req.body.anno,
        "colore": req.body.colore,
        "categoria": req.body.categoria
    }

    //Impedisce l'inserimento da due elementi con lo stesso identificativo univoco
    for(let [idx, item] of concessionarioList.entries()){
        if(item.idMacchina == req.body.idMacchina){
            res.status(400).json({
                status: "Error!!!",
                data: "Errore, non è possibile aggiungere elementi con lo stesso id"
            });
            return;
        }
    }

    concessionarioList.push(veicolo);
    res.json({
        status: "Success!!!",
        data: "Veicolo aggiunto con successo!"
    });
    return;
})

//CrUd - Aggiorna veicolo BY identificativo unnivoco
app.patch("/veicoli/:id", (req, res) => {
    let veicolo = req.params.id;

    for(let [idx, item] of concessionarioList.entries()){
        if(item.idMacchina == veicolo){
            //If semplificato
            item.marca = req.body.marca ? req.body.marca : item.marca;
            item.modello = req.body.modello ? req.body.modello : item.modello;
            item.anno = req.body.anno ? req.body.anno : item.anno;
            item.colore = req.body.colore ? req.body.colore : item.colore;
            item.categoria = req.body.categoria ? req.body.categoria : item.categoria

            res.json({
                status: "Success!!!",
                data: "Veicolo aggiornato con successo!"
            });
            return;
        }
    }

    res.status(400).json({
        status: "Error!!!",
        data: "Errore, l'elemento ricercato non è stato trovato"
    });
    return;
})

//cruD - Cancella veicolo
app.delete("/veicoli/:id", (req, res) => {
    let veicolo = req.params.id;

    for(let [idx, item] of concessionarioList.entries()){
        if(item.idMacchina == veicolo){
            //Cancella elemento
            concessionarioList.splice(idx, 1);

            res.json({
                status: "Success!!!",
                data: "Veicolo rimosso con successo!"
            });
            return;
        }
    }

    res.status(400).json({
        status: "Error!!!",
        data: "Errore, l'elemento ricercato non è stato trovato"
    });
    return;
})

