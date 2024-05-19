import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addFavoriteCard, setFilteredCampers, removeFavoriteCard, startLoading, finishLoading } from '../../redux/actions/actions';

import { Modal } from '../Modal/Modal';
import fetchCampers from '../../Api/ApiService';

import heart_icon from '../../assets/icons/heart.svg';
import heart_red_icon from '../../assets/icons/heart_red.svg';
import wind_icon from '../../assets/icons/wind.svg';
import bed_icon from '../../assets/icons/bed.svg';
import kitchen_icon from '../../assets/icons/kitchen.svg';
import fuel_icon from '../../assets/icons/fuel.svg';
import transmission_icon from '../../assets/icons/transmission.svg';
import persons_icon from '../../assets/icons/persons.svg';
import star_icon from '../../assets/icons/star.svg';
import location_icon from '../../assets/icons/location.svg';

import styles from './CardInfo.module.css';

export const CardInfo = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite.favoriteCards);
  const filteredCampers = useSelector(state => state.favorite.filteredCampers);

  const [modalStates, setModalStates] = useState({});
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const fetchCampersData = async () => {
      try {
        dispatch(startLoading());
        const campers = await fetchCampers();
        dispatch(setFilteredCampers(campers));
      } catch (error) {
        throw new Error()
      } finally {
        dispatch(finishLoading());
      }
    };

    fetchCampersData();
  }, [dispatch]);

  const notify = (message) =>
    toast.info(message, {
      theme: "colored"
    });

  const handleFavClick = camper => {
    const camperId = camper._id;
    const isFavorite = favorites.some(favorite => favorite._id === camperId);

    let updatedFavorites = [];
    if (isFavorite) {
      updatedFavorites = favorites.filter(
        favorite => favorite._id !== camperId
      );
    } else {
      updatedFavorites = [...favorites, camper];
    }
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites));

    if (!isFavorite) {
      notify('The camper successfully added to favorites!');
      dispatch(addFavoriteCard(camper));
    } else {
      notify('The camper removed from favorites!');
      dispatch(removeFavoriteCard(camperId));
    }
  };

  const openModal = camperId => {
    setModalStates(prevStates => ({
      ...prevStates,
      [camperId]: true,
    }));
  };

  const closeModal = camperId => {
    setModalStates(prevStates => ({
      ...prevStates,
      [camperId]: false,
    }));
  };

  const handleLoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 4);
  };

  return (
    <div className={styles.card_wrapper}>
      {filteredCampers && filteredCampers.length > 0 ? (
        filteredCampers.slice(0, visibleCards).map(camper => (
          <ul key={camper._id} className={styles.card_list_wrapper}>
            <li className={styles.card_info}>
              <div className={styles.card_img_wrapper}>
                <img
                  className={styles.card_img}
                  src={camper.gallery[0]}
                  alt={camper.name}
                  width={290}
                  height={310}
                />
              </div>
              <div>
                <div className={styles.info}>
                  <h2>{camper.name}</h2>
                  <div className={styles.left_info}>
                    <h2>€{camper.price.toFixed(2)}</h2>
                    <button
                      className={styles.fav_btn}
                      onClick={() => handleFavClick(camper)}
                    >
                      {favorites.some(
                        favorite => favorite._id === camper._id
                      ) ? (
                        <img src={heart_red_icon} alt="favorite icon" />
                      ) : (
                        <img src={heart_icon} alt="favorite icon" />
                      )}
                    </button>
                  </div>
                </div>
                <div className={styles.secondary_info}>
                  <div className={styles.rating_wrapper}>
                    <img className={styles.star_icon} src={star_icon} alt="star icon" />
                    {camper.rating}({camper.reviews.length} Reviews)
                  </div>

                  <div className={styles.flex_box}>
                    <img className={styles.star_icon} src={location_icon} alt="star icon" />
                    <span>{camper.location}</span>
                  </div>
                </div>
                <p className={styles.description}>{camper.description}...</p>
                <ul className={styles.list_details}>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={persons_icon} alt="persons icon" />
                    <p className={styles.header_detail}>
                      {camper.adults} adults
                    </p>
                  </li>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={transmission_icon} alt="persons icon" />
                    <p className={styles.header_detail}>
                      {camper.transmission}
                    </p>
                  </li>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={fuel_icon} alt="persons icon" />
                    <p className={styles.header_detail}>{camper.engine}</p>
                  </li>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={kitchen_icon} alt="persons icon" />
                    <p className={styles.header_detail}>
                      {camper.details.kitchen && 'Kitchen'}
                    </p>
                  </li>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={bed_icon} alt="persons icon" />
                    <p className={styles.header_detail}>
                      {camper.details.beds + ' beds'}
                    </p>
                  </li>
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={wind_icon} alt="persons icon" />
                    <p className={styles.header_detail}>
                      {camper.details.airConditioner > 0 && 'AC'}
                    </p>
                  </li>
                </ul>

                <button className={styles.show_btn} onClick={() => openModal(camper._id)}>
                  Show more
                </button>
              </div>
              {modalStates[camper._id] && (
                <Modal
                  camper={camper}
                  closeModal={() => closeModal(camper._id)}
                />
              )}
            </li>
          </ul>
        ))
      ) : (
        <div className={styles.no_camp_title_wrapper}>
          <h2>Sorry, no campers found</h2>
        </div>
      )}
      <button
        className={styles.load_more_btn}
        onClick={handleLoadMore}
        style={{
          display:
            filteredCampers && visibleCards < filteredCampers.length ? 'block' : 'none',
        }}
      >
        Load more
      </button>

      <ToastContainer autoClose={3000} />
    </div>
  );
};
