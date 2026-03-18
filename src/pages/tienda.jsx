import React from 'react';
import Header from '../components/header';
import '../assets/tienda.css';

export default function Tienda() {
    const products = [
        {
            id: 1,
            category: "MAQUINARIA",
            title: "Polvo Adhesivo Poliamida DTF 80 µm",
            desc: "Máxima adherencia y elasticidad para tus proyectos textiles.",
            price: 25.00,
            stock: 10,
            image: "https://images.unsplash.com/photo-1615822359491-b38466b07758?w=300&h=300&fit=crop&q=80" // Placeholder for powder bag
        },
        {
            id: 2,
            category: "MAQUINARIA",
            title: "Film DTF Mate/Mate 30x100",
            desc: "Consigue estampados de alta definición con nuestro film DTF de 30 cm de ancho y 100 m...",
            price: 68.00,
            stock: 10,
            image: "https://images.unsplash.com/photo-1621360050850-2fbe59800705?w=300&h=300&fit=crop&q=80" // Placeholder for film rolls
        },
        {
            id: 3,
            category: "MAQUINARIA",
            title: "Tinta DTF Blanca Premium 1 Litro",
            desc: "Consigue impresiones de alta definición con nuestra tinta DTF blanca de 1 litro. Formulad...",
            price: 55.00,
            stock: 10,
            image: "https://images.unsplash.com/photo-1587311746654-71239aa8a1ed?w=300&h=300&fit=crop&q=80" // Placeholder for ink bottles
        },
        {
            id: 4,
            category: "MAQUINARIA",
            title: "Clip de Bloqueo para Manguera de Tinta DTF / Sublimación",
            desc: "Son esenciales en los sistemas DTF para bloquear temporalmente la tinta blanca y...",
            price: 2.00,
            stock: 30,
            image: "https://images.unsplash.com/photo-1541098485088-bd9c25603816?w=300&h=300&fit=crop&q=80" // Placeholder for clips
        }
    ];

    return (
        <div className="site">
            <Header />
            <main style={{ paddingTop: '80px' }}>
                {/* Hero Section */}
                <section className="tienda-hero">
                    <div className="container">
                        <h1 className="tienda-hero-title">
                            Tienda de Insumos <span>DTF</span>
                        </h1>
                        <p className="tienda-hero-desc">
                            Productos profesionales para impresión DTF de la más alta calidad
                        </p>
                        
                        <div className="tienda-features">
                            <div className="tienda-feature-item">
                                <i className="fa-solid fa-truck-fast"></i>
                                <span>Envío Rápido</span>
                            </div>
                            <div className="tienda-feature-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Calidad Garantizada</span>
                            </div>
                            <div className="tienda-feature-item">
                                <i className="fa-solid fa-headset"></i>
                                <span>Soporte 24/7</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="section">
                    <div className="container">
                        <div className="tienda-section-header">
                            <h2 className="tienda-section-title">Productos Destacados</h2>
                            <p className="tienda-section-subtitle">Productos profesionales para impresión DTF de la más alta calidad</p>
                        </div>

                        <div className="tienda-grid">
                            {products.map(product => (
                                <div key={product.id} className="product-card-store">
                                    <span className="badge-featured">Destacado</span>
                                    
                                    <div className="product-image-wrapper">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    
                                    <div className="product-category">{product.category}</div>
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-desc">{product.desc}</p>
                                    
                                    <div className="product-price">
                                        ${product.price.toFixed(2)}
                                    </div>
                                    
                                    <div className="product-stock">
                                        <i className="fa-solid fa-box-open"></i> {product.stock} disponibles
                                    </div>
                                    
                                    <button className="add-to-cart-btn">
                                        Agregar al carrito
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}