
import api from "../api/axiosApi";

export async function loginUser({ username, password }) {
  const response = await api.post("/auth/login", {
      username,
      password,
      expiresInMins: 30,
    })
   return response.data;
}

// export async function getCurrentUser(token) {
//     const response = await fetch(`${BASE_URL}/auth/me`,{
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     if(!response.ok){
//         throw new Error("Failed to fetch current user")
//     };
//       return response.json();
// }

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}