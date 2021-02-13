import Navbar from '../components/Navbar'
import NavbarBrand from '../components/NavbarBrand'
import Subtitle from '../components/Subtitle'
import NavbarMenu from '../components/NavbarMenu'
import NavbarStart from '../components/NavbarStart'
import NavbarItem from '../components/NavbarItem'
import NavbarDropdown from '../components/NavbarDropdown'
import NavbarDivider from '../components/NavbarDivider'
import NavbarEnd from '../components/NavbarEnd'
import Buttons from '../components/Buttons'
import Button from '../components/Button'

import Link from 'next/link'

import useUser from "../data/useUser";
import { login, logout } from "../libs/auth";

export default function Header() {
    const { user, mutate, loading } = useUser()

    return (
        <Navbar>
            <NavbarBrand>
                <Subtitle>Femto Uploader</Subtitle>
            </NavbarBrand>
            <NavbarMenu>
                <NavbarStart>
                    <NavbarItem href='/'>Home</NavbarItem>
                    <NavbarItem href='/uploads'>Uploads</NavbarItem>
                    <NavbarDropdown name='More'>
                        <NavbarItem href='/about'>About</NavbarItem>
                        <NavbarItem href='/contact'>Contact</NavbarItem>
                        <NavbarItem href='/statistics'>Statistics</NavbarItem>
                        <NavbarItem href='/toc'>Terms and Conditions</NavbarItem>
                        <NavbarDivider />
                        <NavbarItem href='/issue'>Report an Issue</NavbarItem>
                    </NavbarDropdown>
                </NavbarStart>
                <NavbarEnd>
                    <NavbarItem>
                        <Buttons>
                            {loading && <Button className='is-loading' href='/'>Log in</Button>}
                            {!loading && user && <Button className='' href='/logout'>Logout</Button>}
                            {!loading && !user && <Button className='' href='/auth/github'>Log in</Button>}
                        </Buttons>
                    </NavbarItem>
                </NavbarEnd>
            </NavbarMenu>
        </Navbar>
    )
}