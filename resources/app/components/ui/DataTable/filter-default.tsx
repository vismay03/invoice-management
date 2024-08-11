
type Filter = {
    [key: string]: Set<any>
}
const filterDefault: Filter = {
    status: new Set(),
    category: new Set(),
    finish: new Set(),
    size: new Set(),
}




const setDefaultFilter = () => {
    Object.keys(filterDefault).forEach((item) => {
        filterDefault[item]?.clear()
    })
}

export { setDefaultFilter, filterDefault }


