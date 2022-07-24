import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  //LinearProgress,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";

import { useSelector } from "react-redux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 20,
  width: "100%",
 
}));

export default function Dashboard() {
    const ui = useSelector((state) => state.ui);
    const user = useSelector((state) => state.user);
    const [total, setTotal] = useState(0);
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
      
  useEffect(() => {
    var rows = [0];
    // let pro = 0;
    for (let i = 0; i < user.finances.length; i++) {
      rows = user.finances.map((finance) => (finance.Total));
    //   console.log(pro);
    //   rows.push(pro);
    }
    setTotal(rows.reduce(reducer));

  
    // console.log(urlId);
    // console.log(location.state.quantity);
    // console.log("row",rows.reduce(reducer))
  }, [total, user,]);

  const [optionsLine] = useState({
    chart: {
      id: "apexchart",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    colors: ["#FF0000", "#E91E63"],
    tooltip:{
        theme: ui.isDarkMode === true ? "light" : "dark",
    }
  });

  const [optionsRadialBar] = useState({
    plotOptions: {
      radialBar: {
        track: {
          opacity: 0.5,
        },
        dataLabels: {
            
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 249;
              
            },
            
          },
        
         
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: ["Version 1", "Version 2", "Version 3", "Version 4"],
  });

  const [optionsArea] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "Month",
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      labels: {
          style:{
        colors:  ui.isDarkMode === true ? "gray" : "gray",
          }
      }
    },
   
  

    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "right",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors:  ui.isDarkMode === true ? "black" : "white",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },

    grid: {
      borderColor: "#90A4AE",
      strokeDashArray: 10,

      yaxis: {
        lines: {
          show: false,
        },

        labels: {
            style:{
          colors:  ui.isDarkMode === true ? "gray" : "gray",
            }
        }
      },
    },

    colors: ["#5DDC9A", "#E91E63"],
    tooltip:{
      
        theme: ui.isDarkMode === true ? "light" : "dark",

    }
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [30, 20, 50, 10, 30],
    },
  ]);
  const [seriesRadialBar] = useState([44, 55, 67, 83]);
  const [seriesArea] = useState([
    {
      name: "Total Income",
      data: [30, 20, 50, 10, 30, 29, 19, 5, 2, 20, 30, 29],
      
    },
    {
      name: "Total Expenses",
      data: [11, 5, 32, 50, 40, 2, 1, 30, 5, 5, 2, 10],
    },
  ]);
  return (
    <Box sx={{mx: {lg:4, xs:2}, mt:12}}>


      <Breadcrumbs sx={{ mb: 2 }} separator={<Box sx={{width: 4, height: 4, bgcolor:"gray", borderRadius: '50%' }}/>}>
        <Link underline="hover" color="inherit" href="/seller">
        <Typography color="text.primary" variant="body2" >Home</Typography>
        </Link>
        <Typography color="text.primary" variant="body2" >Dashboard</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Patient</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    { user.finances.length }
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingUpIcon
                      color="primary"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Medicine</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    {total}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingUpIcon
                      color="primary"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Item>
            <Card sx={{ display: "flex", boxShadow: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="subtitle1">Total Doctor</Typography>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ fontWeight: 700 }}
                  >
                    0
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <TrendingDownIcon
                      color="error"
                      sx={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: 12 }}>
                    +2.6% than last week
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Chart options={optionsLine} series={series} type="line" />
              </Box>
            </Card>
          </Item>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Sales by Category
            </Typography>
            <Chart
              options={optionsRadialBar}
              series={seriesRadialBar}
              type="radialBar"
              height={395}
            />
          </Item>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Monthly Sales
            </Typography>
            <Chart
              options={optionsArea}
              series={seriesArea}
              type="area"
              height={350}
            />
          </Item>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Item>
            <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
              Profit Overview
            </Typography>  
            { user.finances.slice(0,3).map((item, i) => ( 
            <Box sx={{my:2}} key={i}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "left", ml: 1, my: 1 ,fontSize:14 }}
                >
                  {item.OrderId}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Typography
                  color="textPrimary"
                  sx={{ textAlign: "right", ml: 1, my: 1 ,fontSize:14 }}
                >
                  P {item.Total}.00
                </Typography>
               
              </Box> 
            </Box> ))}

          </Item>

        </Grid>
        <Grid item xs={12} lg={4} sx={{ mb:10,}}>
          <Item>
          <Typography
              color="textPrimary"
              sx={{ textAlign: "left", ml: 1, fontWeight: 600, my: 1 }}
            >
            Latest Product
            </Typography>
            { user.products.slice(0,3).map((product, i) => (
            <Box key={i}
            sx={{display:"flex",ml:1, textAlign:"center",justifyItems:"center",alignItems:"center",my:2}}>
                <Avatar src={product.Image[0]}/>
                <Typography noWrap color="textPrimary" sx={{fontSize:14, ml:2}}>{product.ProductName.substr(0,25)}..</Typography>
                <Box sx={{flexGrow:1}}/>
                <Typography sx={{fontSize:12, ml:1}}>P {product.ProductPrice}.00</Typography>  
            </Box> ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
