import { csrfFetch } from './csrf';

//User
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Items
const GET_ITEMS = 'session/getItems'


//User actions
const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

//Item actions
const getItems = (items) => ({
  type: GET_ITEMS,
  payload: items
});

//User thunk actions
export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/session/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {

  const response = await csrfFetch("/api/session/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await csrfFetch("/api/session/", { method: 'DELETE' });
  dispatch(removeUser());
};

export const thunkCheckEmail = async ({ email }) => {
  const response = await csrfFetch("/api/auth/check-email", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })

  if (response.ok) {
    const data = await response.json();
    return data.exists;
  }
  else return "Something went wrong"
};

//Item thunk actions
export const getItemsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/items/');
  if (res.ok) {
    const data = await res.json();
    dispatch(getItems(data))
    return data
  }
  else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
  }
}

export const getFilteredItemsThunk = (query) => async (dispatch) => {
  console.log(query)
  const res = await csrfFetch('/api/items/' + "?" + query)
  if (res.ok) {
    const data = await res.json();
    dispatch(getItems(data));
    return data;
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}


const initialState = { user: null, items: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_ITEMS:
      return { ...state, items: action.payload.items }
    default:
      return state;
  }
}

export default sessionReducer;