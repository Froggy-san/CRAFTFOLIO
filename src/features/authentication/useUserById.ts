// import { getUserById } from "@/services/authApi";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";

// export default function useUserById(id?: string) {
//   const { userId } = useParams();
//   const user = id || userId || "";

//   const {} = useQuery({
//     queryFn: () => getUserById(user),
//     queryKey: ["userById", user],
//     enabled: !!user,
//   });
// }
