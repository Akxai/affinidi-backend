var express = require('express');
require('dotenv').config()
const { affinidiProvider } = require('@affinidi/passport-affinidi')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Express' });
    });

    await affinidiProvider(app, {
        id: "affinidi",
        issuer: "https://bbec0077-fdd8-4ae2-9440-57fcb2187e25.apse1.login.affinidi.io",
        client_id: "ed24f38f-c29d-4974-a8f3-b90eb1eea051",
        client_secret: "XPAiALdnbYIT7LxIl..3A6DeYK",
        redirect_uris: ['https://affinidi-frontend.vercel.app'], 
        handleCredential: (credential) => {
            console.log('Received credential:', credential);
        },
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();
