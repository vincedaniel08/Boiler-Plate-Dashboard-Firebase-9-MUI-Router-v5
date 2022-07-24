import React, { useState, useEffect } from "react";
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

import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
// icon

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// dropzone
import { useDropzone } from "react-dropzone";

//redux
import { useSelector } from "react-redux";

//backend
import { db, storage } from "../../utils/firebase";
import {
  updateDoc,
  doc,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,  } from "firebase/storage";

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

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  mt: 20,
};

const thumbPreview = {
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 10,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
const imgEmpty = {
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: 150,
};

export default function Addproduct() {

  // const Img = styled('img')({
  //   margin: 'auto',
  //   display: 'block',
  //   maxWidth: '100%',
  //   maxHeight: '100%',
  // });

  
  const user = useSelector((state) => state.user);
  const const_term = 1024;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let queryy = useQuery();
  let urlId = queryy.get("product");

  // const product =  user.products.filter((product) => (product.id === urlId)).map((product) => (product))[0];
  // const [product, setProduct] = useState([]);

  //dropzone
  //   const types = ["image/png", "image/jpeg", "image/jpg"];
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
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
    <Box sx={{ my: 2, border: 1, borderRadius: 2, p: 2, color: "red" }}>
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
    <Box style={thumbPreview} key={file.name}>
      <Box style={thumbInner}>
        <img src={file.preview} style={img} alt="hahah" />
        <Box>
          <ClearRoundedIcon onClick={remove(file)} style={style.removeButton} />
        </Box>
      </Box>
    </Box>
  ));
  const thumbsDefault = user.products
    .filter((product) => product.id === urlId)
    .map((product, i) => (
      <Box style={thumbPreview} key={i}>
         <img src={product.Image} style={img} alt="hahah" />
      {/* <Img src={product.Image} style={img} alt="hahah" /> */}
          {/* <Img src={image.Image[1]} style={img} alt="hahah" />
          <Img src={image.Image[2]} style={img} alt="hahah" /> */}
        
      </Box>
    ));

  const thumbsEmpty = (
    <Box>
      <img src={UploadImage} alt="upload" style={imgEmpty} />
      {/* <Typography fontSize={10} color="textPrimary">Upload photo</Typography> */}
      <Typography fontSize={18} color="textPrimary" fontWeight={700}>
        {" "}
        Drop or Select file
      </Typography>
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
    version: Yup.string().required("Version  is required"),
  });

  const formik = useFormik({
    initialValues: {
      productName: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductName).toString(),
      productDesc: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductDesc).toString(),
      productWeight: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductWeight).toString(),
      productPrice: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductPrice).toString(),
      phoneNumber: "",
      stock: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductStock).toString(),
      category: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductCategory).toString(),
      version: user.products
        .filter((product) => product.id === urlId)
        .map((product) => product.ProductVersion).toString(),
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {
      console.log(formik.values.email);

      if (files.length > 0) {
        setAvatarError(false);
         await updateDoc(doc(db, "Products",urlId), {
          ProductName: formik.values.productName,
          ProductDesc: formik.values.productDesc,
          ProductCategory: formik.values.category,
          ProductWeight: formik.values.productWeight,
          ProductVersion: Number(formik.values.version),
          ProductPrice: Number(formik.values.productPrice),
          ProductStock: formik.values.stock,
         
        });
        await updateDoc(doc(db, "Products", urlId), {
          Image: deleteField(),
          ImageName: deleteField(),
         
      })
        await Promise.all(
          files.map(async(image) => {

            const imageRef = ref( storage, `Products/${urlId}/${image.path}`  );
            uploadBytes(imageRef, image, "data_url").then(async () => {

              const downloadURL = await getDownloadURL(imageRef);
             
            // await deleteObject(ref (storage, `Products/${urlId}/${ user.products.filter((product) => (product.id === urlId)).map((product,i) => (product.ImageName ))}`));
              await updateDoc(doc(db, "Products", urlId), {
                Image: arrayUnion(downloadURL),
                ImageName: arrayUnion(image.path),
              });
            });
            return true;
          })
        );
     
        setSnackbarOpen(true);
      } else if (files.length === 0) {

        setSnackbarOpen(true);
         await updateDoc(doc(db, "Products",urlId), {
          ProductName: formik.values.productName,
          ProductDesc: formik.values.productDesc,
          ProductCategory: formik.values.category,
          ProductWeight: Number(formik.values.productWeight),
          ProductVersion: Number(formik.values.version),
          ProductPrice: Number(formik.values.productPrice),
          ProductStock: formik.values.stock,
        });
       }else { 
        setAvatarError(true);
        setSubmitting(false);
      }

      console.log("formik", formik.values.stock);
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
    // resetForm,
  } = formik;

  useEffect(() => {
    // setProduct(user.products.filter((product) => (product.id === urlId)));
    // setFiles(user.products.filter((product) => (product.id === urlId)).map((product) => (product.Image))[0])
    // console.log("product", product);
  }, [user, urlId]);

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
              Edit Product
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
                Edit
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
                    helpertext={touched.productName && errors.productName}
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
                    helpertext={touched.productDesc && errors.productDesc}
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
                  <Box style={thumbsContainer}>
                    <Box sx={{ m: 1, position: "relative" }}>
                      {files.length === 0 ? thumbsDefault : thumbs}
                    </Box>
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
                        <MenuItem value={"BMW"}>BMW</MenuItem>
                        <MenuItem value={"Baja"}>Baja</MenuItem>
                        <MenuItem value={"Rusi"}>Rusi</MenuItem>
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
                    <TextField
                      fullWidth
                      type="number"
                      label="Product Weight"
                      {...getFieldProps("productWeight")}
                      error={Boolean(
                        touched.productWeight && errors.productWeight
                      )}
                      helpertext={touched.productWeight && errors.productWeight}
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel
                      error={Boolean(
                        touched.productPrice && errors.productPrice
                      )}
                    >
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
                    disabled={ user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductName).toString() === formik.values.productName && 
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductDesc).toString() === formik.values.productDesc &&
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductCategory).toString() === formik.values.category &&
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductStock).toString() === formik.values.stock &&
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductPrice).toString() === formik.values.productPrice && 
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductVersion).toString() === formik.values.version &&
                      user.products
                      .filter((product) => product.id === urlId)
                      .map((product) => product.ProductWeight).toString() === formik.values.productWeight
                      && isSubmitting === false}
                  >
                    Save Product
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
