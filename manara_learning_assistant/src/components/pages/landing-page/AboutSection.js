import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.css';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="about"
      className={styles.section}
      sx={{ color: 'text.primary', py: { xs: 8, md: 12 } }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            mb: { xs: 4, md: 6 },
            color: 'text.primary',
          }}
        >
          {t("about.title")}
        </Typography>

        <Grid container spacing={6} alignItems="center">
          {/* Left Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
              alt="Students collaborating"
              sx={{
                width: '100%',
                height: { xs: 260, sm: 340, md: 500, lg: 540 },
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease-in-out',
              }}
            />
          </Grid>

          {/* Right Text */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                lineHeight: 1.4,
                mb: 3,
              }}
            >
              {t("about.subtitle")}
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mb: 4,
              }}
            >
              {t("about.description")}
            </Typography>

            <List sx={{ mb: 4 }}>
              {t("about.features", { returnObjects: true }).map((item, index) => (
                <ListItem disablePadding key={index} sx={{ mb: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}>
                    <CheckCircle />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      color: 'text.secondary',
                    }}
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/home"
              sx={{
                borderRadius: '30px',
                px: 5,
                py: 1.5,
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {t("about.button")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
