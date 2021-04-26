import { Spinner, Table } from "react-bootstrap";
import { useProvinces } from "./Api";
import Province from './Province';

const List = ({region}) => {

    const {loading,error,data} = useProvinces(parseInt(region.id));

    if (error) alert(JSON.stringify(error));

    let provinces = data ? data.provinces : [];

    return (
        <Table bordered variant="dark" size="sm" striped style={{marginTop:"1em"}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td colSpan={3}><Spinner animation="grow" /> Please wait..</td></tr>}
                {data ? provinces.map(p => <Province key={p.id} province={p} />) : []}
                {data && provinces.length === 0 && <tr><td colSpan={3}>No Provinces yet</td></tr>}
            </tbody>
        </Table>
    );
}

export default List;