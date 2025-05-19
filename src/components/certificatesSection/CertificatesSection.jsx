import React, { useEffect } from 'react';
import './certificatesSection.css';
import { certificatesDataContent } from './certificatesData';
import { FiExternalLink, FiDownload, FiAward } from 'react-icons/fi';

const CertificatesSection = ({ language }) => {
  const content = certificatesDataContent[language] || certificatesDataContent.en;

  useEffect(() => {
    const elementsToObserve = document.querySelectorAll(".certificate-card");
    const observerCallback = (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    };
    const observerOptions = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elementsToObserve.forEach((el, index) => {
      el.style.setProperty('--card-index', index.toString());
      observer.observe(el);
    });
    return () => {
      elementsToObserve.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [content.certificates, language]);

  return (
    <section id="certificates" className="certificates_section">
      <div className="container certificates_section_header">
        {content.sectionSubtitle && (
          <h5 className="certificates_section_subtitle">
            {content.sectionSubtitle}
          </h5>
        )}
        <h2 className="certificates_section_title">
          {content.sectionTitle}
          <span className="section_title_dot">.</span>
        </h2>
      </div>

      {content.certificates && content.certificates.length > 0 ? (
        <div className="container certificates__container">
          {content.certificates.map((cert) => (
            <article key={cert.id} className="certificate-card">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate_card_image_link_wrapper"
                aria-label={`Ver certificado: ${cert.title}`}
              >
                <div className="certificate_card_image_wrapper_inner">
                  {/* --- LÓGICA DE IMAGEN ACTUALIZADA --- */}
                  {cert.issuerLogo ? (
                    <img src={cert.issuerLogo} alt={`${cert.issuer} Logo`} className="certificate_card_image certificate_issuer_logo" />
                  ) : cert.previewImage ? ( // Fallback opcional a la imagen del certificado
                    <img src={cert.previewImage} alt={cert.title} className="certificate_card_image" />
                  ) : (
                    <div className="certificate_card_placeholder_image">
                      <FiAward />
                    </div>
                  )}
                  {/* --- FIN LÓGICA DE IMAGEN --- */}
                </div>
              </a>
              <div className="certificate_card_content">
                <h3 className="certificate_card_title">{cert.title}</h3>
                {cert.issuer && <p className="certificate_card_issuer"><em>{content.issuedByText} {cert.issuer}</em></p>}
                {cert.date && <p className="certificate_card_date">{cert.date}</p>}
                {cert.description && <p className="certificate_card_description">{cert.description}</p>}

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary certificate_card_button"
                  aria-label={`${cert.type === 'pdf' ? content.viewButtonText : content.verifyButtonText} para ${cert.title}`}
                >
                  {cert.type === 'pdf' ? <FiDownload /> : <FiExternalLink />}
                  <span>{cert.type === 'pdf' ? content.viewButtonText : content.verifyButtonText}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="container">
          <p>{language === 'es' ? 'No hay certificados para mostrar en este momento.' : 'No certificates to display at the moment.'}</p>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;