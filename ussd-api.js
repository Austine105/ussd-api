// https://github.com/habbes/ussd-menu-builder
const express = require('express');
const router = express.Router();
const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();


// Define menu states
menu.startState({
   run: () => {
      // use menu.con() to send response without terminating session      
      menu.con('Welcome. Choose option:' +
         '\n1. Show Balance' +
         '\n2. Buy Airtime');

      console.log('sessionId: ' + menu.args.sessionId);
   },
   // next object links to next state based on user input
   next: {
      '1': 'showBalance',
      '2': 'buyAirtime'
   }
});

menu.state('showBalance', {
   run: () => {
      // fetch balance
      // fetchBalance(menu.args.phoneNumber)
      // .then(function (bal) {
      //    // use menu.end() to send response and terminate session
      //    menu.end('Your balance is KES ' + bal);
      // });
      menu.end('Your balance is ₦' + '444');
   }
});

menu.state('buyAirtime', {
   run: () => {
      menu.con('Enter amount:');
   },
   next: {
      // using regex to match user input to next state
      '*\\d+': 'buyAirtime.amount'
   }
});

// nesting states
menu.state('buyAirtime.amount', {
   run: () => {
      // use menu.val to access user input value
      var amount = Number(menu.val);

      menu.con('Confirm purchase of ₦' + amount +
         '\n1. Yes' +
         '\n2. No');
   },
   next: {
      // using regex to match user input to next state
      '1': 'buyAirtime.confirm',
      '2': '__start__'  // go to start state
   },
   defaultNext: 'buyAirtime'
});

menu.state('buyAirtime.confirm', {
   run: () => {
      // use menu.val to access user input value
      var amount = Number(menu.val);

      // buyAirtime(menu.args.phoneNumber, amount)
      // .then(function (res) {
      //    menu.end('Airtime bought successfully.');
      // });
      menu.end('Airtime bought successfully.');
   }
});

// it also handles session errors
menu.on('error', (err) => {
   // handle errors
   console.log('Error', err);
});

// Registering USSD handler with Express
router.post('/ussd', (req, res) => {
   menu.run(req.body, ussdResult => {
      res.send(ussdResult);
   });
});

module.exports = router;