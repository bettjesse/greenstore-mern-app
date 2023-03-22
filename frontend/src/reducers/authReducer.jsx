import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    LOAD_USERREQUEST,
    LOAD_USER_SUCCESS,
    // LOGOUT_SUCCESS,
    // LOGOUT_FAIL,

    // LOAD_USER_FAIL,
    
CLEAR_ERROR,
  } from  "../constants/userConstant";
  
  export const authReducer = (state ={ user:{} } , action) => {
    switch (action.type) {

      case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
         case LOAD_USERREQUEST:
          
        return { loading: true ,
                isAuthenticated:false
        };
  
      case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
          case LOAD_USER_SUCCESS:
      
        return { 
            ...state,
            loading: false,
            isAuthenticated: true, 
            user: action.payload
           };

          //  case LOGOUT_SUCCESS:
          //   return{
          //     loading:false,
          //     isAuthenticated:false,
          //     user:null,
          //   }

case LOAD_USER_FAIL:
  return {
    loading: false,
    isAuthenticated: false, 
    user: null,
    error: action.payload
  }
          
  // case LOGOUT_FAIL:
  //   return{
  //     ...state,
  //     error: action.payload
  //   }
  
      case USER_LOGIN_FAILURE:
     
        case USER_REGISTER_FAILURE:
        return { 
            ...state,
            loading: false, 
            isAuthenticated:false,
            error: action.payload };
  
      case CLEAR_ERROR:
        return { ...state, error: null };
  
      default:
        return state;
    }
  };
  
  
  // const initialState = {
  //   loading: false,
  //   user: null,
  //   error: null,
  // };
  
  // export const loadUserReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case :
  //       return { ...state, loading: true };
  
  //     case LOAD_USER_SUCCESS:
  //       return { loading: false, user: action.payload, error: null };
  
  //     case LOAD_USER_FAIL:
  //       return { loading: false, user: null, error: action.payload };
  
  //     default:
  //       return state;
  //   }
  // };
  
  