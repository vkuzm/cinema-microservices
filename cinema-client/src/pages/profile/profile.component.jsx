import react, { useEffect, useState } from 'react';

const Profile = ({ user }) => {
    return (
        <div className="wrapper page">
            <div>User Id: {user.userId}</div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
        </div>
    );
};

export default Profile;