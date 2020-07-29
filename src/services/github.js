import axios from 'axios'

export default class GithubApi {
  constructor() {
    this._axios = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 5000,
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
  }
  async findRepos(term) {
    try {
      const resp = await this._axios.get(`/search/repositories?q=${term}`)
      return resp.data
    }
    catch(err) {
      console.warn('catch', err)
    }
  }
  async getRepoData(repoName) {
    // try {
    //   const resp = await this._axios.get(`/search/repositories?q=${term}`)
    //   return resp.data
    // }
    // catch(err) {
    //   console.warn('catch', err)
    // }
  }

  async getRepoIssues(repoName) {
    try {
      const resp = await this._axios.get(`/repos/${repoName}/issues`)
      return resp.data
    }
    catch(err) {
      console.warn('catch', err)
    }
  }
  async getRepoReleases(repoName) {
    try {
      const resp = await this._axios.get(`/repos/${repoName}/releases`)
      return resp.data
    }
    catch(err) {
      console.warn('catch', err)
    }
  }
}
