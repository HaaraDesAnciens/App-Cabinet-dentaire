// Realistic demo data so the app is usable out of the box. Dates are
// expressed as offsets from "now" so the dashboard always looks alive.

function offsetDate(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

function offsetISODate(days) {
  return offsetDate(days).toISOString().slice(0, 10)
}

function offsetISODateTime(days, hour, minute) {
  const d = offsetDate(days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString().slice(0, 16)
}

export const seedClients = [
  {
    id: 'c1',
    nomCabinet: 'Cabinet Dentaire du Parc',
    ville: 'Paris',
    dentisteResponsable: 'Dr. Martin Dubois',
    email: 'contact@dentaireduparc.fr',
    telephone: '01 42 00 11 22',
    statut: 'actif',
    plan: 'premium',
    dateDebutAbonnement: offsetISODate(-90),
    agentActif: true,
    notes: 'Client historique, très satisfait du taux de réponse.',
  },
  {
    id: 'c2',
    nomCabinet: 'Clinique Dentaire Saint-Michel',
    ville: 'Lyon',
    dentisteResponsable: 'Dr. Sophie Lenoir',
    email: 'contact@dentaire-saintmichel.fr',
    telephone: '04 72 00 33 44',
    statut: 'actif',
    plan: 'pro',
    dateDebutAbonnement: offsetISODate(-60),
    agentActif: true,
    notes: '',
  },
  {
    id: 'c3',
    nomCabinet: 'Cabinet Dr. Lefèvre',
    ville: 'Marseille',
    dentisteResponsable: 'Dr. Antoine Lefèvre',
    email: 'cabinet.lefevre@gmail.com',
    telephone: '04 91 00 55 66',
    statut: 'actif',
    plan: 'starter',
    dateDebutAbonnement: offsetISODate(-20),
    agentActif: true,
    notes: 'Onboardé récemment, encore en phase de réglages.',
  },
  {
    id: 'c4',
    nomCabinet: 'Dentaire Confluence',
    ville: 'Toulouse',
    dentisteResponsable: 'Dr. Camille Rousseau',
    email: 'contact@dentaire-confluence.fr',
    telephone: '05 61 00 77 88',
    statut: 'en_pause',
    plan: 'pro',
    dateDebutAbonnement: offsetISODate(-150),
    agentActif: false,
    notes: 'A mis l\'abonnement en pause pendant des travaux au cabinet.',
  },
  {
    id: 'c5',
    nomCabinet: 'Cabinet Sourire & Co',
    ville: 'Nantes',
    dentisteResponsable: 'Dr. Julie Fabre',
    email: 'contact@sourireandco.fr',
    telephone: '02 40 00 99 10',
    statut: 'actif',
    plan: 'pro',
    dateDebutAbonnement: offsetISODate(-45),
    agentActif: true,
    notes: '',
  },
  {
    id: 'c6',
    nomCabinet: 'Clinique Dentaire Atlantique',
    ville: 'Bordeaux',
    dentisteResponsable: 'Dr. Nicolas Petit',
    email: 'contact@dentaire-atlantique.fr',
    telephone: '05 56 00 12 34',
    statut: 'résilié',
    plan: 'starter',
    dateDebutAbonnement: offsetISODate(-200),
    agentActif: false,
    notes: 'Résilié : est revenu à un accueil téléphonique classique.',
  },
]

export const seedRendezVous = [
  { id: 'r1', clientId: 'c1', patientNom: 'Lucie Garnier', patientTelephone: '06 12 34 56 78', dateHeure: offsetISODateTime(-6, 9, 30), typeSoin: 'Détartrage', statut: 'terminé', source: 'appel', notes: '' },
  { id: 'r2', clientId: 'c1', patientNom: 'Marc Olivier', patientTelephone: '06 23 45 67 89', dateHeure: offsetISODateTime(-3, 14, 0), typeSoin: 'Urgence', statut: 'terminé', source: 'appel', notes: 'Rage de dents, pris en urgence le jour même.' },
  { id: 'r3', clientId: 'c1', patientNom: 'Inès Carpentier', patientTelephone: '06 34 56 78 90', dateHeure: offsetISODateTime(1, 10, 0), typeSoin: 'Consultation', statut: 'confirmé', source: 'chat', notes: '' },
  { id: 'r4', clientId: 'c1', patientNom: 'Hugo Barbier', patientTelephone: '06 45 67 89 01', dateHeure: offsetISODateTime(4, 16, 30), typeSoin: 'Devis', statut: 'confirmé', source: 'site_web', notes: 'Souhaite un devis pour un implant.' },
  { id: 'r5', clientId: 'c2', patientNom: 'Camille Robin', patientTelephone: '06 56 78 90 12', dateHeure: offsetISODateTime(-5, 11, 0), typeSoin: 'Consultation', statut: 'no_show', source: 'appel', notes: 'Ne s\'est pas présentée, pas prévenu.' },
  { id: 'r6', clientId: 'c2', patientNom: 'Thomas Girard', patientTelephone: '06 67 89 01 23', dateHeure: offsetISODateTime(-2, 9, 0), typeSoin: 'Détartrage', statut: 'terminé', source: 'appel', notes: '' },
  { id: 'r7', clientId: 'c2', patientNom: 'Léa Fontaine', patientTelephone: '06 78 90 12 34', dateHeure: offsetISODateTime(2, 15, 0), typeSoin: 'Urgence', statut: 'confirmé', source: 'téléphone', notes: '' },
  { id: 'r8', clientId: 'c2', patientNom: 'Nicolas Perrin', patientTelephone: '06 89 01 23 45', dateHeure: offsetISODateTime(6, 10, 30), typeSoin: 'Consultation', statut: 'confirmé', source: 'chat', notes: '' },
  { id: 'r9', clientId: 'c3', patientNom: 'Sarah Benali', patientTelephone: '06 90 12 34 56', dateHeure: offsetISODateTime(-1, 14, 30), typeSoin: 'Urgence', statut: 'terminé', source: 'appel', notes: '' },
  { id: 'r10', clientId: 'c3', patientNom: 'Paul Mercier', patientTelephone: '06 01 23 45 67', dateHeure: offsetISODateTime(3, 9, 0), typeSoin: 'Consultation', statut: 'confirmé', source: 'appel', notes: '' },
  { id: 'r11', clientId: 'c5', patientNom: 'Amandine Roy', patientTelephone: '06 11 22 33 44', dateHeure: offsetISODateTime(-4, 16, 0), typeSoin: 'Détartrage', statut: 'annulé', source: 'chat', notes: 'Patiente a annulé par SMS la veille.' },
  { id: 'r12', clientId: 'c5', patientNom: 'Julien Faure', patientTelephone: '06 22 33 44 55', dateHeure: offsetISODateTime(0, 17, 0), typeSoin: 'Urgence', statut: 'confirmé', source: 'appel', notes: '' },
  { id: 'r13', clientId: 'c5', patientNom: 'Chloé Lemaire', patientTelephone: '06 33 44 55 66', dateHeure: offsetISODateTime(5, 11, 30), typeSoin: 'Devis', statut: 'confirmé', source: 'site_web', notes: '' },
  { id: 'r14', clientId: 'c4', patientNom: 'Benjamin Caron', patientTelephone: '06 44 55 66 77', dateHeure: offsetISODateTime(-10, 10, 0), typeSoin: 'Consultation', statut: 'terminé', source: 'appel', notes: '' },
]

export const seedAppels = [
  { id: 'a1', clientId: 'c1', date: offsetISODateTime(-6, 9, 15), duree: 95, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Demande de détartrage, créneau trouvé le matin même.', transcript: "Patient : Bonjour, je voudrais un rendez-vous pour un détartrage.\nAgent : Bien sûr, je vous propose un créneau demain à 9h30, cela vous convient ?\nPatient : Parfait, merci.", sentiment: 'positif' },
  { id: 'a2', clientId: 'c1', date: offsetISODateTime(-3, 13, 40), duree: 140, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Rage de dents, prise en charge en urgence le jour même.', transcript: "Patient : J'ai une rage de dents depuis ce matin, c'est urgent.\nAgent : Je comprends, je vous trouve un créneau en urgence à 14h aujourd'hui.\nPatient : Merci beaucoup !", sentiment: 'positif' },
  { id: 'a3', clientId: 'c1', date: offsetISODateTime(-2, 10, 5), duree: 60, canal: 'chat', resultat: 'information_donnée', resume: 'Question sur les tarifs d\'un détartrage, pas de RDV pris sur le moment.', transcript: "Patient : Combien coûte un détartrage chez vous ?\nAgent : Le détartrage est pris en charge par la Sécurité Sociale, le reste à charge dépend de votre mutuelle. Souhaitez-vous un rendez-vous ?\nPatient : Je vais réfléchir, merci.", sentiment: 'neutre' },
  { id: 'a4', clientId: 'c1', date: offsetISODateTime(0, 8, 50), duree: 180, canal: 'téléphone', resultat: 'transfert_humain', resume: 'Cas complexe (antécédent médical), transféré à l\'assistante du cabinet.', transcript: "Patient : J'ai un traitement anticoagulant, est-ce que ça pose problème pour un soin ?\nAgent : C'est une question médicale, je vous transfère à l'assistante du cabinet pour en discuter directement.", sentiment: 'neutre' },
  { id: 'a5', clientId: 'c2', date: offsetISODateTime(-5, 10, 50), duree: 70, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Prise de RDV consultation, patiente ne s\'est finalement pas présentée.', transcript: "Patient : Je voudrais une consultation la semaine prochaine.\nAgent : Je vous propose mardi à 11h.\nPatient : Ça marche.", sentiment: 'positif' },
  { id: 'a6', clientId: 'c2', date: offsetISODateTime(-2, 8, 45), duree: 55, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Détartrage annuel, RDV pris rapidement.', transcript: "Patient : Bonjour, je viens chaque année pour un détartrage, je voudrais reprendre RDV.\nAgent : Je vous propose le même créneau que d'habitude, 9h ?\nPatient : Parfait.", sentiment: 'positif' },
  { id: 'a7', clientId: 'c2', date: offsetISODateTime(-1, 19, 20), duree: 110, canal: 'whatsapp', resultat: 'rdv_pris', resume: 'Urgence en soirée, RDV pris pour le surlendemain faute de créneau le lendemain.', transcript: "Patient : J'ai très mal à une dent depuis hier soir.\nAgent : Je suis désolé de l'apprendre, je n'ai plus de créneau demain mais je peux vous proposer après-demain à 15h, ou je peux vous indiquer les urgences dentaires de garde si besoin.\nPatient : Après-demain c'est bon, merci.", sentiment: 'neutre' },
  { id: 'a8', clientId: 'c2', date: offsetISODateTime(0, 9, 10), duree: 65, canal: 'chat', resultat: 'rdv_pris', resume: 'Nouveau patient, consultation de prise de contact.', transcript: "Patient : Je déménage dans le quartier, je cherche un nouveau dentiste.\nAgent : Bienvenue ! Je vous propose une première consultation la semaine prochaine.\nPatient : Très bien.", sentiment: 'positif' },
  { id: 'a9', clientId: 'c3', date: offsetISODateTime(-1, 14, 10), duree: 100, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Urgence dentaire traitée le jour même.', transcript: "Patient : J'ai cassé une dent en mangeant, c'est douloureux.\nAgent : Je vous propose un créneau en urgence cet après-midi à 14h30.\nPatient : Merci infiniment.", sentiment: 'positif' },
  { id: 'a10', clientId: 'c3', date: offsetISODateTime(0, 11, 30), duree: 50, canal: 'téléphone', resultat: 'information_donnée', resume: 'Demande d\'horaires d\'ouverture du cabinet.', transcript: "Patient : Quels sont vos horaires d'ouverture ?\nAgent : Nous sommes ouverts du lundi au vendredi de 9h à 19h, et le samedi matin.\nPatient : Merci.", sentiment: 'neutre' },
  { id: 'a11', clientId: 'c3', date: offsetISODateTime(1, 16, 0), duree: 40, canal: 'chat', resultat: 'sans_suite', resume: 'Demande de devis implant, patient n\'a pas laissé ses coordonnées.', transcript: "Patient : Combien coûte un implant dentaire ?\nAgent : Le tarif dépend de votre situation, souhaitez-vous qu'on vous rappelle pour un devis personnalisé ?\nPatient : [conversation interrompue]", sentiment: 'neutre' },
  { id: 'a12', clientId: 'c5', date: offsetISODateTime(-4, 15, 45), duree: 80, canal: 'chat', resultat: 'rdv_pris', resume: 'Détartrage, annulé ensuite par la patiente.', transcript: "Patient : Je voudrais un détartrage rapidement.\nAgent : Je vous propose jeudi à 16h.\nPatient : D'accord.", sentiment: 'positif' },
  { id: 'a13', clientId: 'c5', date: offsetISODateTime(0, 16, 30), duree: 120, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Urgence le jour même, forte douleur.', transcript: "Patient : J'ai vraiment très mal, vous pouvez me prendre aujourd'hui ?\nAgent : Je vous trouve un créneau à 17h aujourd'hui.\nPatient : Merci beaucoup.", sentiment: 'positif' },
  { id: 'a14', clientId: 'c5', date: offsetISODateTime(5, 11, 0), duree: 90, canal: 'site_web', resultat: 'rdv_pris', resume: 'Demande de devis pour un appareil dentaire.', transcript: "Patient : Je voudrais un devis pour un appareil dentaire pour mon fils.\nAgent : Je vous propose une consultation pour évaluer la situation avant le devis.\nPatient : Très bien, va pour ce créneau.", sentiment: 'positif' },
  { id: 'a15', clientId: 'c4', date: offsetISODateTime(-11, 9, 40), duree: 60, canal: 'téléphone', resultat: 'rdv_pris', resume: 'Dernier appel avant la mise en pause de l\'abonnement.', transcript: "Patient : Je voudrais une consultation de contrôle.\nAgent : Je vous propose un créneau la semaine prochaine.\nPatient : Parfait.", sentiment: 'neutre' },
]

export const seedLeads = [
  { id: 'l1', clientId: 'c1', nom: 'Élise Caron', telephone: '06 55 11 22 33', email: 'elise.caron@email.fr', source: 'site_web', statut: 'rdv_pris', dateCapture: offsetISODate(-4), notes: '' },
  { id: 'l2', clientId: 'c1', nom: 'Romain Blanchard', telephone: '06 55 22 33 44', email: 'romain.b@email.fr', source: 'publicité', statut: 'nouveau', dateCapture: offsetISODate(-1), notes: 'Vu la publicité Instagram du cabinet.' },
  { id: 'l3', clientId: 'c2', nom: 'Manon Dufresne', telephone: '06 55 33 44 55', email: 'manon.d@email.fr', source: 'chat', statut: 'contacté', dateCapture: offsetISODate(-3), notes: 'Relance prévue cette semaine.' },
  { id: 'l4', clientId: 'c2', nom: 'Alexandre Noël', telephone: '06 55 44 55 66', email: 'alex.noel@email.fr', source: 'appel', statut: 'nouveau', dateCapture: offsetISODate(0), notes: '' },
  { id: 'l5', clientId: 'c3', nom: 'Fatima Zahra', telephone: '06 55 55 66 77', email: 'fatima.z@email.fr', source: 'site_web', statut: 'perdu', dateCapture: offsetISODate(-10), notes: 'A finalement choisi un autre cabinet.' },
  { id: 'l6', clientId: 'c3', nom: 'Victor Lemoine', telephone: '06 55 66 77 88', email: 'victor.l@email.fr', source: 'publicité', statut: 'contacté', dateCapture: offsetISODate(-2), notes: '' },
  { id: 'l7', clientId: 'c5', nom: 'Juliette Masson', telephone: '06 55 77 88 99', email: 'juliette.m@email.fr', source: 'chat', statut: 'rdv_pris', dateCapture: offsetISODate(-5), notes: '' },
  { id: 'l8', clientId: 'c5', nom: 'Samuel Pires', telephone: '06 55 88 99 00', email: 'samuel.p@email.fr', source: 'appel', statut: 'nouveau', dateCapture: offsetISODate(-1), notes: '' },
  { id: 'l9', clientId: 'c2', nom: 'Oriane Guillot', telephone: '06 55 99 00 11', email: 'oriane.g@email.fr', source: 'site_web', statut: 'contacté', dateCapture: offsetISODate(-7), notes: '' },
]

export const seedSettings = {
  nomAgence: 'DentPilot',
  emailContact: 'contact@dentpilot.ai',
  planParDefaut: 'pro',
  dureeEssaiJours: 14,
  devise: '€',
}
