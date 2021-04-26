import {gql, useMutation, useQuery} from '@apollo/client';

const CITY_FRAGMENT = gql`
    fragment city on City{
        id
        name
        province{
            id
        }
    }
`;

const CITIES = gql`
    query cities($id:Int!){
        cities:citiesByProvinceId(id:$id ) {
            ...city
        }
    }
    ${CITY_FRAGMENT}
`;

const ADD_CITY = gql`
    mutation ADD_CITY($input: CreateCity!){
        createCity(input: $input) {
            ...city
        }
    }
    ${CITY_FRAGMENT}
`;

const UPDATE_CITY = gql`
    mutation UPDATE_CITY($input: UpdateCity!){
        updateCity(input: $input) {
            ...city
        }
    }
    ${CITY_FRAGMENT}
`;

const DELETE_CITY = gql`
    mutation DELETE_CITY($input : IDOnly!){
        deleteCity(input: $input) {
            ...city
        }
    }
    ${CITY_FRAGMENT}
`;

const PROVINCES = gql`
    query provinces{
        provinces {
            id
            name
            region {
                name
            }
        }
    }
`;

export const useCities = provinceId => {
    const {loading,error,data} = useQuery(CITIES,{
        variables : {id : provinceId}
    });

    return {loading,error,data};
}

export const useCreateCity = (name,provinceId) => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                citiesByProvinceId(records = []){
                    const newRecord = data.createCity;
                    cache.writeQuery({
                        query: CITIES,
                        data: { newRecord, ...records}
                    })
                }
            }
        })
    };

    const [doCreate,request] = useMutation(ADD_CITY,{
        variables : {
            input : {
                name, provinceId
            }
        },
        update: updateRecords
    });

    return {doCreate,request};
};

export const useUpdateCity = (id,name,provinceId) => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                citiesByProvinceId(records = []){
                    const updated = data.updateCity;
                    const i = records.indexOf(updated);
                    if (i > -1){
                        records[i] = updated; 
                    }
                    cache.writeQuery({
                        query: CITIES,
                        data: { updated, ...records}
                    })
                }
            }
        })
    };
    const [doUpdate,request] = useMutation(UPDATE_CITY,{
        variables : {
            input : {
                id, name, provinceId
            }
        },
        update: updateRecords
    });

    return {doUpdate, request};
};

export const useDeleteCity = id => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                citiesByProvinceId(records = []){
                    const record = data.deleteCity;
                    const i = records.indexOf(record);
                    if (i > -1){
                        records.splice(i,1);
                    }
                    cache.writeQuery({
                        query: CITIES,
                        data: records
                    })
                }
            }
        })
    };

    const [doDelete, request] = useMutation(DELETE_CITY,{
        variables : {
            input : {id}
        },
        update: updateRecords
    });

    return {doDelete, request};
}

export const useProvinces = () => {
    const {loading,error,data} = useQuery(PROVINCES);

    return {loading,error,data};
}