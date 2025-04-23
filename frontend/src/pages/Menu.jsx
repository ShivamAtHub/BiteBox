import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const MenuContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const MenuCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
  },
}));

const MenuImage = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

const MenuContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

// Static menu data
const menuItems = [
  {
    id: 1,
    name: 'Signature Burger',
    description: 'Premium beef patty with special sauce, fresh vegetables, and melted cheese',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Gourmet Pizza',
    description: 'Hand-tossed crust with premium toppings and three-cheese blend',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Pasta Primavera',
    description: 'Fresh pasta with seasonal vegetables in a light cream sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    name: 'Fresh Fruit Smoothie',
    description: 'Blend of seasonal fruits with yogurt and honey',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const Menu = () => {
  return (
    <MenuContainer maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Our Premium Menu
      </Typography>
      <Grid container spacing={4}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MenuCard>
              <MenuImage
                component="img"
                image={item.image}
                alt={item.name}
              />
              <MenuContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${item.price}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                </Box>
              </MenuContent>
            </MenuCard>
          </Grid>
        ))}
      </Grid>
    </MenuContainer>
  );
};

export default Menu;
