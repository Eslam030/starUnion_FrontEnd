import React from 'react'
import './Contact.css'

const Contact = () => {
    return (
        <div className='contact' id='Contact'>
            <div className="title">
                <h1>Contact Us</h1>
                <p>Contact us 24 hours a day and speak with specialized Members </p>
            </div>
            <div className="contact_form">
                <form action="">
                    <h2>Get in Touch</h2>

                    <div className="name_form">
                        <div className="row">
                            <label>Name</label>
                            <input type="text" name="Name" placeholder='John' required />
                        </div>
                        <div className="row">
                            <label>Last Name</label>
                            <input type="text" name="Last name" placeholder='Doe' required />
                        </div>
                    </div>

                    <label>Mail</label>
                    <input type="mail" name="Email" placeholder='Johndoe@mail.net' required />

                    <label>Phone Number</label>
                    <input type='tel' name="Phone" placeholder='+20 106 347 8352' required />

                    <label>Description</label>
                    <textarea name="Message" rows="4" required></textarea>

                <div className="sub_form">
                    <button type='submit'>Send Message</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Contact