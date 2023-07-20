# LL-NFT Viewer!

LL-NFT Viewer is written using next.js 13 and tailwindcss. It is organised in a modular and intuitive way to promote ease of use and maintainability. Below, you'll find a brief overview of our project's structure and its different parts.

## Structure

Our application's codebase is organized as follows:

- **src/app**: This directory contains the definition for our routes along with a `page.tsx` file for each route. These files handle server-side rendering and Next.js specific functions for dynamic or static page metadata. They also render client-side generated content found in `src/ui/pages`.
    
-   **src/ui**: This directory includes the client-side rendering logic.
    
-   **src/ui/components**: This directory hosts reusable components such as buttons, input fields, etc. These components are built with reusability and flexibility in mind to ensure they can be utilized across different parts of the application.

-   **src/ui/modules**: This directory contains reusable modules, which are smart components that fetch data from an API and are composed of multiple components.
    
-   **src/ui/pages**: This directory defines how our pages are laid out. These pages usually contain one or more modules and components. They are responsible for presenting UI to the users and facilitate interactions.
-  **src/interfaces**: This directory holds the TypeScript interfaces used throughout the application. Interfaces help ensure the consistency of data across different parts of our application.
    
-   **src/lib/api**: This directory contains our API logic. Each entity has its own file, which extends a `BaseAPI` class. The API structure of this application uses `axios` to handle HTTP requests. The `BaseAPI` class contains general API functions like `get`, `post`, `put`, and a helper function to build query parameters for GET requests. Specific APIs for different entities extend the `BaseAPI` class and provide entity-specific API calls.
