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

interface CompletedCryptoTradeEmailProps {
  username?: string;
  tradeId?: string;
  tradeType?: string;
  fromCrypto?: string;
  fromAmount?: string;
  toCrypto?: string;
  receivedAmount?: string;
  exchangeRate?: string;
  networkFee?: string;
  completionDate?: string;
  transactionHash?: string;
  walletBalance?: string;
}

export const CompletedCryptoTradeEmail = ({
  username = "Valued Customer",
  tradeId = "CTX123456789",
  tradeType = "Swap",
  fromCrypto = "Bitcoin (BTC)",
  fromAmount = "0.05",
  toCrypto = "Ethereum (ETH)",
  receivedAmount = "0.748",
  exchangeRate = "1 BTC ≈ 14.96 ETH",
  networkFee = "0.0005 BTC",
  completionDate = "April 17, 2025 at 3:45 PM",
  transactionHash = "0x7d9c4930a8c96ead14c0f40f2f40a5aef58d0cd30daf067c64067f34b0abc123",
  walletBalance = "0.748 ETH, 0.95 BTC",
}: CompletedCryptoTradeEmailProps) => {
  const baseUrl = "";

  return (
    <Html>
      <Head />
      <Preview>
        Your Crypto {tradeType} from {fromCrypto} to {toCrypto} Has Been
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
            <Heading style={h1}>Crypto Trade Completed!</Heading>
            <Text style={heroText}>
              Hi {username}, your {fromCrypto} to {toCrypto}{" "}
              {tradeType.toLowerCase()} has been successfully completed.
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
              Trade Successful
            </Heading>
            <Text style={successText}>
              Your {fromAmount} {fromCrypto} has been successfully exchanged for{" "}
              {receivedAmount} {toCrypto}.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Trade Details */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Trade Details
            </Heading>

            <Section style={detailsContainer}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Trade ID:</Column>
                <Column style={detailValue}>{tradeId}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Trade Type:</Column>
                <Column style={detailValue}>{tradeType}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Exchange Rate:</Column>
                <Column style={detailValue}>{exchangeRate}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Completion Date:</Column>
                <Column style={detailValue}>{completionDate}</Column>
              </Row>
            </Section>

            <Section style={ctaContainer}>
              <Button
                style={button}
                href={`https://etherscan.io/tx/${transactionHash}`}
              >
                View on Blockchain
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Market Analysis */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Market Insights
            </Heading>
            <Text style={text}>
              {toCrypto.split(" ")[0]} has shown a 5% increase over the past 24
              hours. Here's a quick market overview:
            </Text>

            <Section style={marketContainer}>
              <Row style={marketRow}>
                <Column style={marketLabel}>BTC/USD:</Column>
                <Column style={marketValue}>$63,245.00 (+2.3%)</Column>
              </Row>
              <Row style={marketRow}>
                <Column style={marketLabel}>ETH/USD:</Column>
                <Column style={marketValue}>$4,230.75 (+5.1%)</Column>
              </Row>
              <Row style={marketRow}>
                <Column style={marketLabel}>Market Trend:</Column>
                <Column style={marketValue}>Bullish</Column>
              </Row>
            </Section>

            <Section style={ctaContainer}>
              <Button style={secondaryButton} href="https://minicex.com/market">
                View Full Market Analysis
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />
          <Hr style={hr} />

          {/* Security Tips */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Security Reminder
            </Heading>
            <Text style={text}>
              For optimal security of your crypto assets, we recommend:
            </Text>
            <ul style={securityList}>
              <li style={securityItem}>
                Enabling two-factor authentication (2FA)
              </li>
              <li style={securityItem}>
                Using a hardware wallet for long-term storage
              </li>
              <li style={securityItem}>
                Regularly updating your account password
              </li>
              <li style={securityItem}>Being cautious of phishing attempts</li>
            </ul>
            <Section style={ctaContainer}>
              <Button
                style={secondaryButton}
                href="https://minicex.com/security"
              >
                Review Security Settings
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

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

export default CompletedCryptoTradeEmail;

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

const hashText = {
  fontFamily: "monospace",
  fontSize: "12px",
  overflowWrap: "break-word" as const,
};

const marketContainer = {
  backgroundColor: "#f9fafc",
  padding: "20px",
  borderRadius: "5px",
  marginTop: "15px",
  marginBottom: "20px",
};

const marketRow = {
  marginBottom: "10px",
};

const marketLabel = {
  width: "40%",
  fontWeight: "bold",
  color: "#666",
  fontSize: "14px",
};

const marketValue = {
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

const securityList = {
  paddingLeft: "20px",
  margin: "15px 0",
};

const securityItem = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#4c4c4c",
  margin: "8px 0",
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
