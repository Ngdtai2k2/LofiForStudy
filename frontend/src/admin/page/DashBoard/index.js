import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

import NavigationBar from "../../components/NavigationBar";
import BoxTop from "../../components/BoxTop";

import { BASE_API_ADMIN_URL } from "../../../constants/constant";
import { createAxios } from "../../../createInstance";

import "./styles.css";

export default function DashBoard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingGetTotal, setLoadingGetTotal] = useState(true);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = createAxios(user, dispatch);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    const countUsers = async () => {
      try {
        const response = await axiosJWT.get(
          `${BASE_API_ADMIN_URL}/users/count`,
          {
            headers: { token: `Bearer ${accessToken}` },
          }
        );
        setTotalUsers(response.data.total);
      } catch (error) {
        setTotalUsers("NaN");
      } finally {
        setLoadingGetTotal(false);
      }
    };
    countUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavigationBar />
      <BoxTop>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3}>
            <Paper elevation={3} className="paper-style">
              <AccountBoxRoundedIcon sx={{ fontSize: 45 }} />
              <Typography variant="caption" fontWeight={600}>
                Total Users
              </Typography>
                {loadingGetTotal ? (
                  <CircularProgress size={16} />
                ) : (
                  <Box display="flex">
                    <Typography variant="h6" fontWeight={700}>
                      {totalUsers}
                    </Typography>
                  </Box>
                )}
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={3} className="paper-style">
              <Typography variant="body1" fontWeight={800}>
                Total Users
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                100
              </Typography>
            </Paper>
          </Grid>
          {/* handle soon */}
          <Grid item xs={6} md={3}>
            <Paper elevation={3} className="paper-style">
              <Typography variant="body1" fontWeight={800}>
                Total Users
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                100
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper elevation={3} className="paper-style">
              <Typography variant="body1" fontWeight={800}>
                Total Users
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                100
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </BoxTop>
    </>
  );
}
