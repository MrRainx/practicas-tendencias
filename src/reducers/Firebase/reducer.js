const initialForm = {
    usuario: '',
    imagen: {
        value: '',
        nombre: '',
        b64: ''
    }
}
const initialState = {
    form: initialForm,
}

const Firebase = (state = initialState, action) => {

    switch (action.type) {
        case 'CHANGE_USUARIO':
            return state = {
                ...state,
                form: {
                    ...state.form,
                    usuario: action.payload
                }
            }
        case 'CHANGE_IMAGEN':
            return state = {
                ...state,
                form: {
                    ...state.form,
                    imagen: {
                        ...action.payload
                    }
                }
            }

        case 'RESET_FORM':
            return state = { ...initialState }

        default:
            return state
    }
}


export default Firebase;