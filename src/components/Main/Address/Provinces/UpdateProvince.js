import { useState } from "react";
import { useUpdateProvince } from "./Api";
import FormUI from "./FormUI";

const UpdateProvince = ({province,setToUpdate,regionId}) => {
    const [show,setShow] = useState(true);
    const [name,setName] = useState(province.name);
    const [_regionId,setRegionId] = useState(regionId);
    const {doUpdate, request: {loading, error, data}} = useUpdateProvince(parseInt(province.id),name,parseInt(regionId));

    const handleClose = () => {
        setShow(false);
        setToUpdate(null);
    }

    const handleSave = () => {
        doUpdate();
    }

    if (error) alert(JSON.stringify(error));

    if (data) {
        setTimeout(() => {
            setShow(false);
            setToUpdate(null);
        },500);
    }

    return (
        <FormUI
            loading={loading}
            id={province.id}
            name={name}
            setName={setName}
            onCancel={handleClose}
            onSave={handleSave}
            regionId={_regionId}
            setRegionId={setRegionId}
            show={show} />
    );
};

export default UpdateProvince;