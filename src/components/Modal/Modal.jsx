import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  setBookingDate,
  setFormattedBookingDate,
} from "../../redux/actions/actions";

import close_icon from "../../assets/icons/close.svg";
import wind_icon from "../../assets/icons/wind.svg";
import bed_icon from "../../assets/icons/bed.svg";
import kitchen_icon from "../../assets/icons/kitchen.svg";
import fuel_icon from "../../assets/icons/fuel.svg";
import transmission_icon from "../../assets/icons/transmission.svg";
import persons_icon from "../../assets/icons/persons.svg";
import water_icon from "../../assets/icons/water.svg";
import tv_icon from "../../assets/icons/tv.svg";
import toilet_icon from "../../assets/icons/toilet.svg";
import shower_icon from "../../assets/icons/shower.svg";
import radio_icon from "../../assets/icons/radio.svg";
import microwave_icon from "../../assets/icons/microwave.svg";
import hob_icon from "../../assets/icons/hob.svg";
import gas_icon from "../../assets/icons/gas.svg";
import freezer_icon from "../../assets/icons/freezer.svg";
import conditioner_icon from "../../assets/icons/conditioner.svg";
import cd_icon from "../../assets/icons/cd.svg";
import star_icon from "../../assets/icons/star.svg";
import empty_star_icon from "../../assets/icons/empty_star.svg";
import location_icon from "../../assets/icons/location.svg";
import calendar_icon from "../../assets/icons/calendar.svg";

import styles from "./Modal.module.css";

export const Modal = ({ camper, closeModal }) => {
  const dispatch = useDispatch();
  const bookingDate = useSelector((state) => state.favorite.bookingDate);
  const formattedBookingDate = useSelector(
    (state) => state.favorite.formattedBookingDate
  );

  const [activeTab, setActiveTab] = useState("Features");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [comment, setComment] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isBookingDateValid, setIsBookingDateValid] = useState(true);
  const [isCommentValid, setIsCommentValid] = useState(true);
  
  const textInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const notification = () => toast.danger("Invalid date input!");

  useEffect(() => {
    const handleDateChange = (event) => {
      const selectedDate = new Date(event.target.value);

      if (!isNaN(selectedDate.getTime())) {
        const day = ("0" + selectedDate.getDate()).slice(-2);
        const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        const year = selectedDate.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;

        dispatch(setFormattedBookingDate(formattedDate));
        textInputRef.current.value = formattedDate;
      } else {
        notification();
      }

      event.target.value = "";
    };

    const dateInputElement = dateInputRef.current;
    if (dateInputElement) {
      dateInputElement.addEventListener("change", handleDateChange);
    }

    return () => {
      if (dateInputElement) {
        dateInputElement.removeEventListener("change", handleDateChange);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [closeModal]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsNameValid(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(true);
  };

  const handleBookingDateChange = (event) => {
    dispatch(setBookingDate(event.target.value));
    setIsBookingDateValid(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setIsCommentValid(true);
  };

  const formNotification = (message) =>
    toast.error(message, {
      theme: "colored",
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    if (name.trim() === "") {
      setIsNameValid(false);
      isValid = false;
      formNotification("Please enter a valid name");
    }
    if (email.trim() === "" || !isValidEmail(email)) {
      setIsEmailValid(false);
      isValid = false;
      formNotification("Please enter valid email");
    }
    if (bookingDate.trim() === "") {
      setIsBookingDateValid(false);
      isValid = false;
      formNotification("Please enter valid date");
    }
    if (comment.trim() === "") {
      setIsCommentValid(false);
      isValid = false;
      formNotification("Please enter valid comment");
    }

    if (isValid) {
      window.location.reload();
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderStarRating = (rating) => {
    const coloredStars = rating;
    const emptyStars = 5 - rating;
    const stars = [];

    for (let i = 0; i < coloredStars; i += 1) {
      stars.push(
        <img
          key={`colored_star_${i}`}
          className={styles.star_icon}
          src={star_icon}
          alt="star icon"
        />
      );
    }

    for (let i = 0; i < emptyStars; i += 1) {
      stars.push(
        <img
          key={`empty_star_${i}`}
          className={styles.star_icon}
          src={empty_star_icon}
          alt="empty star icon"
        />
      );
    }
    return stars;
  };

  console.log(camper, "camper");

  return (
    <div className={styles.backdrop} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.name_wrapper}>
          <h2>{camper.name}</h2>
          <span onClick={closeModal} className={styles.button_close}>
            <img
              className={styles.close_icon}
              src={close_icon}
              alt="close icon"
            />
          </span>
        </div>
        <div className={styles.secondary_info}>
          <div className={styles.rating_wrapper}>
            <img className={styles.star_icon} src={star_icon} alt="star icon" />
            {camper.rating}({camper.reviews.length} Reviews)
          </div>

          <div className={styles.flex_box}>
            <img
              className={styles.star_icon}
              src={location_icon}
              alt="star icon"
            />
            <span>{camper.location}</span>
          </div>
        </div>
        <h2>€{camper.price.toFixed(2)}</h2>
        <div className={styles.gallery_advert}>
          {camper.gallery.map((photo, index) => (
            <img
              key={index}
              className={styles.photo_advert}
              src={photo}
              alt={camper.name}
              width={290}
              height={310}
            />
          ))}
        </div>
        <p className={styles.description}>{camper.description}</p>
        <nav>
          <ul className={styles.nav_list}>
            <li
              className={`${styles.nav_item} ${activeTab === "Features" ? styles.active : ""
                }`}
              onClick={() => handleTabClick("Features")}
            >
              <h2>Features</h2>
            </li>
            <li
              className={`${styles.nav_item} ${activeTab === "Reviews" ? styles.active : ""
                }`}
              onClick={() => handleTabClick("Reviews")}
            >
              <h2>Reviews</h2>
            </li>
          </ul>
        </nav>
        {activeTab === "Features" && (
          <div className={styles.tab}>
            <div className={styles.left_container}>
              <ul className={styles.list_details}>
                <li className={styles.item_details}>
                  <img
                    className={styles.icons}
                    src={persons_icon}
                    alt="persons icon"
                  />
                  <p className={styles.header_detail}>{camper.adults} adults</p>
                </li>
                <li className={styles.item_details}>
                  <img
                    className={styles.icons}
                    src={transmission_icon}
                    alt="transmission icon"
                  />
                  <p className={styles.header_detail}>{camper.transmission}</p>
                </li>
                {camper.details.airConditioner > 0 && (
                  <li className={styles.item_details}>
                    <img
                      className={styles.icons}
                      src={wind_icon}
                      alt="wind icon"
                    />
                    <p className={styles.header_detail}>AC</p>
                  </li>
                )}
                <li className={styles.item_details}>
                  <img
                    className={styles.icons}
                    src={fuel_icon}
                    alt="fuel icon"
                  />
                  <p className={styles.header_detail}>{camper.engine}</p>
                </li>
                {camper.details.kitchen > 0 && (
                  <li className={styles.item_details}>
                    <img
                      className={styles.icons}
                      src={kitchen_icon}
                      alt="kitchen icon"
                    />
                    <p className={styles.header_detail}>Kitchen</p>
                  </li>
                )}
                <li className={styles.item_details}>
                  <img className={styles.icons} src={bed_icon} alt="bed icon" />
                  <p className={styles.header_detail}>
                    {camper.details.beds + " beds"}
                  </p>
                </li>
                <li className={styles.item_details}>
                  <img className={styles.icons} src={conditioner_icon} alt="conditioner icon" />
                  <p className={styles.header_detail}>
                    {camper.details.airConditioner > 0 &&
                      camper.details.airConditioner + " Air conditioner"}
                  </p>
                </li>
                {camper.details.CD > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={cd_icon} alt="cd icon" />
                    <p className={styles.header_detail}>CD</p>
                  </li>
                )}
                {camper.details.radio > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={radio_icon} alt="radio icon" />
                    <p className={styles.header_detail}>Radio</p>
                  </li>
                )}
                {camper.details.hob > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={hob_icon} alt="hob icon" />
                    <p className={styles.header_detail}>
                      {camper.details.hob + " hob"}
                    </p>
                  </li>
                )}
                {camper.details.toilet > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={toilet_icon} alt="toilet icon" />
                    <p className={styles.header_detail}>
                      Toilet
                    </p>
                  </li>
                )}
                {camper.details.shower > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={shower_icon} alt="shower icon" />
                    <p className={styles.header_detail}>
                      Shower
                    </p>
                  </li>
                )}
                {camper.details.freezer > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={freezer_icon} alt="freezer icon" />
                    <p className={styles.header_detail}>
                      Freezer
                    </p>
                  </li>
                )}
                <li className={styles.item_details}>
                  <img className={styles.icons} src={gas_icon} alt="gas icon" />
                  <p className={styles.header_detail}>
                    {camper.details.gas && " gas"}
                  </p>
                </li>
                <li className={styles.item_details}>
                  <img className={styles.icons} src={water_icon} alt="water icon" />
                  <p className={styles.header_detail}>
                    {camper.details.water && " water"}
                  </p>
                </li>
                {camper.details.microwave > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={microwave_icon} alt="microwave icon" />
                    <p className={styles.header_detail}>
                      Microwave
                    </p>
                  </li>
                )}
                {camper.details.TV > 0 && (
                  <li className={styles.item_details}>
                    <img className={styles.icons} src={tv_icon} alt="tv icon" />
                    <p className={styles.header_detail}>
                      TV
                    </p>
                  </li>
                )}
              </ul>

              <div>
                <h3 className={styles.detail_title}> Vehicle details </h3>
                <div className={styles.vehicle_detail_wrapper}>
                  <div className={styles.vehicle_detail}>
                    <span>Form</span>
                    <span>{camper.form}</span>
                  </div>
                  <div className={styles.vehicle_detail}>
                    <span>Length</span>
                    <span>{camper.length}</span>
                  </div>
                  <div className={styles.vehicle_detail}>
                    <span>Width</span>
                    <span>{camper.width}</span>
                  </div>
                  <div className={styles.vehicle_detail}>
                    <span>Height</span>
                    <span>{camper.height}</span>
                  </div>
                  <div className={styles.vehicle_detail}>
                    <span>Tank</span>
                    <span>{camper.tank}</span>
                  </div>
                  <div className={styles.vehicle_detail}>
                    <span>Consumption</span>
                    <span>{camper.consumption}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right_container}>
              <h3 className={styles.form_title}> Book your campervan now</h3>
              <p className={styles.form_subtitle}>
                Stay connected! We are always ready to help you.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={`${styles.form_input} ${!isNameValid && styles.invalid
                    }`}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />

                <input
                  className={`${styles.form_input} ${!isEmailValid && styles.invalid
                    }`}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <span className={styles.datepicker_toggle}>
                  <span className={styles.datepicker_toggle_button}></span>
                  <img
                    className={styles.datepicker_toggle_button}
                    src={calendar_icon}
                    alt="calendar icon"
                  />
                  <input
                    className={`${styles.datepicker_input} ${!isBookingDateValid && styles.invalid
                      }`}
                    ref={dateInputRef}
                    id="datepicker_input"
                    type="date"
                    value={bookingDate}
                    onChange={handleBookingDateChange}
                  />
                </span>
                <input
                  className={`${styles.text_input} ${!isCommentValid && styles.invalid
                    }`}
                  id="text_input"
                  ref={textInputRef}
                  type="text"
                  placeholder="Booking date"
                  readOnly
                  value={formattedBookingDate}
                />
                <textarea
                  className={`${styles.form_textarea} ${!isCommentValid && styles.invalid
                    }`}
                  placeholder="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button className={styles.show_btn} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === "Reviews" && (
          <div className={styles.tab}>
            <div className={styles.left_container}>
              <div>
                {camper.reviews.map((review, index) => (
                  <div
                    key={review.reviewer_name}
                    className={styles.rating_container}
                  >
                    <div className={styles.rating}>
                      <span className={styles.initials}>
                        {review.reviewer_name.slice(0, 1)}
                      </span>
                      <div className={styles.rating_name_wrapper}>
                        <p className={styles.reviewer_name}>
                          {review.reviewer_name}
                        </p>
                        <div>
                          <div>{renderStarRating(review.reviewer_rating)}</div>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewer_comment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.right_container}>
              <h3 className={styles.form_title}> Book your campervan now</h3>
              <p className={styles.form_subtitle}>
                Stay connected! We are always ready to help you.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={`${styles.form_input} ${!isNameValid && styles.invalid
                    }`}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />

                <input
                  className={`${styles.form_input} ${!isEmailValid && styles.invalid
                    }`}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <span className={styles.datepicker_toggle}>
                  <span className={styles.datepicker_toggle_button}></span>
                  <img
                    className={styles.datepicker_toggle_button}
                    src={calendar_icon}
                    alt="calendar icon"
                  />
                  <input
                    className={`${styles.datepicker_input} ${!isBookingDateValid && styles.invalid
                      }`}
                    ref={dateInputRef}
                    id="datepicker_input"
                    type="date"
                    value={bookingDate}
                    onChange={handleBookingDateChange}
                  />
                </span>
                <input
                  className={`${styles.text_input} ${!isCommentValid && styles.invalid
                    }`}
                  id="text_input"
                  ref={textInputRef}
                  type="text"
                  placeholder="Booking date"
                  readOnly
                  value={formattedBookingDate}
                />
                <textarea
                  className={`${styles.form_textarea} ${!isCommentValid && styles.invalid
                    }`}
                  placeholder="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button className={styles.show_btn} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
