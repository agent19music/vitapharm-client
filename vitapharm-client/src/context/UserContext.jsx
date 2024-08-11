import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
    const [sessionToken, setSessionToken] = useState(null);


  const [onchange, setOnchange] = useState(false);
  useEffect(() => {
    const fetchSessionToken = async () => {
      try {
        let storedToken = localStorage.getItem('session_token');
        let tokenExpiration = localStorage.getItem('token_expiration');

        if (storedToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
          setSessionToken(storedToken);
        } else {
          const response = await fetch(`${apiEndpoint}/session`);
          const { session_token } = await response.json();
          const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
          localStorage.setItem('session_token', session_token);
          localStorage.setItem('token_expiration', expiration);
          setSessionToken(session_token);
        }
      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };

    fetchSessionToken(); // Fetch token on component mount

    const refreshInterval = setInterval(() => {
      fetchSessionToken();
    }, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(refreshInterval);
  }, []);
  const [currentUser, setCurrentUser] = useState(null);

    const apiEndpoint = 'https://www.vitapharmcosmetics.co.ke/api/vitapharm';
  // const apiEndpoint = 'http://vitapharm-server-env.eba-k5q68s3p.eu-north-1.elasticbeanstalk.com/api/vitapharm'


  // function login(username, password) {
  //   fetch(`${apiEndpoint}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.access_token) {
  //         sessionStorage.setItem('authToken', response.access_token);
  //         setAuthToken(response.access_token);
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Login successful.',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           setOnchange(!onchange);
  //           navigate('/');
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           text: 'Incorrect username or password',
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error logging in:', error);
  //     });
  // }

  // function logout() {
  //   sessionStorage.removeItem('authToken');
  //   setCurrentUser(null);
  //   setAuthToken(null);
  //   setOnchange(!onchange);
  //   navigate('/login');
  // }

  // useEffect(() => {
  //   if (authToken) {
  //     fetch(`${apiEndpoint}/authenticated_user`, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((response) => {
  //         if (response.email || response.username) {
  //           setCurrentUser(response);
  //         } else {
  //           setCurrentUser(null);
  //         }
  //       });
  //   }
  // }, [authToken, onchange]);

  // const updateUserContext = () => {
  //   fetch(`${apiEndpoint}/authenticated_user`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.email || response.username) {
  //         setCurrentUser(response);
  //       } else {
  //         setCurrentUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  // };

  const submitAppointment = async (data) => {
    try {
        const response = await fetch(`${apiEndpoint}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to add appointment');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

  const contextData = {
   
    setOnchange,
    apiEndpoint,
    submitAppointment,
    sessionToken
  };

  return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
}
