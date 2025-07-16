import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      className={styles.footer}
      sx={{
        py: { xs: 6, md: 8 },
        borderTop: 1,
        borderColor: 'divider',
        color: 'text.secondary',
        fontSize: 14,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
        >
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}
            >
              {t("footer.brand")}
            </Typography>
            <Typography>
              {t("footer.tagline")}
            </Typography>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t("footer.company")}
            </Typography>
            {[{ label: t("footer.about"), to: 'about' }, { label: t("footer.features"), to: 'features' }, { label: t("footer.pricing"), to: 'pricing' }].map(({ label, to }, i) => (
              <ScrollLink
                key={i}
                to={to}
                smooth
                duration={500}
                offset={-70}
                style={{ cursor: 'pointer', display: 'block', marginBottom: 8, color: 'inherit', textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    transition: 'color 0.3s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {label}
                </Typography>
              </ScrollLink>
            ))}
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t("footer.quick")}
            </Typography>
            {[{ text: t("footer.home"), href: '/home' }, { text: t("footer.exams"), href: '/exams' }, { text: t("footer.projects"), href: '/projects' }].map(({ text, href }, i) => (
              <Link
                key={i}
                href={href}
                underline="hover"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  mb: 1,
                  transition: 'color 0.3s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t("footer.contact")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("footer.phone")}:{" "}
              <Link
                href="tel:+971501234567"
                underline="hover"
                color="text.secondary"
              >
                +971 50 123 4567
              </Link>
            </Typography>
            <Typography variant="body2">
              {t("footer.email")}:{" "}
              <Link
                href="mailto:manarauae@gmail.com"
                underline="hover"
                color="text.secondary"
              >
                manarauae@gmail.com
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 6,
            color: 'text.secondary',
            fontSize: 13,
            userSelect: 'none',
          }}
        >
          © {new Date().getFullYear()} {t("footer.brand")}. {t("footer.rights")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
