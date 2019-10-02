import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps{
    onCreate:()=>void;    
}
const NavBar:React.FC<IProps> = ({onCreate}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="assets/logo.png" alt="logo" style={{marginRight:'20px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={onCreate}/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default NavBar
