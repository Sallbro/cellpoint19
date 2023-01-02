const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const db = require("./db/conn");
const port = process.env.PORT || 5000;

const rout = app.use(require('./routers/routs'));

// vercel
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.resolve(__dirname, './cellpoint', 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './cellpoint', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`connection succesful at port ${port}`);
});


