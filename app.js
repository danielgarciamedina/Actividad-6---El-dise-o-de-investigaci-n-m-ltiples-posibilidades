'use strict';
const suggestions = {
effect: {title:'Experimental o cuasiexperimental',body:'Si puedes introducir una intervención y asignar al azar, considera un experimento controlado. Si trabajas con grupos ya formados, examina un cuasiexperimento y sus diferencias iniciales.',caution:'Un antes y después de un solo grupo ofrece poco control de explicaciones alternativas.',link:'#estudio-perry',label:'Examinar el experimento de Perry et al.'},
snapshot: {title:'No experimental transversal',body:'Define la población, las variables y un periodo de medición. Un cuestionario puede describir respuestas o permitir analizar asociaciones.',caution:'La productividad percibida y el rendimiento observado son variables diferentes. Una asociación no demuestra una causa.',link:'#estudio-ralph',label:'Examinar la encuesta de Ralph et al.'},
change: {title:'Longitudinal',body:'Decide si estudiarás una población a través del tiempo, una cohorte definida o las mismas unidades en cada medición. Planifica fechas e identificadores.',caution:'Para un panel, debes poder enlazar las mediciones de cada unidad. Repetir una encuesta con personas distintas no crea un panel.',link:'#cuanti-title',label:'Revisar tendencia, cohorte y panel'},
experience: {title:'Fenomenológico',body:'Selecciona personas que hayan vivido el fenómeno. Recoge descripciones concretas y analiza qué significados comparten y cuáles difieren.',caution:'No basta preguntar si algo les gusta. Debes estudiar la experiencia vivida y registrar tu posición como investigador.',link:'#estudio-dreyer',label:'Examinar un caso con enfoque fenomenológico'},
culture: {title:'Etnográfico',body:'Delimita el grupo y el contexto. Planifica inmersión, observación y registro del lenguaje, las reglas y las prácticas cotidianas.',caution:'Observar una sesión aislada no permite comprender por sí solo la cultura de un grupo.',link:'#estudio-romano',label:'Examinar un estudio informado por la etnografía'},
process: {title:'Teoría fundamentada',body:'Recoge y analiza datos de forma iterativa. Compara incidentes, construye categorías y decide qué nuevas evidencias necesitas para explicar el proceso.',caution:'Justifica la variante elegida. Un listado de temas no equivale a una teoría ni demuestra saturación.',link:'#estudio-masood',label:'Examinar los procedimientos de Masood et al.'},
story: {title:'Narrativo',body:'Delimita una trayectoria o acontecimiento. Combina relatos y documentos para reconstruir momentos, cambios y sentidos en una secuencia temporal.',caution:'Conserva la voz de quien narra y distingue su recuerdo de las fuentes documentales. Esta opción es una propuesta didáctica del blog.',link:'#cuali-title',label:'Revisar los abordajes cualitativos'},
improve: {title:'Investigación-acción',body:'Define el problema con los participantes. Acuerda una acción, aplícala, examina sus resultados y usa la reflexión para orientar el siguiente ciclo.',caution:'Documenta quién decide y cómo se evalúa el cambio. El papel del investigador debe ser explícito.',link:'#estudio-choras',label:'Examinar el ciclo de Choraś et al.'},
case: {title:'Estudio de caso',body:'Define el caso, sus límites y sus fuentes. Puedes estudiar una organización en profundidad o comparar varios casos con criterios comunes.',caution:'Usa diversas fuentes y explica el contexto. La cantidad de casos no determina por sí sola el enfoque.',link:'#estudio-medeiros',label:'Examinar los casos de Medeiros et al.'},
integrate: {title:'Mixto, con integración explícita',body:'Define por qué necesitas medición y comprensión contextual. Decide si integrarás las fuentes al mismo tiempo o en fases y cómo producirás una conclusión conjunta.',caution:'Dos instrumentos no garantizan integración. Señala qué resultado de una ruta explica, contrasta o amplía la otra.',link:'#estudio-romano',label:'Examinar un ejemplo de integración de evidencia'}
};
const purpose=document.getElementById('purpose');
const result=document.getElementById('design-result');
function showSuggestion(){
const s=suggestions[purpose.value];
const title=document.createElement('h3');title.textContent=s.title;
const explanation=document.createElement('p');explanation.textContent=s.body;
const caution=document.createElement('p');const label=document.createElement('strong');label.textContent='Antes de decidir: ';caution.append(label,s.caution);
const link=document.createElement('a');link.href=s.link;link.textContent=s.label+' →';
result.replaceChildren(title,explanation,caution,link);
}
purpose.addEventListener('change',showSuggestion);showSuggestion();
const filters=[...document.querySelectorAll('[data-filter]')];
const papers=[...document.querySelectorAll('.paper[data-type]')];
const filterStatus=document.getElementById('filter-status');
function filterPapers(filter){
let count=0;for(const paper of papers){paper.hidden=filter!=='all'&&paper.dataset.type!==filter;if(!paper.hidden)count++;}
for(const button of filters){const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
filterStatus.textContent='Se muestran '+count+' de los 8 estudios.';
}
filters.forEach(button=>button.addEventListener('click',()=>filterPapers(button.dataset.filter)));
// Los enlaces internos muestran su destino aunque un filtro lo haya ocultado.
function revealTarget(){const target=document.getElementById(location.hash.slice(1));if(target?.matches('.paper')&&target.hidden){filterPapers('all');target.scrollIntoView({block:'start'});}}
window.addEventListener('hashchange',revealTarget);revealTarget();
document.addEventListener('click',event=>{
const anchor=event.target.closest('a[href^="#"]');
if(!anchor)return;
const target=document.getElementById(anchor.hash.slice(1));
if(target?.matches('.paper')&&target.hidden)filterPapers('all');
});
document.querySelectorAll('[data-interactive]').forEach(element=>{element.hidden=false;});
// La impresión conserva los artículos y las explicaciones completas.
let printState;
window.addEventListener('beforeprint',()=>{printState={details:[...document.querySelectorAll('details')].map(element=>[element,element.open]),filter:filters.find(button=>button.getAttribute('aria-pressed')==='true')?.dataset.filter||'all'};printState.details.forEach(([element])=>{element.open=true;});filterPapers('all');});
window.addEventListener('afterprint',()=>{if(!printState)return;printState.details.forEach(([element,open])=>{element.open=open;});filterPapers(printState.filter);printState=undefined;});
