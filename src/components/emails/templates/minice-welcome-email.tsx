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
  } from "@react-email/components"
  
  interface WelcomeEmailProps {
    username?: string
  }
  
  export const WelcomeEmail = ({ username = "Valued Customer" }: WelcomeEmailProps) => {
    const baseUrl = ""
  
    return (
      <Html>
        <Head />
        <Preview>Welcome to MiniCEX - Your Gateway to Gift Cards & Crypto Trading</Preview>
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
              <Heading style={h1}>Welcome to MiniCEX!</Heading>
              <Text style={heroText}>
                Hi {username}, we're thrilled to have you join our community of gift card and crypto enthusiasts.
              </Text>
            </Section>
  
            <Hr style={hr} />
  
            {/* Main Content */}
            <Section style={section}>
              <Text style={text}>
                MiniCEX is your all-in-one platform for seamlessly trading gift cards and cryptocurrencies. We've designed
                our app to be intuitive, secure, and rewarding.
              </Text>
  
              <Heading as="h2" style={h2}>
                Get Started in 3 Simple Steps
              </Heading>
  
              <Row style={featuresRow}>
                <Column style={feature}>
                  <Heading as="h3" style={h3}>
                    Complete Your Profile
                  </Heading>
                  <Text style={featureText}>Verify your account to unlock all trading features and higher limits.</Text>
                </Column>
  
                <Column style={feature}>
                  <Heading as="h3" style={h3}>
                    Fund Your Account
                  </Heading>
                  <Text style={featureText}>Add funds using your preferred payment method to start trading.</Text>
                </Column>
  
                <Column style={feature}>
                  <Heading as="h3" style={h3}>
                    Start Trading
                  </Heading>
                  <Text style={featureText}>Buy, sell, and exchange gift cards and cryptocurrencies with ease.</Text>
                </Column>
              </Row>
  
              <Section style={ctaContainer}>
                <Button style={button} href="https://minicex.com/dashboard">
                  Explore Your Dashboard
                </Button>
              </Section>
            </Section>
  
            <Hr style={hr} />
  
            {/* Features Highlight */}
            <Section style={section}>
              <Heading as="h2" style={h2}>
                Why Choose MiniCEX?
              </Heading>
  
              <Row style={benefitsRow}>
                <Column style={benefit}>
                  <Heading as="h3" style={h3}>
                    🔒 Secure Trading
                  </Heading>
                  <Text style={benefitText}>
                    Advanced encryption and multi-factor authentication keep your assets safe.
                  </Text>
                </Column>
  
                <Column style={benefit}>
                  <Heading as="h3" style={h3}>
                    💸 Competitive Rates
                  </Heading>
                  <Text style={benefitText}>Get the best market rates for both gift cards and cryptocurrencies.</Text>
                </Column>
              </Row>
  
              <Row style={benefitsRow}>
                <Column style={benefit}>
                  <Heading as="h3" style={h3}>
                    ⚡ Fast Transactions
                  </Heading>
                  <Text style={benefitText}>Experience lightning-fast processing times for all your trades.</Text>
                </Column>
  
                <Column style={benefit}>
                  <Heading as="h3" style={h3}>
                    🌐 Global Access
                  </Heading>
                  <Text style={benefitText}>Trade from anywhere in the world with our mobile-friendly platform.</Text>
                </Column>
              </Row>
            </Section>
  
            <Hr style={hr} />
  
            {/* Help Section */}
            <Section style={section}>
              <Heading as="h2" style={h2}>
                Need Help?
              </Heading>
              <Text style={text}>Our support team is available 24/7 to assist you with any questions or concerns.</Text>
              <Section style={ctaContainer}>
                <Button style={secondaryButton} href="https://minicex.com/support">
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
                This email was sent to you because you signed up for MiniCEX. If you didn't create an account, please
                ignore this email or contact support.
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
              <Text style={footerLegalText}>MiniCEX Inc., 123 Trading Street, Fintech City, FC 12345</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    )
  }
  
  export default WelcomeEmail
  
  // Styles
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  }
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "600px",
  }
  
  const header = {
    backgroundColor: "#ffffff",
    padding: "20px 30px",
    borderRadius: "5px 5px 0 0",
    textAlign: "center" as const,
  }
  
  const logo = {
    margin: "0 auto",
  }
  
  const heroSection = {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    padding: "30px",
    textAlign: "center" as const,
    borderRadius: "0 0 5px 5px",
  }
  
  const h1 = {
    color: "#ffffff",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "0 0 15px",
    padding: "0",
    lineHeight: "1.3",
  }
  
  const heroText = {
    color: "#ffffff",
    fontSize: "18px",
    margin: "0",
    lineHeight: "1.5",
  }
  
  const section = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "5px",
    marginTop: "20px",
  }
  
  const text = {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#4c4c4c",
  }
  
  const h2 = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "30px 0 15px",
    padding: "0",
    color: "#333",
    lineHeight: "1.3",
  }
  
  const h3 = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px",
    padding: "0",
    color: "#333",
    lineHeight: "1.3",
  }
  
  const featuresRow = {
    marginTop: "20px",
  }
  
  const feature = {
    textAlign: "center" as const,
    padding: "0 10px",
  }
  
  const featureIcon = {
    margin: "0 auto 15px",
  }
  
  const featureText = {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#666",
    margin: "0",
  }
  
  const benefitsRow = {
    marginTop: "20px",
  }
  
  const benefit = {
    padding: "0 10px",
    marginBottom: "20px",
  }
  
  const benefitText = {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#666",
    margin: "0",
  }
  
  const ctaContainer = {
    textAlign: "center" as const,
    marginTop: "30px",
  }
  
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
  }
  
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
  }
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  }
  
  const footer = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "5px",
    marginTop: "20px",
    textAlign: "center" as const,
  }
  
  const socialLinks = {
    marginBottom: "20px",
  }
  
  const socialLink = {
    color: "#6366f1",
    textDecoration: "none",
    fontSize: "14px",
    margin: "0 10px",
  }
  
  const footerText = {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#666",
    margin: "0 0 10px",
  }
  
  const footerLegalText = {
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#999",
    margin: "0 0 10px",
  }
  
  const footerLink = {
    color: "#6366f1",
    textDecoration: "none",
  }
  