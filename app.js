const TOPICS = [
  { id: 'science', label: 'Science', icon: '🧪' },
  { id: 'ai', label: 'AI & Tech', icon: '✦' },
  { id: 'wellbeing', label: 'Wellbeing', icon: '🌿' },
  { id: 'culture', label: 'Culture', icon: '🎧' },
  { id: 'animals', label: 'Animals', icon: '🐾' },
  { id: 'wonderful', label: 'Good News', icon: '☀' },
  { id: 'work', label: 'Work & Ideas', icon: '↗' },
  { id: 'local', label: 'Local Life', icon: '⌂' },
];

const STORIES = [
  {
    id: 'science-1', topic: 'science', source: 'Sample science desk',
    headline: 'Battery recycling gets a second look from materials researchers.',
    quick: 'A sample science story showing how the queue can surface a technical development without turning the morning into a literature review.',
    balanced: 'The point of this card is context: what changed, why it could matter, and enough background to understand the conversation without reading ten tabs first.',
    deep: 'A context-rich version could add definitions, competing approaches, uncertainties, links to primary research, and a short “what to watch next” section.'
  },
  {
    id: 'ai-1', topic: 'ai', source: 'Sample technology desk',
    headline: 'Personal AI tools are becoming less about novelty and more about fit.',
    quick: 'The interesting question is shifting from “can AI do this?” to “does this actually help this person do it?”',
    balanced: 'A useful assistant can be narrow, opinionated, and designed around one workflow instead of trying to be every tool for every person.',
    deep: 'A deeper queue could compare privacy tradeoffs, workflow design, human review, model limitations, and examples of where personalization helps versus where it creates risk.'
  },
  {
    id: 'wellbeing-1', topic: 'wellbeing', source: 'Sample wellbeing desk',
    headline: 'Transition time may be the missing step in an overpacked day.',
    quick: 'Going directly from one demand to the next can make a manageable schedule feel impossible.',
    balanced: 'This sample story reframes “time management” as energy and transition management. A five-minute reset can sometimes do more than another reminder.',
    deep: 'A deeper version could distinguish executive-function friction, sensory overload, task switching, and ordinary scheduling pressure while avoiding one-size-fits-all advice.'
  },
  {
    id: 'animals-1', topic: 'animals', source: 'Sample nature desk',
    headline: 'Restored wetlands make room for wildlife and people at the same time.',
    quick: 'A small happy nature story belongs in the queue because delight is useful information too.',
    balanced: 'Not every morning needs to be an emergency briefing. This section intentionally leaves room for animals, restoration, discovery, and the occasional creature doing something ridiculous.',
    deep: 'A deeper version might connect habitat restoration, flood control, biodiversity, public space, and the tradeoffs involved in urban conservation projects.'
  },
  {
    id: 'culture-1', topic: 'culture', source: 'Sample culture desk',
    headline: 'Cozy games keep borrowing the best parts of collaboration.',
    quick: 'More games are treating low-pressure cooperation as the feature instead of the warm-up.',
    balanced: 'This demo category shows that “important to me” does not have to mean “globally consequential.” A personalized briefing can take hobbies seriously without pretending they are breaking news.',
    deep: 'A context-rich version could look at design trends, accessibility, social play, creator economics, and how smaller studios differentiate themselves.'
  },
  {
    id: 'wonderful-1', topic: 'wonderful', source: 'Sample good-news desk',
    headline: 'A library of things turns rarely used tools into shared community infrastructure.',
    quick: 'Borrow the drill, sewing machine, telescope, or cake pan instead of buying one for a single afternoon.',
    balanced: 'The useful part is bigger than thrift. Shared-object libraries can lower cost, reduce clutter, and make experimentation easier for people who do not want to own every tool they might need.',
    deep: 'A deeper version could explore funding models, liability, maintenance, access, and why libraries increasingly function as community infrastructure beyond books.'
  },
  {
    id: 'work-1', topic: 'work', source: 'Sample work desk',
    headline: 'Teams are starting to treat notification overload as a design problem.',
    quick: 'If everything is urgent, the system has stopped communicating priority.',
    balanced: 'This sample story looks at communication norms, channel sprawl, and the difference between giving people information and making sure they can actually use it.',
    deep: 'A deeper queue could compare async norms, response-time expectations, escalation paths, documentation, and the hidden labor created by badly designed communication systems.'
  },
  {
    id: 'local-1', topic: 'local', source: 'Sample local desk',
    headline: 'A weekend market adds quieter sensory-friendly shopping hours.',
    quick: 'A small schedule change can make a familiar public space usable for more people.',
    balanced: 'This fictional local example shows how the queue could prioritize events and changes that match a reader’s actual needs, not just whatever is most promoted.',
    deep: 'A deeper version could include hours, transit, accessibility notes, crowd patterns, cost, and personalized “worth leaving the house for?” guidance.'
  },
  {
    id: 'science-2', topic: 'science', source: 'Sample research desk',
    headline: 'Citizen-science sensors make hyperlocal environmental data easier to see.',
    quick: 'Neighborhood-scale data can reveal patterns that citywide averages blur out.',
    balanced: 'The interesting design question is not only whether the sensors work. It is whether the resulting information is understandable enough to help residents make decisions.',
    deep: 'A deeper version could cover calibration, sampling bias, open-data standards, privacy, and how community measurements complement official monitoring.'
  },
  {
    id: 'ai-2', topic: 'ai', source: 'Sample automation desk',
    headline: 'The best automation may be the one that quietly removes a single annoying step.',
    quick: 'Not every useful automation needs to become a platform.',
    balanced: 'Small automations can be easier to trust because their boundaries are obvious. They solve a known problem and leave the rest of the workflow alone.',
    deep: 'A deeper queue could compare brittle versus resilient automations, review checkpoints, failure states, maintenance cost, and when manual work is actually the safer choice.'
  }
];

const DEFAULTS = {
  name: 'Alex',
  depth: 'balanced',
  topics: ['science', 'ai', 'wellbeing', 'culture', 'animals', 'wonderful']
};

const storageKey = 'yourDailyQueuePreferencesV1';
const feedbackKey = 'yourDailyQueueFeedbackV1';

let preferences = loadPreferences();
let feedback = loadFeedback();

const els = {
  name: document.querySelector('#profile-name'),
  date: document.querySelector('#report-date'),
  storyStat: document.querySelector('#stat-stories'),
  topicStat: document.querySelector('#stat-topics'),
  minuteStat: document.querySelector('#stat-minutes'),
  quickList: document.querySelector('#quick-scan-list'),
  topicSections: document.querySelector('#topic-sections'),
  dialog: document.querySelector('#customize-dialog'),
  form: document.querySelector('#customize-form'),
  readerName: document.querySelector('#reader-name'),
  topicPicker: document.querySelector('#topic-picker-grid'),
  toast: document.querySelector('#toast'),
};

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return structuredClone(DEFAULTS);
    return {
      name: String(saved.name || DEFAULTS.name).slice(0, 24),
      depth: ['quick', 'balanced', 'deep'].includes(saved.depth) ? saved.depth : DEFAULTS.depth,
      topics: Array.isArray(saved.topics) && saved.topics.length ? saved.topics.filter(id => TOPICS.some(t => t.id === id)) : [...DEFAULTS.topics]
    };
  } catch {
    return structuredClone(DEFAULTS);
  }
}

function loadFeedback() {
  try { return JSON.parse(localStorage.getItem(feedbackKey)) || {}; }
  catch { return {}; }
}

function renderDate() {
  const now = new Date();
  els.date.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getTopic(id) { return TOPICS.find(topic => topic.id === id); }
function getCopy(story) { return story[preferences.depth] || story.balanced; }
function visibleStories() { return STORIES.filter(story => preferences.topics.includes(story.topic)); }

function renderQuickScan() {
  const stories = visibleStories().slice(0, 5);
  els.quickList.innerHTML = stories.map(story => {
    const topic = getTopic(story.topic);
    return `
      <article class="quick-card" data-quick-id="${story.id}">
        <div class="quick-icon" aria-hidden="true">${topic.icon}</div>
        <div>
          <p class="quick-meta">${topic.label} · ${story.source}</p>
          <p class="quick-headline">${story.headline}</p>
        </div>
        <button class="quick-toggle" type="button" aria-expanded="false">Context ↓</button>
        <p class="quick-extra">${getCopy(story)}</p>
      </article>`;
  }).join('');

  els.quickList.querySelectorAll('.quick-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.quick-card');
      const open = card.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? 'Close ↑' : 'Context ↓';
    });
  });
}

function renderTopicSections() {
  els.topicSections.innerHTML = preferences.topics.map(topicId => {
    const topic = getTopic(topicId);
    const stories = STORIES.filter(story => story.topic === topicId);
    if (!stories.length) return '';
    return `
      <section class="topic-group" id="topic-${topicId}">
        <div class="topic-group-head">
          <h3>${topic.icon} ${topic.label}</h3>
          <span>${stories.length} sample ${stories.length === 1 ? 'story' : 'stories'} in this demo</span>
        </div>
        <div class="topic-grid">
          ${stories.map(renderTopicCard).join('')}
        </div>
      </section>`;
  }).join('');

  attachFeedbackHandlers();
}

function renderTopicCard(story) {
  const state = feedback[story.id];
  return `
    <article class="topic-card">
      <p class="story-label">${story.source}</p>
      <h3>${story.headline}</h3>
      <p>${getCopy(story)}</p>
      <span class="depth-note">${depthLabel(preferences.depth)}</span>
      <div class="story-feedback" data-story="${story.id}">
        <button type="button" data-feedback="more" class="${state === 'more' ? 'is-active' : ''}">＋ More like this</button>
        <button type="button" data-feedback="less" class="${state === 'less' ? 'is-active' : ''}">− Less like this</button>
      </div>
    </article>`;
}

function depthLabel(depth) {
  return depth === 'quick' ? 'Quick read' : depth === 'deep' ? 'Context-rich' : 'Balanced context';
}

function renderStats() {
  const stories = visibleStories();
  els.name.textContent = preferences.name;
  els.storyStat.textContent = stories.length;
  els.topicStat.textContent = preferences.topics.length;
  const factor = preferences.depth === 'quick' ? .55 : preferences.depth === 'deep' ? 1.45 : 1;
  els.minuteStat.textContent = Math.max(3, Math.round(stories.length * .75 * factor));
}

function renderPicker() {
  els.readerName.value = preferences.name;
  const depthInput = els.form.querySelector(`input[name="depth"][value="${preferences.depth}"]`);
  if (depthInput) depthInput.checked = true;

  els.topicPicker.innerHTML = TOPICS.map(topic => `
    <label class="topic-choice">
      <input type="checkbox" name="topics" value="${topic.id}" ${preferences.topics.includes(topic.id) ? 'checked' : ''}>
      <span>${topic.icon} ${topic.label}</span>
    </label>`).join('');
}

function renderAll() {
  renderStats();
  renderQuickScan();
  renderTopicSections();
  renderPicker();
  attachFeedbackHandlers();
}

function attachFeedbackHandlers() {
  document.querySelectorAll('.story-feedback button').forEach(button => {
    button.onclick = () => {
      const wrap = button.closest('.story-feedback');
      const id = wrap.dataset.story;
      const value = button.dataset.feedback;
      feedback[id] = feedback[id] === value ? null : value;
      if (!feedback[id]) delete feedback[id];
      localStorage.setItem(feedbackKey, JSON.stringify(feedback));
      wrap.querySelectorAll('button').forEach(btn => btn.classList.toggle('is-active', btn.dataset.feedback === feedback[id]));
      showToast(value === 'more' ? 'Got it. This queue would learn to show more like that.' : 'Got it. This queue would turn that signal down.');
    };
  });
}

function openDialog() {
  renderPicker();
  if (typeof els.dialog.showModal === 'function') els.dialog.showModal();
  else els.dialog.setAttribute('open', '');
}

document.querySelector('#open-customize').addEventListener('click', openDialog);
document.querySelector('#hero-customize').addEventListener('click', openDialog);

document.querySelector('#reset-preferences').addEventListener('click', () => {
  preferences = structuredClone(DEFAULTS);
  feedback = {};
  localStorage.removeItem(storageKey);
  localStorage.removeItem(feedbackKey);
  renderAll();
  showToast('Demo reset to the original fictional profile.');
});

els.form.addEventListener('submit', event => {
  const submitter = event.submitter;
  if (submitter?.value === 'cancel') return;

  const formData = new FormData(els.form);
  const selectedTopics = formData.getAll('topics');
  if (!selectedTopics.length) {
    event.preventDefault();
    showToast('Pick at least one topic for the queue.');
    return;
  }

  preferences = {
    name: (formData.get('reader-name') || DEFAULTS.name).trim().slice(0, 24) || DEFAULTS.name,
    depth: formData.get('depth') || DEFAULTS.depth,
    topics: selectedTopics
  };
  localStorage.setItem(storageKey, JSON.stringify(preferences));
  renderAll();
  showToast('Queue updated. The briefing now reflects those choices.');
});

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove('is-visible'), 3100);
}

renderDate();
renderAll();
