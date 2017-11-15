import * as express from 'express';
import { GithubOAuth } from './github-oauth';

const LISTEN_PORT = 23333;
let app = express();

app.get('/resume/:username', async (req, res) => {
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    
    let response = await GithubOAuth.getResume(req.params.username);
    res.send(response);
});

app.get('/', (req, res) => {
    res.send('kingwl NO.1');
});

app.listen(LISTEN_PORT, () => {
    console.log(`Server listening on port ${LISTEN_PORT} ...`);
});