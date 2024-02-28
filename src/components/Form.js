import React, { useState } from 'react';

function Form({ show, onSubmit }) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        razon_social: '',
        cedula: '',
        telefono: '',
        pais: '',
        ciudad: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        // Aquí puedes enviar los datos del formulario a donde corresponda
        console.log('Datos del formulario:', formData);
        // Limpia los campos del formulario después de enviar
        setFormData({
            nombre: '',
            apellido: '',
            razon_social: '',
            cedula: '',
            telefono: '',
            pais: '',
            ciudad: ''
        });
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} id="modalSubscriptionForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden={!show}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Formulario de Registro</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        <form onSubmit={handleSubmit}>
                            <div className="md-form mb-5">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="nombre" name="nombre" className="form-control validate"
                                    value={formData.nombre} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="nombre">Nombre</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="apellido" name="apellido" className="form-control validate"
                                    value={formData.apellido} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="apellido">Apellido</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="razon_social" name="razon_social" className="form-control validate"
                                    value={formData.razon_social} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="razon_social">Razón Social</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="cedula" name="cedula" className="form-control validate"
                                    value={formData.cedula} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="cedula">Cédula</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="telefono" name="telefono" className="form-control validate"
                                    value={formData.telefono} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="telefono">Teléfono</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="pais" name="pais" className="form-control validate"
                                    value={formData.pais} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="pais">País</label>
                            </div>

                            <div className="md-form mb-4">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input type="text" id="ciudad" name="ciudad" className="form-control validate"
                                    value={formData.ciudad} onChange={handleChange} />
                                <label data-error="wrong" data-success="right" htmlFor="ciudad">Ciudad</label>
                            </div>

                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-indigo">Guardar <i className="fas fa-paper-plane-o ml-1"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;

