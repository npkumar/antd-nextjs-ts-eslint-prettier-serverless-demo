import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Person from '../components/Person'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Profile = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const { data, error } = useSWR('/api/people', fetcher)
  if (error) return <div>failed to load</div>

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

          <div>
            {data && data.people ? (
              data.people.map((person) => (
                <div key={person.name}>
                  <Person person={person} />
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
