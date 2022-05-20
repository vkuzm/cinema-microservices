import React, { useState, useEffect } from 'react';
import ApiUrl from '../../ApiUrlConstants';
import ProfileDetails from '../../components/profile-details/profile-details.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { getAuthToken } from '../../services/Auth';

const ProfileDetailsWithSpinner = WithSpinner(ProfileDetails);

const Profile = ({ user }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user && user.userId) {
      fetch(ApiUrl.FAVORITES, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.userId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken(),
        }
      })
        .then((res) => res.json())
        .then((favorites) => {
          setFavorites(favorites);
        });
    }
  }, []);

  return (
    <ProfileDetailsWithSpinner 
      isLoading={!user}
      user={user} 
      favorites={favorites}
    />
  );
};

export default React.memo(Profile);