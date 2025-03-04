# Fetch Rewards Frontend Challenge

## Getting Started

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the page.

## Technologies Used

- React + Vite
- Vite
- Tailwind CSS + Shadcn/Radix component library
- TypeScript
- React Query
- React Router
- React Hook Form + Zod

## Features

- Authentication saving user data in session storage
- User can sort ascending or descending order by breed, name, and age
- User can select number of items to display per page
- User can filter by breed and age
- User can select favourite dogs
- Users can get a match from their favourite dogs

## Limitations

**Note: Issue with the API for "/locations/search"**

- The API documentation specifies the request body as `LocationSearchParams`, but the API actually expects an array of zip codes instead.
- Whenever I expect to pass a record in the request body it fails, it seems the API instead expects an array instead.
