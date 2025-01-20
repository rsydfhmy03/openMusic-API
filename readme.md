# Open Music API Version 1.0.0

This README provides an overview, setup instructions, and key details for the **Open Music API** project built using the Hapi Framework.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)

## Introduction

The **Open Music API** is a RESTful API designed for managing and accessing music data, including albums and songs. It is built using the **Hapi Framework** with clean architecture principles, emphasizing modularity and scalability.

---

## Features
- **Album Management**: Create, update, delete, and retrieve album data.
- **Song Management**: Manage songs with similar CRUD functionalities.
- **Validation**: Includes robust payload validation using Joi.
- **Modular Architecture**: Cleanly separated services, plugins, and configurations.
- **Error Handling**: Custom error handling with detailed messages.
- **Environment Variables**: Supports flexible configuration via `.env`.

---

## Prerequisites
To run this project locally, ensure you have the following installed:
- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **PostgreSQL**: For database support
- **dotenv**: For environment variable management

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rsydfhmy03/openMusic-API.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   HOST=localhost
   PORT=5000
   ```

4. **Set up the database**:
   - Create a PostgreSQL database.
   - Migrate the schema using the provided scripts (if available).

5. **Run the server**:
   ```bash
   npm start
   ```

---

## Usage

1. **Start the server**:
   Run the application locally with:
   ```bash
   npm start
   ```

2. **API Endpoints**:

   - **Albums**:
     - `POST /albums`: Add a new album.
     - `GET /albums`: Retrieve all albums.
     - `GET /albums/{id}`: Retrieve details of a specific album by its ID, including all songs in that album.
     - `PUT /albums/{id}`: Update album details.
     - `DELETE /albums/{id}`: Delete an album.

   - **Songs**:
     - `POST /songs`: Retrieve a list of all songs. You can filter the results using query parameters `title` and `performer`
     - `GET /songs`: Retrieve all songs.
     - `GET /songs/{id}`: Retrieve a specific song by ID.
     - `PUT /songs/{id}`: Update song details.
     - `DELETE /songs/{id}`: Delete a song.

3. **Validation Errors**:
   If a request payload fails validation, the server will respond with:
   ```json
   {
     "status": "fail",
     "message": "Validation error message here."
   }
   ```

---

## Author

**Fahmy Rosyadi** ([@mitahudev03](https://www.linkedin.com/in/mitahudev03/))  
