import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivationPage = () => {
  const { uid, token } = useParams();
  const endpoint =  "http://localhost:8000/graphql/";
  
  const navigate = useNavigate()

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              activateUser(uid: "${uid}", token: "${token}") {
                message 
              }
            }
          `,
        });
        if (response.data && response.data.errors && response.data.errors[0].message === "Token Expired"){
          navigate("/register")
        }
      
        navigate("/login")
      } catch (error) {
        console.log('Activation failed:', error.message);
        // Handle activation failure, show error message, etc.
      }
    };

    activateUser();
  }, [uid, token]);
};

export default ActivationPage;
