import React from 'react'
import { Discord, Instagram, Twitter } from './Icons'
import SocialButton from './SocialButton'

// TODO: Add Socials Background (Alt Component)
const Socials = () => {
  // discord, instagram, twitter
  return (
    <div className='pointer-events-auto flex lg:flex-col lg:justify-center justify-between items-center absolute bottom-0 mb-3 lg:mb-0 lg:top-1/2 lg:right-0 lg:mr-8 lg:transform lg:-translate-y-1/2 z-[1000]'>
      <SocialButton href='https://discord.gg/dreamlab'>
        <Discord />
      </SocialButton>
      <SocialButton href='https://twitter.com/dreamlab'>
        <Twitter />
      </SocialButton>
      <SocialButton href='https://instagram.com/dreamlab'>
        <Instagram />
      </SocialButton>
    </div>
  )
}

export default Socials
