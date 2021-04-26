import { createContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AddCity from "./AddCity";
import ConfirmDelete from "./ConfirmDelete";
import List from "./List";
import UpdateCity from "./UpdateCity";

export const CityContext = createContext({});

const Crud = ({addCity}) => {

    const [creating,setCreating] = useState(false);
    const [toUpdate,setToUpdate] = useState(null);
    const [toDelete,setToDelete] = useState(null);

    return (
        <Card bg="light" style={{color:"#000"}}>
            <Card.Body>
                <Row>
                    <Col>
                        <p>Cities/Municipalities of {province.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => setCreating(true)}>Add City</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CityContext.Provider value={{setToDelete,setToUpdate}}>
                            <List province={province} />
                        </CityContext.Provider>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Crud;