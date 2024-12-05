
# CommunicationSolutions

![protoLogo](https://github.com/JustJoseM/CommunicationSolutions/assets/115119329/15707eed-64c0-4dfa-934a-109fac31b94b)

# Deployed App

https://communnications-solutions.web.app

# Introduction 
Our application is a website called "Communication Solutions" that serves as a platform for business owners to explore the services offered by the company, including coaching and business consultations. It presents an easy and efficient way for customers to quickly come in contact with the company, learn about its history, and schedule an appointment to get started with them. Additionally, the platform streamlines scheduling, consultation tracking, and cliental management helping the company operate.

The website was created to support the company's mission of helping other businesses grow and expand their success through guidance and resources. Recognizing that the website is the first step in the door for customers, the goal was to create a user-friendly platform that potential clients can follow while also showcasing the company's values and efforts. 

# Key Features
+ Key Feature #1
   - Login portal: The user can securely access and manage their account. Includes a sign-up feature and an option to reset the password if it has been forgotten.
   - Upon signing in, the user will be sent an email containing a code that they will enter to confirm their identity (two-factor authentication).
 
+ Key Feature #2
   - Scheduling an Appointment: Those interested in a consultation can reach out to our client and schedule a phone or Zoom appointment.
   - A customer will be presented with a form where they can fill out the time, date, and any notes they want to share.
   - Once an appointment is scheduled, it will appear on the admin side where they can view a list of upcoming meetings. In addition, they can cancel or reschedule any of the upcoming meetings.
   - Once logged in, a customer can reschedule or cancel an appointment.
 
+ Key Feature #3
   - Testimonial Page: Read about other businesses our client has worked with, and how their business has succeeded thanks to his assistance.
 
+ Key Feature #4
   - Admin portal: The site admin, in this case, our client, can access the Admin portal to cancel or edit appointments as necessary.
   - The Admin portal allows the admin to keep pertinent notes about clients, see all upcoming meetings, and keep track of information such as revenue, client submitted ratings, and number of appointments per month/quarter/year.
 
+ Key Feature #5
   - User-Friendly UI: Whoever is accessing the site can easily navigate to whatever page they need, and gather the required information

# Tech Stack
### Frontend
Programming Languages: HTML, CSS, Javascript 
   * Interactive Development Environment (IDE):
       - Visual Studio Code
   * Front-end Framework:
       - ReactJS Framework

### Backend
Programming Languages: JSON
   * Database:
       - Firebase 
   * Web Framework:
       - Firebase Deployment
   * Authentication:
       - Firebase Authentication
     
### Version Control
   * Github

# Prototype 
https://github.com/JustJoseM/CommunicationSolutions/assets/59710423/bcdb6e9d-f12d-48af-9182-483922540687

Mockup:
![image](https://github.com/JustJoseM/CommunicationSolutions/assets/93031586/ea2c6e3d-92a9-4d82-ba0d-6d5e9b5e1cb7)

ER Diagram:
![CSC 190 (3)](https://github.com/JustJoseM/CommunicationSolutions/assets/93031586/239667fc-b1fa-48bc-a886-930d07e6391e)


# Testing
All tests are stored inside of the directory:
```
src/__tests__
``` 

In order to run tests on the application, the user needs to install the relevant dependencies, then open the terminal for the repository in VScode or any other code editor. Once this step is done, the user can type "npm test" in the console and then enter a command according to the instructions to begin. If the user wants to try testing with a specific test, they can type "npm test (test name of your choice from below)" in the console. For example, to run only the AboutUs test, the user would type:
```
npm run test AboutUs.test
```

Description of Tests:
   * AboutUs.test - Checks to see if the About Us page renders all components successfully.
   * AdminAppoint.test - Mocks appointment data in Firebase and then checks to see if the admin appointments page returns the mock data successfully. Also checks to see if functions to rechedule and cancel appointments can run successfully.
   * AdminHome.test - Checks to see if the Admin Home page renders all components successfully.
   * Contact.test - Checks integrity of links and components within the contact page.
   * Home.test - Mocks the Firebase imports and then checks home page buttons to see if they function and redirect to the intended page.
   * NoteList.test - Mocks note component and note data to check to see if the admin note page successfully displays notes. Also checks the 'delete' and 'add' note functions for functionality.
   * ProtectedRoute.test - Creates a mock unauthorized user and authorized user and then tests to see if the appropriate action is returned by the website when data is accessed. Unauthorized users should be redirected to the sign-in page when trying to access data restricted from them (Admin pages).
   * SignIn.test - Mocks Firebase functions and then tests the signup functionality to see if users can successfully create an account. It then tests whether invalid data gives the correct error message. Additionally, it checks the integrity of the 'create account' and 'forgot account' buttons. 
   * Testimonial.test - Mocks valid and invalid testimonial data and checks to see if the mock data is successfully shown on the testimonial page. Checks carousel functionality when clicking buttons indicating back or forward. Also checks to see if user arrow key input can affect the carousel as intended.
     
# Deployment
Demo Video (User Side)
https://github.com/user-attachments/assets/b5e3179b-bfac-44d8-92da-ecd0ea86ec8a


# Developer Instructions
### Prerequisites:

   **Programming Languages:** JavaScript
   
   **Frameworks:** ReactJS
   
   **Databases:** Firestore
   
   **APIs:**
   
### Project Setup:

   **Clone Repository:**
   
      git clone 
      
      cd project-repo
      
   **Install Dependencies:**
   
      npm install
### Running the Project:

   ```
   npm start
   ```
   
**Access the App:**

   ```
   http://localhost:3000
   ```
   
### Testing:

   ```
   npm test
   ```
   
### Deployment Instructions:

   ```
   npm run build
   
   firebase deploy
   ```


# Contact
+ Savannah Birdsong-See (Development Team)
   - Contact: sbirdsong-see@csus.edu
+ Arshmit Singh Bains (Development Team)
   - Contact: abains2@csus.edu
+ Arjhay Quismorio (Development Team)
   - Contact: arjhayquismorio@csus.edu
+ Daniel Chu (Development Team)
   - Contact: dchu@csus.edu
+ Yaksh Patel (Development Team)
   - Contact: yakshpatel@csus.edu
+ Jose Martinez (Development Team)
   - Contact: jjmartinez@csus.edu
+ Seungjin Chae (Development Team)
   - Contact: seungjinchae@csus.edu
  
