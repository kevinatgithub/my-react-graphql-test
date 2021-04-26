import { useState } from "react";
import { Button } from "react-bootstrap";
import Provinces from "../Provinces/Provinces";

const Region = ({region,onUpdate, onDelete}) => {
    const [showProvinces, setShowProvinces] = useState(false);
    return (
        <>
            <tr key={region.id}>
                <td>{region.id}</td>
                <td>{region.name}</td>
                <td>
                    <Button variant="success" onClick={() => setShowProvinces(!showProvinces)}>Provinces</Button>
                    <Button variant="primary" style={{marginLeft:"1em"}} onClick={onUpdate}>Update</Button>
                    <Button variant="danger" style={{marginLeft:"1em"}} onClick={onDelete}>Delete</Button>
                </td>
            </tr>
            {showProvinces && <tr><td colSpan={3}><Provinces region={region} /></td></tr>}
        </>
    );
}

export default Region;