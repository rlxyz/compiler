import Link from 'next/link'

const SocialButton = ({ children, href }) => {
  return (
    <Link href={href}>
      <a href={href}>{children}</a>
    </Link>
  )
}

export default SocialButton
