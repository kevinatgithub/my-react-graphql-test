import { Button, Col, Row, Spinner} from "react-bootstrap";
import { useQuery } from '@apollo/client';
import { useState } from "react";
import ItemDetail from "./ItemDetail";
import Item from "./Item";
import { ITEMS } from "./common";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

const Items = () => {

    const [itemId, handleViewDetails] = useState(null);
    const [toDelete, setToDelete] = useState(null);

    const {loading, error, data} = useQuery(ITEMS);
    
    if (error) return <code>{JSON.stringify(error)}</code>;
    
    if (loading) return <Spinner animation="grow" variant="success" />;
    
    
    const items = data.items.map(i => (
        <Col style={{paddingTop:'1em'}} key={i.id}>
            <Item item={i} handleViewDetails={handleViewDetails} setToDelete={setToDelete} />
        </Col>
    ));

    return (
        <>
            {toDelete !== null && 
                <Row>
                    <Col>
                        <ConfirmDelete item={toDelete} cancel={()=>setToDelete(null)} />
                    </Col>
                </Row>
            }
            <Row>
                <Col>
                    <Link to="/form"><Button>New Item</Button></Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>{items}</Row>
                </Col>
                {itemId != null && <Col xs={4}><ItemDetail itemId={itemId} handleViewDetails={handleViewDetails} /></Col>}
            </Row>
        </>
    );
};

export default Items;