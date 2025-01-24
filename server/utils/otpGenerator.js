exports.generateUniqueOtp = () => {
    let uniqueNumber = "";
    const digits = [];
  
    for (let i = 0; i < 10; i++) {
      digits.push(i);
    }
  
    for (let i = digits.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
  
    for (let i = 0; i < 6; i++) {
      uniqueNumber += digits[i];
    }
  
    if (uniqueNumber.length < 6) {
      const remainingDigits = 6 - uniqueNumber.length;
      for (let i = 0; i < remainingDigits; i++) {
        uniqueNumber += Math.floor(Math.random() * 10);
      }
    }
    return uniqueNumber;
  };

  exports.otpMessage = (otp, email) =>{
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "YOUR OTP CODE",
      html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your OTP Code</title>
  <style>
    /* Global Styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table {
      border-spacing: 0;
      width: 100%;
    }

    table td {
      padding: 0;
    }

    img {
      border: 0;
    }

    /* Container Styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Header Styles */
    .header {
      text-align: center;
      padding: 20px;
    }

    .header img {
      max-width: 100px;
      height: auto;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333333;
    }

    /* OTP Code Section */
    .otp-code {
      text-align: center;
      padding: 30px 0;
      font-size: 32px;
      font-weight: bold;
      color: #333333;
      letter-spacing: 4px;
    }

    /* Message Section */
    .message {
      text-align: center;
      padding: 10px 30px;
      font-size: 18px;
      line-height: 1.6;
      color: #666666;
    }

    /* Button Styles */
    .button-container {
      text-align: center;
      padding: 30px 0;
    }

    .button {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 15px 30px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 18px;
    }

    .button:hover {
      background-color: #45a049;
    }

    /* Footer Styles */
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999999;
    }

    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        padding: 15px;
      }

      .header h1 {
        font-size: 20px;
      }

      .otp-code {
        font-size: 28px;
      }

      .message {
        font-size: 16px;
      }

      .button {
        font-size: 16px;
        padding: 12px 25px;
      }
    }
  </style>
</head>

<body>
  <table role="presentation" class="container">
    <tr>
      <td class="header">
        <img src="https://yourdomain.com/logo.png" alt="Your Logo">
        <h1>Your One-Time Password (OTP)</h1>
      </td>
    </tr>
    <tr>
      <td class="otp-code">
        <!-- Insert OTP here -->
        ${otp}
      </td>
    </tr>
    <tr>
      <td class="message">
        Use the code above to complete your login. This code is valid for the next 10 minutes.
      </td>
    </tr>
    <tr>
      <td class="footer">
        If you didn't request this, please ignore this email or <a href="https://yourdomain.com/contact">contact support</a>.
        <br>
        &copy; 2024 Your Company. All rights reserved.
      </td>
    </tr>
  </table>
</body>

</html>
`,
    };

    return mailOptions;
  }