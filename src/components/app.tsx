import React, { useState, useMemo } from "react"
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { Login } from "./login"
import { Main } from "./main"
import { MastodonClient } from "../utils/mastodon-client"
import { usePromise } from "../utils/use-promise"

export function App() {
    const [token, _setToken] = useState<string | null>(sessionStorage.getItem("token"))

    function setToken(token: string | null) {
        _setToken(token)
        if (token) {
            sessionStorage.setItem("token", token)
        } else {
            sessionStorage.removeItem("token")
        }
    }

    return <div>
        <Navbar light color="light" expand="sm">
            <NavbarBrand href="/">Fedibird Subscribe Manager</NavbarBrand>
            <Nav navbar className="mr-auto">
                <NavItem>
                    <NavLink href="https://fedibird.com/@rinsuki">by @rinsuki</NavLink>
                </NavItem>
            </Nav>
            <Nav navbar>
                {token && <LoginStatus token={token} logout={() => setToken(null)} />}
            </Nav>
        </Navbar>
        <Container fluid>
            { token ? <Main token={token} /> : <Login setToken={setToken}/>}
        </Container>
    </div>
}

function LoginStatus(props: {token: string, logout: () => void}) {
    const user = usePromise(async (token) => {
        const client = new MastodonClient(token)
        return await client.verifyCredentials()
    }, [props.token])

    return <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
            @{user ? user.data.username : "(loading)"}
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem onClick={props.logout}>
                ログアウト
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
}

