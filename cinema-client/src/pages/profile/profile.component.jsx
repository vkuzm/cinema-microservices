import React, { useState, useEffect } from 'react';
import ApiUrl from '../../ApiUrlConstants';
import ProfileDetails from '../../components/profile-details/profile-details.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import Api from '../../services/Api';

const ProfileDetailsWithSpinner = WithSpinner(ProfileDetails);

const Profile = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      Api.getFavorites(user.userId)
        .then((favorites) => {
          setFavorites(favorites);
        });
    }
  }, [user]);

  return (
    <ProfileDetailsWithSpinner
      isLoading={!user}
      user={user}
      favorites={favorites}
    />
  );
};

export default React.memo(Profile);