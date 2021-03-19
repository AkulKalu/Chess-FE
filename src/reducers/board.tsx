
export const initialState : {} = {
   
};

interface Action {
    type : string,
    payload : any
}

export const reducer = (state : {}, action : Action) => {
    const {type, payload } = action;
   
    switch (type) {
      case 'NEW' :
        let newState = {
          ...payload
        }

        return newState;

    
    default:
      return state;
    }
  };




  