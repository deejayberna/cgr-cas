const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const SRC_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");

const DEFAULT_DESCRIPTION =
    "CGR Candelario y Asociados — despacho de contadores y auditores en Ciudad de México. Servicios contables, fiscales, auditoría y recursos humanos.";

const PAGE_CONFIG = {
    "index.html": {
        slug: "index",
        navKey: "inicio",
        title: "CGR-CAS — Contadores y Auditores",
        description: DEFAULT_DESCRIPTION,
        chat: true,
        titleBar: false,
        mainClass: "main-home",
    },
    "contadores.html": {
        slug: "contadores",
        navKey: "contadores",
        title: "Servicios Contables — CGR-CAS",
        pageHeading: "Servicios Contables",
        pageSubtitle: "Consultoría fiscal, contabilidad general, nómina y outsourcing contable.",
        chat: true,
        titleBar: true,
    },
    "controlinterno.html": {
        slug: "controlinterno",
        navKey: "controlinterno",
        title: "Control Interno — CGR-CAS",
        pageHeading: "Control Interno",
        pageSubtitle: "Fortalece tus procesos, minimiza riesgos y protege los activos de tu empresa.",
        chat: true,
        titleBar: true,
    },
    "administracionfree.html": {
        slug: "administracionfree",
        navKey: "administracionfree",
        title: "Administración Free — CGR-CAS",
        pageHeading: "Administración Free",
        pageSubtitle: "Soluciones Aspel para gestionar tu negocio de forma eficiente.",
        chat: true,
        titleBar: true,
    },
    "rrhh.html": {
        slug: "rrhh",
        navKey: "rrhh",
        title: "Recursos Humanos — CGR-CAS",
        pageHeading: "Recursos Humanos",
        pageSubtitle: "Reclutamiento, capacitación y gestión del talento humano.",
        chat: true,
        titleBar: true,
    },
    "auditores.html": {
        slug: "auditores",
        navKey: "auditores",
        title: "Auditores — CGR-CAS",
        pageHeading: "Servicios de Auditoría",
        pageSubtitle: "Auditoría financiera, operativa, tributaria, interna e informática.",
        chat: true,
        titleBar: true,
    },
    "legal.html": {
        slug: "legal",
        navKey: null,
        title: "Servicios Legales — CGR-CAS",
        pageHeading: "Servicios Legales",
        pageSubtitle: "Asesoría jurídica corporativa, laboral y mercantil.",
        chat: true,
        titleBar: true,
    },
    "inversiones.html": {
        slug: "inversiones",
        navKey: null,
        title: "Inversiones — CGR-CAS",
        pageHeading: "Inversiones",
        pageSubtitle: "Estrategias financieras para optimizar y hacer crecer tu patrimonio.",
        chat: true,
        titleBar: true,
    },
    "contabilidad.html": {
        slug: "contabilidad",
        navKey: null,
        title: "Contabilidad — CGR-CAS",
        pageHeading: "Contabilidad",
        pageSubtitle: "Control contable preciso para una toma de decisiones informada.",
        chat: true,
        titleBar: true,
    },
    "pensiones.html": {
        slug: "pensiones",
        navKey: null,
        title: "Pensiones — CGR-CAS",
        pageHeading: "Pensiones",
        pageSubtitle: "Gestión de esquemas de retiro y cumplimiento previsional.",
        chat: true,
        titleBar: true,
    },
    "fiscal.html": {
        slug: "fiscal",
        navKey: null,
        title: "Servicios Fiscales — CGR-CAS",
        pageHeading: "Servicios Fiscales",
        pageSubtitle: "Cumplimiento tributario y planeación fiscal estratégica.",
        chat: true,
        titleBar: true,
    },
    "finanzas.html": {
        slug: "finanzas",
        navKey: null,
        title: "Finanzas — CGR-CAS",
        pageHeading: "Finanzas",
        pageSubtitle: "Análisis, proyecciones y administración financiera integral.",
        chat: true,
        titleBar: true,
    },
    "corporativo.html": {
        slug: "corporativo",
        navKey: null,
        title: "Corporativo — CGR-CAS",
        pageHeading: "Corporativo",
        pageSubtitle: "Gobierno corporativo y estructuras empresariales.",
        chat: true,
        titleBar: true,
    },
    "servicios-contables.html": {
        slug: "servicios-contables",
        navKey: null,
        title: "Servicios Contables — CGR-CAS",
        pageHeading: "Servicios Contables",
        pageSubtitle: "Soluciones integrales para la gestión contable de tu empresa.",
        chat: false,
        titleBar: true,
        singleColumn: true,
    },
    "servicios-auditoria.html": {
        slug: "servicios-auditoria",
        navKey: null,
        title: "Servicios de Auditoría — CGR-CAS",
        pageHeading: "Servicios de Auditoría",
        pageSubtitle: "Auditorías de cumplimiento, operacionales y consultoría de procesos.",
        chat: false,
        titleBar: true,
        singleColumn: true,
    },
    "contacto.html": {
        slug: "contacto",
        navKey: "contacto",
        title: "Contacto — CGR-CAS",
        chat: false,
        titleBar: false,
        singleColumn: true,
    },
};

function read(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function emptyDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
    ensureDir(dirPath);
}

function copyDir(source, destination) {
    ensureDir(destination);
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
        const from = path.join(source, entry.name);
        const to = path.join(destination, entry.name);
        if (entry.isDirectory()) {
            copyDir(from, to);
        } else {
            fs.copyFileSync(from, to);
        }
    }
}

function extractTitle(html) {
    const match = html.match(/<title>([\s\S]*?)<\/title>/i);
    return match ? match[1].trim() : "CGR-CAS";
}

function extractMainContent(html) {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    return mainMatch ? mainMatch[1].trim() : "";
}

function normalizeLinks(content) {
    return content
        .replace(/href="index\.html"/g, 'href="/"')
        .replace(/href="([^"/#][^"]*?)\.html"/g, 'href="/$1"');
}

function buildHeader(activeNavKey) {
    const navKeys = [
        "inicio",
        "contadores",
        "controlinterno",
        "administracionfree",
        "rrhh",
        "auditores",
        "contacto",
    ];

    let header = read(path.join(SRC_DIR, "partials", "header.html"));
    navKeys.forEach((key) => {
        const placeholder = `{{NAV_${key.toUpperCase()}}}`;
        const attr = activeNavKey === key ? ' aria-current="page"' : "";
        header = header.replace(placeholder, attr);
    });

    return header;
}

function buildPageHero(config) {
    if (!config.titleBar) {
        return "";
    }

    const heading = config.pageHeading || "Servicios";
    const subtitle = config.pageSubtitle
        ? `<p>${config.pageSubtitle}</p>`
        : "";

    return `
    <section class="page-hero">
        <div class="page-hero-inner">
            <p class="page-hero-eyebrow">CGR-CAS</p>
            <h1>${heading}</h1>
            ${subtitle}
        </div>
    </section>`;
}

function wrapPageContent(content, config) {
    if (config.slug === "index") {
        return content;
    }

    if (config.singleColumn) {
        return `
        <div class="page-content">
            <article class="service-card page-article">${content}</article>
        </div>`;
    }

    return `
        <div class="page-content">
            <div class="services-grid page-services">
                ${content}
            </div>
        </div>`;
}

function buildContactContent() {
    return `
        <div class="contact-page">
            <section class="contact-hero-card" aria-labelledby="contacto-titulo">
                <h2 id="contacto-titulo">Hablemos de tu proyecto</h2>
                <p>Estamos listos para atenderte. Escríbenos o llámanos y te responderemos a la brevedad.</p>
            </section>
            <div class="contact-grid">
                <div class="contact-item">
                    <span class="contact-item-label">Dirección</span>
                    Los Juárez No. 37-A, Col. San José Insurgentes, CDMX
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Teléfono</span>
                    <a href="tel:+525556157899">55 5615 7899</a><br>
                    <a href="tel:+525556119585">55 5611 9585</a>
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Correo general</span>
                    <a href="mailto:ocandelario@gmail.com">ocandelario@gmail.com</a>
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Correo corporativo</span>
                    <a href="mailto:direccion@cghoccontadores.mx">direccion@cghoccontadores.mx</a>
                </div>
            </div>
            <section class="informacion" aria-label="Información corporativa">
                <div class="mision">
                    <h3>Misión</h3>
                    <p>Proporcionar servicios contables y financieros de alta calidad para ayudar a nuestros clientes a alcanzar sus objetivos económicos y empresariales.</p>
                </div>
                <div class="vision">
                    <h3>Visión</h3>
                    <p>Ser líderes en el sector contable, reconocidos por nuestra excelencia en el servicio al cliente y nuestro compromiso con la integridad y la ética empresarial.</p>
                </div>
                <div class="quienessomos">
                    <h3>Quiénes Somos</h3>
                    <p>Un equipo de profesionales altamente calificados en contabilidad, finanzas y auditoría, con soluciones a medida para cada cliente.</p>
                </div>
                <div class="valores">
                    <h3>Valores</h3>
                    <ul class="valores-list">
                        <li>Integridad</li>
                        <li>Profesionalismo</li>
                        <li>Compromiso</li>
                        <li>Calidad</li>
                        <li>Ética</li>
                    </ul>
                </div>
            </section>
            <a href="/" class="back-button">← Volver al inicio</a>
        </div>`;
}

function buildPage(fileName, config, layout, footerTemplate) {
    const sourcePath = path.join(FRONTEND_DIR, fileName);
    const sourceHtml = read(sourcePath);

    let content =
        fileName === "contacto.html"
            ? buildContactContent()
            : normalizeLinks(extractMainContent(sourceHtml));

    content = wrapPageContent(content, config);

    const title = config.title || extractTitle(sourceHtml);
    const description = config.description || DEFAULT_DESCRIPTION;
    const header = buildHeader(config.navKey);
    const titleBar = buildPageHero(config);
    const footer = footerTemplate.replace("{{YEAR}}", String(new Date().getFullYear()));
    const mainClass = config.mainClass ? ` class="${config.mainClass}"` : config.singleColumn ? ' class="page-single"' : "";

    let page = layout
        .replace("{{TITLE}}", title)
        .replace("{{DESCRIPTION}}", description)
        .replace("{{HEADER}}", header)
        .replace("{{TITLEBAR}}", titleBar)
        .replace("{{MAIN_CLASS}}", mainClass)
        .replace("{{CONTENT}}", content)
        .replace("{{FOOTER}}", footer);

    if (config.chat) {
        page = page
            .replace("{{CHAT_CSS}}", '<link rel="stylesheet" href="/assets/css/chat.css">')
            .replace("{{CHAT}}", read(path.join(SRC_DIR, "partials", "chat.html")))
            .replace("{{CHAT_JS}}", '<script src="/assets/js/chat.js" defer></script>');
    } else {
        page = page.replace("{{CHAT_CSS}}", "").replace("{{CHAT}}", "").replace("{{CHAT_JS}}", "");
    }

    const outputName = config.slug === "index" ? "index.html" : `${config.slug}.html`;
    fs.writeFileSync(path.join(PUBLIC_DIR, outputName), page, "utf8");
    console.log(`  ✓ ${outputName}`);
}

function copyLegacyImages() {
    const imageNames = ["logo-candelarios.jpg", "fondo-candelario.jpg"];
    const imagesDir = path.join(PUBLIC_DIR, "assets", "images");

    imageNames.forEach((imageName) => {
        const legacyPath = path.join(FRONTEND_DIR, imageName);
        if (fs.existsSync(legacyPath)) {
            fs.copyFileSync(legacyPath, path.join(imagesDir, imageName));
            console.log(`  ✓ Imagen copiada: ${imageName}`);
        }
    });
}

function build() {
    console.log("Construyendo sitio para Vercel...\n");

    emptyDir(PUBLIC_DIR);
    copyDir(path.join(SRC_DIR, "assets"), path.join(PUBLIC_DIR, "assets"));
    copyLegacyImages();

    const layout = read(path.join(SRC_DIR, "layout.html"));
    const footerTemplate = read(path.join(SRC_DIR, "partials", "footer.html"));

    console.log("Generando páginas:");
    Object.entries(PAGE_CONFIG).forEach(([fileName, config]) => {
        buildPage(fileName, config, layout, footerTemplate);
    });

    console.log("\nBuild completado en /public");
}

build();
