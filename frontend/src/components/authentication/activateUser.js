import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ActivationPage = () => {
  const { uid, token } = useParams();

  const csrfToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('csrftoken='))
  .split('=')[1];
  
  console.log(csrfToken)
  useEffect(() => {
    const activateUser = async () => {
        const headers = {
            'X-CSRFToken': csrfToken,
            
          };

      try {
        const response = await axios.post('http://localhost:8000/users/activation', {
          uid,
          token,
        },{
            headers,
          });

        
        console.log('User activated successfully:', response.data);
        // Add any additional logic or redirection after successful activation
      } catch (error) {
        console.log('Activation failed:', error.message);
        // Handle activation failure, show error message, etc.
      }
    };

    activateUser();
  }, [uid, token]);
};

export default ActivationPage;
