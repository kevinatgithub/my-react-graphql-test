import { useState } from "react";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { TextInput } from "../../Items/common";
import { useCreateRegion } from "./Api";

const RegionForm = () => {
    const [regionName,setName] = useState("");
    const {runCreateRegion,request : {loading,error,data}} = useCreateRegion(regionName);

    const loader = <Row>
                    <Col>
                        <Spinner animation="grow" /> Please wait..
                    </Col>
                </Row>;

    if (loading) return loader;

    if (error) return (
        <Row>
            <Col>
                <Alert variant="danger">{JSON.stringify(error)}</Alert>
            </Col>
        </Row>
    );

    if (data && regionName !== "") {
        setTimeout(() => {
            setName("");
        },500);
        return loader;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            runCreateRegion();
        }
    }

    return (
        <Row>
            <Col>
                <TextInput label="New Region" onChange={e => setName(e.target.value)} value={regionName} onKeyDown={handleKeyDown} />
            </Col>
            <Col>
                <Button onClick={()=>runCreateRegion()}>Save</Button>
            </Col>
        </Row>
    );
};

export default RegionForm;