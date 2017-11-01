import * as r from 'request';
import * as url from 'url';

let request = r.defaults({
    headers: {
        'User-Agent': 'TypeResume'
    }
});

export class GithubOAuth {
    private static readonly BASE_URL = 'https://api.github.com';
    public static getUser(username: string) {
        return new Promise((resolve, reject) => {
            request.get(this.url(`/users/${username}`), {}, (error, response, body) => {
                console.log(body);
                resolve(body);
            });
        });
    }

    private static url(to: string) {
        return url.resolve(this.BASE_URL, to);
    }
}