import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/Modal';
import Form from '../components/Form';
import axios from 'axios';

function EmpleadosPage() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const getList = 'http://127.0.0.1:8000/empleados';
    // const postSave = 'http://127.0.0.1:8000/save_empleados';
    // const putUpdate = 'http://127.0.0.1:8000/edit_empleados';
    // const getEdit = 'http://127.0.0.1:8000/update_empleados';
    const postDelete = 'http://127.0.0.1:8000/delete_empleados';

    useEffect(() => {
        axios.get(getList)
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleAddEmployeeClick = () => {
        setShowForm(true); // Cambia el estado para mostrar el formulario
    };

    const handleCloseForm = () => {
        setShowForm(false); // Cambia el estado para ocultar el formulario
    };

    const handleEditEmployeeClick = (id) => {
        setModalData({
            icon: <BsPencil size={30} />,
            title: 'Editar Empleado',
            message: '¿Estás seguro de que deseas editar este empleado?'
        });
        setShowModal(true);
    };

    const handleDeleteEmployeeClick = (id) => {
        setModalData({
            icon: <BsTrash size={30} />,
            title: 'Eliminar Empleado',
            message: '¿Estás seguro de que deseas eliminar este empleado?'
        });
        console.log(id);
        setEmployeeIdToDelete(id); // Guarda el ID del empleado a eliminar
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Si hay un ID de empleado a eliminar, realiza la solicitud de eliminación
        if (employeeIdToDelete) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.post(postDelete, { id: employeeIdToDelete })
                .then(response => {
                    console.log('Empleado eliminado:', response);
                    // Actualiza la lista de empleados después de la eliminación
                    axios.get(getList)
                        .then(response => {
                            setEmployees(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching employees after deletion:', error);
                        });
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                });
            setEmployeeIdToDelete(null); // Reinicia el estado del ID del empleado a eliminar
        }
    };

    const handleSubmitForm = () => {
        // Aquí puedes enviar los datos del formulario a donde corresponda
        // Limpia los campos del formulario después de enviar
        setShowForm(false);
    };

    return (
        <div className='container'>
            <h2 className='d-flex justify-content-center mt-5 mb-5'>Administrador de Empleados</h2>
            <div className="d-flex justify-content-end mb-2">
                <Button variant="success" onClick={handleAddEmployeeClick} className="custom-btn circular-btn me-2">
                    <BsPlus size={20} className="me-1" />
                    Agregar Nuevo Empleado
                </Button>
            </div>
            {showForm && <Form onSubmit={handleSubmitForm} onClose={handleCloseForm} />}
            <div >
                <Table striped bordered hover className='table table-striped'>
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Razón Social</th>
                            <th>Cédula</th>
                            <th>Teléfono</th>
                            <th>País</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.nombre}</td>
                                <td>{employee.apellido}</td>
                                <td>{employee.razon_social}</td>
                                <td>{employee.cedula}</td>
                                <td>{employee.telefono}</td>
                                <td>{employee.pais}</td>
                                <td>{employee.ciudad}</td>
                                <td className='d-flex justify-content-center'>
                                    <Button variant="warning" onClick={() => handleEditEmployeeClick(employee.id)} className="me-2">
                                        <BsPencil /> Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteEmployeeClick(employee.id)}>
                                        <BsTrash /> Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onClose={handleCloseModal} icon={modalData.icon} title={modalData.title} message={modalData.message} />
        </div>
    );
}

export default EmpleadosPage;
