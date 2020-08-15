import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { tryAutoSignIn } from './utils/authService';
import Navigation from './Navigation';


function Authentication(props) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let isSignedIn = tryAutoSignIn();
    setSignedIn(isSignedIn);
  }, [])

  return (
    <div className="App">
      <Navigation signedIn={signedIn} />
    </div>
  );
}

export default Authentication;


// import React, { Component } from 'react'
// import logo from './logo.svg';
// import { tryAutoSignIn } from './utils/authService';

// class Authentication extends Component {
//   state = {
//     signedIn: false
//   }

//   componentDidMount() {
//     let isSignedIn = tryAutoSignIn();
//     console.log("[Authentication] [signedIn] = " + isSignedIn);
//     this.setState({signedIn : isSignedIn})
//   }


//   render() {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// export default Authentication;