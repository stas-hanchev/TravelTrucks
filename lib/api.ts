import axios from "axios";

//https://campers-api.goit.study/docs#/
const API_URL =
  process.env.NEXT_PUBLIC_CAMPERS_API_URL ??
  "https://campers-api.goit.study";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});

// export const getNotes = async () => {
//   const res = await axios.get<NoteListResponse>("/notes");
//   return res.data;
// };

// React
// only GET requests
// const { data, error, isLoading, isError, isSuccess } = useQuery({
//   queryKey: ['myQueryKey'], 
//   queryFn: myQueryFunction  
// });

// Example
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchPerson = async () => {
//   const response = await axios.get(`https://swapi.info/api/people/1`);
//   return response.data;
// };

// export default function App() {
//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['person'],  
//     queryFn: fetchPerson,  
//   });
  
//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>An error occurred: {error.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }


