import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import List from "../Crud/List";
import EditRegion from "./EditRegion";



const Region = () => {
    // loading,error,records,variant,keys,setToUpdate,setToDelete
    const {loading,error,data} = useQuery(gql`
        query regions{
            regions{
                id
                name
            }
        }
    `);

    const keys = [
        {label : 'ID', key : 'id'}, {label : 'Region' , key : 'name'}
    ];

    const [creating,setCreating] = useState(null);
    const [toUpdate,setToUpdate] = useState(null);
    const [toDelete,setToDelete] = useState(null);

    const records = data ? data.regions : [];
    
    return <Container>
            {creating && <EditRegion setCreating={setCreating} />}
            <Row>
                <Col>
                    <Button onClick={() => setCreating(true)}>Add Region</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <List
                        loading={loading} error={error} records={records} keys={keys} setToUpdate={setToUpdate} setToDelete={setToDelete}
                    />
                </Col>
            </Row>
        </Container>;
};

export default Region;