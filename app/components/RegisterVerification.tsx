import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const RegisterVerification = () => {
  const form = useRef<HTMLFormElement>(null);
  const [code, setCode] = useState('');

  const sendVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(verificationCode);

    // You may want to save this code somewhere to verify later

    emailjs.send(
      'service_g4zacyv',
      'template_ky7s5hb',
      {
        to_email: (form.current as any)?.user_email.value,
        code: verificationCode,
        name: (form.current as any)?.user_name.value,
      },
      'YjKLDC0rjHB1j1TAp'
    ).then(
      () => {
        alert('Verification code sent!');
      },
      (error) => {
        alert('Failed to send code: ' + error.text);
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendVerification}>
      <label>Full Name</label>
      <input type="text" name="user_name" required />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <button type="submit">Send Verification Code</button>
    </form>
  );
};