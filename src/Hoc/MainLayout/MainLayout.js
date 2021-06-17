import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
// import style from './mainLayout.module.scss';

function MainLayout(props) {
  return (
    <React.Fragment>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </React.Fragment>
  );
}

export default MainLayout;
