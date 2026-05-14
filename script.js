/* =============================================
   AP Study Hub — script.js
   
   This file powers all the interactive features
   on the website including:
   - Navigation highlighting
   - Flashcard flipping and tracking
   - All flashcard content for every subject
   ============================================= */

'use strict';

/* ── NAVIGATION ───────────────────────────────
   Highlights the correct nav link based on
   which page the user is currently on
─────────────────────────────────────────────── */
function initNav() {
  // Get the current page filename from the URL (e.g. "calculus.html")
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Loop through all nav links and mark the matching one as active
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === page);
  });
}


/* ── FLASHCARD DATA ───────────────────────────
   All the flashcard content for every subject.
   Each deck has a title, accent color, and an
   array of cards with a front (term) and
   back (definition/explanation).
─────────────────────────────────────────────── */
const DECKS = {

  // ---------- AP CALCULUS DECK ----------
  calculus: {
    title: 'AP Calculus AB / BC',
    accent: '#0ea5a0', // teal color used for this subject
    cards: [
      { front: 'Power Rule', back: 'd/dx[xⁿ] = nxⁿ⁻¹\nThe exponent comes down and multiplies; reduce the exponent by 1.' },
      { front: 'Chain Rule', back: 'd/dx[f(g(x))] = f′(g(x)) · g′(x)\nDerivative of outside × derivative of inside.' },
      { front: 'Product Rule', back: 'd/dx[uv] = u′v + uv′\nFirst times derivative of second plus second times derivative of first.' },
      { front: 'Quotient Rule', back: 'd/dx[u/v] = (u′v − uv′) / v²\n"Low d-high minus high d-low, square the bottom and away we go."' },
      { front: 'FTC Part 1', back: 'd/dx[∫ₐˣ f(t)dt] = f(x)\nThe derivative of an integral returns the original function.' },
      { front: 'FTC Part 2', back: '∫ₐᵇ f(x)dx = F(b) − F(a)\nEvaluate the antiderivative at b, subtract the value at a.' },
      { front: 'L\'Hôpital\'s Rule', back: 'If lim f/g = 0/0 or ∞/∞, then lim f/g = lim f′/g′\nOnly apply after confirming the indeterminate form.' },
      { front: 'Mean Value Theorem', back: 'f′(c) = [f(b) − f(a)] / (b − a)\nThere exists a point c where the instantaneous rate equals the average rate.' },
      { front: 'Critical Point', back: 'A point where f′(x) = 0 or f′(x) is undefined.\nPotential location of a local maximum or minimum.' },
      { front: 'Inflection Point', back: 'Where f′′(x) changes sign — concavity switches.\nNot necessarily where f′′(x) = 0; must verify sign change.' },
      { front: 'U-Substitution', back: 'Replace a complex expression with u to simplify an integral.\nDon\'t forget to substitute du and change limits if definite.' },
      { front: 'Separation of Variables', back: 'Rearrange dy/dx = ky into dy/y = k dx, then integrate both sides.\nSolution: y = Ce^(kt)' },
      { front: 'Riemann Sum', back: 'Approximates area under a curve using rectangles.\nLeft, right, or midpoint; more rectangles = better approximation.' },
      { front: 'Limit', back: 'The value a function approaches as x approaches a point.\nMay exist even if the function is undefined at that point.' },
      { front: 'Continuity (3 conditions)', back: '1. f(a) is defined\n2. lim f(x) as x→a exists\n3. lim = f(a)\nAll three must hold for continuity at x = a.' },
      { front: 'Concavity', back: 'f′′(x) > 0 → concave up (cup shape)\nf′′(x) < 0 → concave down (cap shape)' },
      { front: 'Slope Field', back: 'A graph showing the slope of solutions to dy/dx = f(x,y) at many points.\nUsed to sketch solution curves for differential equations.' },
      { front: 'Ratio Test (BC)', back: 'A series converges if lim |aₙ₊₁/aₙ| < 1 as n→∞.\nDiverges if > 1. Inconclusive if = 1.' },
      { front: 'Taylor Series (BC)', back: 'f(x) = f(a) + f′(a)(x−a) + f′′(a)(x−a)²/2! + …\nRepresents a function as an infinite polynomial around x = a.' },
      { front: 'Related Rates', back: 'Differentiate both sides of an equation with respect to time t.\nAlways draw a diagram; identify what\'s given and what to find.' },
    ]
  },

  // ---------- AP BIOLOGY DECK ----------
  biology: {
    title: 'AP Biology',
    accent: '#22c55e', // green color used for this subject
    cards: [
      { front: 'Central Dogma', back: 'DNA → (Transcription) → mRNA → (Translation) → Protein\nGenetic information flows in one direction only.' },
      { front: 'Hardy-Weinberg Equation', back: 'p + q = 1 and p² + 2pq + q² = 1\np² = homozygous dominant, 2pq = heterozygous, q² = homozygous recessive.' },
      { front: 'Natural Selection', back: 'Individuals with heritable traits better suited to the environment survive and reproduce more.\nRequires: variation, heritability, differential reproductive success.' },
      { front: 'Osmosis', back: 'Diffusion of water across a semipermeable membrane from low solute → high solute concentration.\nHypotonic: cell swells. Hypertonic: cell shrinks. Isotonic: no net movement.' },
      { front: 'Cellular Respiration (overview)', back: 'Glycolysis (2 ATP) → Pyruvate Oxidation → Krebs Cycle (2 ATP) → ETC (~32 ATP)\nOxygen is the final electron acceptor.' },
      { front: 'Photosynthesis (overview)', back: 'Light Reactions (thylakoid): H₂O → O₂ + ATP + NADPH\nCalvin Cycle (stroma): CO₂ + ATP + NADPH → G3P (glucose)' },
      { front: 'Mitosis', back: 'Cell division producing 2 identical diploid daughter cells.\nPurpose: growth, repair, and asexual reproduction.' },
      { front: 'Meiosis', back: 'Cell division producing 4 haploid genetically unique gametes.\nCrossing over occurs in Prophase I — major source of genetic variation.' },
      { front: 'Enzyme', back: 'A biological catalyst that lowers the activation energy of a reaction.\nNot consumed in the reaction; activity affected by pH and temperature.' },
      { front: 'ATP', back: 'Adenosine triphosphate — the cell\'s universal energy currency.\nEnergy released when the third phosphate bond is broken.' },
      { front: '10% Rule', back: 'Only ~10% of energy transfers between trophic levels; 90% is lost as heat.\nLimits the length of food chains.' },
      { front: 'Genetic Drift', back: 'Random changes in allele frequency in a small population.\nBottleneck effect: population crash. Founder effect: small group colonizes new area.' },
      { front: 'Gene Flow', back: 'Movement of alleles between populations through migration.\nReduces genetic differences between populations.' },
      { front: 'DNA Replication', back: 'Semi-conservative: each new strand uses one original strand as a template.\nKey enzymes: Helicase (unwinds), Primase (adds primer), DNA Polymerase III (builds strand).' },
      { front: 'Transcription', back: 'DNA → mRNA, occurs in the nucleus.\nRNA Polymerase reads the template strand 3′→5′ and builds mRNA 5′→3′.' },
      { front: 'Translation', back: 'mRNA → Protein, occurs at ribosomes.\nCodons (3 bases) are read; tRNA anticodons deliver amino acids.' },
      { front: 'Carrying Capacity (K)', back: 'Maximum population size an environment can sustainably support.\nLogistic growth: dN/dt = rN[(K−N)/K] — growth slows as N approaches K.' },
      { front: 'Speciation', back: 'Formation of a new species, usually through reproductive isolation.\nAllopatric: geographic separation. Sympatric: same location, different niches.' },
    ]
  },

  // ---------- AP US HISTORY DECK ----------
  ushistory: {
    title: 'AP US History',
    accent: '#f59e0b', // gold/amber color used for this subject
    cards: [
      { front: 'Columbian Exchange', back: 'Transfer of plants, animals, diseases, and ideas between the Americas and Europe/Africa after 1492.\nSmallpox devastated Native populations; crops like potatoes transformed European diets.' },
      { front: 'Salutary Neglect', back: 'Britain loosely enforced trade laws in the colonies during the early 1700s.\nAllowed colonial self-governance to grow — later crackdown caused colonial resentment.' },
      { front: 'Social Contract', back: 'Enlightenment idea: people give up some freedom in exchange for government protection.\nLocke: government must protect life, liberty, and property — or the people can replace it.' },
      { front: 'Missouri Compromise (1820)', back: 'Admitted Missouri as slave state, Maine as free state.\n36°30′ line: slavery prohibited north of this line in the Louisiana Territory.' },
      { front: 'Manifest Destiny', back: 'Belief that American expansion to the Pacific was inevitable and divinely ordained.\nJustified westward expansion and displacement of Native Americans.' },
      { front: 'Reconstruction Amendments', back: '13th: abolished slavery (1865)\n14th: citizenship and equal protection (1868)\n15th: voting rights regardless of race (1870)' },
      { front: 'Populist Movement', back: 'Late 1800s agrarian movement opposing railroad monopolies and gold standard.\nDemanded graduated income tax, direct election of senators, silver coinage.' },
      { front: 'Progressive Era', back: 'Early 1900s reform movement targeting corruption, monopolies, and social inequality.\nKey reforms: Sherman Antitrust Act, 17th Amendment (direct Senate elections), Prohibition.' },
      { front: 'New Deal', back: 'FDR\'s programs to address the Great Depression (1933–1939).\nRelief (CCC), Recovery (PWA), Reform (FDIC, Social Security) — expanded federal government.' },
      { front: 'Containment', back: 'Truman\'s Cold War policy to prevent Soviet communism from spreading.\nBasis for Marshall Plan, NATO, Korean War, and Vietnam involvement.' },
      { front: 'DBQ Thesis', back: 'A historically defensible claim that responds to the prompt with a line of reasoning.\nMust go beyond a restatement — explain HOW or WHY, not just WHAT.' },
      { front: 'Contextualization', back: 'Describe the broader historical context BEFORE the time period of the prompt.\nMust explicitly connect to the argument — not just mention it in passing.' },
      { front: 'Sourcing (HAPPy)', back: 'Analyze a document\'s: Historical situation, Audience, Purpose, or Point of View.\nExplain HOW or WHY the source\'s context affects its meaning or reliability.' },
      { front: 'Compromise of 1877', back: 'Ended Reconstruction — Hayes became president; federal troops withdrawn from the South.\nAllowed Southern states to suppress Black civil rights through Jim Crow laws.' },
      { front: 'Jim Crow Laws', back: 'State laws enforcing racial segregation in the South after Reconstruction.\nUpheld by Plessy v. Ferguson (1896): "separate but equal" was constitutional.' },
      { front: 'Neutrality Acts (1930s)', back: 'Legislation preventing US involvement in foreign wars.\nReflected strong isolationist sentiment after WWI — repealed after Pearl Harbor (1941).' },
    ]
  },

  // ---------- AP EUROPEAN HISTORY DECK ----------
  euro: {
    title: 'AP European History',
    accent: '#8b5cf6', // purple color used for this subject
    cards: [
      { front: 'Humanism', back: 'Renaissance intellectual movement focusing on human potential, classical texts, and secular life.\nShifted focus from theology to human achievement in art, literature, and philosophy.' },
      { front: 'Protestant Reformation', back: 'Martin Luther\'s 95 Theses (1517) challenged Church authority over salvation.\nKey figures: Luther (justification by faith), Calvin (predestination), Henry VIII (Anglican Church).' },
      { front: 'Scientific Revolution', back: '16th–17th century shift from faith-based to empirical understanding of the natural world.\nCopernicus (heliocentric), Galileo (telescope), Newton (gravity), Bacon (empiricism).' },
      { front: 'Absolutism', back: 'Monarch holds unlimited political power, often justified by divine right.\nLouis XIV: "L\'état, c\'est moi" — Versailles used to control nobility and project power.' },
      { front: 'Enlightenment', back: '18th century intellectual movement applying reason to politics and society.\nLocke: natural rights. Voltaire: religious tolerance. Rousseau: general will. Montesquieu: separation of powers.' },
      { front: 'French Revolution', back: 'Caused by debt, inequality, and Enlightenment ideas; began 1789.\nPhases: Constitutional Monarchy → Reign of Terror → Directory → Napoleon.' },
      { front: 'Napoleon Bonaparte', back: 'Rose to power after the Revolution; spread Enlightenment ideals through conquest.\nNapoleonic Code reformed law; defeated at Waterloo (1815); exiled to St. Helena.' },
      { front: 'Congress of Vienna (1815)', back: 'Post-Napoleon settlement to restore conservative order in Europe.\nPrinciples: legitimacy, balance of power, conservatism. Led by Metternich of Austria.' },
      { front: 'Nationalism', back: 'Belief that people sharing language/culture/history should form their own nation-state.\nDrove German and Italian unification; destabilized multi-ethnic empires like Austria-Hungary.' },
      { front: 'Bismarck & German Unification', back: 'Otto von Bismarck unified Germany through "blood and iron" — war, not diplomacy.\nRealpolitik: pragmatic politics over ideology. Prussia defeated Austria (1866) and France (1871).' },
      { front: 'Treaty of Versailles (1919)', back: 'Ended WWI: War Guilt Clause blamed Germany; heavy reparations; lost territory.\nHumiliated Germany — created conditions that helped Hitler rise to power.' },
      { front: 'Totalitarianism', back: 'State controls all aspects of public and private life.\nHitler (fascism/race), Stalin (communism/class), Mussolini (fascism/nationalism) — different ideologies, same control.' },
      { front: 'The Holocaust', back: 'Nazi genocide of 6 million Jews and millions of others (Roma, disabled, political opponents).\nIndustrialized mass murder using concentration and extermination camps.' },
      { front: 'Cold War', back: 'Ideological conflict between US (capitalism) and USSR (communism), 1947–1991.\nProxy wars, arms race, Berlin Wall, détente, Gorbachev\'s reforms → Soviet collapse.' },
      { front: 'Contextualization (AP Euro)', back: 'Describe the broader historical situation BEFORE the time period of the prompt.\nMust explicitly connect to your argument — mentioning it without connecting earns no points.' },
      { front: 'Realpolitik', back: 'Politics based on practical considerations, not ideology or ethics.\nBismarck\'s approach: form alliances and wage wars based on strategic interest, not ideals.' },
    ]
  },

  // ---------- AP PSYCHOLOGY DECK ----------
  psychology: {
    title: 'AP Psychology',
    accent: '#f43f5e', // red/rose color used for this subject
    cards: [
      { front: 'Classical Conditioning', back: 'Learning by association: pair a neutral stimulus (CS) with one that causes a response (US).\nPavlov: bell (CS) + food (US) → salivation (UR) → bell alone → salivation (CR).' },
      { front: 'Operant Conditioning', back: 'Learning through consequences (Skinner).\nReinforcement increases behavior; punishment decreases behavior.' },
      { front: 'Negative Reinforcement', back: 'REMOVING an unpleasant stimulus to INCREASE a behavior.\nNOT punishment. Example: taking painkillers removes pain → you take them more often.' },
      { front: 'Positive Punishment', back: 'ADDING an unpleasant stimulus to DECREASE a behavior.\nExample: getting a speeding ticket → you drive slower.' },
      { front: 'Variable Ratio Schedule', back: 'Reinforcement after an unpredictable number of responses.\nProduces the highest response rate and is most resistant to extinction. Example: slot machines.' },
      { front: 'Piaget\'s 4 Stages', back: 'Sensorimotor (0–2): object permanence\nPreoperational (2–7): egocentrism, no conservation\nConcrete Operational (7–11): conservation\nFormal Operational (12+): abstract reasoning' },
      { front: 'Milgram Study', back: '65% of participants continued to deliver 450V shocks when ordered by an authority figure.\nDemonstrated the power of situational factors and obedience over personal morality.' },
      { front: 'Asch Conformity Study', back: '75% of participants conformed to an obviously wrong answer at least once.\nNormative social influence: conforming to fit in or avoid rejection.' },
      { front: 'Bystander Effect', back: 'People are less likely to help in an emergency when others are present.\nDiffusion of responsibility: each person assumes someone else will help.' },
      { front: 'Fundamental Attribution Error', back: 'Overestimating character (disposition) and underestimating situation when explaining others\' behavior.\nExample: "He\'s late because he\'s irresponsible" vs "traffic was bad."' },
      { front: 'Cognitive Dissonance', back: 'Mental discomfort from holding two conflicting beliefs or actions.\nPeople change their attitude or behavior to reduce the discomfort.' },
      { front: 'Dopamine', back: 'Neurotransmitter associated with reward, motivation, and movement.\nLow: Parkinson\'s disease. Excess: associated with schizophrenia symptoms.' },
      { front: 'Serotonin', back: 'Neurotransmitter regulating mood, sleep, and appetite.\nLow levels linked to depression and anxiety. SSRIs increase available serotonin.' },
      { front: 'Hippocampus', back: 'Brain structure critical for forming new long-term explicit (declarative) memories.\nH.M.: hippocampus removed → could not form new explicit memories.' },
      { front: 'Proactive Interference', back: 'OLD memories interfere with learning NEW information.\nMemory tip: PRO = old stuff gets in the way first (proactive = forward-acting).' },
      { front: 'Retroactive Interference', back: 'NEW learning interferes with recall of OLD information.\nExample: learning Spanish makes it harder to remember French you learned earlier.' },
      { front: 'Confirmation Bias', back: 'Tendency to search for and interpret information that confirms existing beliefs.\nIgnore or dismiss evidence that contradicts what you already believe.' },
      { front: 'Bandura\'s Social Learning', back: 'Learning by observing and imitating others (modeling).\nBobo doll study: children imitated aggressive behavior they observed in adults.' },
    ]
  },

  // ---------- AP ENGLISH LANGUAGE DECK ----------
  english: {
    title: 'AP English Language',
    accent: '#f43f5e', // red/rose color used for this subject
    cards: [
      { front: 'Ethos', back: 'Rhetorical appeal to credibility or authority.\nAuthor establishes trust by citing expertise, credentials, or shared values with the audience.' },
      { front: 'Logos', back: 'Rhetorical appeal to logic and reason.\nUses facts, statistics, data, and rational argument structure to persuade.' },
      { front: 'Pathos', back: 'Rhetorical appeal to emotion.\nWord choice, imagery, anecdotes, and tone that create an emotional response in the reader.' },
      { front: 'Rhetorical Analysis Thesis', back: 'A strong thesis names WHAT strategies the author uses AND explains HOW they achieve the PURPOSE.\nWeak: "The author uses pathos." Strong: "Through vivid imagery and personal anecdote, the author creates urgency to motivate action."' },
      { front: 'Synthesis Essay', back: 'You form your own argument and use 3+ of 6–7 provided sources as evidence.\nDo NOT summarize sources — use them to support YOUR claim. Cite as (Source A).' },
      { front: 'Argument Essay', back: 'Take a clear position on a prompt using your own knowledge and real-world examples.\nMust include: clear thesis, specific evidence, reasoning, and a counterargument addressed.' },
      { front: 'Diction', back: 'The specific words an author chooses and the effect those choices create.\nFormal vs. informal, connotation vs. denotation — word choice reveals tone and purpose.' },
      { front: 'Syntax', back: 'Sentence structure — length, complexity, punctuation, fragments, parallelism.\nAuthors manipulate syntax to control pacing, emphasis, and emotional effect.' },
      { front: 'Tone', back: 'The author\'s attitude toward the subject or audience.\nRevealed through diction, syntax, and rhetorical choices. Different from mood (reader\'s feeling).' },
      { front: 'Anaphora', back: 'Repetition of the same word or phrase at the beginning of successive sentences.\nCreates rhythm, emphasis, and emotional intensity. Example: "I have a dream…"' },
      { front: 'Juxtaposition', back: 'Placing two contrasting ideas, images, or characters side by side.\nHighlights differences and creates meaning through contrast.' },
      { front: 'Counterargument', back: 'Acknowledging and responding to the opposing viewpoint.\nStrong writers concede what\'s valid, then refute with stronger evidence — earns complexity points.' },
      { front: 'Evidence + Commentary', back: 'Evidence alone earns nothing — you must explain HOW it supports your claim.\nCommentary = the reasoning that connects your evidence back to your thesis.' },
      { front: 'Rhetorical Question', back: 'A question asked for effect, not expecting an answer.\nEngages the reader, makes them consider a point, or implies an obvious answer.' },
      { front: 'Essay Scoring Rows', back: 'Thesis: 0–1 point (specific claim + line of reasoning)\nEvidence & Commentary: 0–4 points (most important!)\nSophistication/Complexity: 0–1 point (hardest to earn)' },
      { front: 'Rhetorical Situation', back: 'Every text exists in a context: Speaker, Occasion, Audience, Purpose, Subject, Tone (SOAPS-T).\nAll rhetorical choices the author makes are responses to this situation.' },
    ]
  }

};


/* ── FLASHCARD STATE ──────────────────────────
   These variables keep track of what's happening
   in the flashcard session at any given moment
─────────────────────────────────────────────── */
let currentDeck  = [];    // The active list of cards being studied
let currentIndex = 0;     // Which card the user is currently on
let isFlipped    = false; // Whether the card is showing the front or back
let knownCards   = new Set();   // Cards the user marked as "Got It"
let unknownCards = new Set();   // Cards the user marked as "Still Learning"


/* ── FLASHCARD SETUP ──────────────────────────
   Runs when the flashcard page loads.
   Reads the URL to find which subject was chosen,
   then loads that subject's deck.
─────────────────────────────────────────────── */
function initFlashcards() {
  // Read the "?subject=calculus" part of the URL
  const params  = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  const deck    = DECKS[subject];

  // If the subject doesn't exist, stop here
  if (!deck) {
    document.getElementById('fc-title').textContent = 'Deck not found';
    return;
  }

  // Apply the subject's accent color to the page
  document.documentElement.style.setProperty('--subject-accent', deck.accent);

  // Set the page title to the subject name
  document.getElementById('fc-title').textContent = deck.title;

  // Make the back link return to the correct subject page
  document.getElementById('fc-back-link').href = subject + '.html';

  // Load the cards into the current deck
  currentDeck  = [...deck.cards];
  currentIndex = 0;
  isFlipped    = false;

  // Show the first card
  renderCard();
  updateProgress();
}


/* ── RENDER CARD ──────────────────────────────
   Displays the current card on screen.
   Shows the front (term) and pre-loads the back
   (definition) so it's ready when the user flips.
─────────────────────────────────────────────── */
function renderCard() {
  const card = currentDeck[currentIndex];
  if (!card) return;

  // Fill in the front and back text
  const front = document.getElementById('fc-front-text');
  const back  = document.getElementById('fc-back-text');
  front.textContent = card.front;

  // Convert line breaks (\n) in the back text into actual HTML line breaks
  back.innerHTML = card.back.split('\n').map(line =>
    `<span>${line}</span>`
  ).join('<br>');

  // Reset the card to show the front (un-flip it)
  const cardEl = document.getElementById('fc-card');
  cardEl.classList.remove('flipped');
  isFlipped = false;

  // Update the progress bar and counter
  updateProgress();
  updateNavButtons();
}


/* ── FLIP CARD ────────────────────────────────
   Toggles the card between front and back
   using a CSS class that triggers the 3D flip animation
─────────────────────────────────────────────── */
function flipCard() {
  const cardEl = document.getElementById('fc-card');
  cardEl.classList.toggle('flipped'); // CSS handles the animation
  isFlipped = !isFlipped;
}


/* ── NAVIGATION ───────────────────────────────
   Moves forward or backward through the deck
─────────────────────────────────────────────── */
function nextCard() {
  // Only go forward if there are more cards ahead
  if (currentIndex < currentDeck.length - 1) {
    currentIndex++;
    renderCard();
  }
}

function prevCard() {
  // Only go back if we're not already on the first card
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}


/* ── MARK KNOWN / UNKNOWN ─────────────────────
   Lets the user track which cards they know.
   Updates the score display and moves to the next card.
─────────────────────────────────────────────── */
function markKnown() {
  // Add to "known" set and remove from "unknown" if it was there
  knownCards.add(currentIndex);
  unknownCards.delete(currentIndex);
  updateScore();
  // Automatically advance to the next card
  if (currentIndex < currentDeck.length - 1) nextCard();
}

function markUnknown() {
  // Add to "unknown" set and remove from "known" if it was there
  unknownCards.add(currentIndex);
  knownCards.delete(currentIndex);
  updateScore();
  // Automatically advance to the next card
  if (currentIndex < currentDeck.length - 1) nextCard();
}


/* ── SHUFFLE DECK ─────────────────────────────
   Randomly reorders the cards using the
   Fisher-Yates shuffle algorithm, then resets
   the session from the beginning
─────────────────────────────────────────────── */
function shuffleDeck() {
  // Loop backwards through the array, swapping each card with a random earlier card
  for (let i = currentDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
  }
  // Reset to the start and clear the score
  currentIndex = 0;
  knownCards.clear();
  unknownCards.clear();
  updateScore();
  renderCard();
}


/* ── RESTART DECK ─────────────────────────────
   Resets the deck back to the original order
   and clears the score so the user can start fresh
─────────────────────────────────────────────── */
function restartDeck() {
  const params  = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  // Reload the original unshuffled cards from the DECKS data
  currentDeck  = [...DECKS[subject].cards];
  currentIndex = 0;
  knownCards.clear();
  unknownCards.clear();
  updateScore();
  renderCard();
}


/* ── UPDATE PROGRESS ──────────────────────────
   Updates the card counter (e.g. "3 / 18")
   and fills the progress bar at the top
─────────────────────────────────────────────── */
function updateProgress() {
  const counter = document.getElementById('fc-counter');
  const bar     = document.getElementById('fc-bar');

  // Show current card number out of total
  if (counter) counter.textContent = `${currentIndex + 1} / ${currentDeck.length}`;

  // Fill the bar as a percentage of how far through the deck we are
  if (bar) bar.style.width = `${((currentIndex + 1) / currentDeck.length) * 100}%`;
}


/* ── UPDATE NAV BUTTONS ───────────────────────
   Disables the Prev button on the first card
   and the Next button on the last card
─────────────────────────────────────────────── */
function updateNavButtons() {
  const prevBtn = document.getElementById('fc-prev');
  const nextBtn = document.getElementById('fc-next');
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === currentDeck.length - 1;
}


/* ── UPDATE SCORE ─────────────────────────────
   Shows the live count of how many cards
   the user has marked as known vs still learning
─────────────────────────────────────────────── */
function updateScore() {
  const scoreEl = document.getElementById('fc-score');
  if (scoreEl) {
    scoreEl.textContent = `✓ ${knownCards.size}  ✗ ${unknownCards.size}`;
  }
}


/* ── BOOT / PAGE LOAD ─────────────────────────
   This runs as soon as the page finishes loading.
   It initializes the nav and, if we're on the
   flashcards page, starts the flashcard engine.
─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Always highlight the correct nav link
  initNav();

  // Only run flashcard setup if the flashcard element exists on this page
  if (document.getElementById('fc-card')) {
    initFlashcards();
  }
});
