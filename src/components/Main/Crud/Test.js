import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ConfirmDeleteUI from "../Crud/ConfirmDeleteUI";
// import CrudForm from "./CrudForm"
//import { useRegions } from "../Address/Region/Api";

// const useRegions = () => {
//     const request = useQuery(gql`
//         query regions {
//             options: regions {
//                 value : id,
//                 text : name
//             }
//         }
//     `)

//     return request;
// };

// const Test = () => {
//     const [show,setShow] = useState(true);
//     const [name,setName] = useState("");
//     const [gender,setGender] = useState(2);
//     const [loading,setLoading] = useState(false);
//     const [region,setRegion] = useState(1);
//     const regions = useRegions();

//     const title = "Add Barangay";

//     const fields = [
//         {type : "text", label : "Barangay Name", value : name, setValue : setName},
//         {type : "dropdown", label : "Gender", selected : gender, handleChange : setGender, options : [
//             {value : 1, text : 'male'},
//             {value : 2, text : 'female'},
//         ]},
//         {type : "query", label : "Region", selected : region, handleChange : setRegion, options : regions}
//     ];

//     const onSave = () => {
//         setLoading(true);
//     }

//     const onCancel = () => {
//         setShow(false);
//     }

//     return <FormUI show={show} title={title} loading={loading} fields={fields} onSave={onSave} onCancel={onCancel}  />;
// }

// const Test = () => {
//     const title = "Add Province";

//     const [name,setName] = useState("");
//     const [region,setRegion] = useState(1);
//     const regions = useRegions();
//     const [active,setActive] = useState(true);

//     const fields = [
//         {type : "text", label : "Province Name", value : name, setValue : setName},
//         {type : "query", label : "Region", selected : region, handleChange : setRegion, options : regions}
//     ];

//     const [doSave, {loading,error,data}] = useMutation(gql`
//                         mutation addProvince($input: CreateProvince!){
//                             createProvince(input:$input){
//                                 id
//                                 name
//                             }
//                         }
//                     `, {
//                         variables : {
//                             input : {
//                                 name, regionId: region
//                             }
//                         }
//                     });

//     return <>
//                 {active && <CrudForm
//                 title={title}
//                 fields={fields}
//                 setActive={setActive}
//                 doSave={doSave}
//                 loading={loading}
//                 error={error}
//                 data={data} />}
//             </>;
// }

// const EditTest = ({province}) => {
//     const title = "Update Province";

//     const [name,setName] = useState(province.name);
//     const [region,setRegion] = useState(province.regionId);
//     const regions = useRegions();
//     const [active,setActive] = useState(true);

//     const fields = [
//         {type : "text", label : "Province Name", value : name, setValue : setName},
//         {type : "query", label : "Region", selected : region, setValue : setRegion, options : regions}
//     ];

//     const [doSave, {loading,error,data}] = useMutation(gql`
//                         mutation updateProvince($input: UpdateProvince!){
//                             updateProvince(input:$input){
//                                 id
//                                 name
//                                 regionId
//                             }
//                         }
//                     `, {
//                         variables : {
//                             input : {
//                                 id : parseInt(province.id), name, regionId: parseInt(region)
//                             }
//                         }
//                     });

//     return <>
//                 {active && <CrudForm
//                 title={title}
//                 fields={fields}
//                 setActive={setActive}
//                 doSave={doSave}
//                 loading={loading}
//                 error={error}
//                 data={data} />}
//             </>;
// }

// const Test = () => {
//     const {error, data} = useQuery(gql`query province{ province : provinceById(id : 15){ id name regionId}}`);

//     if (error) return <p>{JSON.stringify(data)}</p>;

//     if (data) return <EditTest province={data.province} />;

//     return <p>Loading</p>;
// }

const PerformDelete = ({province}) => {

    const [toDelete,setToDelete] = useState(province);

    const [doDelete, request] = useMutation(gql`
        mutation delete ($input : IDOnly!){
            deleteProvince(input : $input) {
                id
                name
            }
        }
    `,{
        variables : {
            input : { id : province.id}
        }
    });

    return <>{toDelete && <ConfirmDeleteUI
            msg={"Delete province " + province.name + "?"} 
            request={request} 
            doDelete={doDelete}
            setToDelete={setToDelete}
        />}</>;
};

const Test = () => {
    const {error, data} = useQuery(gql`query province{ province : provinceById(id : 15){ id name regionId}}`);

    if (error) return <p>{JSON.stringify(data)}</p>;

    if (data) return <PerformDelete province={data.province} />;

    return <p>Loading</p>;
}

export default Test;