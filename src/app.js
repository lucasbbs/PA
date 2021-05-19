import React from 'react';
import InvestmentDetails from 'views/InvestmentDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function app() {
  return (
    <Router>
      <Route path='/investment/:id' component={InvestmentDetails}></Route>
    </Router>
  );
}
//import { func } from 'prop-types';
// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
