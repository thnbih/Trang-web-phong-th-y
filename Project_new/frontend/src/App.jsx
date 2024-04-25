import React, { useEffect , useState } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import DashBoard from './components/DashBoard';
// import BoiBaiTarot from './components/BoiBaiTarot/BoiBaiTarot';
// import BoiBai52La from './components/BoiBai52La';
// import BoiNgaySinh from './components/BoiNgaySinh';
// import BaiVietBlog from './components/BaiVietBlog';
// import SignUp from './components/SignUp';
import './App.css';
// import { response } from 'express';

function App(){
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, []);

//   const [currentComponent, setCurrentComponent] = useState('Dashboard');

//   const handleNavLinkClick = (componentName) => {
//     setCurrentComponent(componentName);
//   };

//   const renderComponent = () => {
//     switch (currentComponent) {
//       case 'Dashboard':
//         return <DashBoard />;
//       case 'BoiBaiTarot':
//         return <BoiBaiTarot />;
//       case 'BaiTay':
//         return <BoiBai52La />;
//       case 'BoiNgaySinh':
//         return <BoiNgaySinh />;
//       case 'BaiVietBlog':
//         return <BaiVietBlog />;
//       case 'Account':
//         return <SignUp/>
//       default:
//         return <DashBoard />;
//     }
//   };

//   return (
//     <>
//       <header>
//         <Header onNavLinkClick={handleNavLinkClick} />
//       </header>
//       <div>{renderComponent()}</div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// }

}


export default App;


// function App() {

// export default App;
