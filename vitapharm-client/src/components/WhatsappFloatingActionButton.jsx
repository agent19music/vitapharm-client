import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export default function WhatsappFloatingActionButton() {

  return (
      <FloatingWhatsApp
      
      phoneNumber="+971582301251"
      accountName="Vitapharm test"
      avatar="/logo.png"
      statusMessage="Typically replies within 20 minutes"
      chatMessage="Hello there! 👋 How can we help?"
      
      />
  )
}