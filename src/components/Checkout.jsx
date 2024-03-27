import { useContext } from 'react';
import orders from '../../backend/data/orders.js';

import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
// import useHttp from '../hooks/useHttp.js';
// import Error from './Error.jsx';

// const requestConfig = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);


  // const {
  //   data,
  //   isLoading: isSending,
  //   error,
  //   sendRequest,
  //   clearData
  // } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const orderData = Object.fromEntries(fd.entries()); // { email: test@example.com }
    console.log(orderData);

    // sendRequest(
    //   JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customerData,
    //     },
    //   })
    // );
    if (orderData === null || orderData.items === null) {
      alert('missing data');
    }
  
    if (
      orderData.customer.email === null ||
      !orderData.customer.email.includes('@') ||
      orderData.customer.name === null ||
      orderData.customer.name.trim() === '' ||
      orderData.customer.street === null ||
      orderData.customer.street.trim() === '' ||
      orderData.customer['postal-code'] === null ||
      orderData.customer['postal-code'].trim() === '' ||
      orderData.customer.city === null ||
      orderData.customer.city.trim() === ''
    ) {
      // return res.status(400).json({
      //   message:
      //     'Missing data: Email, name, street, postal code or city is missing.',
      alert('missing data Email, name, street, postal code or city is missing.')
      
    }
  
    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };
    // const orders = await fs.readFile('./data/orders.json', 'utf8');
    // const allOrders = JSON.parse(orders);
    // allOrders.push(newOrder);
    // await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    // res.status(201).json({ message: 'Order created!' });
    orders.push(newOrder);
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // if (isSending) {
  //   actions = <span>Sending order data...</span>;
  // }

  if (orders !== null) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  // return (
  //   <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
  //     <form onSubmit={handleSubmit}>
  //       <h2>Checkout</h2>
  //       <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

  //       <Input label="Full Name" type="text" id="name" />
  //       <Input label="E-Mail Address" type="email" id="email" />
  //       <Input label="Street" type="text" id="street" />
  //       <div className="control-row">
  //         <Input label="Postal Code" type="text" id="postal-code" />
  //         <Input label="City" type="text" id="city" />
  //       </div>

  //       {error && <Error title="Failed to submit order" message={error} />}

  //       <p className="modal-actions">{actions}</p>
  //     </form>
  //   </Modal>
  // );
}
