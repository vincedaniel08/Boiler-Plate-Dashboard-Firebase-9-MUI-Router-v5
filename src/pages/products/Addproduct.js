import React, { useState } from "react";
import style from "../../styles/AddProduct";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import UploadImage from "../../assets/images/upload.png";
import {
  Container,
  Stack,
  Box,
  Link,
  Typography,
  Breadcrumbs,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  Snackbar,
  OutlinedInput,
  Switch,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// dropzone
import { useDropzone } from "react-dropzone";

import { useSelector } from "react-redux";

//backend
import { db, storage } from "../../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



export default function Addproduct() {
  const user = useSelector((state) => state.user);
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  //dropzone
  // const types = ["image/png", "image/jpeg", "image/jpg"];
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } =
    useDropzone({
      maxSize: 3100000,
      accept: "image/*",
      maxFiles: 3,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        // setFieldValue("avatar", "gago");
      },
    });

  //snapbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const remove = (file) => () => {
    console.log("removeFile...");
    // acceptedFiles.splice(acceptedFiles.indexOf(file), 1)
    setFiles([...files.filter((f) => f.name !== file.name).splice(file)]);
    console.log(file);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Box sx={{ my:2, border: 1, borderRadius: 2, p: 2, color: "red" }}>
      <Typography key={file.path} sx={{ fontSize: 12, fontWeight: 700 }}>
        {file.path} - {(file.size / const_term ** 2).toFixed(3)} Mb
      </Typography>
      {errors.map((e) => (
        <Typography key={e.code} sx={{ fontSize: 12 }}>
          {" "}
          {e.message}
        </Typography>
      ))}
    </Box>
  ));

  const thumbs = files.map((file) => (
    <Box style={style.thumbPreview} key={file.name}>
      <Box style={style.thumbInner}>
        <img src={file.preview} style={style.img} alt="hahah" />
        <Box>
          <ClearRoundedIcon onClick={remove(file)} style={style.removeButton} />
        </Box>
      </Box>
    </Box>
  ));

  const thumbsEmpty = (
    <Box>
        <img src={UploadImage} alt="upload" style={style.imgEmpty} />
        {/* <Typography fontSize={10} color="textPrimary">Upload photo</Typography> */}
   <Typography fontSize={18} color="textPrimary" fontWeight={700} > Drop or  Select file</Typography>
    </Box>
  );

  //yup and formik


  const LoginSchema = Yup.object().shape({
    productName: Yup.string()
      .min(5, "Product Name is invalid")
      .required("Product Name is required"),
    productDesc: Yup.string()
      .min(5, "Description is invalid")
      .required("Description  is required"),
    productWeight: Yup.string()
      .max(5, "Weight is invalid")
      .required("Weight  is required"),
    productPrice: Yup.string().required("Price  is required"),
    // stock: Yup.boolean().required("Stock  is required"),
    category: Yup.string().required("Category  is required"),
    motorCategory: Yup.string().required("Motorcycle Category  is required"),
    version: Yup.string().required("Version  is required"),
  });

  const formik = useFormik ({
    initialValues: {
      productName: "",
      productDesc: "",
      productWeight: "",
      productPrice: "",
      phoneNumber: "",
      stock: true,
      category: "",
      motorCategory: "",
      version: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {
      console.log(formik.values.email);

      if (files.length > 0) {
        setAvatarError(false);
        const docRef = await addDoc(collection(db, "Products"), {
          ProductName: formik.values.productName,
          ProductDesc: formik.values.productDesc,
          ProductCategory: formik.values.category,
          ProductWeight: Number(formik.values.productWeight),
          ProductVersion: Number(formik.values.version),
          ProductPrice: Number(formik.values.productPrice),
          ProductStock: formik.values.stock,
          ProductMotorCategory: formik.values.motorCategory,
          SellerUid: user.currentUserData[0].UserUid,
          Created: serverTimestamp()
        });
        await Promise.all(
          files.map((image) => {
           const imageRef = ref(storage, `Products/${docRef.id}/${image.path}`);
            uploadBytes(imageRef, image, "data_url").then(async () => {
              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "Products", docRef.id), {
                Image: arrayUnion(downloadURL),
                ImageName: arrayUnion(image.path),
              });
            }); 
            return true;
          })
        );
          resetForm({
            values: {
              productName: "",
              productDesc: "",
              productWeight: "",
              productPrice: "",
              phoneNumber: "",
              stock: true,
              category: "",
              version: "",
            }
          })
        setSnackbarOpen(true);
        setFiles([]);
          
      } else {
        setAvatarError(true);
        setSubmitting(false);
      }

      console.log("formik",formik.values.stock);
    },
  });
  // console.log("files", files);

  const {
    errors,
    touched,
    // values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    // setFieldValue,
    setSubmitting,
    // getFieldMeta,
    resetForm,
  } = formik;

  return (
    <Container sx={{ mt: 12, mb: 5 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Crete Product Successfully
        </Alert>
      </Snackbar>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box direction="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Add a new Product
            </Typography>
            <Breadcrumbs
              sx={{ ml: 0.5 }}
              separator={
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "gray",
                    borderRadius: "50%",
                    mx: 1,
                  }}
                />
              }
            >
              <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/allproduct"
              >
                <Typography color="text.primary" variant="body2">
                  Product
                </Typography>
              </Link>
              <Typography color="gray" variant="body2">
                Add
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Item>
                  <TextField
                    fullWidth
                    type="name"
                    label="Product Name"
                    {...getFieldProps("productName")}
                    error={Boolean(touched.productName && errors.productName)}
                    helperText={touched.productName && errors.productName}
                  />

                  <Typography
                    variant="body2"
                    sx={{ mb: 1, mt: 2, textAlign: "left", fontWeight: 700 }}
                  >
                    Description
                  </Typography>

                  <OutlinedInput
                    fullWidth
                    placeholder="Write something to your product"
                    rows={8}
                    multiline
                    {...getFieldProps("productDesc")}
                    error={Boolean(touched.productDesc && errors.productDesc)}
                    helperText={touched.productDesc && errors.productDesc}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      mt: 2,
                      textAlign: "left",
                      fontWeight: 700,
                    }}
                  >
                    Images
                  </Typography>

                  <Box sx={style.uploadBg}>
                    <Box {...getRootProps({ className: "dropzone" })}>
                      <input
                        // {...getFieldMeta("avatar")}
                        {...getInputProps()}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        {thumbsEmpty}
                      </Box>
                      <Typography sx={style.imageTypography}>
                        Allowed *.jpeg, *.jpg, *.png, max 3 files and size of
                        3.1 MB
                      </Typography>
                      {avatarError === true ? (
                        <Typography variant="caption" color="error">
                          Image is required
                          {/* {touched.email && errors.avatar}{" "} */}
                        </Typography>
                      ) : (
                        <Typography />
                      )}

                     
                    </Box>
                  </Box>
                  {fileRejectionItems}
                  <Box style={style.thumbsContainer}>
                    <Box sx={{ m: 1, position: "relative" }}>{thumbs}</Box>
                  </Box>
                </Item>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  display="grid"
                  // gridTemplateColumns="repeat(12, 1fr)"
                  sx={style.boxGrid}
                  gap={2}
                >
                  <Box gridColumn="span 12" sx={{ mt: 2 }}>
                    <Switch
                      defaultChecked
                      size="small"
                      {...getFieldProps("stock")}
                    />
                    <Typography variant="caption">In Stock</Typography>
                  </Box>

                  <Box gridColumn="span 12">
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Cetegory"
                        {...getFieldProps("category")}
                        error={Boolean(touched.category && errors.category)}
                      >
                        <MenuItem value={"Honda"}>Honda</MenuItem>
                        <MenuItem value={"Yamaha"}>Yamaha</MenuItem>
                        <MenuItem value={"Rusi"}>Rusi</MenuItem>
                        <MenuItem value={"Kawasaki"}>Kawasaki</MenuItem>
                        <MenuItem value={"Sym"}>Sym</MenuItem>
                        <MenuItem value={"EuroMotor"}>Euro Motor</MenuItem>
                        <MenuItem value={"Kymco"}>Kymco</MenuItem>
                        <MenuItem value={"Keeway"}>Keeway</MenuItem>
                        <MenuItem value={"Suzuki"}>Suzuki</MenuItem>
                      </Select>
                      <FormHelperText>
                        <Typography variant="caption" color="error">
                          {" "}
                          {touched.category && errors.category}
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  <Box gridColumn="span 12">
                    <FormControl fullWidth >
                      <InputLabel>Motorcycle Category</InputLabel>
                      <Select
                        label="Motorcycle Cetegory"
                        {...getFieldProps("motorCategory")}
                        error={Boolean(touched.motorCategory && errors.motorCategory)}
                      >
                  
                        {user.motors.map((motor) => ( 
                           <MenuItem value={motor.MotorName}>{motor.MotorName}</MenuItem>
                          
                          )) }
                        
                      </Select>
                      <FormHelperText>
                        <Typography variant="caption" color="error">
                          {" "}
                          {touched.motorCategory && errors.motorCategory}
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </Box>

                  <Box gridColumn="span 12">
                    <TextField
                     margin="normal"
                      fullWidth
                      type="number"
                      label="Product Weight"
                      {...getFieldProps("productWeight")}
                      error={Boolean(
                        touched.productWeight && errors.productWeight
                      )}
                      helperText={touched.productWeight && errors.productWeight}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Kg</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>

                <Box gridColumn="span 12">
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Version</InputLabel>
                    <Select
                      label="Version"
                      {...getFieldProps("version")}
                      error={Boolean(touched.version && errors.version)}
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                    <FormHelperText>
                      <Typography variant="caption" color="error">
                        {" "}
                        {touched.version && errors.version}
                      </Typography>
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box gridColumn="span 12">
                  <FormControl fullWidth margin="normal" >
                    <InputLabel  error={Boolean(
                        touched.productPrice && errors.productPrice
                      )} >
                      Amount
                    </InputLabel>
                    <OutlinedInput
                       type="number"
                      id="outlined-adornment-amount"
                      {...getFieldProps("productPrice")}
                      error={Boolean(
                        touched.productPrice && errors.productPrice
                      )}
                      startAdornment={
                        <InputAdornment position="start">₱</InputAdornment>
                      }
                      label="Amount"
                    />
                    <FormHelperText>
                      <Typography variant="caption" color="error">
                        {" "}
                        {touched.productPrice && errors.productPrice}
                      </Typography>
                    </FormHelperText>
                  </FormControl>
                  <Typography variant="caption" color="gray"> Make sure you already created a motorcycle Before add a new product</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    my: 2,
                  }}
                >
                  <LoadingButton
                    style={{ textTransform: "Capitalize", borderRadius: 8 }}
                    size="small"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Create Product 
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Container>
  );
}
