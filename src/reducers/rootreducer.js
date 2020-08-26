const initState={
    city:'Boston',
    current:{},
    days:[],
    unit: 'F',
    windunit: 'miles/hour'
}

const rootreducer =(state=initState,action)=>{
    switch (action.type) {
        case 'UPDATE_CITY':
            return{
                ...state,
                city : action.city
            }
        case 'UPDATE_CURRENT':
            return{
                ...state,
                current:action.current
            }
        case 'UPDATE_DAYS':
            return{
                ...state,
                days:action.days
            }
        case 'UPDATE_UNIT':
        return{
            ...state,
            unit : action.unit
        }
        case 'UPDATE_WINDUNIT':
        return{
            ...state,
            windunit : action.windunit
        }
        default:
            return state;
    }
}

export default rootreducer