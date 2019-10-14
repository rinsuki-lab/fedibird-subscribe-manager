import React, { useState } from "react"
import { Button, Form, Input, FormText, FormGroup } from "reactstrap"
import { MastodonClient } from "../utils/mastodon-client"

export function Login(props: {setToken: (token: string) => void}) {
    const [code, setCode] = useState("")

    async function onSubmitForm() {
        try {
            const token = await MastodonClient.getToken(code)
            props.setToken(token)
        } catch(e) {
            console.error(e)
            alert(e.toString())
        }
    }
    
    return <div>
        <h2>ログイン</h2>
        <p>このアプリケーションを使うには、{MastodonClient.mastodonHost}での認証が必要です。</p>
        <Button 
            tag="a"
            href={MastodonClient.getAuthorizeUrl()}
            target="_blank"
            color="success"
        >
            認証画面を開く
        </Button>
        <hr />
        <Form onSubmit={e => {
            e.preventDefault()
            onSubmitForm()
        }}>
            <p>認証が終了したら、コードをここに入力してください。</p>
            <FormGroup>
                <Input
                    type="text"
                    placeholder="0123456789abcdef"
                    onInput={e => setCode(e.currentTarget.value)}
                />
            </FormGroup>
            <Button type="submit" color="primary">ログイン</Button>
        </Form>
    </div>
}