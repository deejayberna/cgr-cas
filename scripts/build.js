const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const SRC_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");

const DEFAULT_DESCRIPTION =
    "CGR Candelario y Asociados — despacho de contadores y auditores en Ciudad de México. Servicios contables, fiscales, auditoría y recursos humanos.";

const SITE_URL = (process.env.SITE_URL || "https://www.cghocontadores.mx").replace(/\/$/, "");
const DEVELOPER_URL = "https://solucionesiotysoftware.online/";
const DEVELOPER_NAME = "Soluciones IoT & Software";
const OG_IMAGE_PATH = "/assets/images/og-image.jpg";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

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
        description: "Consultoría fiscal, outsourcing contable, nómina y contabilidad general en CDMX. CGR Candelario y Asociados.",
        pageHeading: "Servicios Contables",
        pageSubtitle: "Consultoría fiscal, contabilidad general, nómina y outsourcing contable.",
        chat: true,
        titleBar: true,
    },
    "controlinterno.html": {
        slug: "controlinterno",
        navKey: "controlinterno",
        title: "Control Interno — CGR-CAS",
        description: "Servicios de control interno empresarial: evaluación de riesgos, procesos y recomendaciones estratégicas en Ciudad de México.",
        pageHeading: "Control Interno",
        pageSubtitle: "Fortalece tus procesos, minimiza riesgos y protege los activos de tu empresa.",
        chat: true,
        titleBar: true,
    },
    "administracionfree.html": {
        slug: "administracionfree",
        navKey: "administracionfree",
        title: "Administración Free — CGR-CAS",
        description: "Administración Free con productos Aspel: SAE, NOI, COI, Bancos y facturación electrónica para tu empresa.",
        pageHeading: "Administración Free",
        pageSubtitle: "Soluciones Aspel para gestionar tu negocio de forma eficiente.",
        chat: true,
        titleBar: true,
    },
    "rrhh.html": {
        slug: "rrhh",
        navKey: "rrhh",
        title: "Recursos Humanos — CGR-CAS",
        description: "Servicios de recursos humanos: reclutamiento, capacitación, gestión del desempeño y nóminas en Ciudad de México.",
        pageHeading: "Recursos Humanos",
        pageSubtitle: "Reclutamiento, capacitación y gestión del talento humano.",
        chat: true,
        titleBar: true,
    },
    "auditores.html": {
        slug: "auditores",
        navKey: "auditores",
        title: "Auditores — CGR-CAS",
        description: "Auditoría financiera, operativa, tributaria, interna e informática. Despacho de auditores en Ciudad de México.",
        pageHeading: "Servicios de Auditoría",
        pageSubtitle: "Auditoría financiera, operativa, tributaria, interna e informática.",
        chat: true,
        titleBar: true,
    },
    "legal.html": {
        slug: "legal",
        navKey: null,
        title: "Servicios Legales — CGR-CAS",
        description: "Asesoría jurídica corporativa, laboral, mercantil y de propiedad intelectual para empresas en Ciudad de México.",
        pageHeading: "Servicios Legales",
        pageSubtitle: "Asesoría jurídica corporativa, laboral y mercantil.",
        chat: true,
        titleBar: true,
    },
    "inversiones.html": {
        slug: "inversiones",
        navKey: null,
        title: "Inversiones — CGR-CAS",
        description: "Estrategias de inversión y asesoría financiera para optimizar recursos y patrimonio empresarial.",
        pageHeading: "Inversiones",
        pageSubtitle: "Estrategias financieras para optimizar y hacer crecer tu patrimonio.",
        chat: true,
        titleBar: true,
    },
    "contabilidad.html": {
        slug: "contabilidad",
        navKey: null,
        title: "Contabilidad — CGR-CAS",
        description: "Contabilidad general, estados financieros y registros contables precisos para tu empresa en CDMX.",
        pageHeading: "Contabilidad",
        pageSubtitle: "Control contable preciso para una toma de decisiones informada.",
        chat: true,
        titleBar: true,
    },
    "pensiones.html": {
        slug: "pensiones",
        navKey: null,
        title: "Pensiones — CGR-CAS",
        description: "Gestión de pensiones, esquemas de retiro y cumplimiento de obligaciones previsionales empresariales.",
        pageHeading: "Pensiones",
        pageSubtitle: "Gestión de esquemas de retiro y cumplimiento previsional.",
        chat: true,
        titleBar: true,
    },
    "fiscal.html": {
        slug: "fiscal",
        navKey: null,
        title: "Servicios Fiscales — CGR-CAS",
        description: "Cumplimiento fiscal, declaraciones, planeación tributaria y asesoría ante el SAT en Ciudad de México.",
        pageHeading: "Servicios Fiscales",
        pageSubtitle: "Cumplimiento tributario y planeación fiscal estratégica.",
        chat: true,
        titleBar: true,
    },
    "finanzas.html": {
        slug: "finanzas",
        navKey: null,
        title: "Finanzas — CGR-CAS",
        description: "Servicios financieros, análisis, proyecciones e indicadores para una administración empresarial sólida.",
        pageHeading: "Finanzas",
        pageSubtitle: "Análisis, proyecciones y administración financiera integral.",
        chat: true,
        titleBar: true,
    },
    "corporativo.html": {
        slug: "corporativo",
        navKey: null,
        title: "Corporativo — CGR-CAS",
        description: "Servicios corporativos, gobierno empresarial, estructuras societarias y procesos organizacionales.",
        pageHeading: "Corporativo",
        pageSubtitle: "Gobierno corporativo y estructuras empresariales.",
        chat: true,
        titleBar: true,
    },
    "servicios-contables.html": {
        slug: "servicios-contables",
        navKey: null,
        title: "Servicios Contables — CGR-CAS",
        description: "Servicios contables integrales: cumplimiento, reportes financieros y consultoría para empresas en México.",
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
        description: "Auditorías de cumplimiento, operacionales, evaluación de riesgos y consultoría de procesos empresariales.",
        pageHeading: "Servicios de Auditoría",
        pageSubtitle: "Auditorías de cumplimiento, operacionales y consultoría de procesos.",
        chat: false,
        titleBar: true,
        singleColumn: true,
    },
    "contacto.html": {
        slug: "contacto",
        navKey: "contacto",
        title: "Contacto — Despacho contable en CDMX | CGR-CAS",
        description: "Contacta a CGR Candelario y Asociados en San José Insurgentes, CDMX. Teléfono, WhatsApp, correo y formulario.",
        chat: false,
        titleBar: true,
        pageHeading: "Contacto",
        pageSubtitle: "Estamos en Col. San José Insurgentes. Respondemos en 24 horas hábiles.",
        singleColumn: true,
        showCta: false,
    },
    "quienes-somos.html": {
        slug: "quienes-somos",
        navKey: "quienesomos",
        title: "Quiénes somos — CGR Candelario y Asociados | CGR-CAS",
        description: "Conoce al despacho CGR-CAS: contadores y auditores en Ciudad de México con más de 25 años de experiencia.",
        pageHeading: "Quiénes somos",
        pageSubtitle: "Despacho contable en San José Insurgentes, Ciudad de México.",
        chat: true,
        titleBar: true,
    },
    "aviso-privacidad.html": {
        slug: "aviso-privacidad",
        navKey: null,
        title: "Aviso de privacidad — CGR-CAS",
        description: "Aviso de privacidad de CGR Candelario y Asociados sobre el tratamiento de datos personales.",
        pageHeading: "Aviso de privacidad",
        chat: false,
        titleBar: true,
        singleColumn: true,
        showCta: false,
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
        "quienesomos",
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

function buildPageCta() {
    return `
            <section class="page-cta">
                <h3>¿Te interesa este servicio?</h3>
                <p>Cuéntanos tu necesidad y te orientamos sin compromiso. Respondemos en 24 horas hábiles.</p>
                <div class="hero-actions">
                    <a href="/contacto" class="btn btn-primary">Solicitar información</a>
                    <a href="https://wa.me/525556157899?text=Hola%2C%20me%20interesa%20un%20servicio%20de%20CGR-CAS" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
            </section>`;
}

function wrapPageContent(content, config) {
    if (config.slug === "index") {
        return content;
    }

    const cta = config.showCta === false ? "" : buildPageCta();

    if (config.singleColumn) {
        return `
        <div class="page-content">
            <article class="service-card page-article">${content}${cta}</article>
        </div>`;
    }

    return `
        <div class="page-content">
            <div class="services-grid page-services">
                ${content}
            </div>
            ${cta}
        </div>`;
}

function buildContactContent() {
    return `
        <div class="contact-page">
            <section class="contact-hero-card" aria-labelledby="contacto-titulo">
                <h2 id="contacto-titulo">Hablemos de tu empresa</h2>
                <p>Cuéntanos qué servicio necesitas: contabilidad, fiscal, nómina, auditoría o control interno. Respondemos en un máximo de <strong>24 horas hábiles</strong>.</p>
                <div class="hero-actions">
                    <a href="https://wa.me/525556157899?text=Hola%2C%20me%20interesa%20conocer%20sus%20servicios%20contables" class="btn btn-light" target="_blank" rel="noopener noreferrer">WhatsApp directo</a>
                </div>
            </section>
            <div class="contact-grid">
                <div class="contact-item">
                    <span class="contact-item-label">Dirección</span>
                    Los Juárez No. 37-A, Col. San José Insurgentes, Ciudad de México
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Teléfono</span>
                    <a href="tel:+525556157899">55 5615 7899</a><br>
                    <a href="tel:+525556119585">55 5611 9585</a>
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Correo</span>
                    <a href="mailto:ocandelario@gmail.com">ocandelario@gmail.com</a><br>
                    <a href="mailto:direccion@cghoccontadores.mx">direccion@cghoccontadores.mx</a>
                </div>
                <div class="contact-item">
                    <span class="contact-item-label">Horario</span>
                    Lunes a viernes, 9:00 a 18:00 hrs
                </div>
            </div>
            <section class="contact-form-section" aria-labelledby="formulario-titulo">
                <h2 id="formulario-titulo">Envíanos un mensaje</h2>
                <form class="contact-form" action="https://formsubmit.co/ocandelario@gmail.com" method="POST">
                    <input type="hidden" name="_subject" value="Nueva consulta desde cghocontadores.mx">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="table">
                    <label>Nombre<input type="text" name="nombre" required autocomplete="name"></label>
                    <label>Empresa<input type="text" name="empresa" autocomplete="organization"></label>
                    <label>Correo<input type="email" name="email" required autocomplete="email"></label>
                    <label>Teléfono<input type="tel" name="telefono" autocomplete="tel"></label>
                    <label>Servicio de interés
                        <select name="servicio" required>
                            <option value="">Selecciona una opción</option>
                            <option>Contabilidad / Contadores</option>
                            <option>Fiscal / SAT</option>
                            <option>Auditoría</option>
                            <option>Nómina / RRHH</option>
                            <option>Control interno</option>
                            <option>Administración Aspel</option>
                            <option>Otro</option>
                        </select>
                    </label>
                    <label>Mensaje<textarea name="mensaje" rows="4" required placeholder="Cuéntanos brevemente qué necesitas"></textarea></label>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            </section>
            <section class="contact-map" aria-label="Ubicación">
                <h2>Cómo llegar</h2>
                <iframe title="Mapa de CGR-CAS en San José Insurgentes" src="https://maps.google.com/maps?q=Los+Ju%C3%A1rez+37-A+San+Jos%C3%A9+Insurgentes+Ciudad+de+M%C3%A9xico&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
            <section class="faq-section" aria-labelledby="faq-titulo">
                <h2 id="faq-titulo">Preguntas frecuentes</h2>
                <details class="faq-item"><summary>¿Atienden solo empresas en CDMX?</summary><p>Principalmente damos servicio en Ciudad de México y área metropolitana, pero podemos atender clientes en otras entidades según el servicio requerido.</p></details>
                <details class="faq-item"><summary>¿Puedo externalizar solo nómina o solo contabilidad?</summary><p>Sí. Puedes contratar servicios de forma modular: nómina, fiscal, contabilidad completa o auditoría, según lo que tu empresa necesite.</p></details>
                <details class="faq-item"><summary>¿Qué pasa si el SAT me notifica una revisión?</summary><p>Te acompañamos en la preparación de documentación, revisión de declaraciones y estrategia de respuesta conforme a la normativa vigente.</p></details>
                <details class="faq-item"><summary>¿La primera consulta tiene costo?</summary><p>La orientación inicial para conocer tu situación y proponer un servicio puede agendarse sin compromiso. Contáctanos para confirmar disponibilidad.</p></details>
                <details class="faq-item"><summary>¿Qué sistemas contables manejan?</summary><p>Trabajamos con Aspel, CONTPAQi y otras plataformas según las necesidades de cada cliente. También apoyamos en Administración Free de Aspel.</p></details>
            </section>
            <a href="/" class="back-button">← Volver al inicio</a>
        </div>`;
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function getPagePath(config) {
    return config.slug === "index" ? "/" : `/${config.slug}`;
}

function buildFavicons() {
    return `
    <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/assets/images/favicon-32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/assets/images/favicon-16.png" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" sizes="180x180">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="application-name" content="CGR-CAS">
    <meta name="apple-mobile-web-app-title" content="CGR-CAS">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="msapplication-TileColor" content="#1e3a8a">
    <meta name="msapplication-TileImage" content="${SITE_URL}/assets/images/favicon-192.png">
    <meta name="msapplication-config" content="none">`;
}

function buildWebManifest() {
    return JSON.stringify(
        {
            name: "CGR-CAS — Contadores y Auditores",
            short_name: "CGR-CAS",
            description: DEFAULT_DESCRIPTION,
            start_url: "/",
            scope: "/",
            display: "standalone",
            background_color: "#ffffff",
            theme_color: "#1e3a8a",
            lang: "es-MX",
            icons: [
                {
                    src: "/assets/images/favicon-192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "/assets/images/favicon-512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any",
                },
                {
                    src: "/assets/images/apple-touch-icon.png",
                    sizes: "180x180",
                    type: "image/png",
                    purpose: "any",
                },
            ],
        },
        null,
        2
    );
}

async function generateIcons() {
    const logoPath = path.join(FRONTEND_DIR, "logo-candelarios.jpg");
    const outDir = path.join(PUBLIC_DIR, "assets", "images");
    ensureDir(outDir);

    if (!fs.existsSync(logoPath)) {
        console.log("  ⚠ Logo no encontrado; se usará favicon.svg como respaldo");
        return false;
    }

    let sharp;
    try {
        sharp = require("sharp");
    } catch {
        console.log("  ⚠ sharp no instalado; ejecuta npm install para generar iconos PNG");
        return false;
    }

    const logo = sharp(logoPath);

    await logo.clone().resize(32, 32, { fit: "cover" }).png().toFile(path.join(outDir, "favicon-32.png"));
    await logo.clone().resize(16, 16, { fit: "cover" }).png().toFile(path.join(outDir, "favicon-16.png"));
    await logo.clone().resize(180, 180, { fit: "cover" }).png().toFile(path.join(outDir, "apple-touch-icon.png"));
    await logo.clone().resize(192, 192, { fit: "cover" }).png().toFile(path.join(outDir, "favicon-192.png"));
    await logo.clone().resize(512, 512, { fit: "cover" }).png().toFile(path.join(outDir, "favicon-512.png"));

    const logoBuffer = await sharp(logoPath)
        .resize(260, 260, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();

    const ogBackground = Buffer.from(`<svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0f172a"/>
                <stop offset="100%" stop-color="#1d4ed8"/>
            </linearGradient>
        </defs>
        <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#bg)"/>
        <text x="680" y="280" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700">CGR-CAS</text>
        <text x="680" y="340" text-anchor="middle" fill="#dbeafe" font-family="Arial, Helvetica, sans-serif" font-size="34">Contadores y Auditores</text>
        <text x="680" y="390" text-anchor="middle" fill="#93c5fd" font-family="Arial, Helvetica, sans-serif" font-size="24">Ciudad de México · cghocontadores.mx</text>
    </svg>`);

    await sharp(ogBackground)
        .composite([{ input: logoBuffer, top: 185, left: 120 }])
        .jpeg({ quality: 88 })
        .toFile(path.join(outDir, "og-image.jpg"));

    fs.copyFileSync(path.join(outDir, "favicon-32.png"), path.join(PUBLIC_DIR, "favicon.ico"));

    console.log("  ✓ favicon-16.png, favicon-32.png, apple-touch-icon.png");
    console.log("  ✓ favicon-192.png, favicon-512.png, og-image.jpg, favicon.ico");
    return true;
}

function buildSeoExtra(config, title, description) {
    const pagePath = getPagePath(config);
    const pageUrl = `${SITE_URL}${pagePath}`;
    const imageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);

    const breadcrumbItems = [
        { name: "Inicio", url: `${SITE_URL}/` },
    ];

    if (config.slug !== "index") {
        breadcrumbItems.push({
            name: config.pageHeading || title.split(" — ")[0],
            url: pageUrl,
        });
    }

    const breadcrumbJson = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    const organizationJson = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: "CGR Candelario y Asociados",
        alternateName: "CGR-CAS",
        url: SITE_URL,
        logo: imageUrl,
        image: imageUrl,
        description: DEFAULT_DESCRIPTION,
        telephone: ["+52-55-5615-7899", "+52-55-5611-9585"],
        email: ["ocandelario@gmail.com", "direccion@cghoccontadores.mx"],
        address: {
            "@type": "PostalAddress",
            streetAddress: "Los Juárez No. 37-A, Col. San José Insurgentes",
            addressLocality: "Ciudad de México",
            addressCountry: "MX",
        },
        areaServed: {
            "@type": "City",
            name: "Ciudad de México",
        },
        sameAs: [],
        creator: {
            "@type": "Organization",
            name: DEVELOPER_NAME,
            url: DEVELOPER_URL,
        },
    };

    const websiteJson = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "CGR-CAS — Contadores y Auditores",
        url: SITE_URL,
        inLanguage: "es-MX",
        publisher: {
            "@type": "Organization",
            name: "CGR Candelario y Asociados",
        },
        creator: {
            "@type": "Organization",
            name: DEVELOPER_NAME,
            url: DEVELOPER_URL,
        },
    };

    return `
    <link rel="canonical" href="${pageUrl}">
    <link rel="author" href="${DEVELOPER_URL}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="es_MX">
    <meta property="og:site_name" content="CGR-CAS — Contadores y Auditores">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}">
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">
    <meta property="og:image:alt" content="CGR-CAS — Contadores y Auditores en Ciudad de México">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:image:alt" content="CGR-CAS — Contadores y Auditores en Ciudad de México">
    <script type="application/ld+json">${JSON.stringify(organizationJson)}</script>
    <script type="application/ld+json">${JSON.stringify(websiteJson)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbJson)}</script>`;
}

function buildRobotsTxt() {
    return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildSitemapXml() {
    const urls = Object.values(PAGE_CONFIG).map((config) => {
        const loc = `${SITE_URL}${getPagePath(config)}`;
        const priority = config.slug === "index" ? "1.0" : "0.8";
        return `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
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
        .replace("{{FAVICONS}}", buildFavicons())
        .replace("{{SEO_EXTRA}}", buildSeoExtra(config, title, description))
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
    return (async () => {
        console.log("Construyendo sitio para Vercel...\n");
        console.log(`  Dominio: ${SITE_URL}\n`);

        emptyDir(PUBLIC_DIR);
        copyDir(path.join(SRC_DIR, "assets"), path.join(PUBLIC_DIR, "assets"));
        copyLegacyImages();
        await generateIcons();

        const layout = read(path.join(SRC_DIR, "layout.html"));
        const footerTemplate = read(path.join(SRC_DIR, "partials", "footer.html"));

        console.log("Generando páginas:");
        Object.entries(PAGE_CONFIG).forEach(([fileName, config]) => {
            buildPage(fileName, config, layout, footerTemplate);
        });

        fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), buildRobotsTxt(), "utf8");
        fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemapXml(), "utf8");
        fs.writeFileSync(path.join(PUBLIC_DIR, "site.webmanifest"), buildWebManifest(), "utf8");
        console.log("  ✓ robots.txt");
        console.log("  ✓ sitemap.xml");
        console.log("  ✓ site.webmanifest");

        console.log("\nBuild completado en /public");
    })();
}

build().catch((error) => {
    console.error(error);
    process.exit(1);
});
