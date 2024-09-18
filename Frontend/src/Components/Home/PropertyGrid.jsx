import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

function PropertyGrid() {
  const properties = [
    { id: 1, title: "Modern Villa", image: "https://i.pinimg.com/originals/78/ce/9b/78ce9b7a820a3a4c4a4e33a1509d79b2.jpg" },
    { id: 2, title: "Studio Apartment", image: "https://tse2.mm.bing.net/th?id=OIP.EJVVN8C6-3mc5bhO0IXqhwHaE8&pid=Api&P=0&h=220images/studio.jpg" },
    { id: 3, title: "Town House", image: "https://tse3.mm.bing.net/th?id=OIP.mRUQd3LPq3WNSGybSaHj_AHaHa&pid=Api&P=0&h=220ages/townhouse.jpg" },
  ];

  return (
    <Container maxWidth="2g" style={{ marginTop: '40px' }}>
      <Grid container spacing={4} style={{ justifyContent: "space-around" }}>
        {properties.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={property.image}
                alt={property.title}
                sx={{ width: '100%'}} 
              />
              <CardContent>
                <Typography variant="h6">{property.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PropertyGrid;
