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

interface WithdrawalProcessingEmailProps {
  username?: string;
  withdrawalId?: string;
  withdrawalAmount?: string;
  withdrawalCurrency?: string;
  withdrawalMethod?: string;
  destinationDetails?: string;
  estimatedTime?: string;
  submissionDate?: string;
  remainingBalance?: string;
}

export const WithdrawalProcessingEmail = ({
  username = "Valued Customer",
  withdrawalId = "WDR123456789",
  withdrawalAmount = "1,000.00",
  withdrawalCurrency = "USD",
  withdrawalMethod = "Bank Transfer",
  destinationDetails = "XXXX XXXX XXXX 5678",
  estimatedTime = "1-3 business days",
  submissionDate = "April 17, 2025 at 5:15 PM",
  remainingBalance = "250.00",
}: WithdrawalProcessingEmailProps) => {
  const baseUrl = "";

  return (
    <Html>
      <Head />
      <Preview>
        Your Withdrawal of {withdrawalAmount} {withdrawalCurrency} is Being
        Processed - MiniCEX
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
            <Heading style={h1}>Withdrawal In Progress</Heading>
            <Text style={heroText}>
              Hi {username}, we're currently processing your withdrawal of{" "}
              {withdrawalAmount} {withdrawalCurrency}.
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
                <Column style={detailLabel}>Submitted:</Column>
                <Column style={detailValue}>{submissionDate}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Estimated Completion:</Column>
                <Column style={detailValue}>{estimatedTime}</Column>
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
                href="https://minicex.com/withdrawals/status"
              >
                Check Withdrawal Status
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* What's Happening Section */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              What's Happening Now?
            </Heading>

            <Row style={stepsRow}>
              <Column style={stepContainer}>
                <Section style={completedStepCircle}>
                  <Text style={stepNumber}>✓</Text>
                </Section>
                <Text style={stepText}>
                  <strong>Request Received</strong>
                  <br />
                  Your withdrawal request has been received.
                </Text>
              </Column>

              <Column style={stepDivider}>
                <Hr style={stepLine} />
              </Column>

              <Column style={stepContainer}>
                <Section style={currentStepCircle}>
                  <Text style={stepNumber}>2</Text>
                </Section>
                <Text style={stepText}>
                  <strong>Processing</strong>
                  <br />
                  We're processing your withdrawal request.
                </Text>
              </Column>

              <Column style={stepDivider}>
                <Hr style={stepLine} />
              </Column>

              <Column style={stepContainer}>
                <Section style={futureStepCircle}>
                  <Text style={stepNumber}>3</Text>
                </Section>
                <Text style={stepText}>
                  <strong>Completion</strong>
                  <br />
                  Funds will be sent to your destination.
                </Text>
              </Column>
            </Row>

            <Text style={noteText}>
              <strong>Note:</strong> Withdrawal processing times may vary
              depending on your withdrawal method and financial institution.
              You'll receive another email once your withdrawal is complete.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Important Information */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Important Information
            </Heading>
            <Text style={text}>
              For security reasons, first-time withdrawals or large amounts may
              require additional verification. If we need any additional
              information, our team will contact you directly.
            </Text>
            <Text style={text}>
              Please ensure that the destination details you've provided are
              correct. MiniCEX is not responsible for funds sent to incorrect
              accounts due to user error.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Help Section */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Questions About Your Withdrawal?
            </Heading>
            <Text style={text}>
              If you didn't initiate this withdrawal or have any concerns,
              please contact our support team immediately.
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

export default WithdrawalProcessingEmail;

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
  marginBottom: "15px",
};

const h2 = {
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px",
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

const stepsRow = {
  marginTop: "20px",
};

const stepContainer = {
  textAlign: "center" as const,
  width: "30%",
};

const stepDivider = {
  width: "5%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const stepLine = {
  borderColor: "#e6ebf1",
  width: "100%",
  margin: "0",
};

const completedStepCircle = {
  backgroundColor: "#10b981", // Green for completed
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const currentStepCircle = {
  backgroundColor: "#6366f1",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const futureStepCircle = {
  backgroundColor: "#e6ebf1",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};

const stepNumber = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
};

const stepText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "0",
};

const noteText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  margin: "30px 0 0",
  padding: "15px",
  backgroundColor: "#f9fafc",
  borderLeft: "4px solid #6366f1",
  borderRadius: "0 5px 5px 0",
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
