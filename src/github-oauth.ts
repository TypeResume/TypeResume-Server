// import * as r from 'request';
import * as r from 'request-promise';

import * as url from 'url';

let request = r.defaults({
    headers: {
        'User-Agent': 'TypeResume'
    }
});

export class GithubOAuth {
    private static readonly BASE_URL = 'https://api.github.com';
    public static async getResume(username: string) {
        let resume: any = {};

        let [userRsp, reposRsp, orgsRsp, issuesRsp] = await Promise.all([
            await request.get(this.url(`/users/${username}`)),
            await request.get(this.url(`/search/repositories?q=user:${username}&sort=stars&order=desc`)),
            await request.get(this.url(`/users/${username}/orgs`)),
            await request.get(this.url(`/search/issues?q=type:pr+is:merged+author:${username}&per_page=50`)),
        ]);

        let user = JSON.parse(userRsp);
        let repos = JSON.parse(reposRsp);
        let orgs = JSON.parse(orgsRsp);
        let issues = JSON.parse(issuesRsp);
        
        resume.user = {
            "name": user.name,
            "avatar_url": user.avatar_url,
            "company": user.company,
            "website": user.website,
            "location": user.location,
            "email": user.email,
            "hireable": user.hireable,
            "bio": user.bio,
            "public_repos": user.public_repos,
            "contributed_repos": issues.total_count,
            "followers": user.followers,
            "following": user.following,
            "orgs_count": orgs.length,
            "created_at": user.created_at
        };

        resume.repos = [];
        repos.items.forEach(repo => {
            let repoInfo = {
                "name": repo.name,
                "stars": repo.stargazers_count,
                "forks": repo.forks,
                "watchers": repo.watchers,
                "description": repo.description,
                "created_at": repo.created_at,
                "language": repo.language,
                "url": repo.html_url,
            };

            resume.repos.push(repoInfo);
        });

        return resume;
    }

    private static url(to: string) {
        return url.resolve(this.BASE_URL, to);
    }
}