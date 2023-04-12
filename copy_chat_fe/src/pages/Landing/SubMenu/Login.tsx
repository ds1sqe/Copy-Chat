import { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../types/store";
import { loginUser } from "../../../store/be_call/auth";
import { auth_actions as auth } from "../../../store/auth";
import Wrapper from "../../../components/share/Wrapper";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";

export default function Login() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logined = useSelector((s: Store.AppState) => s.auth.logined);
  const isCreated = useSelector((s: Store.AppState) => s.auth.hasCreated);
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    loginUser(payload, dispatch);
  };

  useEffect(() => {
    dispatch(auth.resetCreated());
  }, [dispatch, isCreated]);

  if (logined) {
    return (
      <Wrapper>
        <Navigate to={`/@me/`} />;
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={12}
            sx={{ marginTop: 6 }}
          >
            <Typography variant="h3" sx={{ py: 3 }}>
              Please login
            </Typography>

            <form onSubmit={handleLogin}>
              <FormControl sx={{ marginBottom: 6, padding: 2 }}>
                <TextField
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  label="Account id"
                  required
                  variant="outlined"
                  placeholder="Username"
                  sx={{ p: 2 }}
                />
                <TextField
                  id="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                  }}
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  required
                  variant="outlined"
                  placeholder="Password"
                  sx={{ p: 2 }}
                />
                <Button type="submit" variant="outlined" sx={{ py: 1, px: 0 }}>
                  Login
                </Button>
              </FormControl>
            </form>

            <Typography variant="inherit">
              Did you forgot password? <br />
              <Link to="/forgot-password/">
                <Button variant="text">Reset my password</Button>
              </Link>
            </Typography>

            <Typography variant="inherit">
              Are you first time here? <br />
              <Link to="/register/">
                <Button variant="text">Create an account</Button>
              </Link>
            </Typography>
          </Grid>
        </div>
      </Wrapper>
    );
  }
}
