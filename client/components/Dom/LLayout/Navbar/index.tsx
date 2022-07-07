import { Burger } from './Burger'
import Dropdown from './Dropdown'
import Logo from './Logo'
import NavItems from './NavItems'

function Navbar() {
  return (
    <header className='absolute top-0 left-0 w-full flex justify-between min-h-12 p-8 2xl:p-8 pointer-events-auto z-[1000]'>
      <Logo />
      {/* <NavItems /> */}
      {/* <Burger /> */}
      {/* <Dropdown /> */}
    </header>
  )
}

export default Navbar
