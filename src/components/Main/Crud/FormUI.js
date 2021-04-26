import { useState } from "react";
import { InputGroup, FormControl, Button, Form, Modal, Spinner } from "react-bootstrap";

export const TextInput = ({label, value, onChange}) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{label}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder={label}
                value={value}
                onChange={onChange} />
        </InputGroup>
    );
};

const SimpleDropDown = ({label, selected, handleChange, options}) => {
    return (
        <>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{label}</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" defaultValue={selected} onChange={handleChange}>
                {options.map((o,text) => <option key={o.value} value={o.value}>{o.text}</option>)}
            </Form.Control>
        </InputGroup>
        </>
    )
}

const OptionsDropDown = ({label, defaultValue, onChange, query}) => {
    const {loading,error,data} = query;
    const [selected,setSelected] = useState(defaultValue);

    if (error) alert(JSON.stringify(error));

    if (loading) <><Spinner animation="glow" /> Please wait..</>;

    const handleChange = e => {
        setSelected(e.target.value);
        onChange(e.target.value);
    }

    const options = data && data.options ? data.options : [];

    return (
        <>
            {data && <SimpleDropDown label={label} selected={selected} handleChange={handleChange} options={options} />}
            {!data && <Spinner animation="glow" />}
        </>
    )
}

const FormUI = ({show,title,fields,loading,onSave,onCancel}) => {

    return (
        <Modal show={show} onClose={onCancel}>
            <Modal.Header>
                {title}
            </Modal.Header>
            <Modal.Body>
                {fields.map((field,i) => {
                    if (field.type === "text") return <TextInput key={i} label={field.label} value={field.value} onChange={e => field.setValue(e.target.value)} />;

                    if (field.type === "dropdown") return <SimpleDropDown key={i} label={field.label} selected={field.value} handleChange={field.setValue} options={field.options} />;

                    if (field.type === "query") return <OptionsDropDown key={i} label={field.label} defaultValue={field.value} onChange={field.setValue} query={field.options} />;

                    return <></>;
                })}
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