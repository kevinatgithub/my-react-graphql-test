export const useCreating = (fieldName, mutation, query) => {
    const updateRecords = (cache, { data }) => {
        const fields = {};
        fields[fieldName] = (records = []) => {
            const newRecord = data[mutation];
            cache.writeQuery({
                query,
                data: { newRecord, ...records}
            })
        };
        cache.modify({fields})
    };
    return updateRecords;
}