import{i as X}from"./if.UgyHKEqu.js";import{i as Re}from"./lifecycle.BxYgVVlF.js";import{j as qe,z as C,l as e,A as Ie,u as t,v as s,t as a,x as D,C as n,k as c,i as L,p as Ne,m as h,b9 as Ue,D as Ve,n as O,f as Je,g as Qe}from"./branches.B1-LXpjb.js";import{s as i,e as m}from"./render.CrNaQiW1.js";import{h as We}from"./html.NLrfJeOg.js";import{s as g}from"./attributes.DUev1wxO.js";import{s as P}from"./class.Ip1gn3e0.js";import{b as Xe}from"./input.BXNSHyhV.js";import{b as ce}from"./download.D_KK4T0U.js";import{u as ve}from"./ui-labels.iuUDFUv3.js";import{m as Ye}from"./markdown.DYpG3-Nv.js";/* empty css                        */import"./attributes.DfdnN9Sq.js";import"./DynamicTool.KUMLsQyk.js";import"./props.CzAgOsE8.js";var Ze=O('<div class="md-pane svelte-1ox53bb"><div class="md-pane-head svelte-1ox53bb"><span class="label"> </span> <button class="btn btn--outline btn--sm"> </button></div> <textarea class="md-source svelte-1ox53bb" spellcheck="false"></textarea></div>'),et=O('<p class="md-empty svelte-1ox53bb"> </p>'),tt=O('<div class="md-pane svelte-1ox53bb"><div class="md-pane-head svelte-1ox53bb"><span class="label"> </span> <div class="md-pane-actions svelte-1ox53bb"><button class="btn btn--outline btn--sm"> </button> <button class="btn btn--ghost btn--sm"> </button></div></div> <div class="md-preview svelte-1ox53bb" aria-live="polite"><!></div></div>'),at=O('<div class="md-tool svelte-1ox53bb"><div class="md-toolbar card svelte-1ox53bb"><div class="md-modes svelte-1ox53bb" role="tablist"><button role="tab"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="8" height="18" rx="1"></rect><rect x="13" y="3" width="8" height="18" rx="1"></rect></svg> </button> <button role="tab"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> </button> <button role="tab"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> </button></div> <div class="md-tools svelte-1ox53bb"><button class="btn btn--ghost btn--sm"> </button> <button class="btn btn--ghost btn--sm"> </button> <button class="btn btn--ghost btn--sm"> </button></div></div> <div><!> <!></div> <div class="md-stats svelte-1ox53bb" aria-label="stats"><span><strong class="svelte-1ox53bb"> </strong> </span> <span><strong class="svelte-1ox53bb"> </strong> </span> <span><strong class="svelte-1ox53bb"> </strong> </span> <span><strong class="svelte-1ox53bb"> </strong> </span></div></div>');function wt(pe,me){qe(me,!1);const u=h(),Y=h(),H=h(),Z=h(),ee=h(),te=typeof import.meta<"u"&&"ro"||"hu",r=te==="ro"?{sourceLabel:"Sursă Markdown",previewLabel:"Previzualizare live",viewSplit:"Împărțit",viewPreview:"Doar previzualizare",viewSource:"Doar sursă",viewModeAria:"Mod de afișare",loadExample:"Încarcă exemplu",pasteFromClip:"Lipește",clear:"Șterge",downloadMd:"Descarcă .md",downloadHtml:"Descarcă .html",copyHtml:"Copiază HTML",words:"cuvinte",chars:"caractere",lines:"rânduri",readingTime:"min citire",emptyHint:"Începe să scrii sau lipește text Markdown – previzualizarea apare instantaneu.",placeholder:`# Titlul tău

Scrie sau lipește text **Markdown** aici. Previzualizarea apare *instant* pe partea dreaptă.

## Caracteristici

- Liste, [linkuri](https://example.com), \`cod inline\`
- Suport **GFM**: tabele, liste de sarcini
- Securizat: orice HTML din sursă este escape-at

\`\`\`js
function salut(nume) {
  return \`Salut, \${nume}!\`;
}
\`\`\`

| Funcție | Suport |
|---|---|
| Tabele | ✅ |
| Task list | ✅ |
| Cod | ✅ |

- [x] Conversie instantă
- [ ] Sincronizare scroll (în curând)

> Conversia se face exclusiv în browser – sursa ta nu părăsește dispozitivul.
`}:{sourceLabel:"Markdown forrás",previewLabel:"Élő előnézet",viewSplit:"Osztott",viewPreview:"Csak előnézet",viewSource:"Csak forrás",viewModeAria:"Megjelenítési mód",loadExample:"Példa betöltése",pasteFromClip:"Beillesztés",clear:"Törlés",downloadMd:".md letöltése",downloadHtml:".html letöltése",copyHtml:"HTML másolása",words:"szó",chars:"karakter",lines:"sor",readingTime:"perc olvasás",emptyHint:"Kezdj el gépelni, vagy illessz be Markdown szöveget – az előnézet azonnal megjelenik.",placeholder:`# A te címed

Írj vagy illessz be **Markdown** szöveget. Az előnézet *azonnal* megjelenik a jobb oldalon.

## Funkciók

- Listák, [linkek](https://example.com), \`inline kód\`
- **GFM** támogatás: táblázatok, feladatlisták
- Biztonságos: a forrásban lévő HTML escape-elve van

\`\`\`js
function udvozlet(nev) {
  return \`Szia, \${nev}!\`;
}
\`\`\`

| Funkció | Támogatás |
|---|---|
| Táblázatok | ✅ |
| Task list | ✅ |
| Kód | ✅ |

- [x] Azonnali konvertálás
- [ ] Scroll-szinkron (hamarosan)

> A renderelés kizárólag a böngésződben történik – a forrásod nem hagyja el az eszközt.
`};let o=h(r.placeholder),v=h("split"),A=h(!1);async function ue(){if(e(u))try{await navigator.clipboard.writeText(e(u)),c(A,!0),setTimeout(()=>c(A,!1),2e3)}catch{}}async function be(){try{const l=await navigator.clipboard.readText();l&&c(o,l)}catch{}}function xe(){c(o,r.placeholder)}function he(){c(o,"")}function ge(){if(!e(u))return;const l=`<!doctype html>
<html lang="${te}">
<head>
<meta charset="utf-8" />
<title>Markdown export</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:780px;margin:2rem auto;padding:0 1rem;line-height:1.7;color:#222}
pre{background:#f4f4f5;padding:1rem;border-radius:6px;overflow-x:auto}
code{background:#f4f4f5;padding:.15em .35em;border-radius:4px;font-size:.9em}
pre code{background:transparent;padding:0}
blockquote{border-left:3px solid #888;padding-left:1rem;color:#555;margin:1rem 0}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid #ddd;padding:.5rem .75rem}
th{background:#f4f4f5}
img{max-width:100%}
</style>
</head>
<body>
${e(u)}
</body>
</html>`;ce(l,"markdown.html","text/html")}function we(){e(o)&&ce(e(o),"document.md","text/markdown")}function fe(l){if(l.key==="Tab"){l.preventDefault();const d=l.target,p=d.selectionStart,b=d.selectionEnd,z=d.value;d.value=z.slice(0,p)+"  "+z.slice(b),d.selectionStart=d.selectionEnd=p+2,c(o,d.value)}}C(()=>e(o),()=>{c(u,Ye(e(o)))}),C(()=>e(o),()=>{c(Y,e(o).length)}),C(()=>e(o),()=>{c(H,e(o).trim()?e(o).trim().split(/\s+/).length:0)}),C(()=>e(o),()=>{c(Z,e(o)?e(o).split(`
`).length:0)}),C(()=>e(H),()=>{c(ee,Math.max(1,Math.ceil(e(H)/200)))}),Ie(),Re();var G=at(),K=t(G),F=t(K),_=t(F);let ae;var _e=s(t(_));a(_);var k=s(_,2);let re;var ke=s(t(k));a(k);var S=s(k,2);let se;var ze=s(t(S));a(S),a(F);var ne=s(F,2),j=t(ne),ye=t(j,!0);a(j);var $=s(j,2),Me=t($,!0);a($);var E=s($,2),Te=t(E,!0);a(E),a(ne),a(K);var B=s(K,2);let oe;var ie=t(B);{var Se=l=>{var d=Ze(),p=t(d),b=t(p),z=t(b,!0);a(b);var x=s(b,2),w=t(x,!0);a(x),a(p);var f=s(p,2);Ue(f),a(d),D(()=>{i(z,n(()=>r.sourceLabel)),x.disabled=!e(o),g(x,"title",n(()=>r.downloadMd)),i(w,n(()=>r.downloadMd)),g(f,"placeholder",n(()=>r.placeholder)),g(f,"aria-label",n(()=>r.sourceLabel))}),m("click",x,we),Xe(f,()=>e(o),y=>c(o,y)),m("keydown",f,fe),L(l,d)};X(ie,l=>{e(v)!=="preview"&&l(Se)})}var Ce=s(ie,2);{var Le=l=>{var d=tt(),p=t(d),b=t(p),z=t(b,!0);a(b);var x=s(b,2),w=t(x),f=t(w,!0);a(w);var y=s(w,2),Pe=t(y,!0);a(y),a(x),a(p);var Q=s(p,2),Oe=t(Q);{var Ge=M=>{var T=Je(),W=Qe(T);We(W,()=>e(u)),L(M,T)},Ke=M=>{var T=et(),W=t(T,!0);a(T),D(()=>i(W,n(()=>r.emptyHint))),L(M,T)};X(Oe,M=>{e(u)?M(Ge):M(Ke,!1)})}a(Q),a(d),D(()=>{i(z,n(()=>r.previewLabel)),w.disabled=!e(u),i(f,(e(A),Ve(ve),n(()=>e(A)?`✓ ${ve.copied}`:r.copyHtml))),y.disabled=!e(u),i(Pe,n(()=>r.downloadHtml)),g(Q,"aria-label",n(()=>r.previewLabel))}),m("click",w,ue),m("click",y,ge),L(l,d)};X(Ce,l=>{e(v)!=="source"&&l(Le)})}a(B);var le=s(B,2),R=t(le),q=t(R),He=t(q,!0);a(q);var Ae=s(q);a(R);var I=s(R,2),N=t(I),Fe=t(N,!0);a(N);var je=s(N);a(I);var U=s(I,2),V=t(U),$e=t(V,!0);a(V);var Ee=s(V);a(U);var de=s(U,2),J=t(de),Be=t(J,!0);a(J);var De=s(J);a(de),a(le),a(G),D(()=>{g(F,"aria-label",n(()=>r.viewModeAria)),g(_,"aria-selected",e(v)==="split"),ae=P(_,1,"md-mode svelte-1ox53bb",null,ae,{active:e(v)==="split"}),i(_e,` ${n(()=>r.viewSplit)??""}`),g(k,"aria-selected",e(v)==="preview"),re=P(k,1,"md-mode svelte-1ox53bb",null,re,{active:e(v)==="preview"}),i(ke,` ${n(()=>r.viewPreview)??""}`),g(S,"aria-selected",e(v)==="source"),se=P(S,1,"md-mode svelte-1ox53bb",null,se,{active:e(v)==="source"}),i(ze,` ${n(()=>r.viewSource)??""}`),i(ye,n(()=>r.loadExample)),i(Me,n(()=>r.pasteFromClip)),E.disabled=!e(o),i(Te,n(()=>r.clear)),oe=P(B,1,"md-grid svelte-1ox53bb",null,oe,{"md-grid--split":e(v)==="split","md-grid--preview":e(v)==="preview","md-grid--source":e(v)==="source"}),i(He,e(H)),i(Ae,` ${n(()=>r.words)??""}`),i(Fe,e(Y)),i(je,` ${n(()=>r.chars)??""}`),i($e,e(Z)),i(Ee,` ${n(()=>r.lines)??""}`),i(Be,e(ee)),i(De,` ${n(()=>r.readingTime)??""}`)}),m("click",_,()=>c(v,"split")),m("click",k,()=>c(v,"preview")),m("click",S,()=>c(v,"source")),m("click",j,xe),m("click",$,be),m("click",E,he),L(pe,G),Ne()}export{wt as default};
