const INITIAL_STATE = {
    users: ''
};

const ADD_USER = "ADD_USER";
const LOG_OUT = "LOG_OUT"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ADD_USER:
            return {...state, users: action.payload};

        case LOG_OUT:
            return {users: ''}

        default: return state;
    }
};

export function addUser(user){
    return {
        type: ADD_USER, 
        payload: user
    }
}

export function logOut(){
    return{
        type: LOG_OUT,
    }
}