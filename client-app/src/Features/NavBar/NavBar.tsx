import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

interface IProps{
    onCreate:()=>void;    
}
const NavBar:React.FC<IProps> = ({onCreate}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="assets/logo.png" alt="logo" style={{marginRight:'20px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to='/activities/create'/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default NavBar
