import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Church as ChurchIcon,
  MenuBook as SermonIcon,
  Event as EventIcon,
  RecordVoiceOver as TestimonyIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [counts, setCounts] = useState({
    ministries: 0,
    sermons: 0,
    events: 0,
    testimonies: 0,
  });

  const cardData = [
    { key: 'ministries', label: 'Ministries', icon: <ChurchIcon fontSize="large" />, gradient: 'linear-gradient(135deg, #6D5BBA, #8D58BF)' },
    { key: 'sermons', label: 'Sermons', icon: <SermonIcon fontSize="large" />, gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' },
    { key: 'events', label: 'Events', icon: <EventIcon fontSize="large" />, gradient: 'linear-gradient(135deg, #42E695, #3BB2B8)' },
    { key: 'testimonies', label: 'Testimonies', icon: <TestimonyIcon fontSize="large" />, gradient: 'linear-gradient(135deg, #F7971E, #FFD200)' },
  ];

  useEffect(() => {
    Promise.all(
      cardData.map(item =>
        dataProvider.getList(item.key, {
          pagination: { page: 1, perPage: 1 },
          sort: { field: 'id', order: 'DESC' },
          filter: {},
        })
      )
    ).then(results => {
      setCounts({
        ministries: results[0].total,
        sermons: results[1].total,
        events: results[2].total,
        testimonies: results[3].total,
      });
    });
  }, [dataProvider]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to KSTVET CU Admin Panel
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage your resources efficiently with the tools below.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cardData.map(({ key, label, icon, gradient }) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{
                  background: gradient,
                  color: '#fff',
                  borderRadius: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    {icon}
                    <Typography variant="h3" fontWeight="bold">
                      {counts[key]}
                    </Typography>
                  </Box>
                  <Typography variant="h6" mt={2} fontWeight="500">
                    {label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
