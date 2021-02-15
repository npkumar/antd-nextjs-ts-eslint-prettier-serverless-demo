import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

const Profile = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // if there is no authenticated user, redirect to profile page
      .catch(() => {
        router.push('/')
        setUser(null)
      })
  }, [])

  return (
    <div>
      {user && (
        <>
          <h1>Welcome, {user.signInUserSession.idToken.payload.email}</h1>
          <h2>Welcome, {user.signInUserSession.idToken.payload['cognito:groups']}</h2>
        </>
      )}
    </div>
  )
}

export default Profile
