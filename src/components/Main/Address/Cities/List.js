import { useContext } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useCities } from "./Api";
import { CityContext } from "./Cities";

const List = ({province}) => {

    const {loading,error,data} = useCities(parseInt(province.id));
    const {setToDelete, setToUpdate} = useContext(CityContext);

    if (error) alert(JSON.stringify(error));

    let cities = data ? data.cities : [];

    return (
        <Table bordered variant="light" size="sm" striped style={{marginTop:"1em"}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td colSpan={3}><Spinner animation="grow" /> Please wait..</td></tr>}
                {data ? cities.map(c => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>
                            <Button variant="warning" onClick={() => {setToUpdate(c)}} size="sm">Update</Button>
                            <Button variant="danger" onClick={() => {setToDelete(c)}} style={{marginLeft:'1em'}} size="sm">Delete</Button>
                        </td>
                    </tr>
                )) : []}
                {data && cities.length === 0 && <tr><td colSpan={3}>No Cities/Municipalities yet</td></tr>}
            </tbody>
        </Table>
    );
}

export default List;