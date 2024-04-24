document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('news-form');

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission action
      const input = document.getElementById('text').value
   
      const resultDiv = document.getElementById('prediction');

      try {
          const response = await fetch('https://lstmmodel-3d4b7db20769.herokuapp.com/predict', { 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: input }),
          });

          if (response.ok) {
              const data = await response.json();
              const prediction = data.prediction;
              if (prediction === 'Hate Speech') {
                  resultDiv.innerText = 'Hate Speech Detected';
                  resultDiv.className = 'result-hatespeech';
              } else {
                  resultDiv.innerText = 'No Hate Speech Detected';
                  resultDiv.className = 'result-nothatespeech';
              }
          } else {
              resultDiv.innerText = 'Error in prediction';
              console.error('Server responded with non-OK status:', response.status);
          }
      } catch (error) {
          resultDiv.innerText = 'Failed to predict';
          console.error('Request failed:', error);
      }
  });
});


// // Wait for the DOM to be fully loaded before attaching event handlers
// document.addEventListener('DOMContentLoaded', function () {
//   // Get the form element by its ID
//   const form = document.getElementById('news-form');

//   // Add a submit event listener to the form
//   form.addEventListener('submit', async (event) => {
//       // Prevent the default form submission behavior
//       event.preventDefault();

//       // Get the value of the textarea by its ID
//       const input = document.getElementById('news-text').value;

//       // Perform an AJAX POST request to the server's predict endpoint
//       try {
//           const response = await fetch('/predict', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({text: input}),
//           });

//           // Check if the response was successful
//           if (response.ok) {
//               const data = await response.json(); // Parse the JSON response
//               const prediction = data.prediction; // Extract the prediction result
//               const resultDiv = document.getElementById('prediction'); // Get the element to display prediction

//               // Update the text content based on the prediction
//               if (prediction === 'Hate Speech') {
//                   resultDiv.innerText = 'Hate Speech Detected';
//                   resultDiv.className = 'result-hatespeech';
//               } else {
//                   resultDiv.innerText = 'No Hate Speech Detected';
//                   resultDiv.className = 'result-nothatespeech';
//               }
//           } else {
//               console.error('Request failed:(', response.status); // Log any request failures
//           }
//       } catch (error) {
//           console.error('Request failed:(', error); // Log any errors during the request
//       }
//   });
// });




