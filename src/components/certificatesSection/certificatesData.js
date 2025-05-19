import awsPartnerPDF from '../../assets/aws_partner.pdf';
import awsObservabilityPDF from '../../assets/aws_observability.pdf';
import awsCloudEssentialsPDF from '../../assets/aws_cloud_essentials.pdf';

let scrumStudyImage;
try {
  scrumStudyImage = require('../../assets/scrum_fundamentals.jpg');
} catch (e) {
  console.warn("Advertencia: Imagen para SCRUMstudy (scrum_fundamentals.jpg) no encontrada en src/assets/. Se usará placeholder si está configurado.");
  scrumStudyImage = null;
}

let awsImage;
try {
  awsImage = require('../../assets/AWS-logo.jpg');
} catch (e) {
  console.warn("Advertencia: Imagen para AWS (AWS-logo.jpg) no encontrada en src/assets/. Se usará placeholder si está configurado.");
  awsImage = null;
}

let hackerRankLogo;
try {
  hackerRankLogo = require('../../assets/hackerank_logo.png');
} catch (e) {
  console.warn("Advertencia: Logo de HackerRank (hackerank_logo.png) no encontrado en src/assets/. Se usará placeholder si está configurado.");
  hackerRankLogo = null;
}

const baseCertificatesEN = [
  {
    id: "scrum-sfc",
    title: "Scrum Fundamentals Certified (SFC™)",
    issuer: "SCRUMstudy",
    issuerLogo: scrumStudyImage,
    rawDate: "2023-05-12",
    date: "May 12, 2023",
    link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=978278",
    type: "verification",
    description: "Demonstrates a foundational understanding of Scrum principles and practices.",
  },
  {
    id: "aws-partner-tech",
    title: "AWS Partner: Accreditation (Technical)",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-23",
    date: "April 23, 2025",
    link: awsPartnerPDF,
    type: "pdf",
    description: "Validates foundational AWS knowledge for technical roles within the AWS Partner Network.",
  },
  {
    id: "aws-observability",
    title: "AWS Cloud Observability",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-15",
    date: "April 15, 2025",
    link: awsObservabilityPDF,
    type: "pdf",
    description: "Focuses on monitoring, logging, and tracing applications and infrastructure on AWS.",
  },
  {
    id: "aws-cloud-essentials",
    title: "AWS Cloud Essentials",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-28",
    date: "April 28, 2025",
    link: awsCloudEssentialsPDF,
    type: "pdf",
    description: "Provides a fundamental understanding of AWS Cloud, its services, and core concepts.",
  },
  {
    id: "hackerrank-react",
    title: "Frontend Developer (React) Certificate",
    issuer: "HackerRank",
    issuerLogo: hackerRankLogo,
    rawDate: "2024-09-26",
    date: "September 26, 2024",
    link: "https://www.hackerrank.com/certificates/59900afd316e",
    type: "verification",
    description: "Demonstrates proficiency in fundamental React concepts and application building.",
  },
  {
    id: "hackerrank-restapi",
    title: "REST API (Intermediate) Certificate",
    issuer: "HackerRank",
    issuerLogo: hackerRankLogo,
    rawDate: "2024-08-03",
    date: "August 03, 2024",
    link: "https://www.hackerrank.com/certificates/6f9c7aa851a9",
    type: "verification",
    description: "Validates skills in designing, developing, and testing RESTful APIs.",
  },
];

const baseCertificatesES = [
  {
    id: "scrum-sfc",
    title: "Scrum Fundamentals Certified (SFC™)",
    issuer: "SCRUMstudy",
    issuerLogo: scrumStudyImage,
    rawDate: "2023-05-12",
    date: "12 de Mayo de 2023",
    link: "https://www.scrumstudy.com/certification/verify?type=SFC&number=978278",
    type: "verification",
    description: "Demuestra una comprensión fundamental de los principios y prácticas de Scrum.",
  },
  {
    id: "aws-partner-tech",
    title: "AWS Partner: Acreditación (Técnica)",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-23",
    date: "23 de Abril de 2025",
    link: awsPartnerPDF,
    type: "pdf",
    description: "Valida el conocimiento fundamental de AWS para roles técnicos dentro de la AWS Partner Network.",
  },
  {
    id: "aws-observability",
    title: "Observabilidad en la Nube de AWS",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-15",
    date: "15 de Abril de 2025",
    link: awsObservabilityPDF,
    type: "pdf",
    description: "Se enfoca en el monitoreo, registro y rastreo de aplicaciones e infraestructura en AWS.",
  },
  {
    id: "aws-cloud-essentials",
    title: "Fundamentos de la Nube de AWS",
    issuer: "Amazon Web Services",
    issuerLogo: awsImage,
    rawDate: "2025-04-28",
    date: "28 de Abril de 2025",
    link: awsCloudEssentialsPDF,
    type: "pdf",
    description: "Proporciona una comprensión fundamental de la Nube de AWS, sus servicios y conceptos centrales.",
  },
  {
    id: "hackerrank-react",
    title: "Certificado de Desarrollador Frontend (React)",
    issuer: "HackerRank",
    issuerLogo: hackerRankLogo,
    rawDate: "2024-09-26",
    date: "26 de Septiembre de 2024",
    link: "https://www.hackerrank.com/certificates/59900afd316e",
    type: "verification",
    description: "Demuestra competencia en conceptos fundamentales de React y construcción de aplicaciones.",
  },
  {
    id: "hackerrank-restapi",
    title: "Certificado REST API (Intermedio)",
    issuer: "HackerRank",
    issuerLogo: hackerRankLogo,
    rawDate: "2024-08-03",
    date: "03 de Agosto de 2024",
    link: "https://www.hackerrank.com/certificates/6f9c7aa851a9",
    type: "verification",
    description: "Valida habilidades en el diseño, desarrollo y prueba de APIs RESTful.",
  },
];

const sortCertificates = (certs) => {
  return [...certs].sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
};

export const certificatesDataContent = {
  en: {
    sectionTitle: "My Certificates",
    sectionSubtitle: "Validations of My Skills & Knowledge",
    viewButtonText: "View Certificate",
    verifyButtonText: "Verify Online",
    issuedByText: "Issued by:",
    certificates: sortCertificates(baseCertificatesEN),
  },
  es: {
    sectionTitle: "Mis Certificados",
    sectionSubtitle: "Validaciones de Mis Habilidades y Conocimientos",
    viewButtonText: "Ver Certificado",
    verifyButtonText: "Verificar en Línea",
    issuedByText: "Emitido por:",
    certificates: sortCertificates(baseCertificatesES),
  },
};