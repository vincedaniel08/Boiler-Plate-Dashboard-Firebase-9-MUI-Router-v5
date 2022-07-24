import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import theme from "../utils/theme";
import Loading from "../components/Loading";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

//user
import ListUser from "../pages/users/List";
import CreateUser from "../pages/users/Create";
import EditUser from "../pages/users/Edit";
// patient
import ListPatient from "../pages/patients/List";
import CreatePatient from "../pages/patients/Create";
import EditPatient from "../pages/patients/Edit";
// appointment
import ListAppointment from "../pages/appointments/List";
import CreateAppointment from "../pages/appointments/Create";
import EditAppointment from "../pages/appointments/Edit";
// medicine
import ListMedicine from "../pages/medicines/List";
import CreateMedicine from "../pages/medicines/Create";
import EditMedicine from "../pages/medicines/Edit";
//product
import Allproduct from "../pages/products/Allproduct";
import Addproduct from "../pages/products/Addproduct";
import Editproduct from "../pages/products/Editproduct";
import AddMotor from "../pages/products/AddMotor";
//news and blogs
import AllNews from "../pages/newsBlogs/AllNews";
import AddNews from "../pages/newsBlogs/AddNews";
import EditNews from "../pages/newsBlogs/EditNews";

import Finance from "../pages/Finance";
import Order from "../pages/Order";
import Login from "../pages/Login";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/404";

//backend
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../utils/firebase";
import { getTheme, getLang } from "../redux/actions/uiAction";
import {
  where,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import {
  setMyData,
  setMotors,
  setUsers,
  setProducts,
  setNewsBlogs,
  setOrders,
  setFinance,
} from "../redux/actions/userAction";

export default function Index() {
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const THEME = createTheme(theme(ui.isDarkMode));
  // const location = useLocation();

  const [state, setstate] = useState({
    isAuth: false,
    isLoading: true,
  });

  //snackbar
  const [stateSnap, setStateSnap] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStateSnap({ ...stateSnap, open: false });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.uid);

      //   if (user && user.emailVerified) {
      //     const collectionRefMyData = collection(db, "Users");
      //     const MyData = query(
      //       collectionRefMyData,
      //       where("UserUid", "==", user.uid)
      //     );

      //     onSnapshot(MyData, (snapshot) => {
      //       if (
      //         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      //           .UserType === "Admin"
      //       ) {
      //         dispatch(
      //           setMyData(
      //             snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //           )
      //         );
      //       } else {
      //         setstate({ isAuth: false, isLoading: false });
      //         auth.signOut();
      //         // alert("Your Account is not Admin");
      //         console.log("Your Account is not Admin");
      //         setStateSnap({ open: true });
      //       }
      //     });
      //     //motors
      //     const collectionRefMotors = collection(db, "Motors");
      //     const qMotors = query(collectionRefMotors, orderBy("Created"));
      //     onSnapshot(qMotors, (snapshot) =>
      //       dispatch(
      //         setMotors(
      //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //         )
      //       )
      //     );

      //     //users
      //     const collectionRefUsers = collection(db, "Users");
      //     const qUsers = query(collectionRefUsers, orderBy("Created"));
      //     onSnapshot(qUsers, (snapshot) =>
      //       dispatch(
      //         setUsers(
      //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //         )
      //       )
      //     );

      //     //products
      //     const collectionRefProducts = collection(db, "Products");
      //     const qProducts = query(collectionRefProducts, orderBy("Created"));
      //     onSnapshot(qProducts, (snapshot) =>
      //       dispatch(
      //         setProducts(
      //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //         )
      //       )
      //     );

      //     //news and blogs
      //     const collectionRefNewsBlogs = collection(db, "NewsBlogs");
      //     const qNewsBlogs = query(collectionRefNewsBlogs, orderBy("Created"));
      //     onSnapshot(qNewsBlogs, (snapshot) =>
      //       dispatch(
      //         setNewsBlogs(
      //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //         )
      //       )
      //     );

      //     //Orders
      //     const collectionRefOrders = collection(db, "Orders");
      //     const qOrders = query(collectionRefOrders, orderBy("CreatedAt"));
      //     onSnapshot(qOrders, (snapshot) =>
      //       dispatch(
      //         setOrders(
      //           snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //         )
      //       )
      //     );

      //      //Finance
      //      const collectionRefFinance = collection(db, "Finance");
      //      const qFinance = query(collectionRefFinance, orderBy("Created"));
      //      onSnapshot(qFinance, (snapshot) =>
      //        dispatch(
      //          setFinance(
      //            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //          )
      //        )
      //      );

      //     setstate({ isAuth: true, isLoading: false });
      //   } else {
      //     setstate({ isAuth: false, isLoading: false });
      //   }

      setstate({ isAuth: false, isLoading: false });
    });

    dispatch(getLang(), getTheme());
  }, [dispatch]);

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={THEME}>
      <Snackbar
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={stateSnap.open}
        key={stateSnap.vertical + stateSnap.horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your account is not a Admin
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex" }}>
        {state.isAuth === false ? <Sidebar /> : null}

        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}

          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          {/* <PrivateRoute component={Home} isAuth={state.isAuth} path="/" exact /> */}

          {/* <PublicRoute
            restricted={true}
            component={Dashboard}
            isAuth={state.isAuth}
            path="/dashboard"
            exact
          /> */}
          <PublicRoute
            restricted={true}
            component={Login}
            isAuth={state.isAuth}
            path="/login"
            exact
          />

          <PublicRoute
            restricted={true}
            component={Dashboard}
            isAuth={state.isAuth}
            path="/dashboard"
            exact
          />

          <PublicRoute
            component={CreatePatient}
            isAuth={state.isAuth}
            path="/createpatient"
            exact
          />

          <PublicRoute
            component={ListPatient}
            isAuth={state.isAuth}
            path="/listpatient"
            exact
          />

          <PublicRoute
            component={EditPatient}
            isAuth={state.isAuth}
            path="/editpatient"
            exact
          />

          <PublicRoute
            component={ListUser}
            isAuth={state.isAuth}
            path="/listuser"
            exact
          />

          <PublicRoute
            component={CreateUser}
            isAuth={state.isAuth}
            path="/createuser"
            exact
          />

          <PublicRoute
            component={EditUser}
            isAuth={state.isAuth}
            path="/edituser"
            exact
          />

          <PublicRoute
            component={ListAppointment}
            isAuth={state.isAuth}
            path="/listappointment"
            exact
          />
          <PublicRoute
            component={CreateAppointment}
            isAuth={state.isAuth}
            path="/createappointment"
            exact
          />
          <PublicRoute
            component={EditAppointment}
            isAuth={state.isAuth}
            path="/editappointment"
            exact
          />

          <PublicRoute
            component={ListMedicine}
            isAuth={state.isAuth}
            path="/listmedicine"
            exact
          />
          <PublicRoute
            component={CreateMedicine}
            isAuth={state.isAuth}
            path="/createmedicine"
            exact
          />
          <PublicRoute
            component={EditMedicine}
            isAuth={state.isAuth}
            path="/editmedicine"
            exact
          />

          <PrivateRoute
            component={Order}
            isAuth={state.isAuth}
            path="/order"
            exact
          />

          <PrivateRoute
            component={Finance}
            isAuth={state.isAuth}
            path="/finance"
            exact
          />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}
