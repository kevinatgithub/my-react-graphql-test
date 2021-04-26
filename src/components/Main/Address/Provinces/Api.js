import {gql, useMutation, useQuery} from '@apollo/client';

const PROVINCE_FRAGMENT = gql`
    fragment province on Province{
        id
        name
    }
`;

const PROVINCES = gql`
    query provinces($id:Int!){
        provinces:provincesByRegionId(id:$id ) {
            ...province
        }
    }
    ${PROVINCE_FRAGMENT}
`;

const ADD_PROVINCE = gql`
    mutation ADD_PROVINCE($input: CreateProvince!){
        createProvince(input: $input) {
            ...province
        }
    }
    ${PROVINCE_FRAGMENT}
`;

const UPDATE_PROVINCE = gql`
    mutation UPDATE_PROVINCE($input: UpdateProvince!){
        updateProvince(input: $input) {
            ...province
        }
    }
    ${PROVINCE_FRAGMENT}
`;

const DELETE_PROVINCE = gql`
    mutation DELETE_PROVINCE($input : IDOnly!){
        deleteProvince(input: $input) {
            ...province
        }
    }
    ${PROVINCE_FRAGMENT}
`;

export const useProvinces = regionId => {
    const {loading,error,data} = useQuery(PROVINCES,{
        variables : {id : regionId}
    });

    return {loading,error,data};
}

export const useCreateProvince = (name,regionId) => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                provincesByRegionId(records = []){
                    const newRecord = data.createProvince;
                    cache.writeQuery({
                        query: PROVINCES,
                        data: { newRecord, ...records}
                    })
                }
            }
        })
    };

    const [doCreate,request] = useMutation(ADD_PROVINCE,{
        variables : {
            input : {
                name, regionId
            }
        },
        update: updateRecords
    });

    return {doCreate,request};
};

export const useUpdateProvince = (id,name,regionId) => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                provincesByRegionId(records = []){
                    const newRecord = data.updateProvince;
                    const i = records.indexOf(newRecord);
                    if (i > -1){
                        records[i] = newRecord; 
                    }
                    cache.writeQuery({
                        query: PROVINCES,
                        data: { newRecord, ...records}
                    })
                }
            }
        })
    };
    const [doUpdate,request] = useMutation(UPDATE_PROVINCE,{
        variables : {
            input : {
                id, name, regionId
            }
        },
        update: updateRecords
    });

    return {doUpdate, request};
};

export const useDeleteProvince = id => {
    const updateRecords = (cache, { data }) => {
        cache.modify({
            fields: {
                provincesByRegionId(records = []){
                    const record = data.deleteProvince;
                    const i = records.indexOf(record);
                    if (i > -1){
                        records.splice(i,1);
                    }
                    cache.writeQuery({
                        query: PROVINCES,
                        data: records
                    })
                }
            }
        })
    };

    const [doDelete, request] = useMutation(DELETE_PROVINCE,{
        variables : {
            input : {id}
        },
        update: updateRecords
    });

    return {doDelete, request};
}