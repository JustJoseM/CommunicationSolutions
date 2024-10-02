const sendEmail = async () => {
    const msg = {
      to: 'recipient@example.com',  // Change to your recipient's email
      from: 'your-email@domain.com', // Change to your verified sender email
      subject: 'Appointment Confirmation',
      text: 'Your appointment has been successfully scheduled.',
      html: '<strong>Your appointment has been successfully scheduled.</strong>',
    };
  
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error.response.body);
    }
  };
  
  // Call the function to send the email
  sendEmail();