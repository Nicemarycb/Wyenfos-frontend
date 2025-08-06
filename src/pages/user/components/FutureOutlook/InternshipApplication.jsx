// import React, { useState } from "react";
// import { Container, Row, Col, Button, Form, Alert, Modal, Card } from "react-bootstrap";
// import styled from "styled-components";
// import { Briefcase, People, Star, Phone, CodeSlash, Image, Palette } from "react-bootstrap-icons";
// import gr1 from "../../../../assets/56.png";
// import ui from "../../../../assets/8.png";
// import flutterImage from "../../../../assets/bnb.png";
// import mernImage1 from "../../../../assets/6.png";
// import mernImage2 from "../../../../assets/7.png";
// import fullstackLogo from "../../../../assets/js.png";
// import fullstackLogo1 from "../../../../assets/HTML5_Logo_512.png"
// import fullstackLogo2 from "../../../../assets/ex.png"
// import fullstackLogo3 from "../../../../assets/2.png"
// import fullstackLogo4 from "../../../../assets/4.png"
// import fullstackLogo5 from "../../../../assets/Untitled-2.png"
// import fullstackLogo6 from "../../../../assets/44.png"
// import fullstackLogo7 from "../../../../assets/78 (1).png"


// // Custom styled components with animations and hover effects
// const CustomSection = styled.div`
//   background: ${(props) => (props.bgLight ? "linear-gradient(135deg, #f8f9fa, #e9ecef)" : "#ffffff")};
//   border-radius: 1rem;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
//   padding: 2rem;
//   margin-bottom: 2rem;
//   transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
//   animation: fadeIn 1s ease-in;

//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
// `;

// const ProgramCard = styled(Card)`
//   border: none;
//   border-radius: 0.75rem;
//   overflow: hidden;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   background: #fff;

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
//   }

//   .card-body {
//     transition: background 0.3s ease;
//   }

//   &:hover .card-body {
//     background: linear-gradient(135deg, #f0f8ff, #e6f0ff);
//   }
// `;

// const CustomButton = styled(Button)`
//   padding: 0.75rem 2rem;
//   font-weight: 600;
//   transition: all 0.3s ease;
//   background: linear-gradient(90deg, #007bff, #00d4ff);
//   border: none;

//   &:hover {
//     background: linear-gradient(90deg, #0056b3, #0096cc);
//     transform: translateY(-2px);
//     box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
//   }
// `;

// const SectionWrapper = styled.div`
//   position: relative;
//   background: linear-gradient(180deg, #e6f0ff, #ffffff);
//   animation: gradientShift 10s ease infinite;
//   background-size: 200% 200%;

//   @keyframes gradientShift {
//     0% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//     100% { background-position: 0% 50%; }
//   }
// `;

// const TextAnimated = styled.p`
//   animation: textFade 1.5s ease-in-out;

//   @keyframes textFade {
//     from { opacity: 0; transform: translateX(-10px); }
//     to { opacity: 1; transform: translateX(0); }
//   }
// `;

// const HoverImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   width: 250px;
//   margin-bottom: 20px;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   }
// `;

// const EnlargedImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   margin: 0 auto;
// `;

// const EnhancedCard = styled(Card)`
//   border: 2px solid #007bff;
//   border-radius: 1rem;
//   background: linear-gradient(135deg, #ffffff, #f0f8ff);
//   transition: all 0.3s ease;

//   &:hover {
//     border-color: #0056b3;
//     transform: scale(1.02);
//     box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
//   }
// `;

// const InfoCard = styled(Card)`
//   background: linear-gradient(135deg, #e9ecef, #ffffff);
//   border: none;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   text-align: center;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
//   }
// `;

// const ShadowImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   width: 250px;
//   margin-bottom: 20px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   }
// `;

// const LogoImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   width: 150px; /* Optimized size for alignment */
//   margin: 10px; /* Consistent spacing */
//   transition: transform 0.3s ease, box-shadow 0.3s ease, rotate 0.3s ease;
//   transform-origin: center;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

//   &:hover {
//     transform: scale(1.1) rotate(5deg);
//     box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
//   }
// `;

// const trainingPrograms = [
//   {
//     title: "Flutter Developer",
//     description: "Create high-performance mobile apps for Android and iOS using Flutter and Dart. Work on real-world projects, mastering state management, APIs, and responsive UI design.",
//     skills: [
//       "Dart Programming Fundamentals",
//       "Flutter Widgets & UI Components",
//       "Navigation & Routing",
//       "State Management (Provider, Riverpod, Bloc)",
//       "RESTful APIs & Firebase Integration",
//       "Local Database (Hive, SQLite)",
//       "Form Validation & User Input Handling",
//       "Custom Themes & Third-Party Packages",
//     ],
//     duration: "6 Months Internship & 6 Months Training",
//     notes: "Earn a 1-year work experience certificate upon completion.",
//     icon: <Phone size={40} className="text-primary mb-3" />,
//   },
//   {
//     title: "MERN Stack Development",
//     description: "Master MongoDB, Express, React, and Node.js to build dynamic web applications. Focus on modern JavaScript, API design, and deployment techniques.",
//     skills: [
//       "Modern JavaScript (ES6+)",
//       "React.js Fundamentals & Hooks",
//       "Node.js & Express Server Setup",
//       "MongoDB CRUD Operations",
//       "RESTful API Design & Integration",
//       "Authentication (JWT, OAuth)",
//       "Middleware & Routing",
//       "File Uploads & Form Handling",
//     ],
//     duration: "6 Months Internship & 6 Months Training",
//     notes: "Earn a 1-year work experience certificate upon completion.",
//     icon: <CodeSlash size={40} className="text-success mb-3" />,
//   },
//   {
//     title: "Full Stack Web Development",
//     description: "Develop end-to-end web solutions with expertise in front-end and back-end technologies. Learn version control, deployment, and responsive design.",
//     skills: [
//       "Version Control with Git & GitHub",
//       "Deployment (Render, Vercel, Heroku)",
//       "HTML5, CSS3, and JavaScript (ES6+)",
//       "Responsive Web Design (Flexbox & Grid)",
//       "DOM Manipulation and Event Handling",
//       "Error Handling & Input Validation",
//     ],
//     duration: "6 Months Internship & 6 Months Training",
//     notes: "Earn a 1-year work experience certificate upon completion.",
//     icon: <CodeSlash size={40} className="text-success mb-3" />,
//   },
//   {
//     title: "UI/UX Design",
//     description: "Design intuitive digital products using Figma and Adobe XD. Learn user research, wireframing, prototyping, and accessibility to create user-friendly interfaces.",
//     skills: [
//       "Principles of UI/UX Design",
//       "User Research & Empathy Mapping",
//       "Wireframing & Interactive Prototyping",
//       "Typography, Color Theory & Visual Hierarchy",
//       "Responsive Web & Mobile Design",
//       "Design Systems & Component Libraries",
//       "UX Writing & Microinteractions",
//       "User Testing & Accessibility",
//       "Handoff to Developers",
//       "Portfolio Case Studies & Presentation Skills",
//     ],
//     duration: "6 Months Internship & 6 Months Training",
//     notes: "Earn a 1-year work experience certificate upon completion.",
//     icon: <Palette size={40} className="text-warning mb-3" />,
//   },
//   {
//     title: "Graphic Design",
//     description: "Develop skills in visual communication and branding using Adobe Photoshop, Illustrator, and Canva. Create logos, marketing materials, and digital graphics.",
//     skills: [
//       "Fundamentals of Graphic Design",
//       "Color Theory, Typography & Layout",
//       "Logo Design & Brand Identity",
//       "Social Media Post Design",
//       "Banner, Poster & Flyer Creation",
//       "Product Packaging & Label Design",
//       "Photo Editing & Retouching",
//       "Vector Illustration",
//       "Print vs Digital Media Design",
//       "Business Cards & Stationery Design",
//       "Brochure & Magazine Layouts",
//       "Design Portfolio Development",
//     ],
//     duration: "6 Months Internship & 6 Months Training",
//     notes: "Earn a 1-year work experience certificate upon completion.",
//     icon: <Image size={40} className="text-danger mb-3" />,
//   },
// ];

// const interviewTraining = [
//   {
//     title: "Key Points",
//     items: [
//       "Ace Your Coding Tests - Practice coding challenges to build confidence and speed, Master data structures and algorithms for technical interviews",
//       "Technical Mastery - Deep dive into core technical concepts relevant to your field, Stay updated with the latest tools and technologies",
//       "Behavioral Rounds - Learn to articulate your experiences and skills effectively, Prepare for common behavioral questions with structured responses",
//       "Problem-Solving Practice - Solve real-world problems to demonstrate critical thinking",
//       "Expert Mock Interviews - Simulate real interview scenarios with expert feedback",
//       "Real-Time Coding Practice - Brain-Boosting Puzzles, Project & Assignment Presentation Skills",
//       "Project Demo Training - Analytical Thinking & Verbal Clarity, Real-Time Presentation Practice",
//       "Personalized Video Resume Training - Improve Confidence on Camera, Resume & Online Profile Optimization",
//       "Stand Out with a Video Resume - Resume Polishing, LinkedIn & GitHub Enhancement, Professional Visibility",
//     ],
//   },
// ];

// const placementGuidance = [
//   "Cross-Platform Development - Flutter's unique approach allows a single codebase that runs seamlessly on both Android and iOS platforms. This dramatically reduces development time, costs, and effort, making it an ideal choice for startups, enterprises, and solo developers.",
//   "Faster Time to Market - No need to build separate apps for each platform",
//   "Consistent UI/UX - Maintain uniform designs across all devices",
//   "Lower Maintenance Costs - Fix bugs and update features in one place",
//   "Native Performance - Compiles to native code for smooth user experience",
//   "Smaller Development Team - No need to hire separate iOS and Android developers",
// ];

// const InternshipApplication = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     message: "",
//   });
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProgram, setSelectedProgram] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/internship-inquiries`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
//       }
//       await response.json();
//       setSubmitStatus("success");
//       setFormData({ name: "", email: "", role: "", message: "" });
//     } catch (error) {
//       console.error("Failed to submit application:", error.message);
//       setSubmitStatus("error");
//     }
//   };

//   const handleShowModal = (program) => {
//     setSelectedProgram(program);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedProgram(null);
//     setShowModal(false);
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setShowImageModal(true);
//   };

//   const handleCloseImageModal = () => {
//     setSelectedImage(null);
//     setShowImageModal(false);
//   };

//   // Define the PDF file path. Since it's in the public folder, use the root path.
//   const pdfFilePath = "/wyenfos internship detials.ai WORK copy.pdf";

//   const handleViewPdf = () => {
//     window.open(pdfFilePath, "_blank");
//   };

//   const handleDownloadPdf = () => {
//     const link = document.createElement("a");
//     link.href = pdfFilePath;
//     link.setAttribute("download", "Wyenfos_Internship_Details.pdf"); // Suggest a filename for download
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


//   return (
//     <SectionWrapper>
//       <Container>
//         <h1 className="display-4 fw-bold text-dark text-center mb-5 animate__animated animate__fadeInDown">
//           Apply for an Internship at Wyenfos Infotech
//         </h1>

//         <CustomSection bgLight className="p-5 mb-5">
//           <h3 className="fw-bold text-center mb-4 text-dark animate__animated animate__fadeIn">Internship Training Program</h3>
//           <TextAnimated className="text-center text-muted mb-4">
//             Launch your tech & design career with hands-on experience! Get trained by industry experts, work on real-world projects, boost your resume, and earn a 1-year work experience certificate. Our 1-year program includes 6 months of internship and 6 months of training, covering foundational principles, industry tools, and advanced techniques.
//           </TextAnimated>
//           <h4 className="fw-bold text-center mb-4 text-dark">Available Programs</h4>
//           <Row className="g-4">
//             {trainingPrograms.map((program, index) => (
//               <Col md={4} key={index}>
//                 <ProgramCard className="h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
//                   <Card.Body className="d-flex flex-column text-center">
//                     {program.icon}
//                     <Card.Title className="fw-bold text-dark">{program.title}</Card.Title>
//                     <Card.Text className="text-muted flex-grow-1">{program.description}</Card.Text>
//                     <CustomButton
//                       variant="primary"
//                       className="mt-3"
//                       onClick={() => handleShowModal(program)}
//                     >
//                       View Details
//                     </CustomButton>
//                   </Card.Body>
//                 </ProgramCard>
//               </Col>
//             ))}
//           </Row>

//           <h4 className="fw-bold text-center mt-5 mb-4 text-dark"></h4>
//           <Row className="g-4">
//             {interviewTraining.map((training, index) => (
//               <Col md={12} key={index}>
//                 <EnhancedCard className="h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
//                   <Card.Body className="text-center">
//                     <h6 className="fw-bold text-dark">{training.title}</h6>
//                     <ul className="text-muted medium text-start">
//                       {training.items.map((item, idx) => (
//                         <li key={idx} className="mb-2"><strong>{item.split(" - ")[0]}:</strong> {item.split(" - ")[1]}</li>
//                       ))}
//                     </ul>
//                   </Card.Body>
//                 </EnhancedCard>
//               </Col>
//             ))}
//           </Row>

//           <h4 className="fw-bold text-center mt-5 mb-4 text-dark">Cross-Platform Development</h4>
//           <TextAnimated className="text-center text-muted mb-4">

//           </TextAnimated>
//           <Row className="g-4 justify-content-center">
//             {placementGuidance.map((item, index) => (
//               <Col md={6} key={index}>
//                 <EnhancedCard className="text-center p-3 h-100 animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
//                   <Card.Body>
//                     <TextAnimated className="text-muted"><strong>{item.split(" - ")[0]}:</strong> {item.split(" - ")[1]}</TextAnimated>
//                   </Card.Body>
//                 </EnhancedCard>
//               </Col>
//             ))}
//           </Row>

//           <h4 className="fw-bold text-center mt-5 mb-4 text-dark">About Flutter</h4>
//           <InfoCard className="animate__animated animate__fadeIn">
//             <Card.Body>
//               <TextAnimated className="text-muted">
//                 Discover Flutter, Google's innovative UI toolkit for crafting natively compiled apps for mobile, web, and desktop from a single codebase. Enhance your skills to build fast, stunning, and responsive applications with ease.
//               </TextAnimated>
//               <CustomButton variant="primary" className="mt-3" href="https://flutter.dev" target="_blank">
//                 Learn More
//               </CustomButton>
//             </Card.Body>
//           </InfoCard>

//           <h4 className="fw-bold text-center mt-5 mb-4 text-dark">Contact Us</h4>
//           <InfoCard className="animate__animated animate__fadeIn">
//             <Card.Body>
//               <TextAnimated className="text-muted">
//                 Have questions or need assistance? Connect with the Wyenfos Infotech team today!
//               </TextAnimated>
//               <CustomButton variant="primary" className="mt-3" href="mailto:wyenfosmd@gmail.com">
//                 Email Us
//               </CustomButton>
//               <CustomButton variant="secondary" className="mt-3 ms-2" href="https://wyenfosinfotech.com" target="_blank">
//                 Visit Site
//               </CustomButton>
//               {/* PDF Buttons */}
//               <div className="mt-4">
//                 <h5 className="fw-bold text-dark mb-3">Internship Details PDF</h5>
//                 <CustomButton variant="info" className="me-2" onClick={handleViewPdf}>
//                   View PDF
//                 </CustomButton>
//                 <CustomButton variant="success" onClick={handleDownloadPdf}>
//                   Download PDF
//                 </CustomButton>
//               </div>
//             </Card.Body>
//           </InfoCard>
//         </CustomSection>

//         <CustomSection bgLight className="p-5 animate__animated animate__fadeIn">
//           <h3 className="fw-bold text-center mb-4 text-dark">Application Form</h3>
//           {submitStatus === "success" && (
//             <Alert variant="success" className="mb-4 animate__animated animate__fadeIn">
//               Application submitted successfully!
//             </Alert>
//           )}
//           {submitStatus === "error" && (
//             <Alert variant="danger" className="mb-4 animate__animated animate__fadeIn">
//               Failed to submit application. Please try again.
//             </Alert>
//           )}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="border-2 animate__animated animate__fadeIn"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="border-2 animate__animated animate__fadeIn"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Preferred Program</Form.Label>
//               <Form.Select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 className="border-2 animate__animated animate__fadeIn"
//               >
//                 <option value="">Select a program</option>
//                 {trainingPrograms.map((program, index) => (
//                   <option key={index} value={program.title}>
//                     {program.title}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Cover Letter</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={5}
//                 placeholder="Tell us about yourself and why you want to join Wyenfos Infotech."
//                 required
//                 className="border-2 animate__animated animate__fadeIn"
//               />
//             </Form.Group>
//             <CustomButton type="submit" variant="primary" size="lg" className="w-100">
//               Submit Application
//             </CustomButton>
//           </Form>
//         </CustomSection>

//         <Modal show={showModal} onHide={handleCloseModal} centered animation={true} className="animate__animated animate__fadeIn" size="lg">
//           <Modal.Header closeButton className="bg-primary text-white">
//             <Modal.Title>{selectedProgram?.title || "Program Details"} Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedProgram ? (
//               <Row className="align-items-center">
//                 <Col md={8}>
//                   <div className="text-center mb-4">{selectedProgram.icon}</div>
//                   <TextAnimated><strong>Description:</strong> {selectedProgram.description}</TextAnimated>
//                   <TextAnimated><strong>Skills Covered:</strong></TextAnimated>
//                   <ul className="list-unstyled">
//                     {selectedProgram.skills.map((skill, index) => (
//                       <li key={index} className="animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
//                         <TextAnimated>{skill}</TextAnimated>
//                       </li>
//                     ))}
//                   </ul>
//                   <TextAnimated><strong>Duration:</strong> {selectedProgram.duration}</TextAnimated>
//                   <TextAnimated><strong>Notes:</strong> {selectedProgram.notes}</TextAnimated>
//                 </Col>
//                 <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
//                   {selectedProgram.title === "UI/UX Design" && (
//                     <>
//                       <HoverImage
//                         src={gr1}
//                         alt="UX vs UI Comparison"
//                         className="img-fluid mb-3"
//                         onClick={() => handleImageClick(gr1)}
//                         style={{ cursor: "pointer" }}
//                       />
//                       <HoverImage
//                         src={ui}
//                         alt="UI Design Process"
//                         className="img-fluid"
//                         onClick={() => handleImageClick(ui)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     </>
//                   )}
//                   {selectedProgram.title === "Flutter Developer" && (
//                     <HoverImage
//                       src={flutterImage}
//                       alt="Flutter Development"
//                       className="img-fluid"
//                       onClick={() => handleImageClick(flutterImage)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   )}
//                   {selectedProgram.title === "MERN Stack Development" && (
//                     <>
//                       <ShadowImage
//                         src={mernImage1}
//                         alt="MERN Stack Overview"
//                         className="img-fluid mb-3"
//                         onClick={() => handleImageClick(mernImage1)}
//                         style={{ cursor: "pointer" }}
//                       />
//                       <ShadowImage
//                         src={mernImage2}
//                         alt="MERN Stack Architecture"
//                         className="img-fluid"
//                         onClick={() => handleImageClick(mernImage2)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     </>
//                   )}
//                   {selectedProgram.title === "Full Stack Web Development" && (
//                     <Row className="g-2 justify-content-center w-100">
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo}
//                           alt="JavaScript Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo1}
//                           alt="HTML5 Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo1)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo2}
//                           alt="Express Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo2)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo3}
//                           alt="Node.js Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo3)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo4}
//                           alt="MongoDB Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo4)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                       <Col xs={4}>
//                         <LogoImage
//                           src={fullstackLogo5}
//                           alt="React Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo5)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </Col>
//                     </Row>
//                   )}
//                   {selectedProgram.title === "Graphic Design" && (
//                     <Row className="g-2 justify-content-center w-100">
//                       <>
//                         <HoverImage
//                           src={fullstackLogo6}
//                           alt="JavaScript Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo6)}
//                           style={{ cursor: "pointer" }}
//                         />
//                         <HoverImage
//                           src={fullstackLogo7}
//                           alt="HTML5 Logo"
//                           className="img-fluid"
//                           onClick={() => handleImageClick(fullstackLogo7)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </>
//                     </Row>
//                   )}
//                 </Col>
//               </Row>
//             ) : (
//               <TextAnimated>No program selected.</TextAnimated>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <CustomButton variant="secondary" onClick={handleCloseModal}>
//               Close
//             </CustomButton>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showImageModal} onHide={handleCloseImageModal} centered animation={true} className="animate__animated animate__fadeIn">
//           <Modal.Header closeButton className="bg-primary text-white">
//             <Modal.Title>Enlarged Image</Modal.Title>
//           </Modal.Header>
//           <Modal.Body className="text-center">
//             {selectedImage && <EnlargedImage src={selectedImage} alt="Enlarged View" />}
//           </Modal.Body>
//           <Modal.Footer>
//             <CustomButton variant="secondary" onClick={handleCloseImageModal}>
//               Close
//             </CustomButton>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </SectionWrapper>
//   );
// };

// export default InternshipApplication;


import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Form, Alert, Modal, Card } from "react-bootstrap";
import styled from "styled-components";
import { Briefcase, People, Star, Phone, CodeSlash, Image, Palette } from "react-bootstrap-icons";
import gr1 from "../../../../assets/56.png";
import ui from "../../../../assets/8.png";
import flutterImage from "../../../../assets/bnb.png";
import mernImage1 from "../../../../assets/6.png";
import mernImage2 from "../../../../assets/7.png";
import fullstackLogo from "../../../../assets/js.png";
import fullstackLogo1 from "../../../../assets/HTML5_Logo_512.png";
import fullstackLogo2 from "../../../../assets/ex.png";
import fullstackLogo3 from "../../../../assets/2.png";
import fullstackLogo4 from "../../../../assets/4.png";
import fullstackLogo5 from "../../../../assets/Untitled-2.png";
import fullstackLogo6 from "../../../../assets/44.png";
import fullstackLogo7 from "../../../../assets/78 (1).png";
import { storage } from "../../../../firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Custom styled components with animations and hover effects
const CustomSection = styled.div`
  background: ${(props) => (props.bgLight ? "linear-gradient(135deg, #f8f9fa, #e9ecef)" : "#ffffff")};
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: fadeIn 1s ease-in;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProgramCard = styled(Card)`
  border: none;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
  }

  .card-body {
    transition: background 0.3s ease;
  }

  &:hover .card-body {
    background: linear-gradient(135deg, #f0f8ff, #e6f0ff);
  }
`;

const CustomButton = styled(Button)`
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border: none;

  &:hover {
    background: linear-gradient(90deg, #0056b3, #0096cc);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }
`;

const SectionWrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, #e6f0ff, #ffffff);
  animation: gradientShift 10s ease infinite;
  background-size: 200% 200%;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const TextAnimated = styled.p`
  animation: textFade 1.5s ease-in-out;

  @keyframes textFade {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const HoverImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 250px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const EnlargedImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 auto;
`;

const EnhancedCard = styled(Card)`
  border: 2px solid #007bff;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  transition: all 0.3s ease;

  &:hover {
    border-color: #0056b3;
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
  }
`;

const InfoCard = styled(Card)`
  background: linear-gradient(135deg, #e9ecef, #ffffff);
  border: none;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ShadowImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 250px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 150px;
  margin: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, rotate 0.3s ease;
  transform-origin: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
`;

const trainingPrograms = [
  {
    title: "Flutter Developer",
    description: "Create high-performance mobile apps for Android and iOS using Flutter and Dart. Work on real-world projects, mastering state management, APIs, and responsive UI design.",
    skills: [
      "Dart Programming Fundamentals",
      "Flutter Widgets & UI Components",
      "Navigation & Routing",
      "State Management (Provider, Riverpod, Bloc)",
      "RESTful APIs & Firebase Integration",
      "Local Database (Hive, SQLite)",
      "Form Validation & User Input Handling",
      "Custom Themes & Third-Party Packages",
    ],
    duration: "6 Months Internship & 6 Months Training",
    notes: "Earn a 1-year work experience certificate upon completion.",
    icon: <Phone size={40} className="text-primary mb-3" />,
  },
  {
    title: "MERN Stack Development",
    description: "Master MongoDB, Express, React, and Node.js to build dynamic web applications. Focus on modern JavaScript, API design, and deployment techniques.",
    skills: [
      "Modern JavaScript (ES6+)",
      "React.js Fundamentals & Hooks",
      "Node.js & Express Server Setup",
      "MongoDB CRUD Operations",
      "RESTful API Design & Integration",
      "Authentication (JWT, OAuth)",
      "Middleware & Routing",
      "File Uploads & Form Handling",
    ],
    duration: "6 Months Internship & 6 Months Training",
    notes: "Earn a 1-year work experience certificate upon completion.",
    icon: <CodeSlash size={40} className="text-success mb-3" />,
  },
  {
    title: "Full Stack Web Development",
    description: "Develop end-to-end web solutions with expertise in front-end and back-end technologies. Learn version control, deployment, and responsive design.",
    skills: [
      "Version Control with Git & GitHub",
      "Deployment (Render, Vercel, Heroku)",
      "HTML5, CSS3, and JavaScript (ES6+)",
      "Responsive Web Design (Flexbox & Grid)",
      "DOM Manipulation and Event Handling",
      "Error Handling & Input Validation",
    ],
    duration: "6 Months Internship & 6 Months Training",
    notes: "Earn a 1-year work experience certificate upon completion.",
    icon: <CodeSlash size={40} className="text-success mb-3" />,
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive digital products using Figma and Adobe XD. Learn user research, wireframing, prototyping, and accessibility to create user-friendly interfaces.",
    skills: [
      "Principles of UI/UX Design",
      "User Research & Empathy Mapping",
      "Wireframing & Interactive Prototyping",
      "Typography, Color Theory & Visual Hierarchy",
      "Responsive Web & Mobile Design",
      "Design Systems & Component Libraries",
      "UX Writing & Microinteractions",
      "User Testing & Accessibility",
      "Handoff to Developers",
      "Portfolio Case Studies & Presentation Skills",
    ],
    duration: "6 Months Internship & 6 Months Training",
    notes: "Earn a 1-year work experience certificate upon completion.",
    icon: <Palette size={40} className="text-warning mb-3" />,
  },
  {
    title: "Graphic Design",
    description: "Develop skills in visual communication and branding using Adobe Photoshop, Illustrator, and Canva. Create logos, marketing materials, and digital graphics.",
    skills: [
      "Fundamentals of Graphic Design",
      "Color Theory, Typography & Layout",
      "Logo Design & Brand Identity",
      "Social Media Post Design",
      "Banner, Poster & Flyer Creation",
      "Product Packaging & Label Design",
      "Photo Editing & Retouching",
      "Vector Illustration",
      "Print vs Digital Media Design",
      "Business Cards & Stationery Design",
      "Brochure & Magazine Layouts",
      "Design Portfolio Development",
    ],
    duration: "6 Months Internship & 6 Months Training",
    notes: "Earn a 1-year work experience certificate upon completion.",
    icon: <Image size={40} className="text-danger mb-3" />,
  },
];

const interviewTraining = [
  {
    title: "Key Points",
    items: [
      "Ace Your Coding Tests - Practice coding challenges to build confidence and speed, Master data structures and algorithms for technical interviews",
      "Technical Mastery - Deep dive into core technical concepts relevant to your field, Stay updated with the latest tools and technologies",
      "Behavioral Rounds - Learn to articulate your experiences and skills effectively, Prepare for common behavioral questions with structured responses",
      "Problem-Solving Practice - Solve real-world problems to demonstrate critical thinking",
      "Expert Mock Interviews - Simulate real interview scenarios with expert feedback",
      "Real-Time Coding Practice - Brain-Boosting Puzzles, Project & Assignment Presentation Skills",
      "Project Demo Training - Analytical Thinking & Verbal Clarity, Real-Time Presentation Practice",
      "Personalized Video Resume Training - Improve Confidence on Camera, Resume & Online Profile Optimization",
      "Stand Out with a Video Resume - Resume Polishing, LinkedIn & GitHub Enhancement, Professional Visibility",
    ],
  },
];

const placementGuidance = [
  "Cross-Platform Development - Flutter's unique approach allows a single codebase that runs seamlessly on both Android and iOS platforms. This dramatically reduces development time, costs, and effort, making it an ideal choice for startups, enterprises, and solo developers.",
  "Faster Time to Market - No need to build separate apps for each platform",
  "Consistent UI/UX - Maintain uniform designs across all devices",
  "Lower Maintenance Costs - Fix bugs and update features in one place",
  "Native Performance - Compiles to native code for smooth user experience",
  "Smaller Development Team - No need to hire separate iOS and Android developers",
];

const InternshipApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    resume: null,
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const resumeInputRef = useRef(null); // Add ref for the file input
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let resumeUrl = "";
      if (formData.resume) {
        // Validate file type
        if (formData.resume.type !== "application/pdf") {
          setSubmitStatus("error");
          throw new Error("Only PDF files are allowed for resumes.");
        }
        // Upload resume to Firebase Storage
        const resumeRef = ref(storage, `resumes/${Date.now()}_${formData.resume.name}`);
        await uploadBytes(resumeRef, formData.resume);
        resumeUrl = await getDownloadURL(resumeRef);
      }

      // Submit form data including resume URL
      const response = await fetch(`${API_URL}/internship-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          resume: null, // Clear file object
          resumeUrl, // Include download URL
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }
      await response.json();
      setSubmitStatus("success");
      // Clear the form and file input
      setFormData({ name: "", email: "", role: "", message: "", resume: null });
      if (resumeInputRef.current) {
        resumeInputRef.current.value = ""; // Clear the file input
      }
    } catch (error) {
      console.error("Failed to submit application:", error.message);
      setSubmitStatus("error");
    } finally {
      setUploading(false);
    }
  };

  const handleShowModal = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
    setShowModal(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
    setShowImageModal(false);
  };

  const pdfFilePath = "/wyenfos internship detials.ai WORK copy.pdf";

  const handleViewPdf = () => {
    window.open(pdfFilePath, "_blank");
  };

  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdfFilePath;
    link.setAttribute("download", "Wyenfos_Internship_Details.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionWrapper>
      <Container>
        <h1 className="display-4 fw-bold text-dark text-center mb-5 animate__animated animate__fadeInDown">
          Apply for an Internship at Wyenfos Infotech
        </h1>

        <CustomSection bgLight className="p-5 mb-5">
          <h3 className="fw-bold text-center mb-4 text-dark animate__animated animate__fadeIn">Internship Training Program</h3>
          <TextAnimated className="text-center text-muted mb-4">
            Launch your tech & design career with hands-on experience! Get trained by industry experts, work on real-world projects, boost your resume, and earn a 1-year work experience certificate. Our 1-year program includes 6 months of internship and 6 months of training, covering foundational principles, industry tools, and advanced techniques.
          </TextAnimated>
          <h4 className="fw-bold text-center mb-4 text-dark">Available Programs</h4>
          <Row className="g-4">
            {trainingPrograms.map((program, index) => (
              <Col md={4} key={index}>
                <ProgramCard className="h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card.Body className="d-flex flex-column text-center">
                    {program.icon}
                    <Card.Title className="fw-bold text-dark">{program.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">{program.description}</Card.Text>
                    <CustomButton
                      variant="primary"
                      className="mt-3"
                      onClick={() => handleShowModal(program)}
                    >
                      View Details
                    </CustomButton>
                  </Card.Body>
                </ProgramCard>
              </Col>
            ))}
          </Row>

          <h4 className="fw-bold text-center mt-5 mb-4 text-dark"></h4>
          <Row className="g-4">
            {interviewTraining.map((training, index) => (
              <Col md={12} key={index}>
                <EnhancedCard className="h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card.Body className="text-center">
                    <h6 className="fw-bold text-dark">{training.title}</h6>
                    <ul className="text-muted medium text-start">
                      {training.items.map((item, idx) => (
                        <li key={idx} className="mb-2"><strong>{item.split(" - ")[0]}:</strong> {item.split(" - ")[1]}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </EnhancedCard>
              </Col>
            ))}
          </Row>

          <h4 className="fw-bold text-center mt-5 mb-4 text-dark">Cross-Platform Development</h4>
          <TextAnimated className="text-center text-muted mb-4"></TextAnimated>
          <Row className="g-4 justify-content-center">
            {placementGuidance.map((item, index) => (
              <Col md={6} key={index}>
                <EnhancedCard className="text-center p-3 h-100 animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card.Body>
                    <TextAnimated className="text-muted"><strong>{item.split(" - ")[0]}:</strong> {item.split(" - ")[1]}</TextAnimated>
                  </Card.Body>
                </EnhancedCard>
              </Col>
            ))}
          </Row>

          <h4 className="fw-bold text-center mt-5 mb-4 text-dark">About Flutter</h4>
          <InfoCard className="animate__animated animate__fadeIn">
            <Card.Body>
              <TextAnimated className="text-muted">
                Discover Flutter, Google's innovative UI toolkit for crafting natively compiled apps for mobile, web, and desktop from a single codebase. Enhance your skills to build fast, stunning, and responsive applications with ease.
              </TextAnimated>
              <CustomButton variant="primary" className="mt-3" href="https://flutter.dev" target="_blank">
                Learn More
              </CustomButton>
            </Card.Body>
          </InfoCard>

          <h4 className="fw-bold text-center mt-5 mb-4 text-dark">Contact Us</h4>
          <InfoCard className="animate__animated animate__fadeIn">
            <Card.Body>
              <TextAnimated className="text-muted">
                Have questions or need assistance? Connect with the Wyenfos Infotech team today!
              </TextAnimated>
              <CustomButton variant="primary" className="mt-3" href="mailto:wyenfosmd@gmail.com">
                Email Us
              </CustomButton>
              <CustomButton variant="secondary" className="mt-3 ms-2" href="https://wyenfosinfotech.com" target="_blank">
                Visit Site
              </CustomButton>
              <div className="mt-4">
                <h5 className="fw-bold text-dark mb-3">Internship Details PDF</h5>
                <CustomButton variant="info" className="me-2" onClick={handleViewPdf}>
                  View PDF
                </CustomButton>
                <CustomButton variant="success" onClick={handleDownloadPdf}>
                  Download PDF
                </CustomButton>
              </div>
            </Card.Body>
          </InfoCard>
        </CustomSection>

        <CustomSection bgLight className="p-5 animate__animated animate__fadeIn">
          <h3 className="fw-bold text-center mb-4 text-dark">Application Form</h3>
          {submitStatus === "success" && (
            <Alert variant="success" className="mb-4 animate__animated animate__fadeIn">
              Application submitted successfully!
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert variant="danger" className="mb-4 animate__animated animate__fadeIn">
              Failed to submit application. Please try again.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-2 animate__animated animate__fadeIn"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-2 animate__animated animate__fadeIn"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Program</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="border-2 animate__animated animate__fadeIn"
              >
                <option value="">Select a program</option>
                {trainingPrograms.map((program, index) => (
                  <option key={index} value={program.title}>
                    {program.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Resume (PDF only)</Form.Label>
              <Form.Control
                type="file"
                name="resume"
                accept="application/pdf"
                onChange={handleChange}
                ref={resumeInputRef} // Attach the ref to the file input
                className="border-2 animate__animated animate__fadeIn"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about yourself and why you want to join Wyenfos Infotech."
                required
                className="border-2 animate__animated animate__fadeIn"
              />
            </Form.Group>
            <CustomButton type="submit" variant="primary" size="lg" className="w-100" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit Application"}
            </CustomButton>
          </Form>
        </CustomSection>

        <Modal show={showModal} onHide={handleCloseModal} centered animation={true} className="animate__animated animate__fadeIn" size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>{selectedProgram?.title || "Program Details"} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProgram ? (
              <Row className="align-items-center">
                <Col md={8}>
                  <div className="text-center mb-4">{selectedProgram.icon}</div>
                  <TextAnimated><strong>Description:</strong> {selectedProgram.description}</TextAnimated>
                  <TextAnimated><strong>Skills Covered:</strong></TextAnimated>
                  <ul className="list-unstyled">
                    {selectedProgram.skills.map((skill, index) => (
                      <li key={index} className="animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                        <TextAnimated>{skill}</TextAnimated>
                      </li>
                    ))}
                  </ul>
                  <TextAnimated><strong>Duration:</strong> {selectedProgram.duration}</TextAnimated>
                  <TextAnimated><strong>Notes:</strong> {selectedProgram.notes}</TextAnimated>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                  {selectedProgram.title === "UI/UX Design" && (
                    <>
                      <HoverImage
                        src={gr1}
                        alt="UX vs UI Comparison"
                        className="img-fluid mb-3"
                        onClick={() => handleImageClick(gr1)}
                        style={{ cursor: "pointer" }}
                      />
                      <HoverImage
                        src={ui}
                        alt="UI Design Process"
                        className="img-fluid"
                        onClick={() => handleImageClick(ui)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                  {selectedProgram.title === "Flutter Developer" && (
                    <HoverImage
                      src={flutterImage}
                      alt="Flutter Development"
                      className="img-fluid"
                      onClick={() => handleImageClick(flutterImage)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {selectedProgram.title === "MERN Stack Development" && (
                    <>
                      <ShadowImage
                        src={mernImage1}
                        alt="MERN Stack Overview"
                        className="img-fluid mb-3"
                        onClick={() => handleImageClick(mernImage1)}
                        style={{ cursor: "pointer" }}
                      />
                      <ShadowImage
                        src={mernImage2}
                        alt="MERN Stack Architecture"
                        className="img-fluid"
                        onClick={() => handleImageClick(mernImage2)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                  {selectedProgram.title === "Full Stack Web Development" && (
                    <Row className="g-2 justify-content-center w-100">
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo}
                          alt="JavaScript Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo1}
                          alt="HTML5 Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo1)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo2}
                          alt="Express Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo2)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo3}
                          alt="Node.js Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo3)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo4}
                          alt="MongoDB Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo4)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                      <Col xs={4}>
                        <LogoImage
                          src={fullstackLogo5}
                          alt="React Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo5)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  )}
                  {selectedProgram.title === "Graphic Design" && (
                    <Row className="g-2 justify-content-center w-100">
                      <>
                        <HoverImage
                          src={fullstackLogo6}
                          alt="JavaScript Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo6)}
                          style={{ cursor: "pointer" }}
                        />
                        <HoverImage
                          src={fullstackLogo7}
                          alt="HTML5 Logo"
                          className="img-fluid"
                          onClick={() => handleImageClick(fullstackLogo7)}
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    </Row>
                  )}
                </Col>
              </Row>
            ) : (
              <TextAnimated>No program selected.</TextAnimated>
            )}
          </Modal.Body>
          <Modal.Footer>
            <CustomButton variant="secondary" onClick={handleCloseModal}>
              Close
            </CustomButton>
          </Modal.Footer>
        </Modal>

        <Modal show={showImageModal} onHide={handleCloseImageModal} centered animation={true} className="animate__animated animate__fadeIn">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Enlarged Image</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {selectedImage && <EnlargedImage src={selectedImage} alt="Enlarged View" />}
          </Modal.Body>
          <Modal.Footer>
            <CustomButton variant="secondary" onClick={handleCloseImageModal}>
              Close
            </CustomButton>
          </Modal.Footer>
        </Modal>
      </Container>
    </SectionWrapper>
  );
};

export default InternshipApplication;