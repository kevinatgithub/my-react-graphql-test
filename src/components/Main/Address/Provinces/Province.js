import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Cities from "../Cities/Cities";
import { ProvinceContext } from "./Provinces";

const Province = ({province}) => {

    const {setToDelete, setToUpdate} = useContext(ProvinceContext);
    const [showCities, setShowCities] = useState(false);

    return (
        <>
            <tr key={province.id}>
                <td>{province.id}</td>
                <td>{province.name}</td>
                <td>
                    <Button variant="success" onClick={() => {setShowCities(!showCities)}} size="sm">Cities</Button>
                    <Button variant="warning" onClick={() => {setToUpdate(province)}} style={{marginLeft:'1em'}} size="sm">Update</Button>
                    <Button variant="danger" onClick={() => {setToDelete(province)}} style={{marginLeft:'1em'}} size="sm">Delete</Button>
                </td>
            </tr>
            {showCities && <tr><td colSpan={3}><Cities province={province} /></td></tr>}
        </>
    );
}

export default Province;