import { Button, IconButton, TextField, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Form,
  Link as RouterLink,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from "@mui/material/CircularProgress";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();

const AuthForm: React.FC = (props) => {
  const data: any = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  async function handleGoogleLogin(event: React.FormEvent) {
    event.preventDefault();
    const result = await signInWithPopup(auth, providerGoogle);

    const token = await result.user.getIdToken();
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const tokenData = await result.user.getIdTokenResult();
    localStorage.setItem("token", token);
    localStorage.setItem("credential", JSON.stringify(credential));
    localStorage.setItem("expiration", tokenData.expirationTime);

    if (token) {
      window.location.replace("/");
    }
  }

  const [searchparams] = useSearchParams();
  const isLogin = searchparams.get("mode") === "login";

  return (
    <Form method="post">
      <Grid
        container
        sx={{ textAlign: "center", height: "70vh", alignItems: "center" }}
      >
        <Grid
          sx={{ textAlign: "center", gap: 1 }}
          xs={12}
          container
          spacing={2}
        >
          <Grid xs={12}>
            <Typography variant="h4" sx={{ color: "red" }}>
              {data || null}
            </Typography>
            <Typography variant="h3">
              {isLogin ? "Log in" : "Create a new user"}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <TextField
              required
              type="email"
              id="email"
              label="Email"
              sx={{ width: "30vw" }}
              name="email"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              sx={{ width: "30vw" }}
            />
          </Grid>
          <Grid xs={12}>
            <Button variant="contained" sx={{ width: "20vw" }} type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Grid>
          <Grid xs={12}>
            <Button
              component={RouterLink}
              to={`?mode=${isLogin ? "signup" : "login"}`}
            >
              {isSubmitting ? (
                <CircularProgress />
              ) : isLogin ? (
                "Create new user"
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
          <Grid xs={12}>
            <Button startIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
              {isLogin ? "Create new user" : "Login"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
};

export default AuthForm;
