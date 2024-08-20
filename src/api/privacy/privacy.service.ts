import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivacyService {
  displayPrivacy() {
    const text = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Privacy Policy</title>
      </head>
      <body>
        <h1>Privacy Policy</h1>
        <p>Last updated: 21 August 2024</p>

        <p>Your privacy is important to us. This Privacy Policy explains how ECOS collects, uses, and discloses information about you when you use our mobile application.</p>

        <h2>1. Information We Collect</h2>
        <p>We do not collect personal information from our users. Our app is designed for all ages and does not require any form of registration or login.</p>

        <h2>2. How We Use Your Information</h2>
        <p>As we do not collect personal information, there is no data that we use, share, or disclose. Your use of the app is anonymous.</p>

        <h2>3. Children’s Privacy</h2>
        <p>Our app is intended for users of all ages. We do not knowingly collect or solicit personal information from children under 13 years of age. If we become aware that we have collected personal information from a child under 13, we will delete that information promptly.</p>

        <h2>4. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <p>By using our app, you agree to this Privacy Policy.</p>

        <p>ECOS</p>
      </body>
      </html>
    `;
    return text;
  }
}
