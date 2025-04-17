import React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface DepositConfirmationEmailProps {
  username?: string;
  depositAmount?: string;
  depositCurrency?: string;
  depositMethod?: string;
  transactionId?: string;
  depositDate?: string;
  accountBalance?: string;
}

export const DepositConfirmationEmail = ({
  username = "Valued Customer",
  depositAmount = "500.00",
  depositCurrency = "USD",
  depositMethod = "Bank Transfer",
  transactionId = "TRX123456789",
  depositDate = "April 17, 2025 at 12:30 AM",
  accountBalance = "500.00",
}: DepositConfirmationEmailProps) => {
  const baseUrl = "";

  return (
    <Html>
      <Head />
      <Preview>
        Your MiniCEX Deposit of {depositAmount} {depositCurrency} Has Been
        Confirmed
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/placeholder.svg?height=60&width=200`}
              width="200"
              height="60"
              alt="MiniCEX"
              style={logo}
            />
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>Deposit Confirmed!</Heading>
            <Text style={heroText}>
              Hi {username}, your deposit to MiniCEX has been successfully
              processed.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Deposit Details */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Deposit Details
            </Heading>

            <Section style={detailsContainer}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Amount:</Column>
                <Column style={detailValue}>
                  {depositAmount} {depositCurrency}
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Method:</Column>
                <Column style={detailValue}>{depositMethod}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{depositDate}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Transaction ID:</Column>
                <Column style={detailValue}>{transactionId}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Current Balance:</Column>
                <Column style={detailValue}>
                  {accountBalance} {depositCurrency}
                </Column>
              </Row>
            </Section>

            <Section style={ctaContainer}>
              <Button style={button} href="https://minicex.com/dashboard">
                View Transaction History
              </Button>
            </Section>
          </Section>
          <Hr style={hr} />
          <Hr style={hr} />
          {/* Security Note */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Security Note
            </Heading>
            <Text style={text}>
              For your security, we recommend enabling two-factor authentication
              (2FA) if you haven't already. This adds an extra layer of
              protection to your MiniCEX account.
            </Text>
            <Section style={ctaContainer}>
              <Button
                style={secondaryButton}
                href="https://minicex.com/security"
              >
                Enhance Your Security
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Help Section */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Questions About Your Deposit?
            </Heading>
            <Text style={text}>
              If you didn't make this deposit or have any concerns, please
              contact our support team immediately.
            </Text>
            <Section style={ctaContainer}>
              <Button
                style={secondaryButton}
                href="https://minicex.com/support"
              >
                Contact Support
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Follow us on social media:</Text>
            <Row style={socialLinks}>
              <Column>
                <Link style={socialLink} href="https://twitter.com/minicex">
                  Twitter
                </Link>
              </Column>
              <Column>
                <Link style={socialLink} href="https://facebook.com/minicex">
                  Facebook
                </Link>
              </Column>
              <Column>
                <Link style={socialLink} href="https://instagram.com/minicex">
                  Instagram
                </Link>
              </Column>
              <Column>
                <Link style={socialLink} href="https://telegram.com/minicex">
                  Telegram
                </Link>
              </Column>
            </Row>
            <Text style={footerText}>© 2025 MiniCEX. All rights reserved.</Text>
            <Text style={footerLegalText}>
              This is an automated message. Please do not reply to this email.
            </Text>
            <Text style={footerLegalText}>
              <Link href="https://minicex.com/privacy" style={footerLink}>
                Privacy Policy
              </Link>{" "}
              •
              <Link href="https://minicex.com/terms" style={footerLink}>
                {" "}
                Terms of Service
              </Link>
            </Text>
            <Text style={footerLegalText}>
              MiniCEX Inc., 123 Trading Street, Fintech City, FC 12345
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DepositConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#ffffff",
  padding: "20px 30px",
  borderRadius: "5px 5px 0 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const heroSection = {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  padding: "30px",
  textAlign: "center" as const,
  borderRadius: "0 0 5px 5px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "30px",
  fontWeight: "bold",
  margin: "0 0 15px",
  padding: "0",
  lineHeight: "1.3",
};

const heroText = {
  color: "#ffffff",
  fontSize: "18px",
  margin: "0",
  lineHeight: "1.5",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  marginTop: "20px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4c4c4c",
};

const h2 = {
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px",
  padding: "0",
  color: "#333",
  lineHeight: "1.3",
};

const h3 = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 10px",
  padding: "0",
  color: "#333",
  lineHeight: "1.3",
};

const detailsContainer = {
  backgroundColor: "#f9fafc",
  padding: "20px",
  borderRadius: "5px",
  marginBottom: "20px",
};

const detailRow = {
  marginBottom: "10px",
};

const detailLabel = {
  width: "40%",
  fontWeight: "bold",
  color: "#666",
  fontSize: "14px",
};

const detailValue = {
  width: "60%",
  color: "#333",
  fontSize: "14px",
};

const featuresRow = {
  marginTop: "20px",
};

const feature = {
  textAlign: "center" as const,
  padding: "0 10px",
};

const featureIcon = {
  margin: "0 auto 15px",
};

const featureText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "0 0 10px",
};

const featureLink = {
  color: "#6366f1",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
};

const ctaContainer = {
  textAlign: "center" as const,
  marginTop: "25px",
};

const button = {
  backgroundColor: "#6366f1",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  border: "1px solid #6366f1",
  color: "#6366f1",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  marginTop: "20px",
  textAlign: "center" as const,
};

const socialLinks = {
  marginBottom: "20px",
};

const socialLink = {
  color: "#6366f1",
  textDecoration: "none",
  fontSize: "14px",
  margin: "0 10px",
};

const footerText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "0 0 10px",
};

const footerLegalText = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#999",
  margin: "0 0 10px",
};

const footerLink = {
  color: "#6366f1",
  textDecoration: "none",
};
