import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import '../styles/registro.css'

export function Registro() {

  const [create, setCreate] = useState(
    {
      id: '',
      name: '',
      description: '',
      price: '',
      image: ''

    }
  )

  const handleChange = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value
    })
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(create)
    }

    fetch('http://localhost:3002/products', requestInit)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCreate({
          id: '',
          name: '',
          description: '',
          price: '',
          images: ''
        });
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  return (
    <div className="formulario-container">
      <strong>
        <h1 className="titulo">Registrar</h1>
      </strong>
      <Form onSubmit={handleSubmit} className="formulario">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={handleChange}
            type="Number"
            name="id"
            placeholder="Id"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="Number"
            placeholder="Precio"
            name="price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Descripción"
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Imagenes"
            name="images"
          />
         
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Añadir
        </Button>
      </Form>
      <div>
      <label>Vueva a recargar la pagina, cuando añada un nuvo producto </label>
      </div>
    </div>
    
  );

}

export function Tables() {

  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState('');
  const [editingProductPrice, setEditingProductPrice] = useState('');
  const [editingProductDescription, setEditingProductDescription] = useState('');
  
  useEffect(() => {
    const getProducts = () => {
      fetch('http://localhost:3002/products')
        .then(res => res.json())
        .then(res => setProducts(res));
    };
    getProducts();
  }, []);
  
  function handleDelete(productId) {
    fetch(`http://localhost:3002/products/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Manejar la respuesta del servidor
        // Actualizar la interfaz de usuario si es necesario
      })
      .catch(error => console.error(error)); // Manejar errores de la solicitud
  }
  
  function handleEdit(productId) {
    setEditingProductId(productId);
    const productToEdit = products.find(product => product._id === productId);
    setEditingProductName(productToEdit.name);
    setEditingProductPrice(productToEdit.price);
    setEditingProductDescription(productToEdit.description);
  }
  
  function handleEditSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3002/products/${editingProductId}`, {
      method: 'PUT', // cambiar a PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editingProductName,
        price: editingProductPrice,
        description: editingProductDescription
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Manejar la respuesta del servidor
        setEditingProductId(null);
        setEditingProductName('');
        setEditingProductPrice('');
        setEditingProductDescription('');
        setProducts(prevProducts => prevProducts.map(product => {
          if (product._id === editingProductId) {
            return {
              ...product,
              name: editingProductName,
              price: editingProductPrice,
              description: editingProductDescription
            };
          } else {
            return product;
          }
        }));
      })
      .catch(error => console.error(error)); // Manejar errores de la solicitud
  }
  
  
  return (
    <div>
      <table className='table' style={{ width: '50%', margin: '0 auto' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.images} alt={product.image} style={{ maxWidth: '90%', border: '1px solid gray' }} />
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                <button onClick={() => handleEdit(product._id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
        {editingProductId && (
          <div>
            <h2>Editar producto</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Nombre:
                <input type="text" value={editingProductName} onChange={e => setEditingProductName(e.target.value)} />
              </label>
              <label>
                Precio:
                <input type="text" value={editingProductPrice} onChange={e => setEditingProductPrice(e.target.value)} />
              </label>
              <label>
                Descripción:
                <textarea value={editingProductDescription} onChange={e => setEditingProductDescription(e.target.value)}></textarea>
              </label>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setEditingProductId(null)}>Cancelar</button>
            </form>
          </div>
        )}
      </div>
    );
        }  