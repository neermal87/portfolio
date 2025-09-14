# Quick EmailJS Setup for Direct Email Sending

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create account with your Gmail (cnirmal811@gmail.com)
3. Verify your email

## Step 2: Add Gmail Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail"
4. Click "Connect Account"
5. Sign in with cnirmal811@gmail.com
6. Allow permissions
7. Copy the Service ID (it will look like "service_xxxxxxx")

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use these exact settings:

**Template ID:** `template_contact`

**Subject:** `Portfolio Contact: {{subject}}`

**Content:**
```
Hello Nirmal,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

## Step 4: Get Your Keys
1. Go to "Account" tab
2. Copy your "Public Key" (starts with "user_")
3. Copy your "Service ID" (starts with "service_")

## Step 5: Update the Code
Replace these values in `js/script.js`:

Line 23: Replace `user_8QZxK9Y7vL2nR4pS1tM6w` with your actual public key
Line 250: Replace `service_8QZxK9Y7vL2nR4pS1tM6w` with your actual service ID

## Step 6: Test
1. Save the file
2. Refresh your website
3. Try sending a test message
4. Check your Gmail inbox

## Important Notes:
- Free plan allows 200 emails/month
- Make sure Gmail has 2FA enabled
- Service ID and Template ID must match exactly
- Keep your keys secure

## Troubleshooting:
- If emails don't arrive, check spam folder
- Verify Gmail connection in EmailJS dashboard
- Make sure template ID is exactly "template_contact"
- Check browser console for errors
