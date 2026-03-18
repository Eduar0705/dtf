import React, { useState } from 'react';
import Header from '../components/header';
import '../assets/galeria.css';

export default function Galeria() {
    const [selectedCanvases, setSelectedCanvases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientType, setClientType] = useState('Nuevo');

    const canvases = [
        { id: 1, image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop&q=80" },
        { id: 10, image: "https://images.unsplash.com/photo-1581898744040-5b583f6fdeea?w=400&h=500&fit=crop&q=80" },
        { id: 11, image: "https://images.unsplash.com/photo-1563241527-3004b7be2226?w=400&h=500&fit=crop&q=80" },
        { id: 12, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop&q=80" },
        { id: 13, image: "https://images.unsplash.com/photo-1574676648704-5f502c3efc1e?w=400&h=500&fit=crop&q=80" },
        { id: 14, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=500&fit=crop&q=80" }
    ];

    const toggleSelection = (id) => {
        if (selectedCanvases.includes(id)) {
            setSelectedCanvases(selectedCanvases.filter(canvasId => canvasId !== id));
        } else {
            setSelectedCanvases([...selectedCanvases, id]);
        }
    };

    return (
        <div className="site">
            <Header />
            <main className="galeria-section" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <h1 className="galeria-main-title">Galería de Lienzos DTF</h1>
                    
                    <div className="galeria-grid">
                        {canvases.map(canvas => {
                            const isSelected = selectedCanvases.includes(canvas.id);
                            
                            return (
                                <div 
                                    key={canvas.id} 
                                    className={`galeria-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => toggleSelection(canvas.id)}
                                >
                                    {isSelected && (
                                        <div className="galeria-card-check">
                                            <i className="fa-solid fa-circle-check"></i>
                                        </div>
                                    )}
                                    <div className="galeria-card-img-wrapper">
                                        <img src={canvas.image} alt={`Lienzo ${canvas.id}`} />
                                    </div>
                                    <div className="galeria-card-footer">
                                        <span>Lienzo {canvas.id}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {selectedCanvases.length > 0 && (
                    <div className="galeria-floating-container">
                        <button className="galeria-checkout-btn" onClick={() => setIsModalOpen(true)}>
                            HACER PEDIDO ( {selectedCanvases.length} )
                        </button>
                    </div>
                )}

                {/* Modal de Pedido */}
                {isModalOpen && (
                    <div className="galeria-modal-overlay" onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}>
                        <div className="galeria-modal-content">
                            <button className="galeria-modal-close" onClick={() => setIsModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            
                            <h2 className="galeria-modal-title">Detalles del Pedido</h2>
                            
                            <form className="galeria-modal-form" onSubmit={(e) => {
                                e.preventDefault();
                                alert(`Pedido realizado con éxito por ${selectedCanvases.length} lienzo(s)!`);
                                setIsModalOpen(false);
                                setSelectedCanvases([]); // Limpiar selección tras pedido exitoso
                            }}>
                                <div className="form-group">
                                    <label>Tipo de Cliente:</label>
                                    <div className="galeria-client-switch">
                                        <button 
                                            type="button" 
                                            className={clientType === 'Nuevo' ? 'active' : ''} 
                                            onClick={() => setClientType('Nuevo')}
                                        >
                                            Nuevo
                                        </button>
                                        <button 
                                            type="button" 
                                            className={clientType === 'Frecuente' ? 'active' : ''} 
                                            onClick={() => setClientType('Frecuente')}
                                        >
                                            Frecuente
                                        </button>
                                    </div>
                                </div>

                                {clientType === 'Nuevo' && (
                                    <>
                                        <div className="form-group">
                                            <label>Nombre Completo:</label>
                                            <input type="text" className="form-control" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Teléfono:</label>
                                            <input type="tel" className="form-control" required />
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <label>Correo Electrónico:</label>
                                    <input type="email" className="form-control" required />
                                </div>

                                <div className="form-group">
                                    <label>Cantidad (para cada diseño):</label>
                                    <input type="number" className="form-control" min="1" defaultValue="1" required />
                                </div>

                                <div className="form-group">
                                    <label>Método de Pago:</label>
                                    <select className="form-control" required>
                                        <option value="">Selecciona un método</option>
                                        <option value="efectivo">Efectivo</option>
                                        <option value="pago_movil">Pago Móvil</option>
                                        <option value="binance">Binance</option>
                                        <option value="zelle">Zelle</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Notas Adicionales:</label>
                                    <textarea className="form-control" placeholder="Instrucciones especiales para tu pedido..."></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-submit">
                                    REALIZAR PEDIDO
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}