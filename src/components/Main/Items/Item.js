import {Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({item, handleViewDetails, setToDelete}) => {

    return (
        <Card style={{ width : '18em' }}>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Stocks {item.stocks} | Unit Price {item.unitPrice}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button onClick={() => handleViewDetails(item.id) } variant="info">View</Button>
                <Link to={"/form/" + item.id}><Button variant="info" style={{marginLeft:'1em'}}>Update</Button></Link>
                <Button variant="danger" style={{marginLeft:'1em'}} onClick={()=>setToDelete(item)}>Delete</Button>
            </Card.Footer>
        </Card>
    );
}

export default Item;