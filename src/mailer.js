import nodemailer from 'nodemailer';

const { EMAIL_NODEMAILER, PASS_NODEMAILER } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_NODEMAILER,
    pass: PASS_NODEMAILER
  }
});

export default transporter;