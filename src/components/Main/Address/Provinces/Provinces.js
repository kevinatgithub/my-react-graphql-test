import { createContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AddProvince from "./AddProvince";
import ConfirmDelete from "./ConfirmDelete";
import List from "./List";
import UpdateProvince from "./UpdateProvince";

export const ProvinceContext = createContext({});

const Provinces = ({region}) => {

    const [creating,setCreating] = useState(false);
    const [toUpdate,setToUpdate] = useState(null);
    const [toDelete,setToDelete] = useState(null);

    return (
        <Card bg="dark" style={{color:"#fff"}}>
            {creating && <AddProvince regionId={region.id} setCreating={setCreating} />}
            {toUpdate && <UpdateProvince province={toUpdate} setToUpdate={setToUpdate} regionId={region.id} />}
            {toDelete && <ConfirmDelete province={toDelete} setToDelete={setToDelete} />}
            <Card.Body>
                <Row>
                    <Col>
                        <p>Provinces of {region.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => setCreating(true)}>Add Province</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProvinceContext.Provider value={{setToDelete,setToUpdate}}>
                            <List region={region} />
                        </ProvinceContext.Provider>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Provinces;