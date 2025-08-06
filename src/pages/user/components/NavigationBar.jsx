// import React, { useState, useEffect, useRef } from "react";
// import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import logo from "../../../assets/logo12.png"; // Adjust path as needed
// import ".//NavigationBar.css"

// // Import flag images (adjust paths based on your project structure)
// import enFlag from "../../../assets/eng.png"; // Updated paths
// import guFlag from "../../../assets/download (2).png";
// import hiFlag from "../../../assets/download (2).png";
// import knFlag from "../../../assets/download (2).png";
// import mlFlag from "../../../assets/download (2).png";
// import mrFlag from "../../../assets/download (2).png";
// import paFlag from "../../../assets/download (2).png";
// import taFlag from "../../../assets/download (2).png";
// import teFlag from "../../../assets/download (2).png";
// import arFlag from "../../../assets/Flag-United-Arab-Emirates.webp";

// const languages = [
//   { code: "en", name: "English", flag: enFlag },
//   { code: "gu", name: "Gujarati", flag: guFlag },
//   { code: "hi", name: "Hindi", flag: hiFlag },
//   { code: "kn", name: "Kannada", flag: knFlag },
//   { code: "ml", name: "Malayalam", flag: mlFlag },
//   { code: "mr", name: "Marathi", flag: mrFlag },
//   { code: "pa", name: "Punjabi", flag: paFlag },
//   { code: "ta", name: "Tamil", flag: taFlag },
//   { code: "te", name: "Telugu", flag: teFlag },
//   { code: "ar", name: "Arabic", flag: arFlag },
// ];

// const NavigationBar = () => {
//   const [currentLanguage, setCurrentLanguage] = useState(
//     languages.find(lang => lang.code === 'en') || languages[0]
//   );
//   const selectElement = useRef(document.querySelector('#google_translate_element select'));

//   useEffect(() => {
//     const updateLanguageFromGoogle = () => {
//       const el = selectElement.current;
//       if (el && el.value) {
//         const selectedGoogleLang = el.value;
//         const matchingLang = languages.find(lang => lang.code === selectedGoogleLang);
//         if (matchingLang && matchingLang.code !== currentLanguage.code) {
//           setCurrentLanguage(matchingLang);
//         }
//       } else {
//         const cookies = document.cookie.split(';').reduce((acc, cookie) => {
//           const [key, value] = cookie.trim().split('=');
//           acc[key] = value;
//           return acc;
//         }, {});
//         const googleLangCookie = cookies['googtrans']?.split('/').pop();
//         if (googleLangCookie) {
//           const matchingLang = languages.find(lang => lang.code === googleLangCookie);
//           if (matchingLang && matchingLang.code !== currentLanguage.code) {
//             setCurrentLanguage(matchingLang);
//           }
//         }
//       }
//     };

//     updateLanguageFromGoogle();
//     const intervalId = setInterval(updateLanguageFromGoogle, 2000);
//     const observerConfig = { attributes: true, childList: true, subtree: true };
//     const observer = new MutationObserver(updateLanguageFromGoogle);
//     if (selectElement.current) {
//       observer.observe(selectElement.current, observerConfig);
//     }
//     return () => {
//       clearInterval(intervalId);
//       observer.disconnect();
//     };
//   }, [currentLanguage]);

//   const handleLanguageChange = (langCode) => {
//     if (window.setLanguage) {
//       window.setLanguage(langCode);
//       const selectedLang = languages.find(lang => lang.code === langCode);
//       if (selectedLang) {
//         setCurrentLanguage(selectedLang);
//       }
//     }
//   };

//   return (
//     <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3" key={currentLanguage.code}>
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
//           <img
//             src={logo}
//             alt="Wyenfos Logo"
//             width="70"
//             height="70"
//             className="me-2"
//           />
//           <span className="fw-bold text-danger ">Wyenfos Infotech</span>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/about">About</Nav.Link>
//             <Nav.Link as={Link} to="/services">Services</Nav.Link>
//             <Nav.Link as={Link} to="/advertisements">Advertisements</Nav.Link>
//             <NavDropdown title="FutureOutlook" id="future-dropdown">
//               <NavDropdown.Item as={Link} to="/future/aim">Our Aim</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/team">Our Team</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/future/vision">Our Vision</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/clients">Our Clients</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/future/internship">Internship Opportunity</NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
//             <NavDropdown title="Languages" id="language-dropdown">
//               {languages.map((lang) => (
//                 <NavDropdown.Item
//                   key={lang.code}
//                   onClick={() => handleLanguageChange(lang.code)}
//                 >
//                   <img
//                     src={lang.flag}
//                     alt={lang.name}
//                     style={{ width: '20px', height: 'auto', marginRight: '5px', border: '1px solid #eee', verticalAlign: 'middle' }}
//                   />
//                   {lang.name}
//                 </NavDropdown.Item>
//               ))}
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default React.memo(NavigationBar);


import React, { useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import logo from "../../../assets/logo12.png"; // Adjust path as needed
import ".//NavigationBar.css";

// Import flag images (adjust paths based on your project structure)
import enFlag from "../../../assets/eng.png";
import guFlag from "../../../assets/download (2).png";
import hiFlag from "../../../assets/download (2).png";
import knFlag from "../../../assets/download (2).png";
import mlFlag from "../../../assets/download (2).png";
import mrFlag from "../../../assets/download (2).png";
import paFlag from "../../../assets/download (2).png";
import taFlag from "../../../assets/download (2).png";
import teFlag from "../../../assets/download (2).png";
import arFlag from "../../../assets/Flag-United-Arab-Emirates.webp";

const languages = [
  { code: "en", name: "English", flag: enFlag },
  { code: "gu", name: "Gujarati", flag: guFlag },
  { code: "hi", name: "Hindi", flag: hiFlag },
  { code: "kn", name: "Kannada", flag: knFlag },
  { code: "ml", name: "Malayalam", flag: mlFlag },
  { code: "mr", name: "Marathi", flag: mrFlag },
  { code: "pa", name: "Punjabi", flag: paFlag },
  { code: "ta", name: "Tamil", flag: taFlag },
  { code: "te", name: "Telugu", flag: teFlag },
  { code: "ar", name: "Arabic", flag: arFlag },
];

const NavigationBar = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    languages.find((lang) => lang.code === "en") || languages[0]
  );
  const selectElement = useRef(
    document.querySelector("#google_translate_element select")
  );
  const location = useLocation(); // Get current location

  useEffect(() => {
    const updateLanguageFromGoogle = () => {
      const el = selectElement.current;
      if (el && el.value) {
        const selectedGoogleLang = el.value;
        const matchingLang = languages.find(
          (lang) => lang.code === selectedGoogleLang
        );
        if (matchingLang && matchingLang.code !== currentLanguage.code) {
          setCurrentLanguage(matchingLang);
        }
      } else {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {});
        const googleLangCookie = cookies["googtrans"]?.split("/").pop();
        if (googleLangCookie) {
          const matchingLang = languages.find(
            (lang) => lang.code === googleLangCookie
          );
          if (matchingLang && matchingLang.code !== currentLanguage.code) {
            setCurrentLanguage(matchingLang);
          }
        }
      }
    };

    // Initial update
    updateLanguageFromGoogle();

    // Set up interval for polling (fallback)
    const intervalId = setInterval(updateLanguageFromGoogle, 2000);

    // Set up MutationObserver for more immediate updates
    const observerConfig = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(updateLanguageFromGoogle);
    // Observe a common parent if #google_translate_element isn't always present on mount
    const targetNode = document.getElementById("google_translate_element") || document.body;
    if (targetNode) {
      observer.observe(targetNode, observerConfig);
    }


    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, [currentLanguage]);

  const handleLanguageChange = (langCode) => {
    // Check if the Google Translate API is loaded and available
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      const selectEl = document.querySelector("#google_translate_element select");
      if (selectEl) {
        selectEl.value = langCode;
        // Manually trigger change event for Google Translate to pick up
        selectEl.dispatchEvent(new Event('change'));
      }
    } else if (window.setLanguage) {
      // Fallback to custom setLanguage if Google Translate isn't ready
      window.setLanguage(langCode);
    }

    const selectedLang = languages.find((lang) => lang.code === langCode);
    if (selectedLang) {
      setCurrentLanguage(selectedLang);
    }
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <Navbar
       bg="white"
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
      key={currentLanguage.code}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Wyenfos Logo"
            width="70"
            height="70"
            className="me-2"
          />
          <span className="fw-bold text-danger ">Wyenfos Infotech</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className={getNavLinkClass("/")}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={getNavLinkClass("/about")}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              className={getNavLinkClass("/services")}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/advertisements"
              className={getNavLinkClass("/advertisements")}
            >
              Advertisements
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/internship/apply"
              className={getNavLinkClass("/internship/apply")}
            >
              Internship Application
            </Nav.Link>

            <NavDropdown title="FutureOutlook" id="future-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/future/aim"
                className={
                  location.pathname.startsWith("/future/aim") ? "active" : ""
                }
              >
                Our Aim
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/team"
                className={
                  location.pathname.startsWith("/team") ? "active" : ""
                }
              >
                Our Team
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/future/vision"
                className={
                  location.pathname.startsWith("/future/vision") ? "active" : ""
                }
              >
                Our Vision
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/clients"
                className={
                  location.pathname.startsWith("/clients") ? "active" : ""
                }
              >
                Our Clients
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/future/internship"
                className={
                  location.pathname.startsWith("/future/internship")
                    ? "active"
                    : ""
                }
              >
                Internship Opportunity
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={Link}
              to="/contact"
              className={getNavLinkClass("/contact")}
            >
              Contact
            </Nav.Link>
            <NavDropdown
              title={
                <span>
                  <img
                    src={currentLanguage.flag}
                    alt={currentLanguage.name}
                    style={{
                      width: "20px",
                      height: "auto",
                      marginRight: "5px",
                      border: "1px solid #eee",
                      verticalAlign: "middle",
                      borderRadius: "2px",
                    }}
                  />
                  {currentLanguage.name}
                </span>
              }
              id="language-dropdown"
              align="end" // Align dropdown to the right
            >
              {languages.map((lang) => (
                <NavDropdown.Item
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={currentLanguage.code === lang.code ? "active" : ""}
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    style={{
                      width: "20px",
                      height: "auto",
                      marginRight: "5px",
                      border: "1px solid #eee",
                      verticalAlign: "middle",
                    }}
                  />
                  {lang.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(NavigationBar);