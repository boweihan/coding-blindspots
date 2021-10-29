import {groupBy} from 'lodash'

const filterArray = (data: any[], key: any) => {
    return groupBy(data, key)
}

export default filterArray