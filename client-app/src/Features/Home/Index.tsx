import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ScrolltoTop from '../../App/Layout/ScrolltoTop'

const Index = () => {
    return (
        <ScrolltoTop>
            <Container>
                <h1>Home ...</h1>
                <p>
                    <Link to='/activities/'>Activities</Link>
                </p>
            </Container>
        </ScrolltoTop>
    )
}

export default Index
