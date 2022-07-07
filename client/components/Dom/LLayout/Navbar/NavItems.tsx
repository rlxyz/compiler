import useStore from '@hooks/useStore'
import NavItem from './NavItem'
import { v4 as uuidv4 } from 'uuid'
import { NavConstants } from './NavConstants'

const NavItems = () => {
  const router = useStore((state) => state.router)
  return (
    <nav className='hidden md:flex text-white justify-center items-center'>
      {NavConstants.map(({ href, name, disabled }) => {
        return (
          <NavItem
            key={uuidv4()}
            href={href}
            active={router?.asPath === href}
            disabled={disabled}
          >
            {name}
          </NavItem>
        )
      })}
    </nav>
  )
}

export default NavItems
