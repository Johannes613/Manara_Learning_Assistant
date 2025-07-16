import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.css';

const VideoSection = () => {
  const { t } = useTranslation();

  return (
    <Box id="video-preview" className={styles.section}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
        >
          {t("video.title")} <span className={styles.gradientText}>{t("video.highlight")}</span>
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          paragraph 
          sx={{ mb: 5, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}
        >
          {t("video.description")}
        </Typography>

        <Paper 
          elevation={6} 
          sx={{ 
            position: 'relative',
            paddingTop: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)'
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Platform walkthrough"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Paper>
      </Container>
    </Box>
  );
};

export default VideoSection;
