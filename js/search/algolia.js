window.addEventListener("load",()=>{const t=document.getElementById("search-mask");const a=document.querySelector("#algolia-search .search-dialog");const e=()=>{const e=document.body.style;e.width="100%";e.overflow="hidden";btf.animateIn(t,"to_show 0.5s");btf.animateIn(a,"titleScale 0.5s");setTimeout(()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()},100);document.addEventListener("keydown",function e(t){if(t.code==="Escape"){n();document.removeEventListener("keydown",e)}});i();window.addEventListener("resize",i)};const n=()=>{const e=document.body.style;e.width="";e.overflow="";btf.animateOut(a,"search_close .5s");btf.animateOut(t,"to_hide 0.5s");window.removeEventListener("resize",i)};const i=()=>{if(window.innerWidth<768){a.style.setProperty("--search-height",window.innerHeight+"px")}};const s=()=>{btf.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",e)};const o=()=>{t.addEventListener("click",n);document.querySelector("#algolia-search .search-close-button").addEventListener("click",n)};const l=e=>{if(e==="")return"";const t=e.indexOf("<mark>");let a=t-30;let n=t+120;let i="";let s="";if(a<=0){a=0;n=140}else{i="..."}if(n>e.length){n=e.length}else{s="..."}const o=i+e.substring(a,n)+s;return o};const c=GLOBAL_CONFIG.algolia;const r=c.appId&&c.apiKey&&c.indexName;if(!r){return console.error("Algolia setting is invalid!")}const d=instantsearch({indexName:c.indexName,searchClient:algoliasearch(c.appId,c.apiKey),searchFunction(e){e.state.query&&e.search()}});const h=instantsearch.widgets.configure({hitsPerPage:5});const g=instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:false,showSubmit:false,placeholder:GLOBAL_CONFIG.algolia.languages.input_placeholder,showLoadingIndicator:true});const u=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){const t=e.permalink?e.permalink:GLOBAL_CONFIG.root+e.path;const a=e._highlightResult;const n=a.contentStripTruncate?l(a.contentStripTruncate.value):a.contentStrip?l(a.contentStrip.value):a.content?l(a.content.value):"";return`
          <a href="${t}" class="algolia-hit-item-link">
          <span class="algolia-hits-item-title">${a.title.value||"no-title"}</span>
          <p class="algolia-hit-item-content">${n}</p>
          </a>`},empty:function(e){return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,e.query)+"</div>"}}});const p=instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text:function(e){const t=GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS);return`<hr>${t}`}}});const m=instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy"});const f=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:5,templates:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}});d.addWidgets([h,g,u,p,m,f]);d.start();s();o();window.addEventListener("pjax:complete",()=>{!btf.isHidden(t)&&n();s()});window.pjax&&d.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))})});