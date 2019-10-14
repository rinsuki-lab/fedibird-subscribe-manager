import React, { useState } from "react"
import { usePromise } from "../utils/use-promise"
import { MastodonClient } from "../utils/mastodon-client"
import { Button, Row, Col } from "reactstrap"

export function Main(props: {token: string}) {
    const [tab, setTab] = useState()

    return <Row>
        <Col xs="3">
            ここにアカウント一覧が入る
        </Col>
        <Col xs="9">
            
        </Col>
    </Row>
}