import { useState, useEffect } from 'react';
import './assets/index.css';
import { NAME_APP } from './config/main.config';
import Header from './components/header';

const Icons = {
    upload: <i className="fa-solid fa-upload"></i>,
    info: <i className="fa-solid fa-circle-info"></i>,
    user: <i className="fa-solid fa-user"></i>,
    userCheck: <i className="fa-solid fa-user-check"></i>,
    check: <i className="fa-solid fa-check"></i>,
    folder: <i className="fa-solid fa-folder-open"></i>,
    whatsapp: <i className="fa-brands fa-whatsapp"></i>,
    arrow: <i className="fa-solid fa-arrow-right"></i>
};

export default function DTFLanding() {
    const [clientType, setClientType] = useState('nuevo');
    const [widthType, setWidthType] = useState('30');
    const [sliderIndex, setSliderIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        metodoPago: '',
        alto: '',
        archivo: null
    });
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    const productos = [
        { id: 1, nombre: "Polvo Adhesivo Poliamida DTF 80 µm", categoria: "MAQUINARIA", precio: 25.00, image: "https://images.unsplash.com/photo-1615822359491-b38466b07758?w=300&h=300&fit=crop&q=80" },
        { id: 2, nombre: "Film DTF Mate/Mate 30x100", categoria: "MAQUINARIA", precio: 68.00, image: "https://images.unsplash.com/photo-1621360050850-2fbe59800705?w=300&h=300&fit=crop&q=80" },
        { id: 3, nombre: "Tinta DTF Blanca Premium 1 Litro", categoria: "MAQUINARIA", precio: 55.00, image: "https://images.unsplash.com/photo-1587311746654-71239aa8a1ed?w=300&h=300&fit=crop&q=80" },
        { id: 4, nombre: "Clip de Bloqueo para Manguera de Tinta", categoria: "MAQUINARIA", precio: 2.00, image: "https://images.unsplash.com/photo-1541098485088-bd9c25603816?w=300&h=300&fit=crop&q=80" }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prev) => (prev + 1) % productos.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [productos.length]);

    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setFormSubmitting(false);
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
    };

    return (
        <div className="site">
            <Header />

            <main>
                {/* Hero Section - Dark with Product Image */}
                <section id="hero" className="hero">
                    <div className="container">
                        <div className="hero-grid">
                            <div className="hero-content">
                                <h1 className="hero-title">
                                    Impresión
                                    <span className="highlight">DTF Textil</span>
                                    <span className="subtitle">de Alta Calidad</span>
                                </h1>
                                <p className="hero-description">
                                    Especialistas en Direct-to-Film para textiles. Convierte tus diseños en impresiones profesionales con la mejor calidad y durabilidad del mercado.
                                </p>
                                <div className="hero-buttons">
                                    <button className="btn btn-primary btn-lg" onClick={() => scrollTo('upload-section')}>
                                        <span className="btn-icon">{Icons.upload}</span>
                                        Subir Diseño
                                    </button>
                                    <button className="btn btn-secondary btn-lg" onClick={() => scrollTo('services')}>
                                        <span className="btn-icon">{Icons.info}</span>
                                        Conocer Más
                                    </button>
                                </div>
                            </div>
                            <div className="hero-visual">
                                {/* Imagen de productos DTF - reemplazar con tu imagen real */}
                                <img
                                    src="/estampados.png"
                                    alt="Productos DTF - Camisetas, gorras, bolsos con estampados"
                                    className="hero-image"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=500&fit=crop';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section id="upload-section" className="form-section">
                    <div className="container">
                        <div className="form-wrapper">
                            <div className="form-header">
                                <h2>Sube tu Diseño <span>DTF</span></h2>
                                <p>Completa el formulario según tu tipo de cliente</p>
                            </div>

                            <div className="switch-container">
                                <div className="switch-wrapper">
                                    <div className={`switch-slider ${clientType === 'frecuente' ? 'frecuente' : ''}`}></div>
                                    <button
                                        className={`switch-btn ${clientType === 'nuevo' ? 'active' : ''}`}
                                        onClick={() => setClientType('nuevo')}
                                    >
                                        {Icons.user} Cliente Nuevo
                                    </button>
                                    <button
                                        className={`switch-btn ${clientType === 'frecuente' ? 'active' : ''}`}
                                        onClick={() => setClientType('frecuente')}
                                    >
                                        {Icons.userCheck} Cliente Frecuente
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="form-grid">
                                {clientType === 'nuevo' ? (
                                    <>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Nombre y Apellido <span className="required">*</span></label>
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    className="form-input"
                                                    placeholder="Juan Pérez"
                                                    value={formData.nombre}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Correo Electrónico <span className="required">*</span></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-input"
                                                    placeholder="correo@ejemplo.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Teléfono <span className="required">*</span></label>
                                                <input
                                                    type="tel"
                                                    name="telefono"
                                                    className="form-input"
                                                    placeholder="+58 412 1234567"
                                                    value={formData.telefono}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Método de Pago <span className="required">*</span></label>
                                                <select
                                                    name="metodoPago"
                                                    className="form-input"
                                                    value={formData.metodoPago}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="" disabled>Selecciona un método</option>
                                                    <option value="ef">Efectivo (USD)</option>
                                                    <option value="pm">Pago Móvil</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="form-group full">
                                        <label>Correo Registrado <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="correo@ejemplo.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="form-group full">
                                    <label>Tu Diseño <span className="required">*</span></label>
                                    <div className="file-upload">
                                        <input
                                            type="file"
                                            name="archivo"
                                            accept=".png,.pdf,.psd,.ai"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="file-upload-icon">{Icons.folder}</div>
                                        <div className="file-upload-text">
                                            <strong>Arrastra tu archivo aquí</strong> o haz clic para seleccionar
                                        </div>
                                        <div className="file-formats">
                                            <span className="format-badge">PNG</span>
                                            <span className="format-badge">PDF</span>
                                            <span className="format-badge">PSD</span>
                                            <span className="format-badge">AI</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Alto (cm) <span className="required">*</span></label>
                                        <input
                                            type="number"
                                            name="alto"
                                            className="form-input"
                                            placeholder="Mínimo 10cm"
                                            min="10"
                                            step="0.01"
                                            value={formData.alto}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ancho del Film</label>
                                        <div className="width-selector">
                                            <label className="width-option">
                                                <input
                                                    type="radio"
                                                    name="width"
                                                    checked={widthType === '30'}
                                                    onChange={() => setWidthType('30')}
                                                />
                                                <div className="width-card">
                                                    <div className="width-icon"><i className="fa-solid fa-ruler-horizontal"></i></div>
                                                    <div className="width-value">30cm</div>
                                                    <div className="width-label">Estándar</div>
                                                </div>
                                                <div className="check-indicator">{Icons.check}</div>
                                            </label>
                                            <label className="width-option">
                                                <input
                                                    type="radio"
                                                    name="width"
                                                    checked={widthType === '60'}
                                                    onChange={() => setWidthType('60')}
                                                />
                                                <div className="width-card">
                                                    <div className="width-icon"><i className="fa-solid fa-arrows-left-right"></i></div>
                                                    <div className="width-value">60cm</div>
                                                    <div className="width-label">Ancho</div>
                                                </div>
                                                <div className="check-indicator">{Icons.check}</div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-submit" disabled={formSubmitting}>
                                    {formSubmitting ? (
                                        <><span className="spinner"></span> Enviando...</>
                                    ) : (
                                        'Enviar Pedido'
                                    )}
                                </button>

                                {formSuccess && (
                                    <div className="success-message">
                                        <i className="fa-solid fa-circle-check"></i> ¡Pedido enviado exitosamente! Te contactaremos pronto.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section id="process" className="section section-alt">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">Proceso</span>
                            <h2 className="section-title">Cómo <span>Funciona</span></h2>
                            <p className="section-desc">Tres pasos simples hacia la excelencia en DTF Textil</p>
                        </div>
                        <div className="process-grid">
                            <div className="process-card">
                                <div className="process-number-badge">01</div>
                                <div className="process-icon-wrapper"><i className="fa-solid fa-cloud-arrow-up"></i></div>
                                <h3>Sube tu Diseño</h3>
                                <p>Archivo PNG/PDF a 300 DPI optimizado para impresión DTF profesional.</p>
                                <div className="process-badges">
                                    <span className="badge-pill">300 DPI</span>
                                    <span className="badge-pill">28cm máx</span>
                                    <span className="badge-pill">Verificación automática</span>
                                </div>
                            </div>
                            <div className="process-card">
                                <div className="process-number-badge">02</div>
                                <div className="process-icon-wrapper"><i className="fa-solid fa-receipt"></i></div>
                                <h3>Cotización Instantánea</h3>
                                <p>Cálculo inteligente por metro lineal con precios transparentes en tiempo real.</p>
                                <div className="process-badges">
                                    <span className="badge-pill">Precio instantáneo</span>
                                    <span className="badge-pill">Múltiples pagos</span>
                                    <span className="badge-pill">Sin sorpresas</span>
                                </div>
                            </div>
                            <div className="process-card">
                                <div className="process-number-badge">03</div>
                                <div className="process-icon-wrapper"><i className="fa-solid fa-print"></i></div>
                                <h3>Impresión Premium</h3>
                                <p>Tecnología DTF avanzada con tintas de alta durabilidad y colores vibrantes.</p>
                                <div className="process-badges">
                                    <span className="badge-pill">$9.00/metro</span>
                                    <span className="badge-pill">Ancho 28cm</span>
                                    <span className="badge-pill">Mín. 30cm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">Servicios</span>
                            <h2 className="section-title">Servicios <span>Especializados</span></h2>
                            <p className="section-desc">Dominamos cada aspecto del DTF Textil para ofrecerte resultados excepcionales</p>
                        </div>
                        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', display: 'grid', gap: '24px' }}>
                            <div className="service-card">
                                <span className="item-badge">Premium</span>
                                <div className="service-icon-wrapper"><i className="fa-solid fa-shirt"></i></div>
                                <div className="service-content">
                                    <h3>DTF Textil Elite</h3>
                                    <p>Transferencias 28cm con tintas eco-solventes. +50 lavados garantizados.</p>
                                    <div className="service-badges">
                                        <span className="badge-pill">+50 lavados</span>
                                        <span className="badge-pill">Ultra vibrante</span>
                                    </div>
                                </div>
                            </div>
                            <div className="service-card">
                                <div className="service-icon-wrapper"><i className="fa-solid fa-maximize"></i></div>
                                <div className="service-content">
                                    <h3>Formato 28cm</h3>
                                    <p>Optimización total para camisetas y textiles. Máximo aprovechamiento.</p>
                                    <div className="service-badges">
                                        <span className="badge-pill">28cm ancho</span>
                                        <span className="badge-pill">300 DPI</span>
                                    </div>
                                </div>
                            </div>
                            <div className="service-card">
                                <div className="service-icon-wrapper"><i className="fa-solid fa-table-cells"></i></div>
                                <div className="service-content">
                                    <h3>Mesa de Trabajo</h3>
                                    <p>Armado profesional y distribución estratégica para minimizar costos.</p>
                                    <div className="service-price">Desde $3.00</div>
                                </div>
                            </div>
                            <div className="service-card">
                                <div className="service-icon-wrapper"><i className="fa-solid fa-headset"></i></div>
                                <div className="service-content">
                                    <h3>Consultoría Pro</h3>
                                    <p>Asesoramiento técnico especializado y optimización de archivos.</p>
                                    <button className="btn btn-primary" style={{ marginTop: '12px' }}>Consultar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Slider */}
                <section id="tienda" className="section slider-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Insumos <span>Profesionales</span></h2>
                            <p className="section-desc">Productos de alta calidad para impresión DTF</p>
                        </div>

                        <div className="slider-container-wrapper">
                            <button
                                className="slider-arrow slider-arrow-left"
                                onClick={() => setSliderIndex(prev => prev === 0 ? Math.max(0, productos.length - 1) : prev - 1)}
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>

                            <div className="slider-container">
                                <div
                                    className="slider-track"
                                    style={{ transform: `translateX(-${sliderIndex * 300}px)` }}
                                >
                                    {productos.map(p => (
                                        <div key={p.id} className="product-card">
                                            <span className="card-badge-top-right">Destacado</span>
                                            <div className="product-image">
                                                <img src={p.image} alt={p.nombre} />
                                            </div>
                                            <div className="product-info">
                                                <div className="category-pill">{p.categoria}</div>
                                                <h4 className="product-name">{p.nombre}</h4>
                                                <div className="product-price-wrapper">
                                                    <div className="product-price">${p.precio.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="slider-arrow slider-arrow-right"
                                onClick={() => setSliderIndex(prev => (prev + 1) % productos.length)}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>

                        <div className="btn-view-all-container">
                            <a href="/tienda" className="btn-view-all">
                                <i className="fa-solid fa-store"></i> Ver Todos los Productos
                            </a>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="prices" className="section section-alt">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">Precios</span>
                            <h2 className="section-title">Tarifas <span>DTF Textil</span></h2>
                            <p className="section-desc">Precios transparentes que se actualizan en tiempo real</p>
                        </div>

                        <div className="pricing-grid">
                            {/* Main Pricing Card */}
                            <div className="pricing-card-main">
                                <div className="pricing-badge">Más Popular</div>
                                <div className="pricing-header">
                                    <div className="service-icon-wrapper" style={{ margin: '0 auto 16px' }}><i className="fa-solid fa-shirt"></i></div>
                                    <h3>DTF Textil</h3>
                                    <p>28cm máximo - Pedido mínimo 30cm</p>
                                </div>

                                <div className="pricing-list">
                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-solid fa-dollar-sign"></i></div>
                                            <span>Efectivo (USD)</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>

                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-solid fa-mobile-screen-button"></i></div>
                                            <span>Pago Móvil</span>
                                            <span className="tasa-badge">Tasa BCV</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>

                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-brands fa-bitcoin"></i></div>
                                            <span>Binance</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>

                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-solid fa-building-columns"></i></div>
                                            <span>Zelle</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>

                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-brands fa-paypal"></i></div>
                                            <span>PayPal</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>

                                    <div className="pricing-item">
                                        <div className="pricing-item-info">
                                            <div className="pricing-item-icon"><i className="fa-solid fa-ellipsis"></i></div>
                                            <span>Otro</span>
                                        </div>
                                        <div className="pricing-item-price">$9.00 <small>/m</small></div>
                                    </div>
                                </div>

                                <div className="pricing-footer-badges">
                                    <span className="badge-pill">$9.00/metro</span>
                                    <span className="badge-pill">Entrega mismo día</span>
                                    <span className="badge-pill">Máx. 28cm ancho</span>
                                </div>

                                <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => scrollTo('upload-section')}>
                                    <i className="fa-solid fa-cloud-arrow-up"></i> Subir Diseño
                                </button>
                            </div>

                            {/* Side Pricing Card */}
                            <div className="pricing-card-side">
                                <div className="pricing-icon"><i className="fa-solid fa-table-cells"></i></div>
                                <h3>Mesa de Trabajo</h3>
                                <p>Armado profesional</p>
                                <div className="price-large">$3.00 <small>/proyecto</small></div>
                                <div className="pricing-footer-badges" style={{ marginBottom: '32px' }}>
                                    <span className="badge-pill">Optimización</span>
                                    <span className="badge-pill">Distribución</span>
                                    <span className="badge-pill">Ahorro costos</span>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                                    Solicitar <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section">
                    <div className="container">
                        <div className="section-header" style={{ marginBottom: '48px' }}>
                            <h2 className="section-title" style={{ fontSize: '2rem' }}>Especialistas listos para <span>transformar tus ideas en realidad</span></h2>
                        </div>

                        <div className="contact-grid">
                            {/* Card 1: Email */}
                            <div className="contact-card">
                                <div className="contact-icon-wrapper"><i className="fa-solid fa-envelope"></i></div>
                                <h3>Consultoría Digital</h3>
                                <div className="contact-detail">dtf.mcy@gmail.com</div>
                                <p className="contact-desc">Consultas y soporte técnico</p>
                                <a href="mailto:dtf.mcy@gmail.com" className="contact-btn-outline">
                                    <i className="fa-solid fa-paper-plane"></i> Enviar Email
                                </a>
                            </div>

                            {/* Card 2: WhatsApp */}
                            <div className="contact-card highlight">
                                <span className="contact-badge-top">Recomendado</span>
                                <div className="contact-icon-wrapper"><i className="fa-brands fa-whatsapp"></i></div>
                                <h3>Soporte Inmediato</h3>
                                <div className="contact-detail">0426-5332476</div>
                                <p className="contact-desc">Atención personalizada en tiempo real</p>
                                <a href="https://wa.me/584265332476" className="contact-btn-purple" target="_blank" rel="noreferrer">
                                    <i className="fa-brands fa-whatsapp"></i> Abrir WhatsApp
                                </a>
                            </div>

                            {/* Card 3: Location */}
                            <div className="contact-card">
                                <div className="contact-icon-wrapper"><i className="fa-solid fa-location-dot"></i></div>
                                <h3>Ubicación</h3>
                                <div className="contact-detail">Maracay, Aragua</div>
                                <p className="contact-desc">Servicio especializado en la región central</p>
                                <a href="https://www.google.com/maps/place/10%C2%B014'06.6%22N+67%C2%B035'58.8%22W/@10.2351667,-67.5996667,17z" className="contact-btn-outline" target="_blank" rel="noreferrer">
                                    <i className="fa-solid fa-map"></i> Ver en Google Maps
                                </a>
                            </div>
                        </div>

                        {/* Map Wrapper */}
                        <div className="contact-map-wrapper">
                            <iframe
                                src="https://maps.google.com/maps?q=10.2351667,-67.5996667&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                loading="lazy"
                                title="Ubicación DTF Mcy"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>

            {/* WhatsApp FAB */}
            <a href="https://wa.me/584265332476" className="whatsapp-fab" target="_blank" rel="noreferrer">
                {Icons.whatsapp}
            </a>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="logo">DTF <span>Mcy</span></div>
                    <p>© 2026 {NAME_APP.name}. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}