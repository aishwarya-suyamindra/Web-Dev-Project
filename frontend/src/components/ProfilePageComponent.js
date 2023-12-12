import React from 'react';
import { useSelector } from 'react-redux';

const UserDetailsComponent = () => {
  const user = useSelector((state) => state.login.userDetails);
  console.log(user);

  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add any other user details you want to display */}
        </>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default UserDetailsComponent;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';

// const ProfilePageComponent = () => {
//   const { profileId } = useParams();
//   const loggedInUser = useSelector((state) => state.login.userDetails);

//   const fetchUserProfileById = async (userId) => {
    
//   };

//   const isOwnProfile = !profileId || (loggedInUser && loggedInUser.id === profileId);

 
//   const fetchUserProfile = async () => {
//     try {
//       if (isOwnProfile) {
   
//         const ownProfileData = await fetchOwnProfileData(loggedInUser.id);
//         return ownProfileData;
//       } else {
      
//         const otherUserProfileData = await fetchUserProfileById(profileId);
//         return otherUserProfileData;
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   };


//   const fetchOwnProfileData = async (userId) => {
   
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {isOwnProfile && <p>This is your own profile.</p>}
      
     
//       {isOwnProfile && <Link to="/profile/edit">Edit Profile</Link>}

//       <section>
//         <h3>Personal Information</h3>
//         <p>Name: {userProfile?.name}</p>
//         {isOwnProfile && <p>Email: {userProfile?.email}</p>}
     
//       </section>

    
//       {isOwnProfile && (
//         <section>
//           <h3>Following</h3>
     
//         </section>
//       )}

//       {isOwnProfile && (
//         <section>
//           <h3>Followers</h3>
          
//         </section>
//       )}

//     </div>
//   );
// };

// export default ProfilePageComponent;



