import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { useAuth } from "../../assets/Context/UserAuth";
import { Container, Nav, Navbar } from "react-bootstrap";

interface Props {}

const Navbaar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (<> 
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">My web</Navbar.Brand>
          
           
          <Nav className="me-auto">
            {/* <Nav.Link href="/search">Search</Nav.Link> */}
            <Nav.Link href="/favorite">Favorite</Nav.Link>
          </Nav>

          
          {isLoggedIn() ? ( 
          <>
            <Navbar.Brand>Welcome, {user?.userName}</Navbar.Brand>

             
            <Nav className="me-auto">
              <Nav.Link onClick={logout} href="/search">Logout</Nav.Link>

            </Nav>
             {/* <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
             <a 
               onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Logout
            </a> */}
          </>
        ) : (
          <>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register" >SignUp</Nav.Link>

          {/* <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
                  </div> */}
          </Nav>
          </>
          )}
          
        </Container>
      </Navbar>
      
      </>)





    {/* // <nav className="relative container mx-auto p-6">
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center space-x-20">
    //       <Link to="/">
    //         <img src={logo} alt="" />
    //       </Link>
    //       <div className="hidden font-bold lg:flex">
    //         <Link to="/search" className="text-black hover:text-darkBlue">
    //           Search
    //         </Link>
    //       </div>
    //     </div>
    //     {isLoggedIn() ? ( */}
    {/* //       <div className="hidden lg:flex items-center space-x-6 text-back">
    //         <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
    //         <a */}
    {/* //           onClick={logout}
    //           className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
    //         >
    //           Logout
    //         </a>
    //       </div>
    //     ) : (
    //       <div className="hidden lg:flex items-center space-x-6 text-back">
    //         <Link to="/login" className="hover:text-darkBlue">
    //           Login
    //         </Link>
    //         <Link
    //           to="/register"
    //           className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
    //         >
    //           Signup
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </nav> */}
  
};

export default Navbaar;