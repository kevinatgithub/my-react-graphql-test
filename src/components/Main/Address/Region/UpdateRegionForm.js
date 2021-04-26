import { useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"
import { TextInput } from "../../Items/common"
import { useUpdateRegion } from "./Api"

const UpdateRegionForm = ({region, setToUpdate}) => {

    const [regionName, setRegionName] = useState(region.name);

    const {runUpdateRegion, request : {loading, error, data}} = useUpdateRegion(region.id, regionName);

    const [show,setShow] = useState(true);

    const handleCancel = () => {
        setShow(false);
    };

    const handleSave = () => {
        runUpdateRegion();
        setShow(false);
    }

    if (error) alert(JSON.stringify(error));

    if (data){
        setTimeout(()=>{
            setShow(false);
            setToUpdate(null);
        },500);
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                Update Region
            </Modal.Header>
            <Modal.Body>
                <TextInput label="Region Name" value={regionName} onChange={e => setRegionName(e.target.value)} />
            </Modal.Body>
            {!loading &&
            <Modal.Footer>
                <Button variant="success" onClick={handleSave}>Save Changes</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Modal.Footer>}
            {loading && 
            <Modal.Footer>
                <Spinner animation="grow" /> Saving..    
            </Modal.Footer>}
        </Modal>
    )
}

export default UpdateRegionForm;