import { useState } from "react";
import {Modal,Button} from "react-bootstrap";

const ConfirmDeleteUI = ({msg, doDelete, request, setToDelete}) => {

    const {loading, error, data} = request;
    
    const [show,setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setToDelete(null);
    }

    const handleDelete = () => {
        setShow(false);
        doDelete();
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
                <Modal.Title>Delete Record</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading ? <p>Deleting..</p> : <p>{msg ? msg : "Delete this Record?"}</p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDeleteUI;