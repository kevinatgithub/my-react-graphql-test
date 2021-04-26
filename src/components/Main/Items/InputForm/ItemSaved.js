import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemSaved = ({loading}) => {
    
    if (loading) return (<Spinner animation="border" variant="success" />);

    return (
        <div>
            <p>Item Saved!</p>
            <Link to="/"><Button>Go Back</Button></Link>
        </div>
    );
}

export default ItemSaved;