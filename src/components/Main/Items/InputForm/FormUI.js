import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { TextInput } from "./../common";
// import ItemSaved from "./ItemSaved";
import useSave from "./useSave";

const FormUI = ({values}) => {
    const [name,setName] = useState(values.name);
    const [stocks,setStocks] = useState(values.stocks);
    const [price,setPrice] = useState(values.unitPrice);

    const history = useHistory();

    const {execute,call : {loading,error,data}} = useSave({item : {id : values.id, name, stocks, unitPrice : price}});

    const handleSubmit = e => {
        e.preventDefault();
        execute();
    };

    const handleBackToList = () => {
        history.push("/");
    };

    if (loading) return <><Spinner animation="border" variant="success" /> Please Wait...</>;

    if (error) return <p>{JSON.stringify(error)}</p>;

    if (data) {
        setTimeout(() => {
            history.push("/");
        },1000);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col><Button onClick={handleBackToList}>Go Back</Button></Col>
                </Row>
                <Row style={{marginTop:'1em'}}>
                    <Col>
                            <TextInput label="Item Name" value={name} onChange={e => setName(e.target.value)} />
                            <TextInput label="Stocks" value={stocks} onChange={e => setStocks(parseInt(e.target.value))} />
                            <TextInput label="Unit Price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type="submit" value="Save Item" className="btn btn-success" />
                        <Button style={{marginLeft:"1em"}} variant="danger">Delete</Button>
                    </Col>
                </Row>
            </form>            
        </>
    );
}

export default FormUI;