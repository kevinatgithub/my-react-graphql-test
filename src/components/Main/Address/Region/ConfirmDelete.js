import { useState } from "react";
import {Modal,Button} from "react-bootstrap";
import { useDeleteRegion } from "./Api";

const ConfirmDelete = ({region,setToDelete}) => {

    const {runDeleteRegion, request : {loading, error, data}} = useDeleteRegion(region.id);
    
    const [show,setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setToDelete(null);
    }

    const handleDelete = () => {
        setShow(false);
        runDeleteRegion();
    }

    if (error) {
        alert(JSON.stringify(error));
    }

    if (data) {
        setTimeout(() => {
            setToDelete(null);
        },500);
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Region</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading ? <p>Deleting..</p> : <p>Delete this Region?</p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDelete;