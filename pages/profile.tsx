import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

/**
 * Test Page to check Cognito user details
 */
const Profile: React.FC = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // If there is no authenticated user, redirect
      .catch(() => {
        router.push('/404');
        setUser(null);
      });
  }, []);

  return (
    <div>
      {user && (
        <>
          <h1>Email: {user.signInUserSession.idToken.payload.email}</h1>
          <h2>Groups: {user.signInUserSession.idToken.payload['cognito:groups']}</h2>
        </>
      )}
    </div>
  );
};

export default Profile;
