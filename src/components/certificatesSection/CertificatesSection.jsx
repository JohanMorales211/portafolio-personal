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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    elementsToObserve.forEach((el, index) => {
      el.style.setProperty('--card-index', index.toString());
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [areCertificatesVisible, groupedAndSortedCertificates, language]);

  const buttonText = areCertificatesVisible ?
    (language === 'es' ? 'Ocultar Certificados' : 'Hide Certificates') :
    (language === 'es' ? 'Ver Mis Certificados' : 'View My Certificates');

  const invitationMessage = language === 'es' ?
    'Certificaciones que validan mis habilidades. Haz clic para verlas.' :
    'Certifications validating my skills. Click to view them.';

  return (
    <section id="certificados" className="certificates">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">
            {language === 'es' ? 'Credenciales' : 'Credentials'}
          </span>
          <h2>{content.sectionTitle}</h2>
          <span className="gold-divider" />
          {!areCertificatesVisible && (
            <p className="section-desc">{invitationMessage}</p>
          )}
        </div>

        {content.certificates && content.certificates.length > 0 && (
          <div className="certificates__toggle-area">
            <button onClick={toggleCertificatesVisibility} className="btn btn-outline">
              {buttonText}
              {areCertificatesVisible ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        )}

        {areCertificatesVisible && Object.keys(groupedAndSortedCertificates).length > 0 && (
          <div className="certificates__content">
            {Object.entries(groupedAndSortedCertificates).map(([issuer, certsInGroup]) => (
              <div key={issuer} className="certificate-group">
                <h3 className="certificate-group__title">
                  <FiAward /> {issuer}
                </h3>
                <div className="certificate-group__grid">
                  {certsInGroup.map((cert) => (
                    <article key={cert.id} className="certificate-card dark-card reveal">
                      <div className="certificate-card__header">
                        {cert.issuerLogo ? (
                          <img
                            src={cert.issuerLogo}
                            alt={`${cert.issuer} Logo`}
                            className="certificate-card__logo"
                          />
                        ) : (
                          <span className="certificate-card__logo-placeholder">
                            <FiAward />
                          </span>
                        )}
                        <div>
                          <h4 className="certificate-card__title">{cert.title}</h4>
                          {cert.date && <p className="certificate-card__date">{cert.date}</p>}
                        </div>
                      </div>
                      {cert.description && (
                        <p className="certificate-card__description">{cert.description}</p>
                      )}
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certificate-card__link"
                        aria-label={`${cert.type === 'pdf' ? content.viewButtonText : content.verifyButtonText} - ${cert.title}`}
                      >
                        {cert.type === 'pdf' ? <FiDownload /> : <FiExternalLink />}
                        <span>{cert.type === 'pdf' ? content.viewButtonText : content.verifyButtonText}</span>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
