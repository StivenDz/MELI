export const sortJSON = (data, key, order) => {
    return data.sort( (a, b) => {
        var x = a[key],
        y = b[key];

        if (order === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (order === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}