import React from 'react'

function Contact() {
  return (
    <div className='contact-container'>
      <div className='contact-poster'>
        <img src='./assets/contact.png' width='100%'/>
      </div>
      <div className='contact-form'>
        <div className='glassmorphism'>
          <div className='glass-item'>
            <div className='circle'></div>
            <h3>+94712176827</h3>
          </div>
          <div className='glass-item'>
            <div className='circle'></div>
            <h3>No.210/B, Samupakara mawatha,hello Address</h3>
          </div>
          <div className='glass-item'>
            <div className='circle'></div>
            <h3>sample@gmail.com</h3>
          </div>
        </div>
        <div className='map-component'>
        <iframe
            title='Google Map'
            width='90%'
            height='300px'
            frameBorder='0'
            style={{ borderRadius: 20 }}
            src='https://www.google.com/maps/@6.8048712,79.9490249,15z?entry=ttu'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact