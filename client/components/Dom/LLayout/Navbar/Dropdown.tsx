import { motion } from 'framer-motion'
import useStore from '@hooks/useStore'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { Cross } from './Burger'
import NavItem from './NavItem'
import { NavConstants } from './NavConstants'

const variants = {
  open: { opacity: 1, y: '0' },
  closed: { opacity: 0, y: '-100%' },
}

// Dropdown offsets itself based on page padding.
const Dropdown = () => {
  const router = useStore((state) => state.router)
  const userInteractions = useStore((state) => state.userInteractions)

  return (
    <motion.nav
      className='md:hidden absolute top-0 left-0 w-full flex flex-col justify-between items-center min-h-12 py-10 pointer-events-auto bg-black text-hue-light z-20'
      animate={userInteractions?.isDropdownOpen ? 'open' : 'closed'}
      transition={{
        bounce: 0,
        duration: 0.2,
      }}
      variants={variants}
    >
      <Cross />
      {NavConstants.map(({ href, name, disabled }, i) => {
        return (
          <div key={uuidv4()} className='mt-8'>
            <NavItem
              onClick={() => {
                userInteractions?.setDropdownOpen(false)
                console.log('clicked')
              }}
              href={href}
              active={router?.asPath === href}
              disabled={disabled}
            >
              {name}
            </NavItem>
          </div>
        )
      })}
    </motion.nav>
  )
}

export default Dropdown
