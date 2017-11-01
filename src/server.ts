import * as express from 'express';

const LISTEN_PORT = 23333;
let app = express();

app.post('/', (req, res) => {
    res.send('fuckoff resume');
});

app.get('/', (req, res) => {
    res.send('fuckoff resume');
});

app.listen(LISTEN_PORT, () => {
    console.log(`Server listening on port ${LISTEN_PORT} ...`);
});