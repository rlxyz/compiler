import { motion } from 'framer-motion'
import useStore from '@hooks/useStore'
import classNames from 'classnames'
import Link from 'next/link'

type NavItemProps = {
  onClick?: () => void
  children: React.ReactNode
  href: string
  active: boolean
  disabled?: boolean
}

const NavItem = ({
  onClick,
  children,
  href,
  active = false,
  disabled = false,
}: NavItemProps) => {
  const router = useStore((state) => state.router)

  const handleClick = (e: any) => {
    e.preventDefault()
    if (!disabled) {
      router.push(href)
      onClick && onClick()
    }
  }

  return (
    <Link href={href}>
      <motion.a
        whileHover={{
          color: !active && '#AAABAC',
        }}
        href={href}
        transition={{
          duration: 0.2,
        }}
        onClick={(e) => handleClick(e)}
        className={classNames(
          `lg:text-xl text-sm uppercase font-kiona-bold ml-4 cursor-pointer pointer-events-auto z-[1000]`,
          active ? 'text-blend-pink' : 'text-white'
        )}
      >
        {children}
      </motion.a>
    </Link>
  )
}

export default NavItem
