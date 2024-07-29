import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export default function WhatsappFloatingActionButton() {

  return (
      <FloatingWhatsApp
      
      phoneNumber="+254708738083"
      accountName="Vitapharm"
      avatar="/logodark.jpeg"
      statusMessage="Typically replies within 20 minutes"
      chatMessage="Hello there! 👋 How can we help?"
      
      
      />
  )
}