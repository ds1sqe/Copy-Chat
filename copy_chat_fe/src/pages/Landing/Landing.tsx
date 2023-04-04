import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Wrapper from "../../components/share/Wrapper";

export default function Landing() {
  return (
    <Wrapper>
      <div className="landing-root">
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={12}
          sx={{ marginTop: 6, p: 3 }}
        >
          <Typography variant="h1" sx={{ py: 3 }}>
            Copy Chat
          </Typography>

          <Typography variant="h3" sx={{ py: 3 }}>
            Join us Now
          </Typography>

          <div className="landing-button-root">
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={1}
              sx={{ marginTop: 3, p: 1 }}
            >
              <Grid item>
                <div>
                  <Link to="login">
                    <Button type="button" variant="outlined">
                      <Typography variant="body1">Login</Typography>
                    </Button>
                  </Link>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <Link to="register">
                    <Button type="button" variant="outlined">
                      <Typography variant="body1">Register</Typography>
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Wrapper>
  );
}
