import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

// Sub-component for a single legal section
const LegalSection = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

// Terms and Conditions Content
const TermsContent = () => (
  <Box>
    <LegalSection title="1. Acceptance of Terms">
      <Typography paragraph>
        By creating an account and using the Manara platform ("Service"), you
        agree to be bound by these Terms and Conditions ("Terms"). If you do not
        agree to these Terms, you may not use the Service. These Terms apply to
        all users, including Basic and Pro subscribers.
      </Typography>
    </LegalSection>

    <LegalSection title="2. Subscription Plans & Payments">
      <Typography variant="h6" gutterBottom>
        2.1. Basic Plan
      </Typography>
      <Typography paragraph>
        The Basic Plan is free of charge and allows users to browse exam
        questions. Features such as viewing answers, AI explanations, and
        accessing full course content are restricted.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2.2. Pro Plan
      </Typography>
      <Typography paragraph>
        The Pro Plan is a paid subscription that grants full access to all
        features of the Service. The fee is 50 AED per month. Payments are
        handled securely through our third-party payment processor, Stripe. By
        subscribing to the Pro Plan, you agree to Stripe's terms of service.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2.3. Cancellation
      </Typography>
      <Typography paragraph>
        You may cancel your Pro subscription at any time through the Settings
        page. Your access to Pro features will continue until the end of your
        current billing period. No refunds will be issued for partial months.
      </Typography>
    </LegalSection>

    <LegalSection title="3. User Accounts & Responsibilities">
      <Typography paragraph>
        You are responsible for maintaining the confidentiality of your account,
        which is managed through Firebase Authentication. You agree to provide
        accurate information and to not share your account with others. You are
        responsible for all activities that occur under your account.
      </Typography>
    </LegalSection>

    <LegalSection title="4. Acceptable Use Policy">
      <Typography paragraph>
        You agree not to use the Service for any unlawful purpose. You may not
        systematically copy, scrape, or redistribute the questions, answers, or
        other content provided on this platform. The AI explanation feature is
        for personal educational use and its output should not be submitted as
        your own work.
      </Typography>
    </LegalSection>

    <LegalSection title="5. Intellectual Property">
      <Typography paragraph>
        All content on this Service, including exam questions, course materials,
        and the user interface, is the property of Manara and is protected by
        copyright laws. User-generated content, such as discussion posts and
        professor ratings, grants us a license to display it on the platform.
      </Typography>
    </LegalSection>

    <LegalSection title="6. Disclaimers and Limitation of Liability">
      <Typography paragraph>
        The Service is provided on an "as is" and "as available" basis. While we
        strive for accuracy, we do not guarantee that the content is error-free.
        We are not liable for any academic outcomes, including grades or exam
        results, that may result from the use of this Service. Our liability is
        limited to the maximum extent permitted by law.
      </Typography>
    </LegalSection>

    <LegalSection title="7. Governing Law">
      <Typography paragraph>
        These Terms shall be governed by and construed in accordance with the
        laws of the United Arab Emirates. Any disputes arising from these Terms
        will be subject to the exclusive jurisdiction of the courts of Abu
        Dhabi.
      </Typography>
    </LegalSection>
  </Box>
);

// Privacy Policy Content
const PrivacyContent = () => (
  <Box>
    <LegalSection title="1. Introduction">
      <Typography paragraph>
        This Privacy Policy outlines how Manara collects, uses, and protects
        your personal data. We are committed to safeguarding your privacy in
        compliance with the UAE's Federal Decree-Law No. 45 of 2021 on the
        Protection of Personal Data (PDPL).
      </Typography>
    </LegalSection>

    <LegalSection title="2. Data We Collect">
      <Typography variant="h6" gutterBottom>
        2.1. Information You Provide
      </Typography>
      <Typography paragraph>
        <b>Account Information:</b> When you sign up using Firebase
        Authentication, we collect your email address, display name, and unique
        Firebase User ID (UID).
      </Typography>
      <Typography paragraph>
        <b>User-Generated Content:</b> We collect data you voluntarily submit,
        including professor ratings, reviews, and messages in discussion forums.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2.2. Information from Third Parties
      </Typography>
      <Typography paragraph>
        <b>Payment Information:</b> When you subscribe to our Pro Plan, your
        payment is processed by Stripe. We do not store your credit card
        details. We receive a customer ID and subscription status from Stripe to
        manage your account.
      </Typography>
    </LegalSection>

    <LegalSection title="3. How We Use Your Data">
      <Typography paragraph>
        <b>To Provide the Service:</b> To manage your account, provide access
        based on your subscription plan, and display your contributions (e.g.,
        discussion posts).
      </Typography>
      <Typography paragraph>
        <b>AI Explanations:</b> The text of a question you select is sent to the
        Google Gemini API to generate an explanation. We do not send any of your
        personal information with this request.
      </Typography>
      <Typography paragraph>
        <b>Communication:</b> To send you important notices about your account
        or subscription.
      </Typography>
    </LegalSection>

    <LegalSection title="4. Data Protection and Security">
      <Typography paragraph>
        We implement appropriate technical and organizational measures to
        protect your data against unauthorized access, alteration, or
        destruction. Your password is managed and secured by Firebase
        Authentication.
      </Typography>
    </LegalSection>

    <LegalSection title="5. Your Rights">
      <Typography paragraph>
        Under the UAE PDPL, you have the right to access, correct, or request
        the deletion of your personal data. You can manage your profile
        information through the Settings page. For other requests, please
        contact us at [Your Contact Email].
      </Typography>
    </LegalSection>

    <LegalSection title="6. Cookies">
      <Typography paragraph>
        We use essential cookies to manage your session and authentication
        status. We do not use cookies for tracking or advertising purposes.
      </Typography>
    </LegalSection>

    <LegalSection title="7. Changes to This Policy">
      <Typography paragraph>
        We may update this Privacy Policy from time to time. We will notify you
        of any significant changes. Continued use of the Service after such
        changes constitutes your acceptance of the new policy.
      </Typography>
    </LegalSection>
  </Box>
);

const LegalPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        Legal Information
      </Typography>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Terms and Conditions" />
            <Tab label="Privacy Policy" />
          </Tabs>
        </Box>
        {tabIndex === 0 && <TermsContent />}
        {tabIndex === 1 && <PrivacyContent />}
      </Paper>
    </Container>
  );
};

export default LegalPage;
