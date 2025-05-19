import React, { useEffect, useMemo, useState } from 'react';
import './certificatesSection.css';
import { certificatesDataContent } from './certificatesData';
import { FiExternalLink, FiDownload, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CertificatesSection = ({ language }) => {
  const content = certificatesDataContent[language] || certificatesDataContent.en;
  const [areCertificatesVisible, setAreCertificatesVisible] = useState(false);

  const toggleCertificatesVisibility = () => {
    setAreCertificatesVisible(!areCertificatesVisible);
  };

  const groupedAndSortedCertificates = useMemo(() => {
    if (!content.certificates || content.certificates.length === 0) {
      return {};
    }

    const sortedAllCerts = [...content.certificates].sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

    const groups = sortedAllCerts.reduce((acc, certificate) => {
      const issuer = certificate.issuer || "Otros";
      if (!acc[issuer]) {
        acc[issuer] = [];
      }
      acc[issuer].push(certificate);
      return acc;
    }, {});
    return groups;
  }, [content.certificates]);

  useEffect(() => {
    if (!areCertificatesVisible) return;

    const elementsToObserve = document.querySelectorAll(".certificate-card");
    if (elementsToObserve.length === 0) return;

    const observerCallback = (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    };
    const observerOptions = {
      threshold: 0.05,
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
  }, [areCertificatesVisible, groupedAndSortedCertificates, language]);

  const buttonText = areCertificatesVisible ?
    (language === 'es' ? 'Ocultar Certificados' : 'Hide Certificates') :
    (language === 'es' ? 'Ver Mis Certificados' : 'View My Certificates');

  const invitationMessage = language === 'es' ?
    'Tengo varias certificaciones que validan mis habilidades. ¡Haz clic para verlas!' :
    'I have several certifications validating my skills. Click to view them!';

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

        {content.certificates && content.certificates.length > 0 && (
          <div className="certificates_toggle_area">
            {!areCertificatesVisible && (
              <p className="certificates_invitation_message">{invitationMessage}</p>
            )}
            <button onClick={toggleCertificatesVisibility} className="btn btn-primary certificates_toggle_button">
              {buttonText}
              {areCertificatesVisible ? <FiChevronUp style={{ marginLeft: '0.5em' }} /> : <FiChevronDown style={{ marginLeft: '0.5em' }} />}
            </button>
          </div>
        )}
      </div>

      {areCertificatesVisible && Object.keys(groupedAndSortedCertificates).length > 0 && (
        <div className="container certificates_main_content_area">
          {Object.entries(groupedAndSortedCertificates).map(([issuer, certsInGroup], groupIndex) => (
            <div key={issuer} className="certificate_group">
              <h3 className="certificate_group_title">{issuer}</h3>
              <div className="certificates__container_grouped">
                {certsInGroup.map((cert, certIndex) => (
                  <article key={cert.id} className="certificate-card"
                           style={{'--card-index': certIndex, '--group-index': groupIndex }}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate_card_image_link_wrapper"
                      aria-label={`Ver certificado: ${cert.title}`}
                    >
                      <div className="certificate_card_image_wrapper_inner">
                        {cert.issuerLogo ? (
                          <img src={cert.issuerLogo} alt={`${cert.issuer} Logo`} className="certificate_card_image certificate_issuer_logo" />
                        ) : (
                          <div className="certificate_card_placeholder_image">
                            <FiAward />
                          </div>
                        )}
                      </div>
                    </a>
                    <div className="certificate_card_content">
                      <h4 className="certificate_card_title">{cert.title}</h4>
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
            </div>
          ))}
        </div>
      )}
      {(!content.certificates || content.certificates.length === 0) && (
         <div className="container">
            <p>{language === 'es' ? 'Actualmente no hay certificados para mostrar.' : 'No certificates to display at the moment.'}</p>
         </div>
      )}
    </section>
  );
};

export default CertificatesSection;