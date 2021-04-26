import { Card, Spinner, Button } from "react-bootstrap";

const ConfirmDeleteUI = ({msg, setToDelete, request}) => {

    const {execute, loading, error,data} = request;

    const handleConfirm = () => {
        execute();
    };

    const handleCancel = () => {
        setToDelete(null);
    }

    if (error) return <p>{JSON.stringify(error)}</p>;

    if (loading) return <><Spinner animation="border" variant="success" /> Please wait..</>;

    if (data) {
        setTimeout(() => {
            setToDelete(null);
        },500);
        return <p>&nbsp;</p>;
    }

    return (
        <Card>
            <Card.Body>
                <h1>{msg ? msg : "Delete Record?"}</h1>
            </Card.Body>
            <Card.Footer>
                <Button onClick={handleConfirm} variant="danger">Yes</Button>
                <Button onClick={handleCancel} variant="success" style={{marginLeft:'1em'}}>No</Button>
            </Card.Footer>
        </Card>
    )
};

export default ConfirmDeleteUI;