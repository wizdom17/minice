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

interface WithdrawalCompletedEmailProps {
  username?: string;
  withdrawalId?: string;
  withdrawalAmount?: string;
  withdrawalCurrency?: string;
  withdrawalMethod?: string;
  destinationDetails?: string;
  completionDate?: string;
  submissionDate?: string;
  remainingBalance?: string;
  processingTime?: string;
}

export const WithdrawalCompletedEmail = ({
  username = "Valued Customer",
  withdrawalId = "WDR123456789",
  withdrawalAmount = "1,000.00",
  withdrawalCurrency = "USD",
  withdrawalMethod = "Bank Transfer",
  destinationDetails = "XXXX XXXX XXXX 5678",
  completionDate = "April 19, 2025 at 10:30 AM",
  submissionDate = "April 17, 2025 at 5:15 PM",
  remainingBalance = "250.00",
  processingTime = "1 day, 17 hours",
}: WithdrawalCompletedEmailProps) => {
  const baseUrl = "";

  return (
    <Html>
      <Head />
      <Preview>
        Your Withdrawal of {withdrawalAmount} {withdrawalCurrency} Has Been
        Completed - MiniCEX
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
            <Heading style={h1}>Withdrawal Completed!</Heading>
            <Text style={heroText}>
              Hi {username}, your withdrawal of {withdrawalAmount}{" "}
              {withdrawalCurrency} has been successfully completed.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Success Message */}
          <Section style={successSection}>
            <Img
              src={`${baseUrl}/placeholder.svg?height=80&width=80`}
              width="80"
              height="80"
              alt="Success"
              style={successIcon}
            />
            <Heading as="h2" style={successHeading}>
              Funds Successfully Sent
            </Heading>
            <Text style={successText}>
              {withdrawalAmount} {withdrawalCurrency} has been successfully sent
              to your {withdrawalMethod.toLowerCase()} account. Please allow
              some time for the funds to appear in your account.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Withdrawal Details */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Withdrawal Details
            </Heading>

            <Section style={detailsContainer}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Withdrawal ID:</Column>
                <Column style={detailValue}>{withdrawalId}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Amount:</Column>
                <Column style={detailValue}>
                  {withdrawalAmount} {withdrawalCurrency}
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Method:</Column>
                <Column style={detailValue}>{withdrawalMethod}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Destination:</Column>
                <Column style={detailValue}>{destinationDetails}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Requested:</Column>
                <Column style={detailValue}>{submissionDate}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Completed:</Column>
                <Column style={detailValue}>{completionDate}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Processing Time:</Column>
                <Column style={detailValue}>{processingTime}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Remaining Balance:</Column>
                <Column style={detailValue}>
                  {remainingBalance} {withdrawalCurrency}
                </Column>
              </Row>
            </Section>

            <Section style={ctaContainer}>
              <Button
                style={button}
                href="https://minicex.com/withdrawals/history"
              >
                View Withdrawal History
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          <Hr style={hr} />

          {/* Help Section */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Questions About Your Withdrawal?
            </Heading>
            <Text style={text}>
              If you have any questions or concerns about this withdrawal, our
              support team is here to help.
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

export default WithdrawalCompletedEmail;

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

const successSection = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  marginTop: "20px",
  textAlign: "center" as const,
};

const successIcon = {
  margin: "0 auto 15px",
};

const successHeading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 15px",
  padding: "0",
  color: "#10b981", // Green color for success
  lineHeight: "1.3",
};

const successText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4c4c4c",
  margin: "0",
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

const optionsRow = {
  marginTop: "20px",
};

const option = {
  padding: "0 10px",
  textAlign: "center" as const,
};

const optionIcon = {
  margin: "0 auto 15px",
};

const optionText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "0 0 10px",
};

const optionLink = {
  color: "#6366f1",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
};

const ratingContainer = {
  textAlign: "center" as const,
  marginTop: "20px",
};

const ratingLink = {
  fontSize: "24px",
  margin: "0 5px",
  textDecoration: "none",
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
