import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { TextInput } from "../../Items/common";
import { useProvinces } from "../Cities/Api";

const ProvinceDropdown = ({provinceId, onChange}) => {
    const {loading,error,data} = useProvinces();
    const [selected,setSelected] = useState(provinceId);

    if (error) alert(JSON.stringify(error));

    if (loading) <><Spinner animation="glow" /> Please wait..</>;

    const handleChange = e => {
        setSelected(e.target.value);
        onChange(e.target.value);
    }

    return (
        <>
            {data && <Form.Control as="select" defaultValue={selected} onChange={handleChange}>
                {data.provinces.map(p => <option key={p.id} value={p.id}>{p.region.name} - {p.name}</option>)}
            </Form.Control>}
            {!data && <Spinner animation="glow" />}
        </>
    )
}

const FormUI = ({show,id,name,setName,provinceId,setProvinceId,loading,onSave,onCancel}) => {

    return (
        <Modal show={show} onClose={onCancel}>
            <Modal.Header>
                {id ? "Update City" : "Create New City"}
            </Modal.Header>
            <Modal.Body>
                <TextInput label="City Name" value={name} onChange={e => setName(e.target.value)} />
                <ProvinceDropdown provinceId={provinceId} onChange={setProvinceId} />
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