import { Button } from "@mui/material";
import { useLogged } from "./UserContext";
import {
  DiscordLoginButton,
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";

export default function LoginPage() {
  const logged = useLogged();
  return (
    <>
      {logged ? (
        "You're are already logged"
      ) : (
        <>
          <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`}>
            <GoogleLoginButton />
          </Button>
          <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/github`}>
            <GithubLoginButton />
          </Button>
          <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/discord`}>
            <DiscordLoginButton />
          </Button>
          <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/facebook`}>
            <FacebookLoginButton />
          </Button>
          <Button href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/instagram`}>
            <InstagramLoginButton />
          </Button>
        </>
      )}
    </>
  );
}
