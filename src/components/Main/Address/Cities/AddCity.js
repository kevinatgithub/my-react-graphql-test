import { useState } from "react";
import { useCreateCity } from "./Api";
import FormUI from "./FormUI";

const AddCity = ({provinceId,setCreating}) => {
    const [show,setShow] = useState(true);
    const [name,setName] = useState("");
    const [_provinceId,setProvinceId] = useState(provinceId);
    const {doCreate, request : {loading, error, data}} = useCreateCity(name,parseInt(_provinceId));

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
                provinceId={_provinceId}
                setProvinceId={setProvinceId}
                loading={loading}
                onSave={onSave}
                onCancel={onCancel} />
};

export default AddCity;