# Image Search Backend

This project is a backend application for searching images using Unsplash API, TypeScript and Express. It provides an API that allows users to search for images based on specific queries.

## Project Structure

```
imgSearch
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers             # Contains the controllers for handling requests
│   │   └── imageController.ts  # Controller for image search functionality
│   ├── routes                  # Defines the API routes
│   │   └── imageRoutes.ts      # Routes for image searching
│   ├── services                # Contains business logic and API interactions
│   │   └── imageService.ts     # Service for fetching images
│   ├── tests                   # Contains tests
│   │   └── imageController.test.ts     # Test for the controller
│   ├── utils                   # Utility functions
│   │   └── index.ts            # Common utility functions
│   └── types                   # Type definitions
│       └── index.ts            # Interfaces for image data and search parameters
├── jest.config.js               # Jest configuration
├── package.json                # NPM package configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/imgSearch.git
   cd ImgSearch
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

## Usage

Once the application is running, you can use the following endpoint to search for images:

```
GET /api/images/search?query={searchTerm}
```

Replace `{searchTerm}` with your desired search term. The API will return a list of images matching the search criteria.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License.
