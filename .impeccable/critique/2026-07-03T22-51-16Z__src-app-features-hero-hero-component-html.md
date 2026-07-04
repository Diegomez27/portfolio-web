---
target: tarjeta arquitectura hero (movil)
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-07-03T22-51-16Z
slug: src-app-features-hero-hero-component-html
---
# Critique — Tarjeta de arquitectura del hero (móvil)

Target: `src/app/features/hero/hero.component.html` (bloque `.hero__right` / `.diagram`, viewport móvil ~375px)

## Design Health Score

| # | Heurística | Score | Hallazgo clave |
|---|-----------|-------|-----------|
| 1 | Visibilidad de estado | 3 | Los live-dots comunican "sistemas vivos", pero se repiten 4 veces en pantalla y diluyen el badge real de disponibilidad |
| 2 | Sistema ↔ mundo real | 2 | "RLS", "REST + WS", "SIGNALS" no significan nada para el dueño de negocio (mitad de la audiencia según PRODUCT.md) |
| 3 | Control del usuario | 3 | n/a (sección estática, nada atrapa) |
| 4 | Consistencia | 3 | La tarjeta móvil usa borde 1px + sombra de 60px de blur — el patrón "ghost-card" que DESIGN.md declara baneado |
| 5 | Prevención de errores | 3 | n/a |
| 6 | Reconocimiento | 4 | Logos con nombre visible, nada depende de memoria |
| 7 | Flexibilidad | 3 | n/a |
| 8 | Estética y minimalismo | 2 | Redundancia: Angular, NestJS y PostgreSQL aparecen DOS veces (tiers + pills) en la vista donde el espacio más escasea |
| 9 | Recuperación de errores | 3 | n/a |
| 10 | Ayuda | 3 | n/a |
| **Total** | | **29/40** | **Good — base sólida, atacar puntos débiles** |

## Veredicto anti-patrones

- **LLM**: no parece plantilla de AI; tiene voz propia (label `// ARQUITECTURA`, mono técnico coherente con la marca). El único tell es el ghost-card (borde 1px + `box-shadow: 0 30px 60px -45px`) en `.diagram` móvil, que además contradice el ban propio de DESIGN.md.
- **Detector determinístico**: `detect.mjs` sobre `src/app/features/hero` → 0 hallazgos.
- **Overlay en navegador**: no disponible en esta sesión (sin automatización de browser); evidencia = captura del usuario + código.

## Impresión general

La tarjeta cumple su rol de "credencial técnica", pero en móvil es la versión más plana del sitio (sin dot-grid, sin chips, sin geometría) justo donde PRODUCT.md dice que ocurre el escaneo decisivo. Y gasta su espacio en repetir información: los tiers ya dicen Angular/NestJS/PostgreSQL y la tira de pills lo vuelve a decir con logos.

## Lo que funciona

1. **Chunking correcto**: 3 tiers, cada uno con nombre + detalle mono — dentro del límite de memoria de trabajo, escaneable en 2 segundos.
2. **Voz coherente**: el label estilo comentario de código y el mono para metadatos sostienen el registro "dev con oficio" sin disfraz.
3. **Jerarquía interna clara**: strong display para el nombre del tier, mono 11px para el detalle — dos niveles, sin ruido.

## Issues prioritarios

- **[P1] Redundancia tiers ↔ pills**: Angular, NestJS y PostgreSQL aparecen en los tiers y otra vez en la tira de logos; 5 pills envuelven en 3 filas con Docker huérfano al final. *Fix*: fusionar — meter los logos dentro de cada tier (Frontend: Angular+TS · Backend: NestJS · Data: PostgreSQL+Docker) y eliminar la tira, o dejar la tira solo con logos sin texto en una fila. Ahorra ~30% de alto de tarjeta. → `$impeccable distill`
- **[P1] Móvil recibe la versión muerta**: canvas, chips flotantes y deco son solo desktop; en móvil la tarjeta es 100% estática pese a que "el sitio es la demo". *Fix barato*: línea conectora vertical entre tiers con un pulso CSS que viaja Frontend→Backend→Data (transform/opacity, con reduced-motion). Convierte la lista en diagrama de verdad. → `$impeccable delight`
- **[P2] Ghost-card**: `.diagram` móvil combina borde 1px + sombra 60px blur — ban propio del proyecto. *Fix*: quitar la sombra (el borde + textura de puntos ya definen la tarjeta) o bajarla a ≤8px. → `$impeccable polish`
- **[P2] Cuatro live-dots verdes en una pantalla**: badge de disponibilidad + 3 tiers usan el mismo punto verde; el "disponible para proyectos" pierde exclusividad semántica. *Fix*: en los tiers, sustituir el dot por el logo de la tecnología (se combina con el fix P1) o un glifo mono (`▸`). → `$impeccable polish`
- **[P3] Jerga para mitad de la audiencia**: "RLS", "REST + WS" hablan al reclutador técnico, no al dueño de la cafetería. Puede ser deliberado (señal de competencia aunque no se entienda), pero vale decidirlo conscientemente. → `$impeccable clarify`

## Persona red flags

- **Casey (móvil, distraído)**: la tarjeta ocupa casi un viewport completo entre los CTAs y la sección de trabajo real; con la redundancia eliminada, "Proyectos" sube ~150px. Los `title` de los pills y los hovers de los tiers no existen en touch — costo sin beneficio.
- **Jordan (primerizo / dueño de negocio)**: lee "POSTGRESQL · RLS" y no obtiene nada; el valor para él está en los chips (`auth`, `billing`, `realtime`) que en móvil están `display: none` — justo lo más traducible a beneficio está oculto (y además se envía como DOM muerto).

## Observaciones menores

- `.hero__chips-inline` se renderiza y se oculta en todos los viewports (los flotantes lo reemplazan ≥1280px): DOM muerto en móvil — o se muestra o se quita del template móvil.
- Verificar contraste del mono 11px `--muted #6B6657` sobre las superficies tintadas de los tiers: ronda ~4.8:1, pasa AA pero sin margen; no aclararlo más.
- La animación de intro corre completa al cargar aunque la mitad inferior de la tarjeta esté bajo el fold — el stagger de los pills nadie lo ve.

## Preguntas provocadoras

- ¿Qué pasaría si la tarjeta móvil *fuera* el diagrama — tiers conectados con un pulso de datos — en vez de una lista con textura?
- Si los chips (`auth`, `billing`, `realtime`) son lo único que un dueño de negocio entiende, ¿por qué son lo único oculto en móvil?
