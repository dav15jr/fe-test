The Project is built using React, TailWind, React-router(for url params), Axios(for easy data fetching)

To run the project :
- Start Backend server by running > 'python -m uvicorn main:app --reload' (I had to create a virtual environment and create a windows specific requirements text file, as I had issues running the server locally)
- Start the Frontend UI by running - 'npm run dev'


+ I have also edited the dates for the contribution to help with showing different contributions Status.filter
+ I changed the max limit of contributions set in the backend from 30 to 50 (was confused when I was only fetching 30 and not 50 contributions)
+ I have added a delay to when fetching the data to showcase loading screen.
+ It Features a select options for the Search type and number of items page, and persistant search and pagination within the URL.