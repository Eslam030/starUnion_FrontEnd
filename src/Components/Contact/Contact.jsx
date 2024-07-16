import React from "react";
import "./Contact.css";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a9d4cd84-319f-4f80-8f35-483e452ad122"); // For Email 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="contact" id="Contact">
      <div className="title">
        <h1>Contact Us</h1>
        <p>Contact us 24 hours a day and speak with specialized Members </p>
      </div>
      <div className="contact_form">
        <form action="" onSubmit={onSubmit}>
          <h2>Get in Touch</h2>

          <div className="name_form">
            <div className="row">
              <label>Name</label>
              <input type="text" name="First Name" placeholder="John" required />
            </div>
            <div className="row">
              <label>Last Name</label>
              <input type="text" name="Last name" placeholder="Doe" required />
            </div>
          </div>

          <label>Mail</label>
          <input
            type="mail"
            name="Email"
            placeholder="Johndoe@mail.net"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="Phone"
            placeholder="+20 106 347 8352"
            required
          />

          <label>Description</label>
          <textarea name="Message" rows="4" required></textarea>

          <div className="sub_form">
            <button type="submit">Send Message</button>
          </div>
          <span className="progress">{result}</span>
        </form>
      </div>
    </div>
  );
};

export default Contact;
