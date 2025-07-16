import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  LocationOn,
  Mail,
  Phone,
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styles from "./LandingPage.module.css";

const ContactSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useTranslation();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const recaptchaRef = useRef();

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaRendered, setCaptchaRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const renderRecaptcha = () => {
      if (window.grecaptcha && !captchaRendered && recaptchaRef.current) {
        if (!recaptchaRef.current.hasChildNodes()) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: "6LcIoncrAAAAAOBePHYa20pWrvjNiEE0RbolH_f3",
            callback: () => {
              setCaptchaVerified(true);
              setSnack({
                open: true,
                message: t("contact.captchaVerified"),
                severity: "info",
              });
            },
          });
          setCaptchaRendered(true);
        }
      }
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit";
      script.async = true;
      script.defer = true;
      window.onRecaptchaLoadCallback = renderRecaptcha;
      document.body.appendChild(script);
    } else {
      renderRecaptcha();
    }
  }, [captchaRendered, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!name || !email || !message) {
      setSnack({
        open: true,
        message: t("contact.fillRequired"),
        severity: "warning",
      });
      return;
    }

    if (!captchaVerified) {
      setSnack({
        open: true,
        message: t("contact.verifyCaptcha"),
        severity: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = {
        access_key: "de30eb69-07a3-425c-bf4e-140d9ca5c46c",
        name,
        email,
        phone,
        message,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setSnack({
          open: true,
          message: t("contact.success", { name }),
          severity: "success",
        });
        nameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
        messageRef.current.value = "";
        window.grecaptcha.reset();
        setCaptchaVerified(false);
        setCaptchaRendered(false);
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (error) {
      setSnack({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ bgcolor: theme.palette.background.default, py: 10 }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {t("contact.heading")} <span className={styles.gradientText}>{t("contact.highlight")}</span>
            </Typography>
            <Typography paragraph color="text.secondary">
              {t("contact.subheading")}
            </Typography>

            {[
              {
                icon: <LocationOn sx={{ mr: 1.5 }} />,
                text: t("contact.location"),
              },
              { icon: <Mail sx={{ mr: 1.5 }} />, text: "manarauae@gmail.com" },
              { icon: <Phone sx={{ mr: 1.5 }} />, text: "+971 54 394 8653" },
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {item.icon}
                <Typography>{item.text}</Typography>
              </Box>
            ))}

            <Box sx={{ display: "flex", gap: 1 }}>
              {[Facebook, Twitter, LinkedIn, GitHub].map((Icon, i) => (
                <IconButton key={i} sx={{ color: isDark ? "#ccc" : "#444" }}>
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={nameRef}
                    fullWidth
                    label={t("contact.name")}
                    required
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={emailRef}
                    fullWidth
                    label={t("contact.email")}
                    type="email"
                    required
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={phoneRef}
                    fullWidth
                    label={t("contact.phone")}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={messageRef}
                    fullWidth
                    label={t("contact.message")}
                    multiline
                    rows={4}
                    required
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <div ref={recaptchaRef} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ py: 1.5, borderRadius: "30px" }}
                    disabled={loading}
                  >
                    {loading ? t("contact.sending") : t("contact.submit")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>

        <Snackbar
          open={snack.open}
          autoHideDuration={6000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snack.severity}
            onClose={() => setSnack({ ...snack, open: false })}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactSection;
