import React, { useState, useEffect } from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  IconButton,
  ListItemButton,
  Collapse,
  Avatar,
  BottomNavigation,
  Paper,
  Tooltip,
} from "@mui/material";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SellIcon from "@mui/icons-material/Sell";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
// import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { alpha, styled } from "@mui/material/styles";
import style from "../styles/sellerHeader";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
//backend
import { useSelector } from "react-redux";

import { withRouter, useLocation } from "react-router-dom";

import logo from "../assets/images/logo.png";
import { auth } from "../utils/firebase";

const drawerWidth = 280;
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const shapeStyles = {
  width: 5,
  height: 5,
  bgcolor: "gray",
  borderRadius: "50%",
};
const shapeStylesSelected = {
  width: 7,
  height: 7,
  bgcolor: "primary.main",
  borderRadius: "50%",
};

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "#EDEFF2",
}));

const Sidebar = (props) => {
  const userData = useSelector((state) => state.user);

  const { history } = props;
  const location = useLocation();

  //button
  const buttonLogout = () => {
    auth.signOut();
  };

  const [selectedIndex, setSelectedIndex] = useState(
    location.pathname === "/dashboard"
      ? 1
      : location.pathname === "/listuser"
      ? 2
      : location.pathname === "/createuser"
      ? 2
      : location.pathname === "/edituser"
      ? 2
      : location.pathname === "/listpatient"
      ? 3
      : location.pathname === "/createpatient"
      ? 3
      : location.pathname === "/editpatient"
      ? 4
      : location.pathname === "/listappointment"
      ? 4
      : location.pathname === "/createappointment"
      ? 4
      : location.pathname === "/editappointment"
      ? 4
      : location.pathname === "/listmedicine"
      ? 5
      : location.pathname === "/createmedicine"
      ? 5
      : location.pathname === "/editmedicine"
      ? 5
      : location.pathname === "/allnewsblogs"
      ? 6
      : location.pathname === "/addnewsblogs"
      ? 6
      : location.pathname === "/editnewsblogs"
      ? 6
      : location.pathname === "/account"
      ? 7
      : location.pathname === "/settings"
      ? 8
      : 0
  );
  const [subSelectedIndex, setSubSelectedIndex] = useState(
    location.pathname === "/listpatient"
      ? 1
      : location.pathname === "/createpatient"
      ? 2
      : location.pathname === "/editpatient"
      ? 3
      : 0
  );
  const [subSelectedIndexUser, setSubSelectedIndexUser] = useState(
    location.pathname === "/listuser"
      ? 1
      : location.pathname === "/createuser"
      ? 2
      : location.pathname === "/edituser"
      ? 3
      : 0
  );
  const [subSelectedIndexAppointment, setSubSelectedIndexAppointment] =
    useState(
      location.pathname === "/listappointment"
        ? 1
        : location.pathname === "/createappointment"
        ? 2
        : location.pathname === "/editappointment"
        ? 3
        : 0
    );
  const [subSelectedIndexMedicine, setSubSelectedIndexMedicine] = useState(
    location.pathname === "/listmedicine"
      ? 1
      : location.pathname === "/createmedicine"
      ? 2
      : location.pathname === "/editmedicine"
      ? 3
      : 0
  );

  const [subSelectedIndexNewsBlogs, setSubSelectedIndexNewsBlogs] = useState(
    location.pathname === "/allnewsblogs"
      ? 1
      : location.pathname === "/addnewsblogs"
      ? 2
      : location.pathname === "/editnewsblogs"
      ? 3
      : 0
  );

  const [area, setArea] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(area);
  // console.clear();

  //NestedList
  const [open1, setOpen1] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openMedicine, setOpenMedicine] = React.useState(false);
  const [openNewsBlogs, setOpenNewsBlogs] = React.useState(false);
  const [openAppointment, setOpenAppointment] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // dashboard
  const handleListItemClick = (event, index, area) => {
    history.push("/dashboard");
    setSubSelectedIndex(0);
    setSubSelectedIndexUser(0);
    setOpenUser(false);
    setOpen1(false);
    setOpenNewsBlogs(false);
    setSelectedIndex(index);
    setArea(area);
  };

  // start user
  const handleListItemClickUser = (event, index, area) => {
    if (location.pathname === "/listuser") {
      setSubSelectedIndexUser(1);
    } else if (location.pathname === "/createuser") {
      setSubSelectedIndexUser(2);
    } else if (location.pathname === "/edituser") {
      setSubSelectedIndexUser(3);
    } else {
      setSubSelectedIndexUser(0);
    }
    setSelectedIndex(index);
    setOpenUser(!openUser);
    setOpen1(false);
    setOpenNewsBlogs(false);
    setOpenAppointment(false);
    setOpenMedicine(false);
  };

  const handleListItemClickUserList = (event, index, area) => {
    history.push("/listuser");
    setSubSelectedIndexUser(index);
    setArea(area);
  };

  const handleListItemClickUserCreate = (event, index, area) => {
    history.push("/createuser");
    setSubSelectedIndexUser(index);
    setArea(area);
  };

  const handleListItemClickUserEdit = (event, index, area) => {
    history.push("/edituser");
    setSubSelectedIndexUser(index);
    setArea(area);
  };

  // patient

  const handleListItemClickPatient = (event, index, area) => {
    if (location.pathname === "/listpatient") {
      setSubSelectedIndex(1);
    } else if (location.pathname === "/createpatient") {
      setSubSelectedIndex(2);
    } else if (location.pathname === "/editpatient") {
      setSubSelectedIndex(3);
    } else {
      setSubSelectedIndex(0);
    }

    setSelectedIndex(index);
    setOpen1(!open1);
    setOpenUser(false);
    setOpenNewsBlogs(false);
    setOpenAppointment(false);
    setOpenMedicine(false);
  };
  const handleListItemClick1 = (event, index, area) => {
    history.push(area);
    setOpen1(false);
    setSelectedIndex(index);
    setOpenUser(false);
    setArea(area);
    setOpenAppointment(false);
    setOpenMedicine(false);
    setOpenNewsBlogs(false);
  };

  const handleListItemClickPatientList = (event, index, area) => {
    history.push("/listpatient");
    setSubSelectedIndex(index);
    setArea(area);
  };

  const handleListItemClickPatientCreate = (event, index, area) => {
    history.push("/createpatient");
    setSubSelectedIndex(index);
    setArea(area);
  };

  const handleListItemClickPatientEdit = (event, index, area) => {
    history.push("/editpatient");
    setSubSelectedIndex(index);
    setArea(area);
  };
 

  // appointment
  const handleListItemClickAppointment = (event, index, area) => {
    if (location.pathname === "/listappointment") {
      setSubSelectedIndexAppointment(1);
    } else if (location.pathname === "/createappointment") {
      setSubSelectedIndexAppointment(2);
    } else if (location.pathname === "/editappointment") {
      setSubSelectedIndexAppointment(3);
    } else {
      setSubSelectedIndexAppointment(0);
    }

    setSelectedIndex(index);
    setOpenAppointment(!openAppointment);
    setOpenUser(false);
    setOpen1(false);
    setOpenNewsBlogs(false);
    setOpenMedicine(false);
  };

  const handleListItemClickAppointmentList = (event, index, area) => {
    history.push("/listappointment");
    setSubSelectedIndexAppointment(index);
    setArea(area);
  };

  const handleListItemClickAppointmentCreate = (event, index, area) => {
    history.push("/createappointment");
    setSubSelectedIndexAppointment(index);
    setArea(area);
  };

  const handleListItemClickAppointmentEdit = (event, index, area) => {
    history.push("/editappointment");
    setSubSelectedIndexAppointment(index);
    setArea(area);
  };

  // medicine
  const handleListItemClickMedicine = (event, index, area) => {
    if (location.pathname === "/allnewsblogs") {
      setSubSelectedIndexMedicine(1);
    } else if (location.pathname === "/addnewsblogs") {
      setSubSelectedIndexMedicine(2);
    } else if (location.pathname === "/editnewsblogs") {
      setSubSelectedIndexMedicine(3);
    } else {
      setSubSelectedIndexMedicine(0);
    }

    setSelectedIndex(index);
    setOpenMedicine(!openMedicine);
    setOpenUser(false);
    setOpen1(false);
    setOpenAppointment(false);
    setOpenNewsBlogs(false);
  };

  const handleListItemClickMedicineList = (event, index, area) => {
    history.push("/listmedicine");
    setSubSelectedIndexMedicine(index);
    setArea(area);
  };

  const handleListItemClickMedicineCreate = (event, index, area) => {
    history.push("/createmedicine");
    setSubSelectedIndexMedicine(index);
    setArea(area);
  };

  const handleListItemClickMedicineEdit = (event, index, area) => {
    history.push("/editmedicine");
    setSubSelectedIndexMedicine(index);
    setArea(area);
  };

  //news and blogs
  const handleListItemClickNewsBlogs = (event, index, area) => {
    if (location.pathname === "/allnewsblogs") {
      setSubSelectedIndexNewsBlogs(1);
    } else if (location.pathname === "/addnewsblogs") {
      setSubSelectedIndexNewsBlogs(2);
    } else if (location.pathname === "/editnewsblogs") {
      setSubSelectedIndexNewsBlogs(3);
    } else {
      setSubSelectedIndexNewsBlogs(0);
    }

    setSelectedIndex(index);
    setOpenNewsBlogs(!openNewsBlogs);
    setOpenUser(false);
    setOpen1(false);
    setOpenAppointment(false);
    setOpenMedicine(false);
  };

  const handleListItemClickNewsBlogsAll = (event, index, area) => {
    history.push("/allnewsblogs");
    setSubSelectedIndexNewsBlogs(index);
    setArea(area);
  };

  const handleListItemClickNewsBlogsAdd = (event, index, area) => {
    history.push("/addnewsblogs");
    setSubSelectedIndexNewsBlogs(index);
    setArea(area);
  };

  const handleListItemClickNewsBlogsEdit = (event, index, area) => {
    history.push("/editnewsblogs");
    setSubSelectedIndexNewsBlogs(index);
    setArea(area);
  };

  const container = "";

  const drawer = (
    <Box sx={{ mb: 5 }}>
      <Toolbar>
        <Box sx={{ py: 3, display: "inline-flex" }}>
          <Img src={logo} sx={{ height: 50 }} />
        </Box>

        {/*          
          <ListItemText>
            <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
              Agrishop
            </Typography>
            <Typography sx={{ fontSize: 8 }}>Bit</Typography>
          </ListItemText> */}
      </Toolbar>
      <Box sx={{ mb: 2, mx: 2.5, mt: 1 }}>
        <AccountStyle>
          <Avatar src={userData.currentUserData[0].Image} alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              {userData.currentUserData[0].UserName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {userData.currentUserData[0].UserType}
            </Typography>
          </Box>
        </AccountStyle>
      </Box>

      <List sx={{ mb:5}}>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", p: 1.5, ml: 3 }}>
          GENERAL
        </Typography>
        <ListItemButton
          selected={selectedIndex === 1}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick(event, 1, "dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 1 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 1 ? "bold" : "none",
              }}
              color={selectedIndex === 1 ? "primary" : "none"}
            >
              Dashboard
            </Typography>
          </ListItemText>
        </ListItemButton>

        <Typography sx={{ fontSize: 12, fontWeight: "bold", p: 1.5, ml: 3 }}>
          MANAGEMENT
        </Typography>

        {/* User */}
        <ListItemButton
          selected={selectedIndex === 2}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClickUser(event, 2, "user")}
        >
          <ListItemIcon>
            <PersonRoundedIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 2 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 2 ? "bold" : "none",
              }}
              color={selectedIndex === 2 ? "primary" : "none"}
            >
              User
            </Typography>
          </ListItemText>
          {openUser ? (
            <ExpandMore
              sx={{ fontSize: 20 }}
              color={selectedIndex === 2 ? "primary" : "gray"}
            />
          ) : (
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickUserList(event, 1, "listuser")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexUser === 1
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndexUser === 1 ? "bold" : "none",
                  }}
                >
                  List
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickUserCreate(event, 2, "createuser")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexUser === 2
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndexUser === 2 ? "bold" : "none",
                  }}
                >
                  Create
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickUserEdit(event, 3, "editeuser")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexUser === 3
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndexUser === 3 ? "bold" : "none",
                  }}
                >
                  Edit
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        {/* Product */}
        <ListItemButton
          selected={selectedIndex === 3}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClickPatient(event, 3, "patient")}
        >
          <ListItemIcon>
            <SupervisedUserCircleIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 3 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 3 ? "bold" : "none",
              }}
              color={selectedIndex === 3 ? "primary" : "none"}
            >
              Patient
            </Typography>
          </ListItemText>
          {open1 ? (
            <ExpandMore
              sx={{ fontSize: 20 }}
              color={selectedIndex === 3 ? "primary" : "gray"}
            />
          ) : (
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) => handleListItemClickPatientList(event, 1, "listpatient")}
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndex === 1 ? shapeStylesSelected : shapeStyles
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndex === 1 ? "bold" : "none",
                  }}
                >
                  List
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) => handleListItemClickPatientCreate(event, 2, "createpatient")}
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndex === 2 ? shapeStylesSelected : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndex === 2 ? "bold" : "none",
                  }}
                >
                  Create
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickPatientEdit(event, 3, "editpatient")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndex === 3 ? shapeStylesSelected : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight: subSelectedIndex === 3 ? "bold" : "none",
                  }}
                >
                  Edit
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        {/* Order */}
        {/* <ListItemButton
          selected={selectedIndex === 4}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 4, "order")}
        >
          <ListItemIcon>
            <DescriptionRoundedIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 4 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 4 ? "bold" : "none",
              }}
              color={selectedIndex === 4 ? "primary" : "none"}
            >
              Checkup Patient
            </Typography>
          </ListItemText>
        </ListItemButton> */}

        {/* Appointment */}
        <ListItemButton
          selected={selectedIndex === 4}
          sx={style.listItemContainer}
          onClick={(event) =>
            handleListItemClickAppointment(event, 4, "appointment")
          }
        >
          <ListItemIcon>
            <LocalHospitalIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 4 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 4 ? "bold" : "none",
              }}
              color={selectedIndex === 4 ? "primary" : "none"}
            >
              Appointment
            </Typography>
          </ListItemText>
          {openAppointment ? (
            <ExpandMore
              sx={{ fontSize: 20 }}
              color={selectedIndex === 4 ? "primary" : "gray"}
            />
          ) : (
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={openAppointment} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickAppointmentList(event, 1, "listappointment")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexAppointment === 1
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexAppointment === 1 ? "bold" : "none",
                  }}
                >
                  List
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickAppointmentCreate(
                  event,
                  2,
                  "createappointment"
                )
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexAppointment === 2
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexAppointment === 2 ? "bold" : "none",
                  }}
                >
                  Create
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickAppointmentEdit(event, 3, "editappointment")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexAppointment === 3
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexAppointment === 3 ? "bold" : "none",
                  }}
                >
                  Edit
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        {/* Medicine */}
        <ListItemButton
          selected={selectedIndex === 5}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClickMedicine(event, 5, "medicine")}
        >
          <ListItemIcon>
            <MedicationIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 5 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 5 ? "bold" : "none",
              }}
              color={selectedIndex === 5 ? "primary" : "none"}
            >
              Medicine
            </Typography>
          </ListItemText>
          {openMedicine ? (
            <ExpandMore
              sx={{ fontSize: 20 }}
              color={selectedIndex === 5 ? "primary" : "gray"}
            />
          ) : (
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={openMedicine} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickMedicineList(event, 1, "listmedicine")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexMedicine === 1
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexMedicine === 1 ? "bold" : "none",
                  }}
                >
                  List
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickMedicineCreate(event, 2, "createmedicine")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexMedicine === 2
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexMedicine === 2 ? "bold" : "none",
                  }}
                >
                  Create
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickMedicineEdit(event, 3, "editmedicine")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexMedicine === 3
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexMedicine === 3 ? "bold" : "none",
                  }}
                >
                  Edit
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        {/* News & Blogs */}
        <ListItemButton
          selected={selectedIndex === 6}
          sx={style.listItemContainer}
          onClick={(event) =>
            handleListItemClickNewsBlogs(event, 6, "newsblogs")
          }
        >
          <ListItemIcon>
            <DescriptionRoundedIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 6 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 6 ? "bold" : "none",
              }}
              color={selectedIndex === 6 ? "primary" : "none"}
            >
              News {"&"} Blogs
            </Typography>
          </ListItemText>
          {openNewsBlogs ? (
            <ExpandMore
              sx={{ fontSize: 20 }}
              color={selectedIndex === 6 ? "primary" : "gray"}
            />
          ) : (
            <ChevronRightOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={openNewsBlogs} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickNewsBlogsAll(event, 1, "allnewsblogs")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexNewsBlogs === 1
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexNewsBlogs === 1 ? "bold" : "none",
                  }}
                >
                  List
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickNewsBlogsAdd(event, 2, "addnewsblogs")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexNewsBlogs === 2
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexNewsBlogs === 2 ? "bold" : "none",
                  }}
                >
                  Create
                </Typography>
              </ListItemText>
            </ListItemButton>

            <ListItemButton
              sx={style.subListItemContainer}
              onClick={(event) =>
                handleListItemClickNewsBlogsEdit(event, 3, "editnewsblogs")
              }
            >
              <ListItemIcon>
                <Box
                  component="span"
                  sx={
                    subSelectedIndexNewsBlogs === 3
                      ? shapeStylesSelected
                      : shapeStyles
                  }
                />
              </ListItemIcon>

              <ListItemText>
                <Typography
                  sx={{
                    fontSize: 14,
                    ml: -1,
                    fontWeight:
                      subSelectedIndexNewsBlogs === 3 ? "bold" : "none",
                  }}
                >
                  Edit
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        {/* account */}
        <ListItemButton
          selected={selectedIndex === 7}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 7, "account")}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 7 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 7 ? "bold" : "none",
              }}
              color={selectedIndex === 7 ? "primary" : "none"}
            >
              Account
            </Typography>
          </ListItemText>
        </ListItemButton>

        {/* Settings
        <ListItemButton
          selected={selectedIndex === 7}
          sx={style.listItemContainer}
          onClick={(event) => handleListItemClick1(event, 7, "settings")}
        >
          <ListItemIcon>
            <SettingsIcon
              sx={{ fontSize: 20 }}
              color={selectedIndex === 7 ? "primary" : "none"}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: selectedIndex === 7 ? "bold" : "none",
              }}
              color={selectedIndex === 7 ? "primary" : "none"}
            >
              Settings
            </Typography>
          </ListItemText>
        </ListItemButton> */}
      </List>
      {/* <Divider /> */}

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          width: 279,
          boxShadow:
            "0px -1px 0px 0px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 2px 0px 0px rgba(0,0,0,0.12)",
          // borderTopStyle: "dashed",
          // borderTopWidth: 1,
          // borderTopColor: "gray",
          // borderRightStyle: "dashed",
          // borderRightWidth: .5,
          // borderRightColor: "grey",
        }}
      >
        <BottomNavigation showLabels>
          <Tooltip title="Logout" placement="bottom">
            <IconButton onClick={buttonLogout}>
              <PowerSettingsNewIcon color="primary" />
            </IconButton>
          </Tooltip>
        </BottomNavigation>
      </Paper>
    </Box>
  );

  useEffect(() => {
    if (
      location.pathname === "/listpatient" ||
      location.pathname === "/createpatient" ||
      location.pathname === "/editpatient" 
    ) {
      setOpen1(true);
    } else if (
      location.pathname === "/listuser" ||
      location.pathname === "/createuser" ||
      location.pathname === "/edituser"
    ) {
      setOpenUser(true);
    } else if (
      location.pathname === "/allnewsblogs" ||
      location.pathname === "/addnewsblogs" ||
      location.pathname === "/editnewsblogs"
    ) {
      setOpenNewsBlogs(true);
    } else if (
      location.pathname === "/listappointment" ||
      location.pathname === "/createappointment" ||
      location.pathname === "/editappointment"
    ) {
      setOpenAppointment(true);
    } else if (
      location.pathname === "/listmedicine" ||
      location.pathname === "/createmedicine" ||
      location.pathname === "/editmedicine"
    ) {
      setOpenMedicine(true);
    } else {
    }
  }, [location.pathname]);

  return (
    // <Drawer variant="permanent" sx={{ width: "160px", "& .MuiDrawer-paper": {
    //   boxSizing: "border-box",
    //   borderRightStyle: 'dashed'
    // }, }}>
    //   <List>
    //     {itemslist.map((item, index) => {
    //       const { text, icon, onclick } = item;
    //       return (
    //         <ListItem button key={text} onClick={onclick}>
    //           <ListItemIcon>{icon}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       );
    //     })}
    //   </List>
    // </Drawer>

    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <RootStyle>
        <ToolbarStyle>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          {/* <Typography color="textPrimary">Seller</Typography> */}
          <Box sx={{ flexGrow: 1 }} />

          {/* <AccountMenu /> */}
        </ToolbarStyle>
      </RootStyle>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRightStyle: "dashed",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default withRouter(Sidebar);
