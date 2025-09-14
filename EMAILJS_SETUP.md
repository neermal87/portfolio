# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Follow the setup instructions to connect your Gmail account (cnirmal811@gmail.com)
5. Note down your Service ID (it will look like "service_xxxxxxx")

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

**Template ID:** `template_contact`

**Subject:** `New Contact from Portfolio: {{subject}}`

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

## Step 4: Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your "Public Key" (it will look like "user_xxxxxxxxxxxxxxxxx")
3. Copy this key

## Step 5: Update Your Code
1. Open `js/script.js`
2. Find line 21: `emailjs.init('YOUR_PUBLIC_KEY_HERE');`
3. Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key
4. Find line 235: `emailjs.send('service_portfolio', 'template_contact', {`
5. Replace `service_portfolio` with your actual service ID

## Step 6: Test Your Setup
1. Save all files
2. Refresh your website
3. Try sending a test message through the contact form
4. Check your Gmail inbox (cnirmal811@gmail.com)

## Important Notes:
- The free EmailJS plan allows 200 emails per month
- Make sure your Gmail account has 2-factor authentication enabled
- Keep your public key secure (it's safe to use in frontend code)

## Troubleshooting:
- If emails don't arrive, check your spam folder
- Make sure the service ID and template ID match exactly
- Verify your Gmail connection in EmailJS dashboard
