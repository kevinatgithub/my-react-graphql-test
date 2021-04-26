import { Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_ITEM } from "./common";
import FormUI from "./InputForm/FormUI";

const FetchedData = ({itemId}) => {
    const {loading,error,data} = useQuery(GET_ITEM,{
        variables : {id:parseInt(itemId)}
    });

    let item = {name : "", stocks : 0, unitPrice : 0};
    
    if (loading) return <><Spinner animation="grow" variant="warning" />Please wait loading..</>;
    
    if (error) return <p>Error loading Item.. {JSON.stringify(error)}</p>;
    
    item = data.item;

    return <FormUI values={item} />
}

const DefaultData = () => {
    let item = {name : "", stocks : 0, unitPrice : 0};
    return <FormUI values={item} />
}

const ItemForm = () => {
    
    const { id } = useParams();

    return (
        <>
            {id === undefined && <DefaultData />}
            {id !== undefined && <FetchedData itemId={id} />}
        </>
    );
}

export default ItemForm;