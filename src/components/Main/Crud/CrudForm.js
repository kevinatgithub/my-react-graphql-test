import FormUI from "./FormUI";

const CrudForm = ({title, fields, setActive, doSave, loading, error, data}) => {
    const onSave = () => {
        doSave();
    }

    const onCancel = () => {
        setActive(false);
    }

    if (error) alert(JSON.stringify(error));

    if (data){
        setTimeout(() => {
            setActive(false);
        },500);
    }

    return <FormUI 
            show={true} 
            title={title} 
            loading={loading} 
            fields={fields} 
            onSave={onSave} 
            onCancel={onCancel}  />;
}

export default CrudForm;