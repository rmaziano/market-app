import { React, useEffect, useRef } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import './Header.css'

import { motion } from 'framer-motion'

import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import useAuth from '../../custom-hooks/useAuth'
import { auth } from '../../firebase.config'

const nav__links = [
  {
    path: 'home',
    display: 'Home',
  },
  {
    path: 'shop',
    display: 'Shop',
  },
  {
    path: 'cart',
    display: 'Cart',
  },
]

const Header = () => {
  /* useRef pour accéder à un élément du DOM et modifier ses propriétés ou ses classes CSS  */
  const headerRef = useRef(null)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const profileActionRef = useRef(null)

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 75 ||
        document.documentElement.scrollTop > 75
      ) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out')
        navigate('/home')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  useEffect(() => {
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle('show__profileActions')

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <div>
                <h1>Market</h1>
              </div>
            </div>

            <div className='navigation' ref={menuRef} onClick={menuToggle}>
              <ul className='menu'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav__active' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className='nav__icons'>
              <span className='fav__icon'>
                <i class='ri-heart-line'></i>
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i class='ri-shopping-bag-line'></i>
                <span className='badge'>{totalQuantity}</span>
              </span>

              <div className='profile'>
                <motion.img
                  whileTap={{ scale: 0.95 }}
                  src={userIcon}
                  alt=''
                  onClick={toggleProfileActions}
                />

                <div
                  className='profile__actions'
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center flex-col'>
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className='mobile__menu'>
                <span onClick={menuToggle}>
                  <i class='ri-menu-line'></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
