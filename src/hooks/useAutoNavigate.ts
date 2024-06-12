// import { useEffect } from "react";
// import { useAuth } from "./useAuth";
// import { useNavigate } from "react-router-dom";

// // A hook to prevent the use from going to the login or the signup pages after logging in.
// function useAutoNavigate() {
//   const { user } = useAuth();

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user) navigate("/");
//   }, []);
// }

// export default useAutoNavigate;
