import { useState } from "react";
import { useUpdateCity } from "./Api";
import FormUI from "./FormUI";

const UpdateCity = ({city,setToUpdate}) => {
    const [show,setShow] = useState(true);
    const [name,setName] = useState(city.name);
    const [provinceId,setProvinceId] = useState(city.province.id);
    const {doUpdate, request: {loading, error, data}} = useUpdateCity(parseInt(city.id),name,parseInt(provinceId));

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
            id={city.id}
            name={name}
            setName={setName}
            onCancel={handleClose}
            onSave={handleSave}
            provinceId={provinceId}
            setProvinceId={setProvinceId}
            show={show} />
    );
};

export default UpdateCity;