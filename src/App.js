import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Mail, MapPin, Star, X, Check, ChevronRight, Award, Shield, Zap } from 'lucide-react';

const AutomocionWebsite = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const morningSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'
  ];

  const afternoonSlots = [
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const formatDate = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!customerName.trim()) {
      newErrors.name = 'Por favor, introduce tu nombre';
    }
    
    if (!customerPhone.trim()) {
      newErrors.phone = 'Por favor, introduce tu teléfono';
    } else if (!/^\d{9}$/.test(customerPhone.replace(/\s/g, ''))) {
      newErrors.phone = 'Introduce un teléfono válido (9 dígitos)';
    }
    
    if (!selectedDate) {
      newErrors.date = 'Por favor, selecciona una fecha';
    }
    
    if (!selectedTime) {
      newErrors.time = 'Por favor, selecciona una hora';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would normally send to backend
      setBookingConfirmed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setBookingOpen(false);
        setBookingConfirmed(false);
        setCustomerName('');
        setCustomerPhone('');
        setSelectedDate('');
        setSelectedTime('');
        setErrors({});
      }, 3000);
    }
  };

  const reviews = [
    {
      text: "Este señor es el mejor, como mecánico, como persona amable, espectacular. El taller limpio y organizado. Fui por cambio de pastillas y en media hora estaba listo.",
      author: "Francisco Rodríguez",
      time: "Hace 3 meses"
    },
    {
      text: "Nos atendió sin cita por una urgencia, amabilísimo y profesional. El taller más limpio y ordenado que hemos visto nunca.",
      author: "Esther",
      time: "Hace un año"
    },
    {
      text: "En el trayecto de Badajoz a Salamanca, tuvimos un problema con el filtro. El señor del taller nos atendió de inmediato. Un servicio excepcional.",
      author: "Mónica Pérez",
      time: "Hace 3 años"
    }
  ];

  return (
    <div className="font-sans bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
        
        :root {
          --navy: #0a1929;
          --charcoal: #1e2936;
          --gold: #c9a961;
          --gold-light: #d4b574;
          --cream: #faf8f3;
          --white: #ffffff;
          --gray: #64748b;
          --gray-light: #e2e8f0;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }
        
        .font-display {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-title {
          font-family: 'Playfair Display', serif;
        }
        
        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--gray-light);
          transition: all 0.3s ease;
        }
        
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
        }
        
        .logo span {
          color: var(--gold);
        }
        
        .nav-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .nav-phone {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--navy);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-phone:hover {
          color: var(--gold);
        }
        
        /* Hero Section */
        .hero {
          margin-top: 80px;
          min-height: 90vh;
          background: linear-gradient(135deg, var(--navy) 0%, var(--charcoal) 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201, 169, 97, 0.05) 0%, transparent 50%);
        }
        
        .hero-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 90vh;
          position: relative;
          z-index: 1;
        }
        
        .hero-content h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .hero-content .subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--gold-light);
          font-weight: 300;
          margin-bottom: 2rem;
          font-style: italic;
        }
        
        .hero-content .description {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 3rem;
          max-width: 500px;
        }
        
        .specialty-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        
        .badge {
          padding: 0.75rem 1.5rem;
          background: rgba(201, 169, 97, 0.15);
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }
        
        .cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: var(--gold);
          color: var(--navy);
        }
        
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201, 169, 97, 0.3);
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          background: white;
          color: var(--navy);
        }
        
        /* Hero Stats */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          text-align: center;
        }
        
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        /* Features Section */
        .features {
          padding: 8rem 2rem;
          background: var(--cream);
        }
        
        .section-container {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        
        .section-label {
          font-size: 0.875rem;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .section-description {
          font-size: 1.25rem;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .feature-card {
          background: white;
          padding: 3rem;
          border-top: 3px solid var(--gold);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .feature-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 1rem;
        }
        
        .feature-description {
          color: var(--gray);
          line-height: 1.8;
        }
        
        /* Services Section */
        .services {
          padding: 8rem 2rem;
          background: white;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 4rem;
        }
        
        .service-item {
          padding: 2.5rem;
          background: var(--cream);
          border-left: 4px solid var(--gold);
          transition: all 0.3s ease;
        }
        
        .service-item:hover {
          background: var(--navy);
          color: white;
          transform: translateX(10px);
        }
        
        .service-item:hover .service-title {
          color: var(--gold);
        }
        
        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }
        
        .service-description {
          color: var(--gray);
          line-height: 1.6;
        }
        
        .service-item:hover .service-description {
          color: rgba(255, 255, 255, 0.8);
        }
        
        /* Reviews Section */
        .reviews {
          padding: 8rem 2rem;
          background: var(--navy);
          color: white;
        }
        
        .reviews .section-title {
          color: white;
        }
        
        .rating-display {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .rating-number {
          font-family: 'Playfair Display', serif;
          font-size: 6rem;
          font-weight: 900;
          color: var(--gold);
          line-height: 1;
        }
        
        .stars {
          color: var(--gold);
          font-size: 2rem;
          margin: 1rem 0;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .review-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          position: relative;
        }
        
        .review-card::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 6rem;
          color: var(--gold);
          opacity: 0.2;
          position: absolute;
          top: 1rem;
          left: 1.5rem;
        }
        
        .review-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        
        .review-author {
          font-weight: 600;
          color: var(--gold);
        }
        
        .review-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }
        
        /* Contact Section */
        .contact {
          padding: 8rem 2rem;
          background: var(--cream);
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          margin-top: 4rem;
        }
        
        .contact-info {
          background: white;
          padding: 3rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        
        .contact-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        
        .contact-label {
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .contact-value {
          color: var(--gray);
          line-height: 1.6;
        }
        
        .contact-value a {
          color: var(--navy);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .contact-value a:hover {
          color: var(--gold);
        }
        
        .map-container {
          height: 600px;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        /* Footer */
        .footer {
          background: var(--navy);
          color: white;
          padding: 4rem 2rem 2rem;
        }
        
        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
        }
        
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: var(--gold);
          margin-bottom: 2rem;
        }
        
        /* Booking Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal {
          background: white;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modal-header {
          background: linear-gradient(135deg, var(--navy), var(--charcoal));
          color: white;
          padding: 3rem;
          position: relative;
        }
        
        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }
        
        .modal-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          color: var(--gold-light);
          font-style: italic;
        }
        
        .modal-body {
          padding: 3rem;
        }
        
        .form-section {
          margin-bottom: 3rem;
        }
        
        .form-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--gray-light);
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--gold);
        }
        
        .form-error {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
        
        .date-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem;
        }
        
        .date-option {
          padding: 1rem;
          border: 2px solid var(--gray-light);
          background: white;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .date-option:hover {
          border-color: var(--gold-light);
          background: var(--cream);
        }
        
        .date-option.selected {
          border-color: var(--gold);
          background: var(--gold);
          color: white;
        }
        
        .time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.75rem;
        }
        
        .time-option {
          padding: 1rem;
          border: 2px solid var(--gray-light);
          background: white;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .time-option:hover {
          border-color: var(--gold-light);
          background: var(--cream);
        }
        
        .time-option.selected {
          border-color: var(--gold);
          background: var(--gold);
          color: white;
        }
        
        .time-section-label {
          font-size: 0.875rem;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          margin-top: 2rem;
          font-weight: 600;
        }
        
        .time-section-label:first-child {
          margin-top: 0;
        }
        
        .submit-btn {
          width: 100%;
          padding: 1.25rem 2rem;
          background: var(--gold);
          color: var(--navy);
          border: none;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .submit-btn:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201, 169, 97, 0.3);
        }
        
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .confirmation {
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .confirmation-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
          animation: scaleIn 0.5s ease;
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        .confirmation-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 1rem;
        }
        
        .confirmation-text {
          font-size: 1.125rem;
          color: var(--gray);
          margin-bottom: 2rem;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-content .description {
            max-width: 100%;
          }
          
          .cta-group {
            justify-content: center;
          }
          
          .specialty-badges {
            justify-content: center;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .nav-phone span {
            display: none;
          }
          
          .date-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
          
          .time-grid {
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          }
          
          .modal-body {
            padding: 2rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            MARTÍN <span>RIESCO</span>
          </div>
          <div className="nav-actions">
            <a href="tel:923191883" className="nav-phone">
              <Phone size={20} />
              <span>923 19 18 83</span>
            </a>
            <button onClick={() => setBookingOpen(true)} className="btn btn-primary">
              Reservar Cita
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <h1>Excelencia en Mecánica Automotriz</h1>
            <p className="subtitle">Especialistas en vehículos ingleses de prestigio</p>
            <p className="description">
              Con más de dos décadas de experiencia, ofrecemos servicio de primera clase para Land Rover, Jaguar y Rover. 
              Nuestro compromiso con la excelencia nos ha convertido en el taller de referencia en Salamanca.
            </p>
            
            <div className="specialty-badges">
              <div className="badge">Land Rover</div>
              <div className="badge">Jaguar</div>
              <div className="badge">Rover</div>
            </div>
            
            <div className="cta-group">
              <button onClick={() => setBookingOpen(true)} className="btn btn-primary">
                <Calendar size={20} />
                Reservar Cita
              </button>
              <a href="tel:923191883" className="btn btn-secondary">
                <Phone size={20} />
                Llamar Ahora
              </a>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">4.6</div>
              <div className="stat-label">Valoración Google</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">25+</div>
              <div className="stat-label">Reseñas Positivas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Años Experiencia</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Por Qué Elegirnos</div>
            <h2 className="section-title">Compromiso con la Excelencia</h2>
            <p className="section-description">
              Cada servicio está respaldado por experiencia, tecnología y una dedicación absoluta a la satisfacción del cliente.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3 className="feature-title">Especialización Única</h3>
              <p className="feature-description">
                Expertos certificados en vehículos británicos de lujo. Conocimiento profundo de Land Rover, Jaguar y Rover con herramientas especializadas de última generación.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3 className="feature-title">Excelencia Comprobada</h3>
              <p className="feature-description">
                Valoración de 4.6 estrellas con más de 25 reseñas positivas. Nuestros clientes avalan la calidad excepcional de cada servicio que realizamos.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3 className="feature-title">Servicio Rápido</h3>
              <p className="feature-description">
                Atención inmediata para urgencias sin cita previa. Respetamos su tiempo con diagnósticos precisos y reparaciones eficientes sin comprometer la calidad.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3 className="feature-title">Instalaciones Premium</h3>
              <p className="feature-description">
                El taller más limpio y organizado de Salamanca. Un espacio impecable que refleja nuestro compromiso con el profesionalismo y la atención al detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Servicios Profesionales</div>
            <h2 className="section-title">Servicio Integral</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-item">
              <h3 className="service-title">Diagnóstico Avanzado</h3>
              <p className="service-description">
                Diagnóstico computarizado con equipos de última generación para identificar cualquier problema con precisión absoluta.
              </p>
            </div>
            
            <div className="service-item">
              <h3 className="service-title">Mantenimiento Preventivo</h3>
              <p className="service-description">
                Programas de mantenimiento diseñados específicamente para prolongar la vida útil de su vehículo británico.
              </p>
            </div>
            
            <div className="service-item">
              <h3 className="service-title">Reparación Motor</h3>
              <p className="service-description">
                Reparación especializada de motores con repuestos originales y técnicas certificadas por fabricantes.
              </p>
            </div>
            
            <div className="service-item">
              <h3 className="service-title">Sistema de Frenos</h3>
              <p className="service-description">
                Servicio completo de frenos: pastillas, discos, líquido y sistemas ABS con garantía de seguridad total.
              </p>
            </div>
            
            <div className="service-item">
              <h3 className="service-title">Suspensión y Dirección</h3>
              <p className="service-description">
                Reparación y ajuste de suspensión neumática, amortiguadores y sistemas de dirección especializados.
              </p>
            </div>
            
            <div className="service-item">
              <h3 className="service-title">Electrónica y Sistemas</h3>
              <p className="service-description">
                Diagnóstico y reparación de sistemas eléctricos, sensores, módulos y computadoras de a bordo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label" style={{color: 'var(--gold)'}}>Testimonios</div>
            <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          </div>
          
          <div className="rating-display">
            <div className="rating-number">4.6</div>
            <div className="stars">★★★★★</div>
            <p style={{color: 'rgba(255,255,255,0.6)'}}>Basado en 25 reseñas verificadas de Google</p>
          </div>
          
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="review-text">{review.text}</p>
                <p className="review-author">{review.author}</p>
                <p className="review-time">{review.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="section-container">
          <div className="section-header">
            <div className="section-label">Contacto</div>
            <h2 className="section-title">Visítenos o Contáctenos</h2>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="contact-label">Teléfonos</div>
                  <div className="contact-value">
                    <a href="tel:923191883">923 19 18 83</a><br/>
                    <a href="tel:657784244">657 78 42 44</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:martinriescosl@gmail.com">martinriescosl@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="contact-label">Dirección</div>
                  <div className="contact-value">
                    Av. de Lasalle, 143<br/>
                    37008 Salamanca, España
                  </div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="contact-label">Horario</div>
                  <div className="contact-value">
                    Lunes a Viernes<br/>
                    09:00 - 13:30 | 15:30 - 19:00
                  </div>
                </div>
              </div>
            </div>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.7686437!2d-5.6369!3d40.9644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU3JzUxLjgiTiA1wrAzOCcxMi45Ilc!5e0!3m2!1ses!2ses!4v1234567890"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">AUTOMOCIÓN MARTÍN RIESCO</div>
          <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '2rem'}}>
            Especialistas en vehículos británicos de prestigio desde hace más de 20 años
          </p>
          <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem'}}>
            © 2026 Automoción Martín Riesco. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="modal-overlay" onClick={() => setBookingOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={() => setBookingOpen(false)}>
                <X size={24} />
              </button>
              <h2 className="modal-title">Reservar Cita</h2>
              <p className="modal-subtitle">Seleccione fecha, hora y complete sus datos</p>
            </div>
            
            <div className="modal-body">
              {!bookingConfirmed ? (
                <form onSubmit={handleBooking}>
                  {/* Personal Info */}
                  <div className="form-section">
                    <h3 className="form-section-title">
                      <Phone size={24} />
                      Información Personal
                    </h3>
                    
                    <div className="form-group">
                      <label className="form-label">Nombre Completo</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Ej: Juan García"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="Ej: 654 321 987"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                      {errors.phone && <div className="form-error">{errors.phone}</div>}
                    </div>
                  </div>
                  
                  {/* Date Selection */}
                  <div className="form-section">
                    <h3 className="form-section-title">
                      <Calendar size={24} />
                      Seleccionar Fecha
                    </h3>
                    {errors.date && <div className="form-error" style={{marginBottom: '1rem'}}>{errors.date}</div>}
                    <div className="date-grid">
                      {availableDates.slice(0, 12).map((date, index) => (
                        <div
                          key={index}
                          className={`date-option ${selectedDate === date.toISOString() ? 'selected' : ''}`}
                          onClick={() => setSelectedDate(date.toISOString())}
                        >
                          {formatDate(date)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  <div className="form-section">
                    <h3 className="form-section-title">
                      <Clock size={24} />
                      Seleccionar Hora
                    </h3>
                    {errors.time && <div className="form-error" style={{marginBottom: '1rem'}}>{errors.time}</div>}
                    
                    <div className="time-section-label">Mañana (09:00 - 13:00)</div>
                    <div className="time-grid">
                      {morningSlots.map((time) => (
                        <div
                          key={time}
                          className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                    
                    <div className="time-section-label">Tarde (15:30 - 18:30)</div>
                    <div className="time-grid">
                      {afternoonSlots.map((time) => (
                        <div
                          key={time}
                          className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    <Check size={24} />
                    Confirmar Reserva
                  </button>
                </form>
              ) : (
                <div className="confirmation">
                  <div className="confirmation-icon">
                    <Check size={48} />
                  </div>
                  <h3 className="confirmation-title">¡Cita Confirmada!</h3>
                  <p className="confirmation-text">
                    Hemos recibido su solicitud de cita para el {selectedDate && formatDate(new Date(selectedDate))} a las {selectedTime}.
                    <br/><br/>
                    Le llamaremos al {customerPhone} para confirmar la cita.
                    <br/><br/>
                    ¡Gracias por confiar en Automoción Martín Riesco!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomocionWebsite;