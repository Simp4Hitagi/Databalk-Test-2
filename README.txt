GetAHouse Web Application
This repository contains the code for the GetAHouse web application. It is a React application that interacts with the GetAHouse API to display user and house data.

Installation
To run the application locally, follow these steps:

1.Clone the repository to your local machine.
2.Navigate to the project directory in the terminal.
3.Run the following command to install the dependencies:
	~npm install
4.Once the installation is complete, start the application with the following command:
	~npm start
5.The application will open in your default browser at http://localhost:3000.
Usage
The GetAHouse web application allows you to view and interact with user and house data from the GetAHouse API.

-Users
The user data is fetched from the API and displayed in a table.
Each row represents a user and shows their ID, name, email address, and hashed password.
You can delete a user by clicking the "Delete" button in the corresponding row.

-Houses
The house data is fetched from the API and displayed as cards.
Each card represents a house and shows its image, description, location, and price.
You can delete a house by clicking the "Delete" button on the card.

Create User
The "Create User" form allows you to create a new user by providing their name, email address, and password.

Update User
The "Update User" form allows you to update an existing user's information by providing their ID and new details.

Create House
The "Create House" form allows you to add a new house to the API by providing its description, location, price, and image URL.

Update House
The "Update House" form allows you to update an existing house's information by providing its ID and new details.

Dependencies
The following dependencies are required to run the GetAHouse web application:

React
axios

These dependencies are managed using npm (Node Package Manager) and will be installed automatically when you run npm install.


Hosted Link: https://databalk-test-2.vercel.app/