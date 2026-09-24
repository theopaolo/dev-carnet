---
title: "Repères AI Act et RGPD"
order: 1
---

# Repères AI Act et RGPD

Guide pratique pour les développeurs qui construisent un produit avec de l'IA ou des données personnelles : ce que disent les textes, les dates, les chiffres et ce que cela change dans le code.

>Ce guide sert à poser les bonnes questions. Il ne remplace pas l'avis d'un juriste ou du DPO sur un projet réel. Les numéros d'articles renvoient au règlement IA (RIA) sauf mention « RGPD ».

## L'essentiel en dix points

1. Le RIA encadre un système d'IA selon son usage et ses risques. Le RGPD encadre tout traitement de données personnelles. Les deux s'appliquent souvent au même projet.
2. Le droit classe un usage, pas un modèle. Le même LLM peut corriger l'orthographe (risque minimal) ou trier des CV (haut risque).
3. Si votre entreprise vend un produit construit sur l'API d'un modèle, elle est fournisseur de ce système. Les obligations du fournisseur du modèle ne couvrent pas les vôtres.
4. Les pratiques interdites s'appliquent depuis le 2 février 2025. Celle que l'on croise le plus dans un produit : la reconnaissance des émotions au travail ou à l'école.
5. Depuis le 2 août 2026, une personne doit savoir qu'elle échange avec une IA. Les contenus générés doivent porter un marquage lisible par machine.
6. Les règles haut risque s'appliquent le 2 décembre 2027 pour l'annexe III et le 2 août 2028 pour l'annexe I. L'Omnibus de juillet 2026 a fixé ces dates. Les supports plus anciens affichent encore 2026 et 2027.
7. Un système de l'annexe III peut sortir du haut risque s'il ne pèse pas sur la décision. Il y reste s'il profile des personnes, et le fournisseur doit documenter son analyse.
8. Le RGPD s'applique dès la première donnée personnelle : dans le prompt, le contexte d'un RAG, les journaux ou la réponse. Retirer le nom ne suffit pas à anonymiser.
9. Une bonne partie de la conformité se code : mention IA dans l'interface, prompt minimal, purge planifiée, export et suppression de compte, journaux.
10. Vérifiez la date de chaque source. Le RIA a déjà été modifié une fois, et la Commission peut modifier l'annexe III par acte délégué.

## Deux textes, deux questions

Le RIA pose la question du produit : ce système d'IA présente-t-il un risque pour la santé, la sécurité ou les droits fondamentaux ? Le RGPD pose la question des données : traite-t-on des informations sur une personne identifiable, et avec quelles garanties ? Répondez aux deux séparément. La CNIL illustre les quatre combinaisons possibles.

<div aria-label="Quand s'appliquent le RIA et le RGPD" class="quadrant diagram" role="table">
<div class="axis" role="columnheader"></div>
<div class="axis" role="columnheader">Avec données personnelles</div>
<div class="axis" role="columnheader">Sans données personnelles</div>
<div class="axis row-axis" role="rowheader">Système encadré par le RIA</div>
<div class="cell both" role="cell"><b>RIA et RGPD</b>Tri automatique de CV</div>
<div class="cell" role="cell"><b>RIA seul</b>Pilotage d'une centrale électrique</div>
<div class="axis row-axis" role="rowheader">Pas d'obligation propre du RIA</div>
<div class="cell" role="cell"><b>RGPD seul</b>Profilage publicitaire</div>
<div class="cell" role="cell"><b>Aucun des deux</b>IA d'un jeu vidéo</div>
</div>

<div class="scroll">
<table>
<thead><tr><th></th><th>RIA, règlement 2024/1689</th><th>RGPD, règlement 2016/679</th></tr></thead>
<tbody>
<tr><th>Objet</th><td>Un système ou un modèle d'IA</td><td>Un traitement de données personnelles</td></tr>
<tr><th>Logique</th><td>Le texte fixe des niveaux de risque, puis des exigences par niveau</td><td>Des principes généraux que le responsable applique et justifie</td></tr>
<tr><th>Acteurs</th><td>Fournisseur, déployeur, importateur, distributeur</td><td>Responsable du traitement, sous-traitant</td></tr>
<tr><th>Preuves</th><td>Documentation technique, évaluation de conformité, marquage CE pour le haut risque</td><td>Registre, AIPD, contrats de sous-traitance</td></tr>
<tr><th>Amende maximale</th><td>35 M€ ou 7 % du chiffre d'affaires mondial</td><td>20 M€ ou 4 % du chiffre d'affaires mondial</td></tr>
<tr><th>Autorité en France</th><td>Plusieurs, en cours de désignation par la loi. La DGCCRF coordonne</td><td>CNIL</td></tr>
</tbody>
</table>
</div>

<div class="retenir">
<p>À retenir</p>
<ul>
<li>Respecter le RIA ne dispense pas du RGPD, et inversement.</li>
<li>D'autres règles s'ajoutent : droit du travail, droit d'auteur, contrats, secret des affaires, non-discrimination, règles sectorielles.</li>
</ul>
</div>

## Votre rôle

Chaque texte a son vocabulaire. Le cas typique d'un développeur : l'entreprise appelle l'API d'un modèle et vend un chatbot, un RAG ou un agent à des clients. La même chaîne reçoit alors deux séries de noms.

<p class="legal-hint">Faire défiler vers la droite →</p>
<div class="legal-scroll diagram" role="region" aria-label="Rôles dans le RIA et le RGPD" tabindex="0">
  <div class="legal-roles">
    <span aria-hidden="true"></span>
    <div class="legal-actor"><strong>Fournisseur du modèle</strong><span>OpenAI, Mistral, Qwen hébergé</span></div>
    <div class="legal-actor legal-actor-active"><strong>Votre entreprise</strong><span>construit et vend le produit</span></div>
    <div class="legal-actor"><strong>Le client</strong><span>utilise le produit</span></div>
    <div class="legal-actor"><strong>Les personnes</strong><span>salariés, élèves, clients</span></div>
    <strong class="legal-row-label">RIA</strong>
    <div>Fournisseur de modèle à usage général<br><small>chapitre V</small></div>
    <div>Fournisseur du système<br><small>articles 16 et 50</small></div>
    <div>Déployeur<br><small>articles 26 et 50</small></div>
    <div>Personnes affectées</div>
    <strong class="legal-row-label">RGPD</strong>
    <div>Sous-traitant ultérieur<br><small>à déclarer au client</small></div>
    <div>Sous-traitant<br><small>contrat de l'article 28</small></div>
    <div>Responsable du traitement<br><small>choisit la finalité</small></div>
    <div>Personnes concernées<br><small>ont des droits</small></div>
  </div>
</div>

Si votre entreprise utilise l'outil pour elle-même, elle est déployeur et responsable du traitement. Elle devient fournisseur si elle met son nom sur un système, le modifie de façon substantielle ou le détourne vers un usage à haut risque (article 25).

<dl class="glossaire">
<dt>Système d'IA</dt>
<dd>Système automatisé qui, à partir des entrées qu'il reçoit, déduit comment produire des prédictions, du contenu, des recommandations ou des décisions (article 3.1). Un script à règles fixes n'en est pas un.</dd>
<dt>Modèle d'IA à usage général</dt>
<dd>Un modèle capable de nombreuses tâches, comme un LLM. Son fournisseur publie une documentation technique, une politique de respect du droit d'auteur et un résumé des données d'entraînement. Au-delà de 10<sup>25</sup> opérations de calcul pour l'entraînement, le modèle est présumé à risque systémique (article 51).</dd>
<dt>Fournisseur</dt>
<dd>Développe un système d'IA, ou le fait développer, et le met sur le marché sous son nom, gratuitement ou non.</dd>
<dt>Déployeur</dt>
<dd>Utilise un système d'IA sous son autorité, dans un cadre professionnel.</dd>
<dt>Responsable du traitement</dt>
<dd>Décide pourquoi et comment les données sont traitées. Il porte la responsabilité RGPD, même avec un prestataire.</dd>
<dt>Sous-traitant</dt>
<dd>Traite les données pour le compte du responsable et sur ses instructions, avec un contrat conforme à l'article 28 du RGPD.</dd>
<dt>Donnée personnelle</dt>
<dd>Toute information sur une personne identifiable, directement ou en croisant des éléments : un identifiant, une adresse IP, un parcours professionnel daté.</dd>
<dt>Pseudonymisation</dt>
<dd>Remplacer l'identité par un code. La donnée reste personnelle et le RGPD s'applique. Seule une anonymisation qui empêche toute réidentification fait sortir du RGPD.</dd>
</dl>

## Les niveaux de risque

Le RIA ne régule pas l'IA en bloc. Il classe les usages en niveaux et attache des obligations à chacun. Les modèles à usage général forment une catégorie à part, sous la pyramide, parce qu'ils alimentent des systèmes de tous niveaux.

<figure class="legal-pyramid diagram">
  <a href="/ressources/rgpd/pyramide-risques-cnil.webp" target="_blank" rel="noopener" aria-label="Ouvrir la pyramide des risques en grand">
    <img src="/ressources/rgpd/pyramide-risques-cnil.webp" alt="Pyramide des risques du règlement IA : risque inacceptable, haut risque, transparence, risque minimal et modèles à usage général." width="2000" height="1495" loading="lazy">
  </a>
  <figcaption>Schéma de la <a href="https://www.cnil.fr/fr/entree-en-vigueur-du-reglement-europeen-sur-lia-les-premieres-questions-reponses-de-la-cnil">CNIL</a>, mis à jour le 17 août 2026. Ouvrir l’image pour l’agrandir.</figcaption>
</figure>

<div class="niveau"><div class="bar ban"></div><div>
<h3>Interdit <span class="art">article 5, depuis le 2 février 2025</span></h3>
<ul>
<li>Manipulation ou exploitation des vulnérabilités (âge, handicap, situation sociale) qui cause un préjudice important.</li>
<li>Notation sociale.</li>
<li>Reconnaissance des émotions au travail et dans l'enseignement, sauf motif médical ou de sécurité.</li>
<li>Collecte non ciblée de visages sur internet ou en vidéosurveillance pour constituer une base de reconnaissance faciale.</li>
<li>Catégorisation biométrique selon l'origine, les opinions, la religion ou l'orientation sexuelle.</li>
<li>Police prédictive fondée uniquement sur le profilage, et identification biométrique en temps réel dans l'espace public par la police, sauf exceptions strictes.</li>
<li>À partir du 2 décembre 2026 : génération d'images intimes non consenties et de contenus pédocriminels.</li>
</ul>
</div></div>

<div class="niveau"><div class="bar high"></div><div>
<h3>Haut risque <span class="art">article 6, annexes I et III</span></h3>
<p>Deux familles. L'annexe I couvre l'IA composant de sécurité d'un produit déjà réglementé (dispositif médical, jouet, machine, ascenseur). L'annexe III couvre huit domaines d'usage :</p>
<ol>
<li>Biométrie</li>
<li>Infrastructures critiques</li>
<li>Éducation et formation professionnelle</li>
<li>Emploi et gestion des travailleurs</li>
<li>Accès aux services essentiels : aides sociales, crédit, assurance santé et vie, appels d'urgence</li>
<li>Répression</li>
<li>Migration, asile et contrôle aux frontières</li>
<li>Justice et processus démocratiques</li>
</ol>
<p>Le fournisseur doit gérer les risques, maîtriser la qualité des données, rédiger une documentation technique, journaliser automatiquement, prévoir un contrôle humain réel, tester l'exactitude et la robustesse, passer une évaluation de conformité et enregistrer le système dans la base de l'UE. Le déployeur suit la notice, affecte des humains compétents au contrôle, surveille le fonctionnement et informe les personnes. Certains déployeurs, comme les organismes publics, font aussi une analyse d'impact sur les droits fondamentaux (article 27).</p>
</div></div>

<div class="niveau"><div class="bar transp"></div><div>
<h3>Transparence <span class="art">article 50, depuis le 2 août 2026</span></h3>
<ul>
<li>Un chatbot ou un agent informe la personne qu'elle échange avec une IA, sauf si c'est évident pour une personne normalement attentive.</li>
<li>Le fournisseur marque les sorties générées (texte, image, audio, vidéo) dans un format lisible par machine. Une aide à la mise en forme standard en est exemptée. Les systèmes déjà sur le marché avant le 2 août 2026 ont jusqu'au 2 décembre 2026.</li>
<li>Le déployeur signale un hypertrucage et un texte généré publié pour informer le public, sauf relecture éditoriale sous la responsabilité d'une personne.</li>
<li>Le déployeur d'un système de reconnaissance des émotions ou de catégorisation biométrique informe les personnes exposées.</li>
</ul>
</div></div>

<div class="niveau"><div class="bar min"></div><div>
<h3>Risque minimal</h3>
<p>Filtre anti-spam, recommandation de contenus, IA d'un jeu vidéo : la majorité des systèmes. Le RIA ne leur impose pas d'obligation propre, à part la maîtrise de l'IA de l'article 4 (former le personnel qui les utilise). Le RGPD et les autres règles continuent de s'appliquer.</p>
</div></div>

<div class="niveau"><div class="bar gpai"></div><div>
<h3>Modèles à usage général <span class="art">chapitre V, depuis le 2 août 2025</span></h3>
<p>Ces obligations pèsent sur OpenAI, Mistral, Alibaba et les autres fournisseurs de modèles. Elles ne vous concernent directement que si vous entraînez ou affinez un modèle et le mettez à disposition. Le code de bonnes pratiques de la Commission précise comment s'y conformer.</p>
</div></div>

## Classer un usage

Partez de l'usage prévu, pas du nom du modèle. Posez les questions dans l'ordre. Un système peut cumuler haut risque et transparence. La question des données personnelles se pose en parallèle, quelle que soit la réponse.

<div class="legal-flow diagram">
  <ol class="legal-flow-steps">
    <li><div class="legal-question"><strong>1. L'usage figure-t-il à l'article 5 ?</strong><span>Émotions au travail ou à l'école, notation sociale, manipulation…</span></div><div class="legal-outcome legal-ban"><span>oui →</span><strong>Interdit</strong></div></li>
    <li><div class="legal-question"><strong>2. Annexe III, ou sécurité d'un produit de l'annexe I ?</strong><span>Exception de l'article 6.3 si le système ne pèse pas sur la décision. Jamais avec du profilage. Analyse à documenter.</span></div><div class="legal-outcome legal-high"><span>oui →</span><strong>Haut risque</strong><small>Peut cumuler la transparence</small></div></li>
    <li><div class="legal-question"><strong>3. Échange-t-il avec des personnes ou génère-t-il du contenu ?</strong></div><div class="legal-outcome legal-transparency"><span>oui →</span><strong>Transparence, art. 50</strong></div></li>
    <li class="legal-flow-final"><div class="legal-outcome legal-minimal"><span>non →</span><strong>Risque minimal : pas d'obligation propre du RIA</strong></div></li>
  </ol>
  <aside class="legal-gdpr">RGPD si données personnelles</aside>
</div>
<p class="legal-caption">Ce schéma aide à se repérer. Les exceptions de chaque article restent à lire dans le texte.</p>

### Exemple : un assistant de révision pour lycéens

Un RAG répond aux questions des élèves à partir des cours certifiés par l'enseignant, avec citations. L'annexe III, point 3, vise en éducation quatre usages : décider de l'admission (a), évaluer les acquis d'apprentissage, y compris pour orienter le parcours (b), évaluer le niveau d'enseignement accessible (c), surveiller les examens (d). L'assistant n'en fait aucun. Il relève de la transparence : mention IA et marquage des réponses.

La ligne se franchit avec des fonctions qui semblent anodines dans un backlog : un quiz qui juge si l'élève a compris, un parcours adapté à ses erreurs, un score de maîtrise par élève pour l'enseignant. Chacune évalue les acquis ou oriente l'apprentissage, donc tombe dans le point 3 b. Une détection de la frustration ou de l'ennui tomberait, elle, dans l'interdit. Côté RGPD, l'élève est mineur : AIPD quasi certaine, et c'est l'établissement qui est responsable du traitement.

## Les dates

Le RIA est entré en vigueur le 1<sup>er</sup> août 2024 et s'applique par étapes. L'Omnibus numérique sur l'IA (règlement 2026/1744, en vigueur le 27 juillet 2026) a repoussé les règles haut risque de seize mois pour l'annexe III et d'un an pour l'annexe I.

<div class="scroll">
<svg aria-label="Frise des échéances du RIA de 2024 à 2028" role="img" style="min-width: 760px" viewbox="0 0 900 250" width="100%">
<line class="axisline" x1="60" x2="860" y1="125" y2="125"></line>
<line class="today" x1="488" x2="488" y1="40" y2="210"></line>
<text class="ts" style="fill: var(--legal-ban)" x="494" y="208">Sept. 2026</text>
<g class="f-accent">
<circle cx="60" cy="125" r="6"></circle><circle cx="160" cy="125" r="6"></circle><circle cx="260" cy="125" r="6"></circle>
<circle cx="460" cy="125" r="6"></circle><circle cx="527" cy="125" r="6"></circle><circle cx="660" cy="125" r="6"></circle>
<circle cx="727" cy="125" r="6"></circle><circle cx="860" cy="125" r="6"></circle>
</g>
<g>
<text class="th" x="60" y="62">1er août 2024</text>
<text class="t" x="60" y="80">Entrée en vigueur</text>
<text class="th" text-anchor="middle" x="260" y="62">2 août 2025</text>
<text class="t" text-anchor="middle" x="260" y="80">Modèles à usage général,</text>
<text class="t" text-anchor="middle" x="260" y="96">gouvernance</text>
<text class="th" x="560" y="30">2 déc. 2026</text>
<text class="t" x="560" y="48">Marquage : fin du délai pour</text>
<text class="t" x="560" y="64">les systèmes antérieurs.</text>
<text class="t" x="560" y="80">Interdiction des contenus</text>
<text class="t" x="560" y="96">intimes et pédocriminels</text>
<text class="th" x="735" y="62">2 déc. 2027</text>
<text class="t" x="735" y="80">Haut risque, annexe III</text>
<path class="line" d="M556 34 H540 V119"></path>
<path class="line" d="M727 56 V119"></path>
</g>
<g>
<text class="th" text-anchor="middle" x="160" y="158">2 févr. 2025</text>
<text class="t" text-anchor="middle" x="160" y="176">Interdictions,</text>
<text class="t" text-anchor="middle" x="160" y="192">maîtrise de l'IA</text>
<text class="th" text-anchor="middle" x="400" y="158">2 août 2026</text>
<text class="t" text-anchor="middle" x="400" y="176">Transparence (art. 50),</text>
<text class="t" text-anchor="middle" x="400" y="192">contrôles et sanctions</text>
<path class="line" d="M440 150 H460 V131"></path>
<text class="th" text-anchor="middle" x="660" y="158">2 août 2027</text>
<text class="t" text-anchor="middle" x="660" y="176">Bacs à sable</text>
<text class="t" text-anchor="middle" x="660" y="192">nationaux</text>
<text class="th" text-anchor="end" x="860" y="158">2 août 2028</text>
<text class="t" text-anchor="end" x="860" y="176">Haut risque,</text>
<text class="t" text-anchor="end" x="860" y="192">annexe I</text>
</g>
<text class="ts" x="60" y="240">Repère RGPD : applicable depuis le 25 mai 2018.</text>
</svg>
</div>

<div class="retenir">
<p>À retenir</p>
<ul>
<li>Les interdictions, la maîtrise de l'IA, les règles des modèles et la transparence s'appliquent déjà, par étapes depuis le 2 février 2025.</li>
<li>Le report du haut risque n'autorise pas à attendre. Un produit qui vise l'annexe III doit prévoir ses journaux, son contrôle humain et sa documentation dès sa conception, et le RGPD s'applique déjà.</li>
</ul>
</div>

## Le RGPD pour un dev

Le RGPD s'applique à chaque étape où passe une donnée personnelle : données d'entraînement, prompt, contexte injecté par un RAG, journaux, sortie du modèle, sauvegardes. Le responsable du traitement doit pouvoir prouver sa conformité. En pratique, c'est souvent le développeur qui fournit les éléments de cette preuve.

### Les principes RGPD, article 5

<dl class="glossaire">
<dt>Finalité</dt><dd>Un objectif précis, fixé avant de choisir l'outil. Réutiliser les données pour un autre objectif demande une analyse de compatibilité.</dd>
<dt>Minimisation</dt><dd>N'envoyer au modèle que ce dont la tâche a besoin.</dd>
<dt>Exactitude</dt><dd>Une sortie d'IA fausse sur une personne est une donnée inexacte à corriger.</dd>
<dt>Conservation limitée</dt><dd>Une durée par type de donnée, puis suppression effective.</dd>
<dt>Sécurité</dt><dd>Chiffrement, contrôle d'accès, journalisation, gestion des incidents (article 32).</dd>
<dt>Transparence et loyauté</dt><dd>Informer les personnes de façon claire, avant le traitement.</dd>
</dl>

### Les six bases légales RGPD, article 6

Consentement, contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêt légitime. Un organisme public, comme un collège, s'appuie sur sa mission d'intérêt public. Une entreprise invoque souvent l'intérêt légitime, à condition de mettre en balance les droits des personnes.

### Les droits des personnes RGPD, articles 12 à 22

Accès, rectification, effacement, limitation, portabilité, opposition. L'article 22 donne le droit de ne pas faire l'objet d'une décision entièrement automatisée qui produit un effet juridique ou similaire, comme un refus d'embauche sans intervention humaine.

### Quand faire une AIPD RGPD, article 35

L'analyse d'impact est obligatoire si le traitement figure sur la liste publiée par la CNIL, ou s'il remplit au moins deux des neuf critères du CEPD : personnes vulnérables (mineurs, salariés), usage innovant comme l'IA, évaluation ou notation, décision automatisée, données sensibles, grande échelle, croisement de données, surveillance systématique, exclusion d'un droit ou d'un service. Un produit d'IA destiné à des élèves ou à des salariés remplit presque toujours deux critères.

### Les transferts hors de l'UE RGPD, chapitre V

Appeler l'API d'un fournisseur américain transfère les données du prompt hors de l'UE. Vérifiez sur quoi le transfert repose : certification du fournisseur au Data Privacy Framework UE-États-Unis, clauses contractuelles types, ou traitement en région UE garanti par contrat. Un paramètre « zéro conservation » dans l'API ne dit rien du lieu de traitement.

## Les chiffres

<div class="scroll">
<table>
<thead><tr><th>Chiffre</th><th>Ce qu'il désigne</th><th>Source</th></tr></thead>
<tbody>
<tr><td class="num">35 M€ ou 7 %</td><td>Amende maximale pour une pratique interdite</td><td>RIA, art. 99.3</td></tr>
<tr><td class="num">15 M€ ou 3 %</td><td>Amende maximale pour les autres obligations, dont haut risque et transparence</td><td>RIA, art. 99.4</td></tr>
<tr><td class="num">7,5 M€ ou 1 %</td><td>Amende maximale pour des informations inexactes données aux autorités</td><td>RIA, art. 99.5</td></tr>
<tr><td class="num">20 M€ ou 4 %</td><td>Amende maximale pour les principes, bases légales, droits et transferts</td><td>RGPD, art. 83.5</td></tr>
<tr><td class="num">10 M€ ou 2 %</td><td>Amende maximale pour les obligations d'organisation : registre, sécurité, sous-traitance, AIPD</td><td>RGPD, art. 83.4</td></tr>
<tr><td class="num">72 h</td><td>Délai pour notifier une violation de données à la CNIL</td><td>RGPD, art. 33</td></tr>
<tr><td class="num">1 mois</td><td>Délai pour répondre à une demande d'accès ou d'effacement, prolongeable de 2 mois</td><td>RGPD, art. 12</td></tr>
<tr><td class="num">15 ans</td><td>Âge à partir duquel un mineur consent seul à un service en ligne, en France</td><td>Loi Informatique et libertés, art. 45</td></tr>
<tr><td class="num">2 sur 9</td><td>Critères du CEPD à partir desquels une AIPD est en principe requise</td><td>Lignes directrices du CEPD</td></tr>
<tr><td class="num">10<sup>25</sup> FLOP</td><td>Calcul d'entraînement au-delà duquel un modèle est présumé à risque systémique</td><td>RIA, art. 51.2</td></tr>
<tr><td class="num">8 domaines</td><td>Domaines d'usage à haut risque de l'annexe III</td><td>RIA, annexe III</td></tr>
</tbody>
</table>
</div>

Les pourcentages portent sur le chiffre d'affaires annuel mondial. Le montant le plus élevé s'applique, sauf pour les PME et jeunes pousses, où le RIA retient le plus faible. Une amende maximale se prononce rarement, mais les deux textes permettent aussi d'ordonner l'arrêt d'un traitement ou le retrait d'un produit.

## Dans le code

Une liste à relire avant la mise en production d'un produit qui utilise un modèle. Chaque ligne peut devenir un ticket.

<div class="cols">
<div>
<h3>Côté RIA</h3>
<ul class="check">
<li>Mention visible « réponse générée par une IA » dans l'interface.</li>
<li>Marquage lisible par machine des sorties : attribut HTML ou en-tête pour du texte, manifeste C2PA ou filigrane pour une image.</li>
<li>Note datée dans le dépôt : niveau de risque retenu, articles lus, raisons. Relue à chaque nouvelle fonction.</li>
<li>Revue du backlog contre l'article 5 et l'annexe III avant d'ajouter un score, une évaluation ou une détection d'état émotionnel.</li>
<li>Pour le haut risque : journaux automatiques exploitables (art. 12), interface qui permet à un humain de comprendre, contredire et arrêter le système (art. 14), tests d'exactitude et de biais versionnés.</li>
</ul>
</div>
<div>
<h3>Côté RGPD</h3>
<ul class="check">
<li>Aucune identité dans le prompt. Pseudonymiser ce qui peut l'être.</li>
<li>Fournisseur de modèle réglé sans conservation ni entraînement, en région UE si possible, et contrat vérifié.</li>
<li>Purge planifiée selon la durée fixée, y compris caches, journaux et sauvegardes.</li>
<li>Commandes d'export et de suppression d'un compte, prêtes avant la première demande.</li>
<li>Liste à jour des sous-traitants : hébergeur, API de modèle, monitoring, envoi d'e-mails.</li>
<li>Journaux applicatifs sans contenu de prompt, ou avec une durée courte.</li>
</ul>
</div>
</div>

## Documents à vérifier

Ouvrez le texte officiel quand une décision en dépend. Les articles de blog et les outils de vulgarisation datent vite : en septembre 2026, plusieurs affichent encore les dates d'avant l'Omnibus.

<div class="scroll">
<table>
<thead><tr><th>Document</th><th>Pourquoi l'ouvrir</th></tr></thead>
<tbody>
<tr><td><a href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:02024R1689-20260727">RIA consolidé au 27 juillet 2026</a></td><td>Lire un article à jour. Version de lecture sans valeur juridique.</td></tr>
<tr><td><a href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32024R1689">Règlement (UE) 2024/1689</a></td><td>Le texte publié au Journal officiel, qui fait foi.</td></tr>
<tr><td><a href="https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=OJ%3AL_202601744">Règlement (UE) 2026/1744, Omnibus numérique sur l'IA</a></td><td>Nouvelles dates, article 4 assoupli, délai de marquage, nouvelle interdiction.</td></tr>
<tr><td><a href="https://www.cnil.fr/fr/entree-en-vigueur-du-reglement-europeen-sur-lia-les-premieres-questions-reponses-de-la-cnil">CNIL : premières questions-réponses sur le RIA</a></td><td>Le point de départ : pyramide, calendrier, articulation avec le RGPD. Mise à jour le 17 août 2026.</td></tr>
<tr><td><a href="https://www.cnil.fr/fr/ia-et-rgpd-la-cnil-publie-ses-nouvelles-recommandations-pour-accompagner-une-innovation-responsable">CNIL : recommandations IA et RGPD</a></td><td>Fiches pratiques pour développer un système d'IA : base légale, information, droits.</td></tr>
<tr><td><a href="https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative">CNIL : utiliser une IA générative</a></td><td>Choisir un outil, confidentialité, charte interne.</td></tr>
<tr><td><a href="https://www.cnil.fr/fr/liste-traitements-aipd-requise">CNIL : traitements pour lesquels une AIPD est requise</a></td><td>Savoir si l'analyse d'impact est obligatoire.</td></tr>
<tr><td><a href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679">RGPD, règlement (UE) 2016/679</a></td><td>Articles 5, 6, 12 à 22, 28, 32 à 35 pour un développeur.</td></tr>
<tr><td><a href="https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations">Commission : obligations de transparence</a></td><td>Lignes directrices et code de bonnes pratiques sur l'article 50.</td></tr>
<tr><td><a href="https://www.entreprises.gouv.fr/priorites-et-actions/transition-numerique/soutenir-le-developpement-de-lia-au-service-de-0">DGE : autorités françaises du RIA</a></td><td>Qui contrôle quoi en France. Projet de septembre 2025, à confirmer par une loi.</td></tr>
</tbody>
</table>
</div>

### Suivre les changements

- Créez un compte « Mon EUR-Lex » et une alerte sur le numéro CELEX 32024R1689. Chaque modification et chaque acte délégué y apparaîtra.
- L'article 7 permet à la Commission d'ajouter ou de modifier des usages de l'annexe III par acte délégué, sans nouveau règlement.
- L'article 6.5 prévoit des lignes directrices avec des exemples d'usages classés à haut risque ou non. Elles aident plus que le texte pour qualifier un produit.
- Les normes harmonisées préparées par le CEN et le CENELEC donneront la façon technique de prouver la conformité d'un système à haut risque.
