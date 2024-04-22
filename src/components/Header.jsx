import { useContext } from 'react';

import { Fab } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1><i>Foodee!</i></h1>
      </div>
      <nav>
        <Button  textOnly onClick={handleShowCart}>
          <Fab variant='extended' style={{backgroundColor : "#ffc404"}}><ShoppingCartOutlinedIcon style={{fontSize : 35}}/>  cart({totalCartItems})</Fab> 
          
        </Button>
        
      </nav>
    </header>
  );
}
