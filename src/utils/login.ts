
import { CredentialResponse } from "@react-oauth/google"
import api from "@/services";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (credentialResponse: CredentialResponse) => {
  const googleAuthToken = credentialResponse.credential;
  const response = await api.post(`${url}/api/auth/signin`, {
    token: googleAuthToken,
    
  });
  localStorage.setItem("@Auth:accessToken", response.data.access_token);
  return response
};