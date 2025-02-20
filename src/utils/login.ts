import axios from "axios";
import { CredentialResponse } from "@react-oauth/google"

const url = process.env.NEXT_PUBLIC_API_BASE_URL;
export default login = (credentialResponse: CredentialResponse) => {
  console.log("being calldeddd")
  const googleAuthToken = credentialResponse.credential;
  axios.post(`${url}/api/auth/sign`, {
    token: googleAuthToken,
  });
};