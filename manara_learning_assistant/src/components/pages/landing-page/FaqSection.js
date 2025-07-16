import React from 'react';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.css';
import { faqData } from './faqData';

const FaqSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="faq"
      className={styles.section}
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 5,
            textAlign: 'center',
          }}
        >
          {t("faq.title")} <span className={styles.gradientText}>{t("faq.highlight")}</span>
        </Typography>

        {faqData.map((faq, index) => (
          <Accordion
            key={faq.id}
            defaultExpanded={index === 0}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '10px !important',
              mb: 2,
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
              sx={{
                py: 1,
                '& .MuiAccordionSummary-content': {
                  color: 'text.primary',
                  fontWeight: 'bold',
                },
                '&.Mui-expanded': {
                  '& .MuiAccordionSummary-content': {
                    color: 'primary.main',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Typography variant="h6">{t(faq.questionKey)}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2 }}>
              <Typography color="text.secondary">
                {t(faq.answerKey)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FaqSection;
