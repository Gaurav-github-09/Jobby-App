### In this project, i've built a **Jobby App** 


Skills used- **HTML, CSS, React.JS**

Live Link - **https://jobbyAppVGK.ccbp.tech**



### Refer to videos below:

<div style="text-align: center;">
  <video style="max-width:80%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-success-output-v0.mp4" type="video/mp4">
  </video>
</div>
<br/>

**Failure View** <br/>

<div style="text-align: center;">
  <video style="max-width:80%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-failure-output-v1.mp4" type="video/mp4">
  </video>
</div>
<br/>


**Login Details**



```json
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

### Completion Instructions

This app will have these following functionalities

- **Login Route**

  - When invalid credentials are provided and the **Login** button is clicked, then the error message received from the response will be displayed
  - When valid credentials are provided and the **Login** button is clicked, then the page will be navigated to the Home Route
  - When an _unauthenticated_ user, tries to access the Home, Jobs and Job Item Details Route, then the page will be navigated to Login Route
  - When an _authenticated_ user, tries to access the Home, Jobs and Job Item Details Route, then the page will be navigated to the respective route
  - When an _authenticated_ user, tries to access the Login Route, then the page will be navigated to the Home Route
---------------------------
- **Header**

  - When the **website logo** image is clicked, then the page will be navigated to the Home Route
  - When the **Home** link is clicked, then the page will be navigated to the Home Route
  - When the **Jobs** link is clicked, then the page will be navigated to the Jobs Route
  - When the **Logout** button is clicked, then the page will be navigated to the Login Route

----------------------------
- **Home Route**

  - When an _authenticated_ user opens the Home Route
    - Clicks on the **Find Jobs** button, then the page will be navigated to the Jobs Route
-------------------------------
- **Jobs Route**

  - When an _authenticated_ user opens the Jobs Route
    - An HTTP GET request will be made to **Profile API URL**
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, the response received will be displayed
      - If the HTTP GET request made is unsuccessful, then the [Failure View](https://assets.ccbp.in/frontend/content/react-js/jobby-app-profile-failure-lg-output.png) will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to **Profile API URL**
    - An HTTP GET request will be made to **Jobs API URL** with `employment_type`, `minimum_package`, and `search` as query parameters with empty strings as initial values
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, it will display the list of jobs received from the response
      - If the HTTP GET request made is unsuccessful, then the [Failure View](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output.png) will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to **Jobs API URL**
    - When a value is provided in the search input and search icon button is clicked
      - It makes an HTTP GET request to the **Jobs API URL** with `jwt_token` in the Cookies and query parameter `search` with value as the text provided in the search input
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, it will display the list of jobs received from the response
    - When **Employment Types** options are selected
      - It makes an HTTP GET request to the **Jobs API URL** with `jwt_token` in the Cookies and query parameter `employment_type` with value as a list of selected employment type id's as a single string separated by `,`
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, it will display the list of jobs received from the response
    - When **Salary Range** is selected
      - It makes an HTTP GET request to the **Jobs API URL** with `jwt_token` in the Cookies and query parameter `minimum_package` with value as the id of the selected salary range
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, it will display the list of jobs received from the response
    - When the HTTP GET request made to the **Jobs API URL** returns an empty list for jobs then [No Jobs View](https://assets.ccbp.in/frontend/content/react-js/jobby-app-no-jobs-lg-output.png) will be displayed

  - When multiple filters are applied, then the HTTP GET request will be made with all the filters that are applied

  - When a **job** is clicked, then the page will be navigated to the Job Item Details Route
-------------------------------------

- **Job Item Details Route**

  - When an _authenticated_ user opens the Job Item Details Route
    - An HTTP GET request will be made to **Job Details API URL** with `jwt_token` in the Cookies and job `id` as path parameter
      - **_loader_** will be displayed while fetching the data
      - After the data is fetched successfully, the response received will be displayed
      - The list of similar jobs will be displayed
      - If a job in the similar jobs list is clicked it will redirect to the particular similar job details route.
      - If the HTTP GET request made is unsuccessful, then the [Failure View](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png) will be displayed
        - When the **Retry** button is clicked, an HTTP GET request will be made to **Job Details API URL**
  - When the **Visit** button is clicked, then the corresponding company website URL will be opened in a new tab

-----------------------------
- **Not Found Route**

  - When a random path is provided as the URL path, then the page will be navigated to the Not Found Route


-------------------------------------
# Jobby-App
