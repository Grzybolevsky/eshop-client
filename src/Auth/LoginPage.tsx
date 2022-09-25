import { Button } from "@mui/material";
import { Facebook, GitHub, Google, Instagram } from "@mui/icons-material";

export default function LoginPage() {
  return (
    <>
      <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`}>
        <Google />
        Login with Google
      </Button>
      <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/github`}>
        <GitHub />
        Login with GitHub
      </Button>
      <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/discord`}>
        Login with Discord
      </Button>
      <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/facebook`}>
        <Facebook />
        Login with Facebook
      </Button>
      <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/instagram`}>
        <Instagram />
        Login with Instagram
      </Button>
    </>
  );
}
