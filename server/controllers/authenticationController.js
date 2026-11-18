const nodemailer = require("nodemailer");
const User = require('../models/userModel')

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "shakirhusain1414@gmail.com",
    pass: "kpuggruozyyycezy",
  },
});

const registrationController = async (req, res) => {
  let { fullname, email, password, confirmPassword } = req.body;

  if (!fullname || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exist.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }

  let user = new User({
    fullname,
    email,
    password,
  });

  await user.save();

  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <shakirhusain1414@gmail.com>', // sender address
      to: email, // list of recipients
      subject: `Hello ${fullname}`, // subject line
      html: `<body style="margin:0;padding:0;background:#f5f7f7;font-family:Arial,Helvetica,sans-serif;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f7;padding:32px 16px;"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><tr><td style="background:#0f4c5c;padding:24px 32px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#f2b134;color:#0f4c5c;font-weight:bold;font-size:18px;width:36px;height:36px;text-align:center;border-radius:8px;">✓<td style="padding-left:12px;color:#ffffff;font-size:18px;font-weight:bold;">Students Attendance</table><tr><td style="padding:36px 32px 12px;"><h1 style="margin:0 0 12px;font-size:24px;color:#0f4c5c;">Confirm your email address</h1><p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#334155;">Hi ${fullname},<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;">Thanks for creating an account. Confirm your email so you can log in and start taking attendance.<tr><td align="center" style="padding:0 32px 24px;"><a href target="_blank" style="display:inline-block;background:#0f4c5c;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;padding:14px 32px;border-radius:8px;">Verify email</a><tr><td style="padding:0 32px 32px;"><p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#64748b;">If the button doesn't work, paste this link into your browser:<p style="margin:0;font-size:13px;line-height:1.5;word-break:break-all;"><a href style="color:#0f4c5c;">url</a><tr><td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;"><p style="margin:0;font-size:13px;line-height:1.6;color:#94a3b8;">This link is valid for 24 hours. If you didn't create an account, ignore this email.</table></table>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  res.status(201).json({
    success: true,
    message: "Registration done",
  });
};


const loginController = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  let existingUser = await User.findOne({ email: email });
  if (!existingUser || existingUser.password !== password) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Login done",
    user: {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.fullname
    }
  });
};


module.exports = { registrationController, loginController };