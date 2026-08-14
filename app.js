const TOPICS = [
  { id:'us', label:'U.S. News', icon:'US News Interest Icon.png', banner:'US News.png' },
  { id:'world', label:'World News', icon:'World News Interest Icon.png', banner:'World News.png' },
  { id:'science', label:'Science', icon:'Science Interest Icon.png', banner:'Science.png' },
  { id:'tech', label:'Tech & Innovation', icon:'Tech & Innovation Interest Icon.png', banner:'Tech & Innovation.png' },
  { id:'animals', label:'Animals & Nature', icon:'Animals & Nature Interest Icon.png', banner:'Animals & Nature.png' },
  { id:'wellbeing', label:'Wellbeing & Mental Health', icon:'Wellbeing & Mental Health Interest Icon.png', banner:'Wellbeing & Mental Health.png' },
  { id:'wonderful', label:'Wonderful News', icon:'Wonderful News Interest Icon.png', banner:'Wonderful News.png' },
  { id:'entertainment', label:'Entertainment', icon:'Entertainment Interest Icon.png', banner:'Entertainment.png' },
  { id:'markets', label:'Stocks & Markets', icon:'Stocks & Markets Interest Icon.png', banner:'Stocks & Markets.png' },
  { id:'sports', label:'Sports', icon:'Sports Interest Icon.png', banner:'Sports.png' },
  { id:'local', label:'Local News', icon:'Local News Interest Icon.png', banner:'Local News.png' },
];

const NAV = [
  { id:'today', label:'Today', icon:'Today Main Nav Icon.png' },
  { id:'queue', label:'My Queue', icon:'My Queue Main Nav Icon.png' },
  { id:'topics', label:'Topics', icon:'Topic Main Nav Icon.png' },
  { id:'saved', label:'Saved', icon:'Saved Main Nav Icon.png' },
  { id:'settings', label:'Settings', icon:'Settings Main Nav Icon.png' },
];

const STORIES = [
  {id:'us-1',topic:'us',source:'Demo U.S. desk',time:'18 min ago',read:'4 min read',headline:'A bipartisan infrastructure proposal moves from negotiation to an actual vote.',quick:'The useful part: what changed, what still has to happen, and who is affected.',balanced:'The proposal has moved beyond negotiation into a formal vote. Your Queue would summarize the practical changes, the remaining hurdles, and the parts most likely to affect everyday life instead of replaying every quote from the political fight.',deep:'A deeper read would add the timeline, major provisions, competing arguments, fiscal context, who gains or loses under the proposal, and the next procedural steps to watch.'},
  {id:'us-2',topic:'us',source:'Demo policy desk',time:'1 hr ago',read:'5 min read',headline:'States test new approaches to making public-benefit applications less impossible.',quick:'A form-design story with real consequences for whether people can use programs they qualify for.',balanced:'Several states are treating application friction as a service-design problem: fewer duplicate questions, clearer language, and better handoffs between agencies. The interesting part is not the paperwork. It is whether people can actually reach the benefit.',deep:'A context-rich version would compare eligibility systems, administrative burden research, fraud-prevention tradeoffs, implementation costs, and early measures of whether completion rates improve.'},

  {id:'world-1',topic:'world',source:'Demo world desk',time:'34 min ago',read:'5 min read',headline:'A regional climate agreement puts adaptation funding ahead of another round of promises.',quick:'The shift is toward paying for flood, heat, and water projects that already need to happen.',balanced:'The agreement is notable because it directs more attention toward adaptation work already underway, including heat resilience, water systems, and flood protection, rather than relying only on long-range emissions targets.',deep:'A deeper version would explain the financing mechanism, participating countries, accountability questions, climate-justice concerns, and how adaptation funding differs from mitigation spending.'},
  {id:'world-2',topic:'world',source:'Demo global affairs desk',time:'2 hrs ago',read:'4 min read',headline:'Cross-border rail projects gain momentum as cities look for alternatives to short flights.',quick:'Several routes are moving from planning documents into construction schedules.',balanced:'The interesting signal is that cross-border rail is becoming a practical transportation policy, not just a climate talking point. New projects are being judged on travel time, border processing, and whether they can actually replace common short-haul trips.',deep:'A deep dive would compare projected ridership, capital costs, aviation competition, emissions assumptions, border logistics, and the routes most likely to be completed first.'},

  {id:'science-1',topic:'science',source:'Demo science desk',time:'42 min ago',read:'4 min read',headline:'Materials researchers find a cleaner route for recovering metals from old batteries.',quick:'The method could make recycling more useful by recovering more of the expensive material.',balanced:'Researchers are testing a lower-temperature process that recovers a larger share of useful battery materials. The practical question is whether it can scale cheaply enough to compete with mining and existing recycling methods.',deep:'A deeper read would cover recovery rates, energy inputs, chemistry, contamination, commercial scaling, lifecycle emissions, and what still has to be proven outside the lab.'},
  {id:'science-2',topic:'science',source:'Demo research desk',time:'3 hrs ago',read:'6 min read',headline:'Citizen-science sensors reveal neighborhood heat patterns that citywide averages miss.',quick:'Block-by-block measurements show where heat exposure changes dramatically over short distances.',balanced:'Low-cost sensors are making hyperlocal heat data easier to collect. The value is not just a prettier map. Better neighborhood data can help cities decide where shade, cooling centers, and tree cover matter most.',deep:'The context-rich version would include calibration, sampling bias, placement decisions, privacy, open-data standards, and how community measurements complement official stations.'},

  {id:'tech-1',topic:'tech',source:'Demo technology desk',time:'25 min ago',read:'4 min read',headline:'Personal AI tools are becoming less about novelty and more about fit.',quick:'The question is shifting from “can it do this?” to “does this actually help this person?”',balanced:'The most useful AI tools are increasingly narrow, contextual, and designed around a specific workflow. That can make them easier to trust because their boundaries are visible and their usefulness is easier to judge.',deep:'A deeper version would compare privacy tradeoffs, automation boundaries, human review, failure modes, accessibility, and the difference between personalization that helps and personalization that traps people in bad assumptions.'},
  {id:'tech-2',topic:'tech',source:'Demo innovation desk',time:'2 hrs ago',read:'3 min read',headline:'A small wave of “boring automation” products is solving one annoying step at a time.',quick:'Not every useful automation needs to become an all-in-one platform.',balanced:'Some of the most practical new tools are deliberately small: rename files, summarize a queue, catch duplicates, or hand information from one system to another. Clear boundaries can make automation easier to maintain and safer to trust.',deep:'A deeper queue would compare brittle versus resilient workflows, review checkpoints, observability, failure recovery, maintenance cost, and when leaving a step manual is still the better design.'},

  {id:'animals-1',topic:'animals',source:'Demo nature desk',time:'1 hr ago',read:'3 min read',headline:'Restored wetlands are making room for wildlife and people at the same time.',quick:'A small happy nature story belongs here because delight is useful information too.',balanced:'Wetland restoration projects are showing how habitat, flood control, public space, and wildlife corridors can overlap. The best examples are designed for both ecological function and actual human use.',deep:'A deep dive would connect biodiversity, stormwater, land access, invasive species, maintenance costs, and the tradeoffs involved in urban and suburban restoration.'},
  {id:'animals-2',topic:'animals',source:'Demo wildlife desk',time:'4 hrs ago',read:'3 min read',headline:'Researchers document an unexpectedly clever tool-use trick in a familiar bird species.',quick:'Bird does smart thing. Scientists take notes. Your morning improves slightly.',balanced:'The observation adds another example to the growing evidence that tool use is not limited to a tiny club of famously clever animals. The behavior also appears flexible rather than purely instinctive.',deep:'The longer version would distinguish tool use from object manipulation, describe the study design, compare related species, and explain why cognitive researchers care about flexible problem solving.'},

  {id:'wellbeing-1',topic:'wellbeing',source:'Demo wellbeing desk',time:'50 min ago',read:'4 min read',headline:'Transition time may be the missing step in an overpacked day.',quick:'Going directly from one demand to the next can make a manageable schedule feel impossible.',balanced:'This reframes time management as energy and transition management. A short buffer between tasks can reduce the cognitive cost of switching gears, especially when the tasks require very different kinds of attention.',deep:'A deeper version would distinguish executive-function friction, sensory overload, context switching, ordinary scheduling pressure, and the evidence behind different transition strategies without pretending one trick works for everyone.'},
  {id:'wellbeing-2',topic:'wellbeing',source:'Demo psychology desk',time:'3 hrs ago',read:'5 min read',headline:'Researchers keep finding that “rest” works better when we stop treating it as one thing.',quick:'Different kinds of fatigue need different kinds of recovery.',balanced:'Mental fatigue, physical fatigue, social overload, and boredom do not necessarily respond to the same kind of break. The useful takeaway is less “optimize your rest” and more “notice what actually needs recovering.”',deep:'A deep dive would look at attention restoration, sleep pressure, social depletion, movement, individual differences, and where popular wellness language outruns the underlying research.'},

  {id:'wonderful-1',topic:'wonderful',source:'Demo good-news desk',time:'1 hr ago',read:'3 min read',headline:'A library of things turns rarely used tools into shared community infrastructure.',quick:'Borrow the drill, telescope, sewing machine, or cake pan instead of buying one for a single afternoon.',balanced:'The useful part is bigger than thrift. Shared-object libraries can lower cost, reduce clutter, and make experimentation easier for people who do not want to own every tool they might someday need.',deep:'The deeper story would explore funding models, liability, maintenance, access, community partnerships, and why libraries increasingly function as practical neighborhood infrastructure beyond books.'},
  {id:'wonderful-2',topic:'wonderful',source:'Demo bright-spots desk',time:'5 hrs ago',read:'2 min read',headline:'Volunteer repair nights are helping neighbors fix appliances instead of replacing them.',quick:'Tiny screws, stubborn toasters, patient humans. Surprisingly effective civic infrastructure.',balanced:'Repair events pair volunteer know-how with neighbors who have broken household items. Besides reducing waste, they create a low-pressure way for people to learn practical skills from one another.',deep:'A context-rich version could look at repairability laws, parts availability, safety, volunteer training, waste reduction, and which kinds of repair programs actually sustain participation.'},

  {id:'entertainment-1',topic:'entertainment',source:'Demo entertainment desk',time:'29 min ago',read:'3 min read',headline:'A sleeper streaming series turns a quiet premiere into the week’s biggest word-of-mouth hit.',quick:'No giant launch. Just people telling other people, “wait, you need to watch this.”',balanced:'The show’s growth is a useful reminder that not every entertainment story is opening-weekend arithmetic. Audience conversation, episode structure, and recommendation loops can still build momentum after launch.',deep:'The deeper version would look at completion rates, release strategy, social conversation, critic/audience gaps, international performance, and whether the platform changes its promotion in response.'},
  {id:'entertainment-2',topic:'entertainment',source:'Demo culture desk',time:'4 hrs ago',read:'4 min read',headline:'Game and film composers are pushing live performance beyond the traditional soundtrack concert.',quick:'Interactive visuals and rearranged scores are turning soundtrack shows into their own thing.',balanced:'More live productions are treating game and film music as repertoire rather than background. New arrangements, visual systems, and audience participation are making the performances distinct from simply replaying a score.',deep:'A deep dive would trace the economics, rights, orchestration, touring model, audience crossover, and the role of fan communities in sustaining live soundtrack performance.'},

  {id:'markets-1',topic:'markets',source:'Demo markets desk',time:'12 min ago',read:'4 min read',headline:'Markets open higher as investors digest earnings, rates, and a surprisingly calm inflation print.',quick:'The move is broad, but the real signal is what investors think rates may do next.',balanced:'Stocks are moving higher across several sectors, but the more useful context is in bond yields and rate expectations. Your Queue would explain the drivers without turning every half-percent move into a personality test for the economy.',deep:'A deeper version would separate index moves from sector leadership, examine yields, earnings revisions, inflation components, valuation concerns, and what would meaningfully change the current market narrative.'},
  {id:'markets-2',topic:'markets',source:'Demo business desk',time:'2 hrs ago',read:'4 min read',headline:'Smaller companies get a lift as financing conditions loosen at the margins.',quick:'Cheaper borrowing matters more to smaller firms than to cash-rich giants.',balanced:'A modest change in financing conditions is drawing attention to smaller companies that are more sensitive to borrowing costs. The move matters if it persists, not because one green trading day proves a new cycle has begun.',deep:'A deeper read would compare credit spreads, small-cap balance sheets, refinancing schedules, rate sensitivity, sector composition, and the difference between a tactical rally and improving fundamentals.'},

  {id:'sports-1',topic:'sports',source:'Demo sports desk',time:'15 min ago',read:'3 min read',headline:'A late comeback flips the night’s biggest game in the final minutes.',quick:'The score, the turning point, and enough context to participate in tomorrow’s conversation.',balanced:'The comeback hinged on a defensive adjustment and two late possessions. This is the sports version of the Queue’s philosophy: give you the result, why it changed, and the one moment everyone will be talking about.',deep:'A deep dive would add lineup changes, efficiency numbers, coaching decisions, player availability, standings implications, and what the matchup suggests for the next game.'},
  {id:'sports-2',topic:'sports',source:'Demo sports business desk',time:'3 hrs ago',read:'4 min read',headline:'Women’s sports attendance keeps turning “momentum” into boringly real business numbers.',quick:'More sellouts, stronger media deals, and fewer excuses to call growth a temporary spike.',balanced:'Attendance and media numbers continue to make the case that women’s sports growth is structural rather than novelty-driven. The more interesting question is where leagues invest next to sustain it.',deep:'A longer read would compare ticket revenue, media rights, sponsorship, venue capacity, expansion, player compensation, and the places where infrastructure is still lagging demand.'},

  {id:'local-1',topic:'local',source:'Demo local desk',time:'45 min ago',read:'3 min read',headline:'A weekend market adds quieter sensory-friendly shopping hours.',quick:'A small schedule change can make a familiar public space usable for more people.',balanced:'This fictional local example shows how the Queue can prioritize changes that match a reader’s actual needs, not just whatever event has the biggest advertising budget.',deep:'A deeper version could include hours, transit, parking, accessibility notes, crowd patterns, cost, weather impact, and personalized “worth leaving the house for?” guidance.'},
  {id:'local-2',topic:'local',source:'Demo neighborhood desk',time:'2 hrs ago',read:'3 min read',headline:'A small stretch of trail reopens with safer crossings and better lighting.',quick:'Not glamorous. Extremely useful if it changes how people actually move around town.',balanced:'The project is local-news catnip for a personalized briefing: small geographic scope, concrete impact, and the kind of update that is easy to miss in a general news feed.',deep:'A deeper local card could add a map, construction timeline, detours, bike and pedestrian connections, transit impacts, accessibility, and nearby businesses affected by the change.'},
];

const DEFAULTS = {
  name:'Alex',
  depth:'balanced',
  units:'fahrenheit',
  topics:['us','world','science','tech','animals','wellbeing','wonderful'],
  location:{
    query:'Madison, WI',
    name:'Madison, WI',
    latitude:43.0731,
    longitude:-89.4012,
    countryCode:'US'
  }
};

const PREF_KEY='yourDailyQueuePreferencesV2';
const FEEDBACK_KEY='yourDailyQueueFeedbackV2';
const SAVED_KEY='yourDailyQueueSavedV2';

let preferences=loadJSON(PREF_KEY,DEFAULTS);
preferences={...structuredClone(DEFAULTS),...preferences,location:{...DEFAULTS.location,...(preferences.location||{})}};
preferences.topics=Array.isArray(preferences.topics)&&preferences.topics.length?preferences.topics.filter(id=>TOPICS.some(t=>t.id===id)):[...DEFAULTS.topics];
let feedback=loadJSON(FEEDBACK_KEY,{});
let saved=loadJSON(SAVED_KEY,[]);
let activeView='today';
let activeQueueTopic='weather';
let pendingTopics=[...preferences.topics];
let weatherData=null;
let weatherLoading=false;

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function loadJSON(key,fallback){
  try{
    const raw=localStorage.getItem(key);
    return raw?JSON.parse(raw):structuredClone(fallback);
  }catch{return structuredClone(fallback)}
}
function persist(){
  localStorage.setItem(PREF_KEY,JSON.stringify(preferences));
  localStorage.setItem(FEEDBACK_KEY,JSON.stringify(feedback));
  localStorage.setItem(SAVED_KEY,JSON.stringify(saved));
}
function topicById(id){return TOPICS.find(t=>t.id===id)}
function storyById(id){return STORIES.find(s=>s.id===id)}
function getStoryCopy(story){
  return preferences.depth==='quick'?story.quick:preferences.depth==='deep'?story.deep:story.balanced;
}
function depthLabel(){
  return preferences.depth==='quick'?'Quick Scan':preferences.depth==='deep'?'Deep Dive':'Balanced';
}
function escapeHTML(value=''){
  return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
}

function renderNavigation(){
  const html=NAV.map(item=>`
    <button class="nav-item ${activeView===item.id?'is-active':''}" type="button" data-view-link="${item.id}">
      <img src="${item.icon}" alt="">
      <span>${item.label}</span>
    </button>`).join('');
  $('#mobile-nav').innerHTML=html;
  $('#desktop-nav').innerHTML=html;
  bindViewLinks();
}

function bindViewLinks(){
  $$('[data-view-link]').forEach(el=>{
    el.onclick=(event)=>{
      event.preventDefault();
      switchView(el.dataset.viewLink);
    };
  });
}

function switchView(view){
  if(!NAV.some(n=>n.id===view)) return;
  activeView=view;
  $$('.view').forEach(v=>v.classList.toggle('is-active',v.dataset.view===view));
  renderNavigation();
  if(view==='today') renderToday();
  if(view==='queue') renderQueue();
  if(view==='topics') renderTopics();
  if(view==='saved') renderSaved();
  if(view==='settings') renderSettings();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderToday(){
  const now=new Date();
  $('#today-date').textContent=now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
  $('#today-name').textContent=preferences.name;
  $('#today-location').textContent=preferences.location.name||preferences.location.query||'Set location';
  renderWeatherGlance();
  const stories=visibleStories();
  const top=stories[0]||STORIES[0];
  $('#top-story-card').innerHTML=renderTopStory(top);
  $('#quick-strip').innerHTML=stories.slice(1,6).map(renderQuickCard).join('');
  $('#more-for-you').innerHTML=stories.slice(6,12).map(renderMiniStory).join('') || stories.slice(0,5).map(renderMiniStory).join('');
  bindStoryActions();
  $$('[data-queue-topic]').forEach(btn=>btn.onclick=()=>openQueueTopic(btn.dataset.queueTopic));
}

function visibleStories(){
  return STORIES.filter(s=>preferences.topics.includes(s.topic));
}

function renderTopStory(story){
  const topic=topicById(story.topic);
  return `<article class="top-story">
    <div class="top-story-bg" style="background-image:url('${topic.banner}')"></div>
    <div class="top-story-body">
      <span class="story-category">${topic.label}</span>
      <h3>${story.headline}</h3>
      <p class="story-meta">${story.source} · ${story.time} · ${story.read}</p>
      <p class="story-summary">${getStoryCopy(story)}</p>
      ${renderStoryActions(story)}
    </div>
  </article>`;
}
function renderQuickCard(story){
  const topic=topicById(story.topic);
  return `<article class="quick-card">
    <div class="quick-card-icon"><img src="${topic.icon}" alt=""></div>
    <div><h3>${story.headline}</h3><p>${topic.label} · ${story.time}</p></div>
    <button class="quick-open" type="button" data-open-story="${story.id}" aria-label="Open ${escapeHTML(story.headline)}">→</button>
  </article>`;
}
function renderMiniStory(story){
  const topic=topicById(story.topic);
  return `<article class="mini-story">
    <img src="${topic.banner}" alt="">
    <div class="mini-story-body">
      <span class="story-category">${topic.label}</span>
      <h3>${story.headline}</h3>
      <p>${story.quick}</p>
      <button class="text-button" type="button" data-queue-topic="${topic.id}">Open section →</button>
    </div>
  </article>`;
}
function renderStoryActions(story){
  const f=feedback[story.id]||'';
  const isSaved=saved.includes(story.id);
  return `<div class="story-action-row queue-story-actions" data-story-actions="${story.id}">
    <button class="story-action ${f==='more'?'is-active':''}" type="button" data-feedback="more"><img src="23-more-like-this.svg" alt=""> More</button>
    <button class="story-action ${f==='less'?'is-active':''}" type="button" data-feedback="less"><img src="24-less-like-this.svg" alt=""> Less</button>
    <button class="story-action ${isSaved?'is-active':''}" type="button" data-save-story><img src="Saved Main Nav Icon.png" alt=""> ${isSaved?'Saved':'Save'}</button>
    <button class="story-action" type="button" data-share-story><img src="22-share.svg" alt=""> Share</button>
  </div>`;
}
function bindStoryActions(){
  $$('[data-story-actions]').forEach(wrap=>{
    const id=wrap.dataset.storyActions;
    wrap.querySelectorAll('[data-feedback]').forEach(btn=>{
      btn.onclick=()=>{
        const value=btn.dataset.feedback;
        feedback[id]=feedback[id]===value?null:value;
        if(!feedback[id]) delete feedback[id];
        persist();
        showToast(value==='more'?'Quill got the signal. More like this.':'Quill got the signal. Turn this down.');
        rerenderCurrent();
      };
    });
    const saveBtn=wrap.querySelector('[data-save-story]');
    if(saveBtn) saveBtn.onclick=()=>{
      saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
      persist();
      showToast(saved.includes(id)?'Saved for later.':'Removed from Saved.');
      rerenderCurrent();
    };
    const shareBtn=wrap.querySelector('[data-share-story]');
    if(shareBtn) shareBtn.onclick=()=>shareStory(id);
  });
  $$('[data-open-story]').forEach(btn=>{
    btn.onclick=()=>{
      const story=storyById(btn.dataset.openStory);
      if(story) openQueueTopic(story.topic);
    };
  });
  $$('[data-queue-topic]').forEach(btn=>btn.onclick=()=>openQueueTopic(btn.dataset.queueTopic));
}

function rerenderCurrent(){
  if(activeView==='today')renderToday();
  if(activeView==='queue')renderQueue();
  if(activeView==='saved')renderSaved();
}

async function shareStory(id){
  const story=storyById(id);
  if(!story)return;
  const text=`${story.headline}\n\n${story.quick}\n\nYour Daily Queue demo`;
  try{
    if(navigator.share) await navigator.share({title:story.headline,text});
    else if(navigator.clipboard){await navigator.clipboard.writeText(text);showToast('Story copied to clipboard.');}
    else showToast('Sharing is not available in this browser.');
  }catch{}
}

function openQueueTopic(id){
  activeQueueTopic=id;
  switchView('queue');
}

function renderQueue(){
  const tabs=[
    {id:'weather',label:'Weather',icon:'25-location-zip.svg'},
    ...preferences.topics.map(topicById).filter(Boolean)
  ];
  if(!tabs.some(t=>t.id===activeQueueTopic))activeQueueTopic='weather';
  $('#queue-tabs').innerHTML=tabs.map(t=>`
    <button class="queue-tab ${t.id===activeQueueTopic?'is-active':''}" type="button" role="tab" aria-selected="${t.id===activeQueueTopic}" data-queue-tab="${t.id}">
      <img src="${t.icon}" alt=""><span>${t.label}</span>
    </button>`).join('');
  $$('[data-queue-tab]').forEach(btn=>btn.onclick=()=>{activeQueueTopic=btn.dataset.queueTab;renderQueue()});
  if(activeQueueTopic==='weather')renderWeatherPanel();
  else renderTopicPanel(activeQueueTopic);
}

function renderTopicPanel(id){
  const topic=topicById(id);
  const stories=STORIES.filter(s=>s.topic===id);
  const localNote=id==='local'?`<p class="story-meta">Using your home base: ${escapeHTML(preferences.location.name||preferences.location.query)}</p>`:'';
  $('#queue-panel').innerHTML=`
    <section class="queue-banner"><img src="${topic.banner}" alt="${topic.label}"></section>
    ${localNote}
    <div class="queue-story-list">
      ${stories.map(story=>`<article class="queue-story">
        <div class="queue-story-head"><span class="story-category">${topic.label}</span><span class="story-meta">${story.read}</span></div>
        <h3>${story.headline}</h3>
        <p class="story-meta">${story.source} · ${story.time}</p>
        <p>${getStoryCopy(story)}</p>
        <span class="story-meta">${depthLabel()} context</span>
        ${renderStoryActions(story)}
      </article>`).join('')}
    </div>`;
  bindStoryActions();
}

function renderTopics(){
  pendingTopics=[...preferences.topics];
  $('#topic-picker-grid').innerHTML=TOPICS.map(topic=>`
    <label class="topic-choice">
      <input type="checkbox" value="${topic.id}" ${pendingTopics.includes(topic.id)?'checked':''}>
      <span class="topic-choice-card">
        <img src="${topic.icon}" alt="">
        <strong>${topic.label}</strong>
      </span>
    </label>`).join('');
  $('#topic-picker-grid').querySelectorAll('input').forEach(input=>{
    input.onchange=()=>{
      pendingTopics=[...$('#topic-picker-grid').querySelectorAll('input:checked')].map(i=>i.value);
      updateTopicCount();
    };
  });
  updateTopicCount();
  $('#save-topics').onclick=()=>{
    if(!pendingTopics.length){showToast('Pick at least one topic. Quill refuses to curate an empty newspaper.');return;}
    preferences.topics=[...pendingTopics];
    persist();
    activeQueueTopic='weather';
    showToast('Your Queue has been rebuilt.');
    switchView('queue');
  };
}
function updateTopicCount(){
  $('#topic-count').textContent=`${pendingTopics.length} topic${pendingTopics.length===1?'':'s'} selected`;
}

function renderSaved(){
  const stories=saved.map(storyById).filter(Boolean);
  if(!stories.length){
    $('#saved-list').innerHTML=`<div class="empty-state">
      <img src="Saved Main Nav Icon.png" alt="">
      <h2>Nothing saved yet.</h2>
      <p>Tap Save on any story and it will wait here instead of vanishing into the internet mist.</p>
      <button class="primary-button" type="button" data-view-link="today">Back to Today</button>
    </div>`;
    bindViewLinks();
    return;
  }
  $('#saved-list').innerHTML=stories.map(story=>{
    const topic=topicById(story.topic);
    return `<article class="queue-story">
      <div class="queue-story-head"><span class="story-category">${topic.label}</span><span class="story-meta">${story.read}</span></div>
      <h3>${story.headline}</h3><p>${getStoryCopy(story)}</p>${renderStoryActions(story)}
    </article>`;
  }).join('');
  bindStoryActions();
}

function renderSettings(){
  $('#reader-name').value=preferences.name;
  $('#location-input').value=preferences.location.query||preferences.location.name||'';
  const depth=$(`#settings-form input[name="depth"][value="${preferences.depth}"]`);
  if(depth)depth.checked=true;
  const units=$(`#settings-form input[name="units"][value="${preferences.units}"]`);
  if(units)units.checked=true;
  $('#location-status').textContent=`Current home base: ${preferences.location.name||preferences.location.query}`;
}

async function saveSettings(event){
  event.preventDefault();
  const form=new FormData($('#settings-form'));
  const newName=(form.get('reader-name')||'Alex').trim().slice(0,24)||'Alex';
  const newDepth=form.get('depth')||'balanced';
  const newUnits=form.get('units')||'fahrenheit';
  const query=(form.get('location-input')||'').trim();
  const unitsChanged=newUnits!==preferences.units;
  preferences.name=newName;
  preferences.depth=newDepth;
  preferences.units=newUnits;
  if(query && query!==preferences.location.query && query!==preferences.location.name){
    const resolved=await geocodeLocation(query);
    if(resolved)preferences.location=resolved;
    else{
      $('#location-status').textContent='I could not find that location. Try a ZIP/postal code or “City, State/Country.”';
      showToast('Location not found.');
      return;
    }
  }
  persist();
  $('#location-status').textContent=`Current home base: ${preferences.location.name}`;
  showToast('Settings saved.');
  if(unitsChanged || query){weatherData=null;loadWeather();}
  renderNavigation();
}

async function geocodeLocation(query){
  $('#location-status').textContent='Finding that location…';
  try{
    const url=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
    const res=await fetch(url);
    if(!res.ok)throw new Error('geocode failed');
    const data=await res.json();
    const hit=data.results?.[0];
    if(!hit)return null;
    const region=hit.admin1 && hit.admin1!==hit.name?`, ${hit.admin1}`:'';
    const country=hit.country_code && hit.country_code!=='US'?`, ${hit.country_code}`:'';
    return {query,name:`${hit.name}${region}${country}`,latitude:hit.latitude,longitude:hit.longitude,countryCode:hit.country_code||''};
  }catch{return null}
}

function useCurrentLocation(){
  if(!navigator.geolocation){showToast('Location permission is not available in this browser.');return;}
  $('#location-status').textContent='Waiting for location permission…';
  navigator.geolocation.getCurrentPosition(async pos=>{
    preferences.location={
      query:'Current location',
      name:'Current location',
      latitude:pos.coords.latitude,
      longitude:pos.coords.longitude,
      countryCode:''
    };
    persist();
    weatherData=null;
    $('#location-input').value='Current location';
    $('#location-status').textContent='Using your current device location.';
    showToast('Home base updated from your device.');
    await loadWeather();
  },()=>{
    $('#location-status').textContent='Location permission was not granted. You can still enter a city or postal code.';
    showToast('No problem. Enter a city or ZIP instead.');
  },{enableHighAccuracy:false,timeout:10000,maximumAge:600000});
}

function resetDemo(){
  preferences=structuredClone(DEFAULTS);
  feedback={};
  saved=[];
  pendingTopics=[...preferences.topics];
  weatherData=null;
  persist();
  showToast('Demo reset. Quill has a clean desk again.');
  renderSettings();
  loadWeather();
}

function weatherCodeInfo(code){
  if(code===0)return {label:'Clear',asset:'Clear_Weather.png',symbol:'☀'};
  if([1,2].includes(code))return {label:'Partly cloudy',asset:'Partly Cloudy Weather.png',symbol:'⛅'};
  if(code===3)return {label:'Cloudy',asset:'Cloudy_Weather.png',symbol:'☁'};
  if([45,48].includes(code))return {label:'Foggy',asset:'Fog_Weather.png',symbol:'≋'};
  if([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code))return {label:'Rain',asset:'Rain_Weather.png',symbol:'☂'};
  if([71,73,75,77,85,86].includes(code))return {label:'Snow',asset:'Snow_Weather.png',symbol:'❄'};
  if([95,96,99].includes(code))return {label:'Thunderstorms',asset:'Thunderstorm_Weather.png',symbol:'⚡'};
  return {label:'Mixed conditions',asset:'Cloudy_Weather.png',symbol:'◌'};
}
function conditionForWeather(data){
  const base=weatherCodeInfo(data.forecast.current.weather_code);
  const wind=data.forecast.current.wind_speed_10m||0;
  if(wind>=25 && [0,1,2,3].includes(data.forecast.current.weather_code))return {label:'Windy',asset:'Windy_Weather.png',symbol:'≋'};
  return base;
}
function hmToMinutes(iso){
  const part=String(iso||'').split('T')[1]||'';
  const [h='0',m='0']=part.split(':');
  return Number(h)*60+Number(m);
}
function timeOfDayAsset(data){
  const f=data.forecast;
  const now=hmToMinutes(f.current.time);
  const sunrise=hmToMinutes(f.daily.sunrise?.[0]);
  const sunset=hmToMinutes(f.daily.sunset?.[0]);
  if(now>=sunrise-75 && now<=sunrise+80)return 'Weather_Dawn.png';
  if(now>=sunset-85 && now<=sunset+60)return 'Weather_Dusk.png';
  return f.current.is_day?'Weather_Day.png':'Weather_Night.png';
}
function airLabel(aqi){
  if(aqi==null||Number.isNaN(aqi))return '—';
  if(aqi<=50)return 'Good';
  if(aqi<=100)return 'Moderate';
  if(aqi<=150)return 'Sensitive';
  if(aqi<=200)return 'Unhealthy';
  if(aqi<=300)return 'Very unhealthy';
  return 'Hazardous';
}
function fmtTemp(n){
  if(n==null||Number.isNaN(n))return '—';
  return `${Math.round(n)}°`;
}
function fmtWind(n){
  if(n==null||Number.isNaN(n))return '—';
  return `${Math.round(n)} ${preferences.units==='fahrenheit'?'mph':'km/h'}`;
}
function quillWeatherRead(data){
  const c=data.forecast.current;
  const today=data.forecast.daily;
  const aqi=data.air?.current?.us_aqi;
  const uv=data.air?.current?.uv_index;
  const rain=today.precipitation_probability_max?.[0]??0;
  const high=today.temperature_2m_max?.[0];
  const low=today.temperature_2m_min?.[0];
  const condition=conditionForWeather(data);
  if(data.alerts?.length)return `${data.alerts[0].properties?.event||'Weather alert'} is active. Check the alert before you head out.`;
  if(condition.label==='Thunderstorms')return `Storms are in the picture today. Keep an eye on timing before committing to outdoor plans.`;
  if(rain>=65)return `Rain is likely today. The umbrella has earned a promotion from “maybe” to “bring it.”`;
  if(c.wind_speed_10m>=25)return `It is a genuinely windy one. Secure the lightweight stuff and expect it to feel more dramatic outside.`;
  if(high>=90 && preferences.units==='fahrenheit')return `Hot day ahead, with a high near ${fmtTemp(high)}. Shade and hydration are doing real work today.`;
  if(high>=32 && preferences.units==='celsius')return `Hot day ahead, with a high near ${fmtTemp(high)}. Shade and hydration are doing real work today.`;
  if(uv>=7)return `Mostly manageable weather, but UV is high. Sunscreen deserves to make the queue.`;
  if(aqi>100)return `The forecast is one thing, but air quality is the bigger signal today. Consider that before long outdoor time.`;
  return `${condition.label} overall, with a high near ${fmtTemp(high)} and a low near ${fmtTemp(low)}. Nothing here needs to hijack your day.`;
}

async function loadWeather(){
  if(weatherLoading)return;
  weatherLoading=true;
  renderWeatherGlance();
  try{
    let loc=preferences.location;
    if(!Number.isFinite(Number(loc.latitude))||!Number.isFinite(Number(loc.longitude))){
      const resolved=await geocodeLocation(loc.query||loc.name);
      if(!resolved)throw new Error('location');
      preferences.location=resolved;persist();loc=resolved;
    }
    const tempUnit=preferences.units==='fahrenheit'?'fahrenheit':'celsius';
    const windUnit=preferences.units==='fahrenheit'?'mph':'kmh';
    const precipUnit=preferences.units==='fahrenheit'?'inch':'mm';
    const forecastURL=new URL('https://api.open-meteo.com/v1/forecast');
    forecastURL.search=new URLSearchParams({
      latitude:loc.latitude,longitude:loc.longitude,
      current:'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,is_day',
      hourly:'temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m',
      daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
      temperature_unit:tempUnit,wind_speed_unit:windUnit,precipitation_unit:precipUnit,
      timezone:'auto',forecast_days:'7'
    }).toString();
    const airURL=new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
    airURL.search=new URLSearchParams({
      latitude:loc.latitude,longitude:loc.longitude,current:'us_aqi,pm2_5,uv_index',timezone:'auto'
    }).toString();
    const [forecastRes,airRes]=await Promise.all([fetch(forecastURL),fetch(airURL)]);
    if(!forecastRes.ok)throw new Error('forecast');
    const forecast=await forecastRes.json();
    const air=airRes.ok?await airRes.json():null;
    let alerts=[];
    if(loc.countryCode==='US'){
      try{
        const alertRes=await fetch(`https://api.weather.gov/alerts/active?point=${loc.latitude},${loc.longitude}`,{headers:{Accept:'application/geo+json'}});
        if(alertRes.ok){const a=await alertRes.json();alerts=a.features||[]}
      }catch{}
    }
    weatherData={forecast,air,alerts};
  }catch(error){
    weatherData={error:true};
  }finally{
    weatherLoading=false;
    renderWeatherGlance();
    if(activeView==='queue'&&activeQueueTopic==='weather')renderWeatherPanel();
  }
}

function renderWeatherGlance(){
  if(!$('#weather-glance'))return;
  if(!weatherData || weatherLoading){
    $('#weather-glance-bg').style.backgroundImage=`url('Weather_Day.png')`;
    $('#weather-temp').textContent='--°';
    $('#weather-condition').textContent=weatherLoading?'Loading forecast…':'Forecast loading…';
    $('#weather-quill-read').textContent='Quill is checking what your day is walking into.';
    return;
  }
  if(weatherData.error){
    $('#weather-condition').textContent='Forecast unavailable';
    $('#weather-quill-read').textContent='The weather service did not answer. Your Queue will try again on the next load.';
    return;
  }
  const f=weatherData.forecast;
  const cond=conditionForWeather(weatherData);
  $('#weather-glance-bg').style.backgroundImage=`url('${timeOfDayAsset(weatherData)}')`;
  $('#weather-temp').textContent=fmtTemp(f.current.temperature_2m);
  $('#weather-condition').textContent=cond.label;
  $('#weather-quill-read').textContent=quillWeatherRead(weatherData);
  const metrics=$('#weather-mini-metrics').querySelectorAll('strong');
  if(metrics[0])metrics[0].textContent=fmtTemp(f.current.apparent_temperature);
  if(metrics[1])metrics[1].textContent=`${f.daily.precipitation_probability_max?.[0]??0}%`;
  if(metrics[2])metrics[2].textContent=fmtWind(f.current.wind_speed_10m);
  if(metrics[3])metrics[3].textContent=airLabel(weatherData.air?.current?.us_aqi);
}

function renderWeatherPanel(){
  const panel=$('#queue-panel');
  if(!weatherData || weatherLoading){
    panel.innerHTML=`<section class="queue-banner"><img src="Weather News.png" alt="Weather"></section><div class="empty-state"><h2>Checking the forecast…</h2><p>Quill is looking outside without actually having to go outside.</p></div>`;
    if(!weatherLoading)loadWeather();
    return;
  }
  if(weatherData.error){
    panel.innerHTML=`<section class="queue-banner"><img src="Weather News.png" alt="Weather"></section><div class="empty-state"><h2>Weather service unavailable.</h2><p>Try again in a moment or change your location in Settings.</p><button class="primary-button" type="button" id="retry-weather">Try again</button></div>`;
    $('#retry-weather').onclick=()=>{weatherData=null;loadWeather()};
    return;
  }
  const f=weatherData.forecast;
  const air=weatherData.air?.current||{};
  const cond=conditionForWeather(weatherData);
  const hourlyStart=Math.max(0,f.hourly.time.findIndex(t=>t>=f.current.time));
  const hourly=Array.from({length:12},(_,i)=>hourlyStart+i).filter(i=>i<f.hourly.time.length);
  const alerts=weatherData.alerts||[];
  panel.innerHTML=`
    <section class="queue-banner"><img src="Weather News.png" alt="Weather: Conditions, air quality, and what your day is walking into."></section>
    <div class="weather-page">
      <section class="weather-hero">
        <div class="weather-hero-bg" style="background-image:url('${timeOfDayAsset(weatherData)}')"></div>
        <div class="weather-hero-content">
          <div>
            <p class="eyebrow">${escapeHTML(preferences.location.name)} · Right now</p>
            <div class="weather-hero-temp">${fmtTemp(f.current.temperature_2m)}</div>
            <h2>${cond.label} · Feels like ${fmtTemp(f.current.apparent_temperature)}</h2>
            <p>${quillWeatherRead(weatherData)}</p>
          </div>
          <div class="weather-vitals-grid">
            <div class="weather-vital"><span>High / Low</span><strong>${fmtTemp(f.daily.temperature_2m_max?.[0])} / ${fmtTemp(f.daily.temperature_2m_min?.[0])}</strong></div>
            <div class="weather-vital"><span>Rain</span><strong>${f.daily.precipitation_probability_max?.[0]??0}%</strong></div>
            <div class="weather-vital"><span>Wind</span><strong>${fmtWind(f.current.wind_speed_10m)}</strong></div>
            <div class="weather-vital"><span>Air</span><strong>${airLabel(air.us_aqi)}</strong></div>
          </div>
        </div>
      </section>
      ${alerts.length?`<section class="weather-alert"><strong>${escapeHTML(alerts[0].properties?.event||'Weather alert')}</strong><p>${escapeHTML(alerts[0].properties?.headline||'An active National Weather Service alert applies to this location.')}</p></section>`:''}
      <section class="condition-visual"><img src="${cond.asset}" alt="${cond.label} conditions"></section>
      <section class="weather-card-section">
        <h3>Next 12 Hours</h3>
        <div class="hourly-strip">${hourly.map(i=>{
          const time=new Date(f.hourly.time[i]).toLocaleTimeString([],{hour:'numeric'});
          const ci=weatherCodeInfo(f.hourly.weather_code[i]);
          return `<div class="hour-card"><span>${time}</span><strong>${fmtTemp(f.hourly.temperature_2m[i])}</strong><small>${ci.symbol} ${f.hourly.precipitation_probability[i]??0}%</small></div>`;
        }).join('')}</div>
      </section>
      <section class="weather-card-section">
        <h3>Air & Sun</h3>
        <div class="weather-vitals-grid">
          <div class="weather-vital"><span>US AQI</span><strong>${air.us_aqi??'—'}</strong></div>
          <div class="weather-vital"><span>PM2.5</span><strong>${air.pm2_5!=null?Math.round(air.pm2_5):'—'}</strong></div>
          <div class="weather-vital"><span>UV</span><strong>${air.uv_index!=null?Number(air.uv_index).toFixed(1):'—'}</strong></div>
          <div class="weather-vital"><span>Humidity</span><strong>${f.current.relative_humidity_2m??'—'}%</strong></div>
          <div class="weather-vital"><span>Sunrise</span><strong>${formatClock(f.daily.sunrise?.[0])}</strong></div>
          <div class="weather-vital"><span>Sunset</span><strong>${formatClock(f.daily.sunset?.[0])}</strong></div>
        </div>
      </section>
      <section class="weather-card-section" style="grid-column:1/-1">
        <h3>7-Day Outlook</h3>
        <div class="forecast-grid">${f.daily.time.map((day,i)=>{
          const ci=weatherCodeInfo(f.daily.weather_code[i]);
          return `<div class="day-card"><span>${new Date(`${day}T12:00`).toLocaleDateString([],{weekday:'short'})}</span><strong>${ci.symbol} ${fmtTemp(f.daily.temperature_2m_max[i])}</strong><small>${fmtTemp(f.daily.temperature_2m_min[i])} · ${f.daily.precipitation_probability_max[i]??0}% rain</small></div>`;
        }).join('')}</div>
      </section>
    </div>`;
}

function formatClock(iso){
  if(!iso)return '—';
  const t=String(iso).split('T')[1];
  if(!t)return '—';
  const [h,m]=t.split(':').map(Number);
  const d=new Date();d.setHours(h,m,0,0);
  return d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
}

function setupSearch(){
  $('#search-button').onclick=()=>openSearch();
  $('#notification-button').onclick=()=>showToast('Notification preferences are part of the next demo layer.');
  $('#search-input').oninput=renderSearchResults;
}
function openSearch(){
  $('#search-input').value='';
  $('#search-results').innerHTML='<p class="field-help">Search your selected topics and demo stories.</p>';
  const dialog=$('#search-dialog');
  if(typeof dialog.showModal==='function')dialog.showModal();
  else dialog.setAttribute('open','');
  setTimeout(()=>$('#search-input').focus(),30);
}
function renderSearchResults(){
  const q=$('#search-input').value.trim().toLowerCase();
  if(q.length<2){$('#search-results').innerHTML='<p class="field-help">Type at least two characters.</p>';return}
  const topicIds=preferences.topics;
  const matches=STORIES.filter(s=>topicIds.includes(s.topic)&&(s.headline.toLowerCase().includes(q)||s.quick.toLowerCase().includes(q)||topicById(s.topic).label.toLowerCase().includes(q))).slice(0,8);
  $('#search-results').innerHTML=matches.length?matches.map(s=>`<button type="button" class="search-result" data-search-story="${s.id}"><small>${topicById(s.topic).label}</small><h3>${s.headline}</h3></button>`).join(''):'<p class="field-help">No matches in this Queue.</p>';
  $$('[data-search-story]').forEach(btn=>btn.onclick=()=>{
    const s=storyById(btn.dataset.searchStory);
    $('#search-dialog').close?.();
    openQueueTopic(s.topic);
  });
}

function showToast(message){
  const toast=$('#toast');
  toast.textContent=message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove('is-visible'),2800);
}

function init(){
  renderNavigation();
  bindViewLinks();
  $('#settings-form').addEventListener('submit',saveSettings);
  $('#use-location').onclick=useCurrentLocation;
  $('#reset-demo').onclick=resetDemo;
  setupSearch();
  renderToday();
  loadWeather();
  document.addEventListener('error',event=>{
    if(event.target?.tagName==='IMG')event.target.style.opacity='.18';
  },true);
}

init();
