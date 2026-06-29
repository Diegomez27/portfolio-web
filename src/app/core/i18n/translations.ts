export type Lang = 'es' | 'en';

export type Dict = Record<string, string>;

export const TRANSLATIONS: Record<Lang, Dict> = {
  es: {
    // Navegación
    'nav.home': 'Inicio',
    'nav.work': 'Trabajo',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',

    // Marca / estado
    'brand.role': 'Full-Stack Developer',
    'status.available': 'Disponible para proyectos',
    'rail.builtWith': 'Construido con Angular',

    // Hero
    'hero.overline': 'Full-stack developer · Angular & NestJS',
    'hero.scroll': 'Scroll para explorar',
    'hero.title': 'Hola, soy Diego. Desarrollador <em>full-stack</em>.',
    'hero.sub': 'Diseño y construyo aplicaciones con <strong>Angular</strong> y <strong>NestJS</strong> — interfaces rápidas, APIs bien tipadas y bases de datos sólidas.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'Ver los proyectos',
    'hero.ctaContact': 'Agendar llamada',
    'hero.archLabel': '// arquitectura',

    // Trabajo (coming soon)
    'work.kicker': '/ Trabajo',
    'work.title': 'Demos en camino',
    'work.lead': 'Estoy preparando un par de demos funcionales para mostrarlas aquí. Las subiré pronto — mientras tanto, puedes ver con qué construyo en <strong>Servicios</strong> o escribirme en <strong>Contacto</strong>.',
    'work.badge': 'Coming soon',
    'work.soonTitle': 'Trabajo en progreso',
    'work.soonText': 'Los proyectos se publicarán con su demo en vivo. Vuelve pronto.',

    // Servicios
    'services.kicker': '/ Servicios',
    'services.title': 'Cómo puedo ayudarte',
    'services.lead': 'Trabajo de punta a punta: del modelo de datos a la interfaz. Estos son los tipos de proyectos.',
    'services.s1.title': 'Sistemas a la medida',
    'services.s1.desc': 'Para negocios que operan con Excel, WhatsApp o papel. CRMs, dashboards y paneles de control con roles de usuario, reportes y todo lo que necesitas para ver y gestionar tu negocio desde un solo lugar.',
    'services.s2.title': 'Apps en tiempo real',
    'services.s2.desc': 'Para negocios con operación activa: puntos de venta, seguimiento de pedidos, coordinación entre sucursales. Todo sincronizado al instante entre dispositivos.',
    'services.s3.title': 'Presencia web',
    'services.s3.desc': 'Sitio informativo profesional para tu negocio. Diseño propio, carga rápida, se ve bien en celular. Listo en 1–2 semanas.',

    // Contacto
    'contact.kicker': '/ Contacto',
    'contact.title': '¿Tienes un sistema en mente?',
    'contact.lead': 'Cuéntame qué quieres construir.',
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
    'form.submit': 'Enviar mensaje →',
    'form.sending': 'Enviando…',

    // Tipos de proyecto (el value enviado al backend se mantiene en español)
    'pt.systems': 'Sistema a la medida',
    'pt.realtime': 'App en tiempo real / POS',
    'pt.landing': 'Landing page / Sitio web',
    'pt.other': 'Otro',

    // Meta
    'meta.title': 'Diego — Desarrollador full-stack',
    'meta.desc': 'Desarrollo aplicaciones web full-stack con Angular y NestJS — interfaces rápidas, APIs bien tipadas y bases de datos sólidas.',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    // Brand / status
    'brand.role': 'Full-Stack Developer',
    'status.available': 'Available for projects',
    'rail.builtWith': 'Built with Angular',

    // Hero
    'hero.overline': 'Full-stack developer · Angular & NestJS',
    'hero.scroll': 'Scroll to explore',
    'hero.title': "Hi, I'm Diego. <em>Full-stack</em> developer.",
    'hero.sub': 'I design and build apps with <strong>Angular</strong> and <strong>NestJS</strong> — fast interfaces, well-typed APIs and solid databases.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'See the work',
    'hero.ctaContact': 'Book a call',
    'hero.archLabel': '// architecture',

    // Work (coming soon)
    'work.kicker': '/ Work',
    'work.title': 'Demos on the way',
    'work.lead': "I'm building a couple of working demos to showcase here. Coming soon — meanwhile, see what I build with in <strong>Services</strong> or reach me in <strong>Contact</strong>.",
    'work.badge': 'Coming soon',
    'work.soonTitle': 'Work in progress',
    'work.soonText': 'Projects will ship with a live demo. Check back soon.',

    // Services
    'services.kicker': '/ Services',
    'services.title': 'How I can help',
    'services.lead': 'I work end to end: from the data model to the interface. These are the kinds of projects.',
    'services.s1.title': 'Custom systems',
    'services.s1.desc': 'For businesses still running on Excel, WhatsApp or paper. CRMs, dashboards and control panels with user roles, reports and everything you need to see and manage your business from one place.',
    'services.s2.title': 'Real-time apps',
    'services.s2.desc': 'For businesses with active operations: points of sale, order tracking, coordination across locations. Everything synced instantly across devices.',
    'services.s3.title': 'Web presence',
    'services.s3.desc': 'A professional informational site for your business. Custom design, fast loading, looks great on mobile. Ready in 1–2 weeks.',

    // Contact
    'contact.kicker': '/ Contact',
    'contact.title': 'Got a system in mind?',
    'contact.lead': 'Tell me what you want to build.',
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
    'form.submit': 'Send message →',
    'form.sending': 'Sending…',

    // Project types (backend value stays in Spanish)
    'pt.systems': 'Custom system',
    'pt.realtime': 'Real-time app / POS',
    'pt.landing': 'Landing page / Website',
    'pt.other': 'Other',

    // Meta
    'meta.title': 'Diego — Full-stack developer',
    'meta.desc': 'I build full-stack web apps with Angular and NestJS — fast interfaces, well-typed APIs and solid databases.',
  },
};
