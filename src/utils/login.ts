
import { CredentialResponse } from "@react-oauth/google"
import api from "@/services";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentialResponse: CredentialResponse, role: "renter" | "host") => {
  try {
    const googleAuthToken = credentialResponse.credential;
  const response = await api.post(`${url}/api/auth/signin`, {
    token: googleAuthToken,
    role
  });
  localStorage.setItem("@Auth:accessToken", response.data.access_token);
  return response
  } catch (error) {
    console.log(error)
  }
};