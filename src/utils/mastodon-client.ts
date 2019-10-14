import Axios, { AxiosInstance } from "axios"
import { MastodonAccount } from "../interface/mastodon-account"
declare var process: {env: {[key: string]: string}}

export class MastodonClient {
    private static clientId = process.env.CLIENT_ID
    private static clientSecret = process.env.CLIENT_SECRET
    static mastodonHost = process.env.MASTODON_HOST

    static getAuthorizeUrl() {
        const params = Object.entries({
            client_id: this.clientId,
            response_type: "code",
            redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
            scope: ["read:accounts", "read:lists", "write:accounts", "write:lists"].join(" "),
        }).map(([k, v]) => `${k}=${v}`).join("&")
        return `https://${this.mastodonHost}/oauth/authorize?${params}`
    }

    static async getToken(code: string) {
        return await Axios.post<{access_token: string}>(`https://${this.mastodonHost}/oauth/token`, {
            grant_type: "authorization_code",
            redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code,
        }).then(r => r.data.access_token)
    }
    
    private axios: AxiosInstance

    constructor(public readonly token: string) {
        this.axios = Axios.create({
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            baseURL: `https://${MastodonClient.mastodonHost}/api`
        })
    }

    async verifyCredentials() {
        return await this.axios.get<MastodonAccount>("v1/accounts/verify_credentials")
    }
}