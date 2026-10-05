function Footer() {

    /* Footer */
    return (
        <footer className="footer-gamestore">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-6">
                        <h3 className="footer-brand">GAME<span>STORE</span></h3>
                        <p className="mb-0">Encuentra grandes aventuras.</p>
                    </div>

                    <div className="col-md-3">
                        <h4>Plataformas</h4>
                        <ul className="list-unstyled footer-links">
                            <li>PlayStation</li>
                            <li>Xbox</li>
                            <li>Nintendo</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4>Contacto</h4>
                        <p className="mb-2">
                            <i className="bi bi-envelope me-2"></i>
                            contacto@gamestore.cl
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                            <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="text-center small">
                    © 2026 GameStore — S8 Desarrollo FrontEnd
                </div>
            </div>
        </footer>
    )
}

export default Footer
