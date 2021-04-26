import { useState } from "react";
import { useCreateProvince } from "./Api";
import FormUI from "./FormUI";

const AddProvince = ({regionId,setCreating}) => {
    const [show,setShow] = useState(true);
    const [name,setName] = useState("");
    const [id,setRegionId] = useState(regionId);
    const {doCreate, request : {loading, error, data}} = useCreateProvince(name,parseInt(id));

    const onSave = () => {
        doCreate();
    };

    const onCancel = () => {
        setShow(false);
        setCreating(false);
    };

    if (error) alert(JSON.stringify(error));

    if (data){
        setTimeout(() => {
            setShow(false);
        },500);
    }

    return <FormUI
                show={show}
                name={name}
                setName={setName}
                regionId={id}
                setRegionId={setRegionId}
                loading={loading}
                onSave={onSave}
                onCancel={onCancel} />
};

export default AddProvince;