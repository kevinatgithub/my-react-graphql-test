import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { TextInput } from "../../Items/common";
import { useRegions } from "../Region/Api";

const RegionDropdown = ({regionId, onChange}) => {
    const {loading,error,data} = useRegions();
    const [selected,setSelected] = useState(regionId);

    if (error) alert(JSON.stringify(error));

    if (loading) <><Spinner animation="glow" /> Please wait..</>;

    const handleChange = e => {
        setSelected(e.target.value);
        onChange(e.target.value);
    }

    return (
        <Form.Control as="select" defaultValue={selected} onChange={handleChange}>
            {data.regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </Form.Control>
    )
}

const FormUI = ({show,id,name,setName,regionId,setRegionId,loading,onSave,onCancel}) => {

    return (
        <Modal show={show} onClose={onCancel}>
            <Modal.Header>
                {id ? "Update Province" : "Create New Province"}
            </Modal.Header>
            <Modal.Body>
                <TextInput label="Province Name" value={name} onChange={e => setName(e.target.value)} />
                <RegionDropdown regionId={regionId} onChange={setRegionId} />
            </Modal.Body>
            {!loading && <Modal.Footer>
                <Button onClick={onSave}>Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Modal.Footer>}
            {loading && <Modal.Footer>
                <Spinner animation="grow" /> Saving..    
            </Modal.Footer>}
        </Modal>
    )
};

export default FormUI;