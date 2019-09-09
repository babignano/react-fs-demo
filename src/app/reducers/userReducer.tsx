export default (state = {}, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            return Object.assign({}, state, {
                ...action.payload
            });
        default:
            return state
    }
}
