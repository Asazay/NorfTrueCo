import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

//User
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Items
const GET_ITEMS = 'session/getItems';
const GET_ITEM_BY_ID = 'sessions/getItemById';

//Reviews
const GET_REVIEWS_BY_ID = 'session/getReviewsById';
const GET_REVIEW_BY_ID = 'session/getReviewById'
const CREATE_REVIEW = 'session/createReview';
const EDIT_REVIEW = 'session/editReview';
const DELETE_REVIEW = 'session/deleteReview';


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

const getItemById = (item) => ({
  type: GET_ITEM_BY_ID,
  payload: item
})

//Review actions 
const getReviewsById = (reviews) => ({
  type: GET_REVIEWS_BY_ID,
  payload: reviews
})

const getReviewById = (review) => ({
  type: GET_REVIEW_BY_ID,
  payload: review
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId
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

export const getItemByIdThunk = (itemId) => async dispatch => {
  const res = await csrfFetch(`/api/items/${itemId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getItemById(data))
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

//Reviews action thunk
export const getReviewsByIdThunk = (itemId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${itemId}`);

  if (res.ok) {
    const data = await res.json()
    dispatch(getReviewsById(data))
    return data
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}

export const getReviewByIdThunk = (itemId, reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${itemId}/${reviewId}`);

  if(res.ok){
    const data = await res.json();
    console.log(data)
    dispatch(getReviewById(data))
    return data
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}

export const createReviewThunk = (itemId, reviewInfo) => async dispatch => {
  reviewInfo.item_id = itemId;

  let reqBody = {
    reviewInfo
  }

  const res = await csrfFetch(`/api/reviews/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(createReview(data));
    return data;
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}

export const editReviewThunk = (itemId, reviewId, editedReview) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${itemId}/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedReview)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(editReview(data))
    return data;
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}

export const deleteReviewThunk = (itemId, reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${itemId}/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteReview(data.reviewId))
    return data.message;
  }

  else if (res.status < 500) {
    const errMsgs = await res.json()
    return errMsgs;
  }
}

// Selectors
const getReviews = (state) => state.session.reviews
export const getReviewsArraySelector = createSelector(getReviews, (reviews) => {
  if (reviews) {
    let newObj = { ...reviews }
    return Object.values(newObj)
  }
})


const initialState = { user: null, items: null, reviews: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };

    case REMOVE_USER:
      return { ...state, user: null };

    case GET_ITEMS:
      return {
        ...state, items: action.payload.items
      }

    case GET_ITEM_BY_ID:
      return { ...state, items: action.payload.item }

    case GET_REVIEWS_BY_ID:
      let newReviews = {};
      newReviews.reviews = {}
      action.payload.reviews.forEach(review => {
        newReviews.reviews[review.id] = review
      })

      newReviews.totalReviews = action.payload.totalReviews;
      newReviews.avgStars = action.payload.avgStars;

      return { ...state, reviews: newReviews }

    case GET_REVIEW_BY_ID:
      return {...state, review: action.payload}

    case CREATE_REVIEW:
      const addedReview = {...state.reviews};
      addedReview.reviews[action.payload.id] = action.payload;
      addedReview.totalReviews += 1;
      let newTotalStars = 0;
      Object.values(addedReview.reviews).forEach(rev => newTotalStars += rev.stars)
      addedReview.avgStars = newTotalStars / addedReview.totalReviews
      return { ...state, reviews: addedReview }
      // return {...state}

    case EDIT_REVIEW:
      const editReview = {...state.reviews};
      editReview.reviews[action.payload.id] = action.payload;
      editReview.avgStars = Object.values(editReview.reviews).reduce((acc, rev) => acc += rev.stars, 0) / editReview.totalReviews
      return { ...state, reviews: editReview }

    case DELETE_REVIEW:
      const newState = { ...state.reviews }
      delete newState.reviews[action.payload]
      newState.totalReviews -= 1;
      newState.avgStars = Object.values(newState.reviews).reduce((acc, rev) => acc += rev.stars, 0) / newState.totalReviews
      return {...state, reviews: newState}

    default:
      return state;
  }
}

export default sessionReducer;