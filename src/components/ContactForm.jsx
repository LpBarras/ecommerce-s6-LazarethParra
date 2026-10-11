
import { useState } from 'react'

function ContactForm() {

    /* estados del formulario */
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')
    const [exito, setExito] = useState(false)

    /* validar formulario */
    const enviarFormulario = (evento) => {

        evento.preventDefault()
        setExito(false)

        /* campos vacios */
        if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
            setError('Completa todos los campos del formulario.')
            return
        }

        /* validar correo */
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Ingresa un correo electrónico válido.')
            return
        }

        /* formulario correcto */
        setError('')
        setExito(true)

        /* limpiar campos */
        setNombre('')
        setEmail('')
        setMensaje('')
    }

    return (
        <section id="contacto" className="contacto-section py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-lg-7">

                        <h2 className="mb-3">Contacto</h2>
                        <p>¿Tienes alguna consulta? Escríbenos.</p>

                        <form onSubmit={enviarFormulario} noValidate>

                            <div className="mb-3">
                                <label htmlFor="nombre-contacto" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    id="nombre-contacto"
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email-contacto" className="form-label">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email-contacto"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mensaje-contacto" className="form-label">
                                    Mensaje
                                </label>
                                <textarea
                                    id="mensaje-contacto"
                                    className="form-control"
                                    rows="5"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                />
                            </div>

                            {/* mensajes de validacion */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {exito && (
                                <div className="alert alert-success">
                                    Formulario validado correctamente.
                                    No se envían mensajes reales.
                                </div>
                            )}

                            <button type="submit" className="btn btn-esmeralda">
                                Enviar mensaje
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
