import React from 'react';
import './with-spinner.styles.scss';

const WithSpinnerWrapper = ({ isLoading, children }) => {
  console.log(children)
    return isLoading ? (
      <div className="spinner-overlay">
        <div className="spinner-container" />
      </div>
    ) : (
      {...children}
    )};

export default WithSpinnerWrapper;