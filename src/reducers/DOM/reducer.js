
const initialState = {
    modal: {
        show: false,
        header: null,
        body: null,
        footer: null
    }
}

const DOM = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW_MODAL':
            return state = {
                ...state,
                modal: action.payload
            }

        case 'CLOSE_MODAL':
            return state = {
                ...state,
                modal: {
                    ...state.modal,
                    show: false
                }
            }

        default:
            return state
    }
}


export default DOM