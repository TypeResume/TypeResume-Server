import * as express from 'express';
import { GithubOAuth } from './github-oauth';

const LISTEN_PORT = 23333;
let app = express();

app.get('/resume/:username', async (req, res) => {
    let response = await GithubOAuth.getUser(req.params.username);
    res.send(response);
});

app.get('/', (req, res) => {
    res.send('fuckoff resume');
});

app.listen(LISTEN_PORT, () => {
    console.log(`Server listening on port ${LISTEN_PORT} ...`);
});