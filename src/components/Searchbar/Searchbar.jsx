import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSearchValueChange = (e) => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast.error("Enter your search query!");
      return;
    }
    onSubmit(value);
    setValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={formSubmit}>
        <button type='submit' className={s.button}>
          <span className={s.label}>Search</span>
        </button>
        <input
          className={s.input}
          type='text'
          autoComplete='off'
          autoFocus
          value={value}
          placeholder='Search images and photos'
          onChange={handleSearchValueChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
