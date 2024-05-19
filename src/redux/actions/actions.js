import {
  SET_FORMATTED_BOOKING_DATE,
  SET_BOOKING_DATE,
  RESET_BOOKING_DATE,
  SET_FILTERED_CAMPERS,
  START_LOADING,
  FINISH_LOADING,
  SET_CAMPERS,
  SET_FAVORITE_CARDS,
  REMOVE_FAVORITE_CARD,
  ADD_FAVORITE_CARD,
} from './actionTypes';

export const addFavoriteCard = cardId => ({
  type: ADD_FAVORITE_CARD,
  payload: cardId,
});

export const removeFavoriteCard = cardId => ({
  type: REMOVE_FAVORITE_CARD,
  payload: cardId,
});

export const setFavoriteCards = favoriteCards => ({
  type: SET_FAVORITE_CARDS,
  payload: favoriteCards,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const finishLoading = () => ({
  type: FINISH_LOADING,
});

export const setCampers = campers => ({
  type: SET_CAMPERS,
  payload: campers,
});

export const setFilteredCampers = filteredCampers => ({
  type: SET_FILTERED_CAMPERS,
  payload: filteredCampers,
});

export const setBookingDate = date => ({
  type: SET_BOOKING_DATE,
  payload: date,
});

export const setFormattedBookingDate = formattedDate => ({
  type: SET_FORMATTED_BOOKING_DATE,
  payload: formattedDate,
});

export const resetBookingDate = () => ({
  type: RESET_BOOKING_DATE,
});
