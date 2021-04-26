import { createContext } from 'react';
import { Container } from 'react-bootstrap';
import Region from './Main/Address/Region';

export const AppContext = {};

const MyContext = createContext(AppContext);

const Main = () => {

    return (
        <MyContext.Provider value={{}}>
            <Container style={{marginTop:"1em"}}>
                <Region />
            </Container>
        </MyContext.Provider>
    );
};

export default Main;