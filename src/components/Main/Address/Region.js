import { createContext } from "react";
import { Container } from "react-bootstrap";
// import List from "./Region/List";
import List from "./Region/List";

export const RegionCotnext = createContext({});

const Region = () => {
    return (
        <RegionCotnext.Provider value={{}}>
            <Container>
                <List />
            </Container>
        </RegionCotnext.Provider>
    );
}

export default Region;