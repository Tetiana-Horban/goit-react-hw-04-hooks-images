import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import {
  SearchFormInput,
  SearchFormLabel,
  SearchFormButton,
  SearchForm,
  SearchbarWrapper,
} from './Seachbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [seachImage, setSeachImage] = useState('');

  const handleNameChange = event => {
    const normaliseImageValue = event.currentTarget.value.toLowerCase();
    setSeachImage(normaliseImageValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (seachImage.trim() === '') {
      return toast.error('Enter a search name');
    }
    onSubmit(seachImage);
    setSeachImage('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size={35} />
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleNameChange}
          value={seachImage}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
