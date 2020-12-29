const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Qr = require('../models/Qr');
const {nanoid} = require('nanoid');

router.get('/', (req, res) => {
    req.json({status: 0, msg: 'Debe tener acceso al Token.'});
})

router.post('/generate', [
    check('name').isLength({ min: 3, max: 50 }).withMessage('Debe ingresar un nombre para el QR con mínimo 3 y máximo 50 caracteres'),
    check('url').isURL().withMessage('Debe ingresar una URL válida para generar el QR'),
  ], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const name  = req.body.name;
    const url = req.body.url;
    const baseUrl = 'https://qr.althus.pe/qr/';
    const api = 'https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl='+ url;
    const nanoId = nanoid(10);
    const uriFinalQr = baseUrl+nanoId;
    //Save Data
    const qr = new Qr({
        name: name,
        url: url,
        nanoid: nanoId,
        uriFinalQr: uriFinalQr
    });

    qr.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json({message: err})
    });

    //res.json({url: url, qr: api})
    console.log('QR generate');
});

module.exports = router;