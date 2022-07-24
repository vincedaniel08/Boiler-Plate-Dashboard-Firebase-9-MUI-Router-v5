import React from "react";
import { Box, Container, Typography, Stack, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ProductList from "../../sections/user/product/ProductList";
import { useSelector } from "react-redux";

export default function Allproduct() {
  const user = useSelector((state) => state.user);
  return (
    <Container sx={{ mt: 12, mb: 10 }}>
      <Container>
      <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box direction="column" alignItems="center">
            <Typography variant="h4" gutterBottom>
              List of Product
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
                List
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>


        <ProductList products={user.products} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Container>
  );
}
