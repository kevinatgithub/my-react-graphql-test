import { useQuery } from "@apollo/client";
import {Card, Row, Col, Button} from "react-bootstrap";
import { GET_ITEM } from "./common";

const ItemDetail = ({itemId, handleViewDetails}) => {
    const {loading,error,data} = useQuery(GET_ITEM,{
        variables : {id : itemId}
    });

    if (loading) return <p>Loading..</p>;

    if (error) return <p>Error loading Item Details..</p>;

    const {item} = data;

    return (
        <Card style={{marginTop:"1em"}}>
            <Card.Header>
                <Button onClick={()=>handleViewDetails(null)}>Close</Button>
            </Card.Header>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Row>
                    <Col>
                        ID : {item.id}<br/>
                        Stocks : {item.stocks}<br/>
                        Unit Price: {item.unitPrice}
                    </Col>
                    <Col>
                        <Card.Img variant="right" src="https://via.placeholder.com/150x80" />
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                {item.orders.map(o => (
                    <Row key={o.id} style={{marginTop:"1em", fontSize:14}}>
                        <Col>
                            <p>{o.quantity} pcs</p>
                        </Col>
                        <Col>
                            <p>{o.status}</p>
                        </Col>
                        <Col>
                            <p>P {o.totalPrice}</p>
                        </Col>
                        <Col>
                            <Button variant="success">View</Button>
                        </Col>
                    </Row>
                ))}
            </Card.Footer>
        </Card>
    );
};

export default ItemDetail;