export type Lang = 'es' | 'en';

export type Dict = Record<string, string>;

export const TRANSLATIONS: Record<Lang, Dict> = {
  es: {
    // Navegación
    'nav.home': 'Inicio',
    'nav.work': 'Proyectos',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',

    // Marca / estado
    'brand.role': 'Full-Stack Developer',
    'status.available': 'Disponible para proyectos',
    'rail.builtWith': 'Construido con Angular',

    // Hero
    'hero.overline': 'Tecnología modular · Angular & NestJS',
    'hero.scroll': 'Scroll para explorar',
    'hero.title': 'Desarrollo de software <em>a la medida</em> para tu negocio.',
    'hero.sub': 'Desarrollo soluciones reales: la landing page optimizada para captar clientes, el sistema a la medida que centraliza tu administración o el portal interactivo que cotiza y cobra por ti.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'Ver soluciones',
    'hero.ctaContact': 'Agendar llamada',
    'hero.archLabel': '// arquitectura',

    // Proyectos (demos en vivo)
    'work.kicker': '/ Soluciones de referencia',
    'work.title': 'Así se ve en producción',
    'work.lead': 'Cada solución está construida para un tipo de negocio real, puedes explorarla ahora mismo.',
    'work.disclaimer': '* Datos ficticios · Sitios de ejemplo para demostración',
    'demo.cafe.title': 'Café',
    'demo.cafe.desc': 'Sitio web para negocio de café o restaurante.',
    'demo.barber.title': 'Barbería',
    'demo.barber.desc': 'Sitio web para barbería.',
    'demo.consultorio.title': 'Consultorio',
    'demo.consultorio.desc': 'Sitio web para consultorio médico o dental.',
    'demo.category.landing': 'Presencia web',
    'demo.category.sistema': 'Sistema a la medida',
    'demo.category.tiempo-real': 'Tiempo real',
    'demo.category.integración': 'Integración',
    'demo.cta': 'Ver demo en vivo',

    // Servicios
    'services.kicker': '/ Servicios',
    'services.title': 'Cómo puedo ayudarte',
    'services.lead': 'Trabajo de punta a punta, del modelo de datos a la interfaz. Estos son los tipos de proyectos.',
    'services.s1.title': 'Sistemas a la medida',
    'services.s1.desc': 'Para negocios que operan con Excel, WhatsApp o papel. CRMs, dashboards y paneles de control con roles de usuario, reportes y todo lo que necesitas para ver y gestionar tu negocio desde un solo lugar.',
    'services.s2.title': 'Apps en tiempo real',
    'services.s2.desc': 'Para negocios con operación activa: puntos de venta, seguimiento de pedidos, coordinación entre sucursales. Todo sincronizado al instante entre dispositivos.',
    'services.s3.title': 'Presencia web',
    'services.s3.desc': 'Sitio informativo profesional para tu negocio. Diseño propio, carga rápida, se ve bien en celular. Listo en 1–2 semanas.',

    // Contacto
    'contact.kicker': '/ Contacto',
    'contact.title': '¿Tu negocio necesita un sistema, una app o un sitio web?',
    'contact.lead': 'Te respondo en menos de 24 horas.',
    'contact.successTitle': '¡Mensaje enviado!',
    'contact.successText': 'Gracias por escribir. Te responderé muy pronto.',
    'contact.copied': '¡Copiado!',
    'contact.tooltip.email': 'Copiar correo al portapapeles',
    'contact.tooltip.github': 'Visitar perfil de GitHub (abre pestaña nueva)',
    'contact.tooltip.linkedin': 'Visitar perfil de LinkedIn (abre pestaña nueva)',

    // Formulario
    'form.name': 'Nombre',
    'form.email': 'Correo',
    'form.projectType': 'Tipo de proyecto',
    'form.message': '¿Qué quieres construir?',
    'form.namePh': 'Tu nombre',
    'form.emailPh': 'tu@empresa.com',
    'form.messagePh': 'Describe el sistema, tu industria, plazos, etc.',
    'form.selectDefault': 'Selecciona una opción',
    'form.err.name': 'Nombre requerido (mínimo 2 caracteres)',
    'form.err.email': 'Correo inválido',
    'form.err.projectType': 'Selecciona un tipo de proyecto',
    'form.err.message': 'Mensaje requerido (mínimo 20 caracteres)',
    'form.serverError': 'Hubo un error al enviar. Intenta de nuevo o escríbeme por correo.',
    'form.submit': 'Enviar mensaje',
    'form.sending': 'Enviando…',

    // Tipos de proyecto (el value enviado al backend se mantiene en español)
    'pt.systems': 'Sistema a la medida',
    'pt.realtime': 'App en tiempo real / POS',
    'pt.landing': 'Landing page / Sitio web',
    'pt.other': 'Otro',

    // Meta
    'meta.title': 'Diego Gómez · Desarrollo web a la medida para negocios',
    'meta.desc': 'Sistemas digitales, apps en tiempo real y presencia web para negocios. Trabajo de punta a punta: diseño, desarrollo y deploy.',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.work': 'Projects',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    // Brand / status
    'brand.role': 'Full-Stack Developer',
    'status.available': 'Available for projects',
    'rail.builtWith': 'Built with Angular',

    // Hero
    'hero.overline': 'Modular technology · Angular & NestJS',
    'hero.scroll': 'Scroll to explore',
    'hero.title': 'Custom software development <em>tailored</em> to your business.',
    'hero.sub': 'I develop real-world solutions: the landing page optimized to capture customers, the custom system that centralizes your administration, or the interactive portal that quotes and bills for you.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'See solutions',
    'hero.ctaContact': 'Book a call',
    'hero.archLabel': '// architecture',

    // Projects (live demos)
    'work.kicker': '/ Reference solutions',
    'work.title': 'This is what you get',
    'work.lead': 'Each solution is built for a real type of business, explore it right now.',
    'work.disclaimer': '* Fictional data · Example sites for demonstration purposes',
    'demo.cafe.title': 'Café',
    'demo.cafe.desc': 'Website for a café or restaurant.',
    'demo.barber.title': 'Barbería',
    'demo.barber.desc': 'Website for a barbershop.',
    'demo.consultorio.title': 'Consultorio',
    'demo.consultorio.desc': 'Website for a medical or dental clinic.',
    'demo.category.landing': 'Web presence',
    'demo.category.sistema': 'Custom system',
    'demo.category.tiempo-real': 'Real-time',
    'demo.category.integración': 'Integration',
    'demo.cta': 'See live demo',

    // Services
    'services.kicker': '/ Services',
    'services.title': 'How I can help',
    'services.lead': 'I work end to end, from the data model to the interface. These are the kinds of projects.',
    'services.s1.title': 'Custom systems',
    'services.s1.desc': 'For businesses still running on Excel, WhatsApp or paper. CRMs, dashboards and control panels with user roles, reports and everything you need to see and manage your business from one place.',
    'services.s2.title': 'Real-time apps',
    'services.s2.desc': 'For businesses with active operations: points of sale, order tracking, coordination across locations. Everything synced instantly across devices.',
    'services.s3.title': 'Web presence',
    'services.s3.desc': 'A professional informational site for your business. Custom design, fast loading, looks great on mobile. Ready in 1–2 weeks.',

    // Contact
    'contact.kicker': '/ Contact',
    'contact.title': 'Does your business need a system, an app or a website?',
    'contact.lead': "I'll get back to you within 24 hours.",
    'contact.successTitle': 'Message sent!',
    'contact.successText': 'Thanks for reaching out. I’ll get back to you soon.',
    'contact.copied': 'Copied!',
    'contact.tooltip.email': 'Copy email to clipboard',
    'contact.tooltip.github': 'Visit GitHub profile (opens in new tab)',
    'contact.tooltip.linkedin': 'Visit LinkedIn profile (opens in new tab)',

    // Form
    'form.name': 'Name',
    'form.email': 'Email',
    'form.projectType': 'Project type',
    'form.message': 'What do you want to build?',
    'form.namePh': 'Your name',
    'form.emailPh': 'you@company.com',
    'form.messagePh': 'Describe the system, your industry, timeline, etc.',
    'form.selectDefault': 'Select an option',
    'form.err.name': 'Name required (min 2 characters)',
    'form.err.email': 'Invalid email',
    'form.err.projectType': 'Select a project type',
    'form.err.message': 'Message required (min 20 characters)',
    'form.serverError': 'Something went wrong. Try again or email me directly.',
    'form.submit': 'Send message',
    'form.sending': 'Sending…',

    // Project types (backend value stays in Spanish)
    'pt.systems': 'Custom system',
    'pt.realtime': 'Real-time app / POS',
    'pt.landing': 'Landing page / Website',
    'pt.other': 'Other',

    // Meta
    'meta.title': 'Diego Gómez · Custom web development for businesses',
    'meta.desc': 'Custom systems, real-time apps and web presence for businesses. End-to-end: design, development and deploy.',
  },
};
