import { useState } from "react";
import { Row, Col, Spinner, Alert, Table } from "react-bootstrap";
import { useRegions } from "./Api";
import ConfirmDelete from "./ConfirmDelete";
import Region from "./Region";
import RegionForm from "./RegionForm";
import UpdateRegionForm from "./UpdateRegionForm";

const List = () => {
    const {loading, error, data} = useRegions();

    const loadUI = <><Spinner animation="grow" variant="warning" /> Please Wait..</>;

    const errorUI = <><Alert variant="danger">Error loading regions..</Alert></>;

    const [toDelete, setToDelete] = useState(null);
    const [toUpdate, setToUpdate] = useState(null);

    const regions = !loading ? data.regions.map(r => <Region key={r.id} region={r} onUpdate={() => setToUpdate(r)} onDelete={() => setToDelete(r)} />): [];

    return (
        <>
            {toDelete && <ConfirmDelete region={toDelete} setToDelete={setToDelete} />}
            {toUpdate && <UpdateRegionForm region={toUpdate} setToUpdate={setToUpdate} />}
            <Row>
                <Col>
                    <h1>Region List</h1>
                </Col>
            </Row>
            <RegionForm />
            <Row>
                <Col>
                    {error && errorUI}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && !error && regions}
                            {loading  && (
                                <tr>
                                    <td colSpan="3">{loadUI}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default List;