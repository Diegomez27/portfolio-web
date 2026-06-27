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
    'hero.overline': 'Portafolio · Demos pronto',
    'hero.scroll': 'Scroll para explorar',
    'hero.title': 'Hola, soy Diego. Desarrollador <em>full-stack</em>.',
    'hero.sub': 'Diseño y construyo aplicaciones con <strong>Angular</strong> y <strong>NestJS</strong> — interfaces rápidas, APIs bien tipadas y bases de datos sólidas.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'Ver los proyectos',
    'hero.ctaContact': 'Agendar llamada',
    'hero.archLabel': '// arquitectura',

    // Trabajo (coming soon)
    'work.kicker': '02 / Trabajo',
    'work.title': 'Demos en camino',
    'work.lead': 'Estoy preparando un par de demos funcionales para mostrarlas aquí. Las subiré pronto — mientras tanto, puedes ver con qué construyo en <strong>Servicios</strong> o escribirme en <strong>Contacto</strong>.',
    'work.badge': 'Coming soon',
    'work.soonTitle': 'Trabajo en progreso',
    'work.soonText': 'Los proyectos se publicarán con su demo en vivo. Vuelve pronto.',

    // Servicios
    'services.kicker': '03 / Servicios',
    'services.title': 'Cómo puedo ayudarte',
    'services.lead': 'Trabajo de punta a punta: del modelo de datos a la interfaz. Estos son los tipos de proyectos.',
    'services.s1.title': 'Sistemas empresariales a la medida',
    'services.s1.desc': 'Dashboards, CRMs y paneles administrativos con roles, reportería y exportación. Construidos para operar el día a día de tu negocio.',
    'services.s2.title': 'Apps en tiempo real',
    'services.s2.desc': 'POS, tracking y colaboración en vivo con WebSockets. Estado sincronizado de baja latencia entre dispositivos y sucursales.',
    'services.s3.title': 'APIs y backend escalable',
    'services.s3.desc': 'Servicios REST y de eventos bien tipados, validados y documentados. Arquitectura modular lista para crecer sin reescribir.',
    'services.s4.title': 'Frontend de alto rendimiento',
    'services.s4.desc': 'Interfaces rápidas y accesibles con Angular moderno: signals, lazy-loading y un sistema de diseño consistente.',

    // Contacto
    'contact.kicker': '04 / Contacto',
    'contact.title': '¿Tienes un sistema en mente?',
    'contact.lead': 'Cuéntame qué quieres construir.',
    'contact.successTitle': '¡Mensaje enviado!',
    'contact.successText': 'Gracias por escribir. Te responderé muy pronto.',

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
    'pt.landing': 'Landing page',
    'pt.dashboard': 'Sistema de gestión / dashboard',
    'pt.fiscal': 'Integración SAT / fiscal',
    'pt.saas': 'SaaS multi-tenant',
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
    'hero.overline': 'Full-stack developer portfolio',
    'hero.scroll': 'Scroll to explore',
    'hero.title': "Hi, I'm Diego. <em>Full-stack</em> developer.",
    'hero.sub': 'I design and build apps with <strong>Angular</strong> and <strong>NestJS</strong> — fast interfaces, well-typed APIs and solid databases.',
    'hero.stackLabel': 'Stack',
    'hero.ctaWork': 'See the work',
    'hero.ctaContact': 'Book a call',
    'hero.archLabel': '// architecture',

    // Work (coming soon)
    'work.kicker': '02 / Work',
    'work.title': 'Demos on the way',
    'work.lead': "I'm building a couple of working demos to showcase here. Coming soon — meanwhile, see what I build with in <strong>Services</strong> or reach me in <strong>Contact</strong>.",
    'work.badge': 'Coming soon',
    'work.soonTitle': 'Work in progress',
    'work.soonText': 'Projects will ship with a live demo. Check back soon.',

    // Services
    'services.kicker': '03 / Services',
    'services.title': 'How I can help',
    'services.lead': 'I work end to end: from the data model to the interface. These are the kinds of projects.',
    'services.s1.title': 'Custom business systems',
    'services.s1.desc': 'Dashboards, CRMs and admin panels with roles, reporting and exports. Built to run your day-to-day operations.',
    'services.s2.title': 'Real-time apps',
    'services.s2.desc': 'POS, tracking and live collaboration with WebSockets. Low-latency synced state across devices and branches.',
    'services.s3.title': 'Scalable APIs & backend',
    'services.s3.desc': 'Well-typed, validated and documented REST and event services. Modular architecture ready to grow without rewrites.',
    'services.s4.title': 'High-performance frontend',
    'services.s4.desc': 'Fast, accessible interfaces with modern Angular: signals, lazy-loading and a consistent design system.',

    // Contact
    'contact.kicker': '04 / Contact',
    'contact.title': 'Got a system in mind?',
    'contact.lead': 'Tell me what you want to build.',
    'contact.successTitle': 'Message sent!',
    'contact.successText': 'Thanks for reaching out. I’ll get back to you soon.',

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
    'pt.landing': 'Landing page',
    'pt.dashboard': 'Management system / dashboard',
    'pt.fiscal': 'SAT / tax integration',
    'pt.saas': 'Multi-tenant SaaS',
    'pt.other': 'Other',

    // Meta
    'meta.title': 'Diego — Full-stack developer',
    'meta.desc': 'I build full-stack web apps with Angular and NestJS — fast interfaces, well-typed APIs and solid databases.',
  },
};
