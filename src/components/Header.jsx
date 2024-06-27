import React, { useState, useEffect, useRef } from 'react';
import MoralmLogo from '../assets/MoralmLogo.png';
import UserLogo from '../assets/UserLogo2.png';
import CartIcon from '../assets/ShopCartLogo.png';
import DropdownIcon from '../assets/dropdown.png';
import LogoutIcon from '../assets/logout.png'; // Import the logout icon
import CartPopup from './CartPopup';
import api from '../api'; // Import the axios instance

const styles = {
  topNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    position: 'relative',
    background: 'linear-gradient(to right, #467E18 0%, #467E18 12%, #699744 10%, #699744 15%, #81A862 20%, #81A862 20%, #90B274 20%, #90B274 100%)',
  },
  gradientBar: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  segment1: {
    height: '100%',
    backgroundColor: '#467E18',
    width: '20%',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
  },
  segment2: {
    height: '100%',
    backgroundColor: '#699744',
    width: '5%',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
  },
  segment3: {
    height: '100%',
    backgroundColor: '#81A862',
    width: '5%',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
  },
  segment4: {
    height: '100%',
    backgroundColor: '#90B274',
    width: '100%',
  },
  navLeft: {
    zIndex: '1',
    marginLeft: '1%',
  },
  navRight: {
    zIndex: '1',
    marginRight: '2%',
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    marginLeft: '20px',
    maxWidth: '130px',
  },
  userAvatar: {
    height: '40px',
    marginRight: '0px',
  },
  dropdownIcon: {
    height: '20px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  userInfo: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    lineHeight: '0.1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
    fontWeight: '700',
    fontFamily: 'DM Sans, sans-serif',
  },
  cartIcon: {
    height: '30px',
    cursor: 'pointer',
    marginRight: '20px',
  },
  dropdown: {
    position: 'absolute',
    right: '0',
    top: 'calc(100% + 10px)', // Adjust this to move it down
    backgroundColor: 'white',
    border: '1px solid #033324', // Add border
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: '1',
    padding: '10px',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    color: 'black',
    fontFamily: 'DM Sans, sans-serif',
    display: 'flex',
    justifyContent: 'space-between', // Align items with space between
    alignItems: 'center',
  },
  separator: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '5px 0', // Add margin to the separator
  },
  dropdownItemHover: {
    backgroundColor: '#f2f2f2',
  },
  dropdownItemIcon: {
    width: '20px',
    height: '20px',
    marginLeft: '10px',
  },
};

const Header = ({ batches, removeBatch }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const completedBatches = batches.filter(batch => batch.steps.every(step => step.completed));

  return (
    <nav style={styles.topNav}>
      <div style={styles.navLeft}>
        <img src={MoralmLogo} alt="Moralm Logo" style={styles.logoImg} />
      </div>
      <div style={styles.gradientBar}>
        <div style={styles.segment1}></div>
        <div style={styles.segment2}></div>
        <div style={styles.segment3}></div>
        <div style={styles.segment4}></div>
      </div>
      <div style={styles.navRight}>
        <img src={CartIcon} alt="Cart Icon" style={styles.cartIcon} onClick={toggleCart} />
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <img src={UserLogo} alt="User Avatar" style={styles.userAvatar} />
          <img src={DropdownIcon} alt="Dropdown Icon" style={styles.dropdownIcon} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div style={styles.dropdown} ref={dropdownRef}>
              <div
                style={{ ...styles.dropdownItem }}
                className="dropdown-item"
              >
                Profile
              </div>
              <div style={styles.separator}></div>
              <div
                style={{ ...styles.dropdownItem, color:'red' }}
                className="dropdown-item"
                onClick={() => alert('Logged out')}
              >
                Logout
                <img src={LogoutIcon} alt="Logout Icon" style={styles.dropdownItemIcon} />
              </div>
            </div>
          )}
        </div>
      </div>
      {isCartOpen && (
        <CartPopup batches={completedBatches} removeBatch={removeBatch} onClose={toggleCart} />
      )}
    </nav>
  );
};

export default Header;
