import { Demande } from './Demande';

import * as moment from 'moment';


export class Accounting {

  DemandeService;

  private _Constants = {
    default:{
      dateFormats:{
        picker: 'dd-mmm-yyyy',
        pickerOptions: {
          dateFormat: 'dd-mmm-yyyy',
          monthLabels: { 1: 'JAN', 2: 'FÉV', 3: 'MAR', 4: 'AVR', 5: 'MAI', 6: 'JUIN', 7: 'JUIL', 8: 'AOÛ', 9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DÉC' }
        },
        exports: 'DD/MM/YYYY'
      },
      sexe:{
            M: {code: "M", display:"M", export: 'Monsieur', sexe:"M", civilite: "Monsieur"},
            F: {code: "F", display:"F", export: 'Madame', sexe:"F", civilite: "Madame"},
      },

    }

  }

  constructor()
  {
    this.DemandeService = new Demande();
  }

  ficheClientQuery(isArchive:boolean)
  {


    return { exports_fiche_client:isArchive};
  }

  ficheClientFilter(demande)
  {

    return true;
  }

  ficheClientHeaders()
  {
    var headers =[
      "Civilité",
      "Nom",
      "Prénom",
      "Code client",
      "Date de naissance",
      "Origine",
      "Géré par",
      "Secteur",
      "Addresse",
      "Code postal",
      "Type de téléphone",
      "Téléphone fixe",
      "Type de téléphone",
      "Téléphone mobile",
      "Email",
      "Civilité de l'interlocuteur principal",
      "Nom de l'interlocuteur principal",
      "Prénom de l'interlocuteur principal",
      "Fonction de l'interlocuteur principal",
      "Année scolaire",
      "Portail Web"
      // "Courriel automatique de suivi de 1e rencontre",
      // "Modèle de courriel de suivi de 1e rencontre"
    ];
    return headers;

  }

  ficheClientRow(demande)
  {
    var crtRow = [];
        crtRow.push(this.DemandeService.displayClientGender(demande));
        crtRow.push(this.DemandeService.displayClientNom(demande));
        crtRow.push(this.DemandeService.displayClientPrenom(demande));
        crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
        crtRow.push(this.DemandeService.displayClientDOB(demande));
        crtRow.push(this.DemandeService.displayClientReference(demande));
        crtRow.push(this.DemandeService.displayAssignation(demande));
        crtRow.push(this.DemandeService.displayServiceSecteur(demande));
        crtRow.push(this.DemandeService.displayDomicileAddressExport(demande));
        crtRow.push(this.DemandeService.displayDomicileCodePostal(demande));
        crtRow.push('Domicile');
        crtRow.push(this.DemandeService.displayPersonnePhone(demande.client,0));
        crtRow.push('cell');
        crtRow.push(this.DemandeService.displayPersonnePhone(demande.client,1));
        crtRow.push(this.DemandeService.displayPersonneEmail(demande.client,0));
        crtRow.push(this.DemandeService.displayInterlocuteurGender(demande));
        crtRow.push(this.DemandeService.displayInterlocuteurNom(demande));
        crtRow.push(this.DemandeService.displayInterlocuteurPrenom(demande));
        crtRow.push(this.DemandeService.displayInterlocuteurFonction(demande));
        crtRow.push(this.DemandeService.displayAnneeScolaire(demande));
        crtRow.push(this.DemandeService.displayServiceClientPortailWeb(demande));
    return crtRow;
  }


  ficheIntervenantQuery(isArchive:boolean)
  {


    return { exports_fiche_intervenant:isArchive};
  }

  ficheIntervenantFilter(demande)
  {

    return true;
  }

  ficheIntervenantHeaders()
  {
    var headers =[
         "Nom",
         "Prénom",
         "Numero de permis",
         "Matricule",
         "Civilité",
         "Date de naissance",
         "Nature de l'intervenant",
         "Géré par:",
         "Secteur",
         "Adresse",
         "Code Postal",
         "Emploi occupé",
         "Type de téléphone",
         "Téléphone fixe",
         "Type de téléphone",
         "Téléphone mobile",
         "Email",
         "Compétence (métier)",
         "Doit remettre une feuille de temps sign",
         "Compte rendu obligatoire après chaque r",
         "Portail Web",
        // "Courriel automatique de suivi de 1e rencontre",
        //  "Modèle de courriel de suivi de 1e rencontre"
       ];
    return headers;

  }

  ficheIntervenantRow(demande)
  {
    var crtRow = [];

          crtRow.push(this.DemandeService.displayMCProfessionalNom(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalPrenom(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDMatricule(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalGender(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDDOB2(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalStatutEmployment(demande));
          crtRow.push(this.DemandeService.displayAssignation(demande));
          crtRow.push(this.DemandeService.displayServiceSecteur(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDAddressSet(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDAddressPostalWithSpace(demande));
          // crtRow.push(this.DemandeService.displayMCEmployeurDProfession(demande));
          crtRow.push(this.DemandeService.displayServiceMetier(demande));
          crtRow.push("Maison");
          crtRow.push(this.DemandeService.displayMCEmployeurDPhoneHome(demande));
          crtRow.push("Cell");
          crtRow.push(this.DemandeService.displayMCEmployeurDPhoneCell(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDEmail(demande));

          crtRow.push(this.DemandeService.displayMCEmployeurDCompetences(demande));
          crtRow.push(this.DemandeService.displayServiceFeuilleDeTempsSign(demande));
          crtRow.push(this.DemandeService.displayServiceCompteRenduObligatoire(demande));
          crtRow.push(this.DemandeService.displayServiceIntervenantPortailWeb(demande));
    return crtRow;
  }


  contratClientQuery(isArchive:boolean)
  {


    return { exports_contrat_client:isArchive};
  }

  contratClientFilter(demande)
  {

    return true;
  }

  contratClientHeaders()
  {
    var headers =[
      "Nom, Prénom du client",
      "ID OGUST Client",
      "Numéro de contrat",
      "Date de début du contrat",
      "Modèle d'édition de contrat",
      "Géré par",
      "Modèle de courriel d'envoi de contrat",
      "Courriel envoi de contrat",
      "Courriel envoi de facture",
      "ID Tarif 1",
      "Description du tarif 1",
      "Quantité du tarif 1",
      "Unité du tarif 1",
      "Prix du tarif 1",
      "Taux TVA du tarif 1",
      "ID Tarif 2",
      "Description du tarif 2",
      "Quantité du tarif 2",
      "Unité du tarif 2",
      "Prix du tarif 2",
      "Taux TVA du tarif 2",
      "ID Tarif 3",
      "Description du tarif 3",
      "Quantité du tarif 3",
      "Unité du tarif 3",
      "Prix du tarif 3",
      "Taux TVA du tarif 3",
      "ID Tarif 4",
      "Description du tarif 4",
      "Quantité du tarif 4",
      "Unité du tarif 4",
      "Prix du tarif 4",
      "Taux TVA du tarif 4",
      "ID Tarif 5",
      "Description du tarif 5",
      "Quantité du tarif 5",
      "Unité du tarif 5",
      "Prix du tarif 5",
      "Taux TVA du tarif 5",
      "ID Tarif 6",
      "Description du tarif 6",
      "Quantité du tarif 6",
      "Unité du tarif 6",
      "Prix du tarif 6",
      "Taux TVA du tarif 6",
      "Forfait ou À la carte",
      "Mode de transmission : Email ou Courrier",
      "Modèle de facture",
      "Intervenant associé",
      "Adresse du lieu de rencontre - Ligne 1",
      "Adresse du lieu de rencontre - Ligne 2",
      "Adresse du lieu de rencontre - Ligne 3",
      "Service demandé",
      "Heure 1e rencontre",
      "Durée 1e rencontre (en mins)",
      "Autres rencontres confirmées",
      "Durée normale par rencontre (en mins)",
      "Particularités pour contrat client",
      "Particularités relatives au partenariat",
      "Date de fin",
      "Département",
      "Adresse du lieu de travail (sur 1 ligne)",
      "Heure de début de la 1e journée de travail",
      "Nombre total d'heures par semaine",
      "Nombre de jours par semaine",
      "Contrat - Nom contact",
      "Contrat - Tel contact",
      "Feuille de temps - Nom contact",
      "Feuille de temps - Tel contact",
      "Sommaires des tâches demandées",
      "Particularité du contrat client 1",
      "Particularité du contrat client 2",
      "Particularité du contrat client 3",
      "Particularité du contrat client 4",
      "Particularité du contrat client 5",
      "Préavis (si CDI)", //
      "Infos relatives à ce contrat à faire apparaître sur les factures",
      "Courriel automatique de suivi de 1e rencontre",
      "Modèle de courriel de suivi de 1e rencontre",
      "Date de 1e rencontre"
    ];
    return headers;

  }

  contratClientRow(demande)
  {
    var crtRow = [];
    crtRow.push(this.DemandeService.displayClientNom(demande) + ', '+this.DemandeService.displayClientPrenom(demande));

    crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
    crtRow.push(this.DemandeService.displayNumeroDeContrat(demande));
    crtRow.push(this.DemandeService.displayMCDateDebut(demande));


    // admin - services -
   // crtRow.push(this.DemandeService.displayDemandeType(demande));
    crtRow.push(this.DemandeService.displayServiceCodeDeContratClient(demande));

    crtRow.push(this.DemandeService.displayAssignation(demande));
    crtRow.push(this.DemandeService.displayServiceCodeDeContratClientEmail(demande));

    //if Enfant or Adulte -> demande.emails.primary
    // else displayMCResponsableContratEmail
    crtRow.push(this.DemandeService.displayCourrielEnvoiContrat(demande));

    //if Enfant or Adulte -> demande.emails.primary
    // else displayInterlocuteurEmail
    crtRow.push(this.DemandeService.displayCourrielEnvoiFacture(demande));
   // crtRow.push(this.DemandeService.displayInterlocuteurEmail(demande));


    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 0));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 0));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 0));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 0));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 0));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 0));

    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 1));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 1));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 1));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 1));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 1));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 1));

    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 2));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 2));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 2));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 2));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 2));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 2));

    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 3));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 3));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 3));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 3));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 3));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 3));

    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 4));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 4));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 4));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 4));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 4));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 4));

    crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 5));
    crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 5));
    crtRow.push(this.DemandeService.displayMCTarifQuantityContratClient(demande, 5));
    crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 5));
    crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 5));
    crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande, 5));


    //crtRow.push("Forfait ou À la carte");  // take from service
     crtRow.push(this.DemandeService.displayServiceBillingType(demande));
    //crtRow.push("Email"); // constant
    crtRow.push(this.DemandeService.displayServiceModeDeTransmission(demande));
    crtRow.push(this.DemandeService.displayServiceModeleDeFacturation(demande));

    crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));
    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne1(demande));
    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne2(demande));
    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne3(demande));
    crtRow.push(this.DemandeService.displayServiceName(demande));



    crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
    //crtRow.push(this.DemandeService.displayMCTarifHeure(demande, 0)); ??
    crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
    crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
    //crtRow.push("Durée normale par rencontre (en mins)"); // adding a new param

     crtRow.push(this.DemandeService.displayMCTarifDureeNormale(demande, 0));

     crtRow.push(this.DemandeService.displayMCParticulariteContratClientService(demande));
    crtRow.push(this.DemandeService.displayMCParticulariteContratClient(demande));

    // crtRow.push("Particularités pour contrat client");
    // crtRow.push("Particularités relatives au partenariat");


    crtRow.push(this.DemandeService.displayMCDateFin(demande));
    crtRow.push(this.DemandeService.displayEtablissement(demande));
   // crtRow.push("Département"); // new parameter in Etablissment form

    crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande));
    crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
    crtRow.push(this.DemandeService.displayServiceHeuresParSemaineGuaranties(demande));

    crtRow.push(this.DemandeService.displayServiceJoursParSemaine(demande));
    crtRow.push(( this.DemandeService.displayMCResponsableContratPrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableContratNom(demande)));
    crtRow.push( this.DemandeService.displayMCResponsableContratPhone(demande));

    crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande)));
    crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));
    crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));

    crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 0));
    crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 1));
    crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 2));
    crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 3));
    crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 4));
    //crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 5));
   // crtRow.push( 'Preavis si CDI');
    crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
    crtRow.push( ''); // info relatives a ce contrat a faire appairaitre sur les factures

    crtRow.push(this.DemandeService.displayServiceCourrielSuiviClient(demande));
    // crtRow.push('Non');
    // crtRow.push("Suivi rencontre 1");
     crtRow.push( this.DemandeService.displayServiceModeleDeSuiviEmailWithAssignation(demande));

    // make a new Modele de courriel suivi rencontre 1 + " - PersonneAssigneExport

    crtRow.push(this.DemandeService.displayMCDateDebut(demande));
    return crtRow;
  }


  contratTravailQuery(isArchive:boolean)
  {


    return { exports_contrat_travail:isArchive};
  }

  contratTravailFilter(demande)
  {

    return true;
  }

  contratTravailHeaders()
  {
    var headers =[
      "Nom, prénom de l'intervenant",
     "Numéro de brevet de l'intervenant",
     "Date de début du contrat",
     "Code client",
     "Géré par",
     "Modèle d'édition de contrat de travail",
     "Modèle de courriel d'envoi du contrat",
     "Taux horaire brut",
     "4% vacances",
     "Prime horaire",
     "Prime par déplacement",
     "Service demandé",
     "Adresse pour le service (sur 1 ligne)",
     "Heure 1e rencontre",
     "Durée 1e rencontre (en mins)",
     "Autres rencontres confirmées",
     "Particularités de l'assignation",
     "Partcularité de l'assignation pour l'intervenant",
     "Si montant forfaitaire payé à l'intervenant, écrire détails de la rémunération ici",
     "Date de fin de contrat",
     "Département",
     "Adresse du lieu de travail (1 ligne)",
     "Heure de la 1e journée",
     "Nombre total d'heures par semaine",
     "Nombre de jours par semaine",
     "Nom de la personne dûment autorisée à signer la feuille de temps",
     "No tel de la personne autorisée à signer la feuille de temps",
     "Sommaire des tâches demandées",
     "Particularité pour contrat de travail 1",
     "Particularité pour contrat de travail 2",
     "Particularité pour contrat de travail 3",
     "Particularité pour contrat de travail 4",
     "Particularité pour contrat de travail 5",
     "Préavis (si CDI)",
     "Courriel automatique de suivi de 1e rencontre",
     "Modèle de courriel de suivi de 1e rencontre",
     "Date de 1e rencontre"
    ];
    return headers;

  }

  contratTravailRow(demande)
  {
    var crtRow = [];

    crtRow.push((this.DemandeService.displayMCProfessionalNom(demande)+', '+this.DemandeService.displayMCProfessionalPrenom(demande)));
         crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));
        crtRow.push(this.DemandeService.displayMCDateDebut(demande));
        crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
        crtRow.push(this.DemandeService.displayAssignation(demande));
        crtRow.push(this.DemandeService.displayServiceContratTravail(demande));
        crtRow.push(this.DemandeService.displayServiceContratTravailEmail(demande));
        crtRow.push(this.DemandeService.displayMCTauxHoraire(demande));
        crtRow.push(this.DemandeService.displayMCProfessionalStatutVacances(demande));
        crtRow.push(this.DemandeService.displayMCPrimeHoraire(demande));
        crtRow.push(this.DemandeService.displayMCPrimeDeplacement(demande)); // ERROR
        crtRow.push(this.DemandeService.displayServiceName(demande));
        crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigneWithName(demande));
        crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
        crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
        crtRow.push(this.DemandeService.displayMCParticulariteAssignation(demande));
        crtRow.push(this.DemandeService.displayMCParticulariteAssignationService(demande));
        crtRow.push(this.DemandeService.displayMCParticulariteForfaitProfessionnel(demande));
        crtRow.push(this.DemandeService.displayMCDateFin(demande));
        crtRow.push(this.DemandeService.displayEtablissement(demande));
        crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande));
        crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(this.DemandeService.displayServiceHeuresParSemaineGuaranties(demande));
        crtRow.push(this.DemandeService.displayServiceJoursParSemaine(demande));
        crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande)));
        crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));
        crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));
        crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 0));
        crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 1));
        crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 2));
        crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 3));
        crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 4));
        crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
       // crtRow.push( this.DemandeService.displayMCParticulariteAutres(demande, 5));

        // crtRow.push(this.DemandeService.displayServiceCourrielSuiviIntervenant(demande));
        crtRow.push('Non');
        crtRow.push("Suivi rencontre 1");
        crtRow.push(this.DemandeService.displayMCDateDebut(demande));

    return crtRow;
  }


  encaissementsQuery(isArchive:boolean)
  {


    return { exports_encaissements:isArchive};
  }

  encaissementsFilter(demande)
  {

    return true;
  }

  encaissementsHeaders()
  {
    var headers =[
      "Nom, Prénom du client",
       "ID Ogust Client",
       "Date de création",
       "Date comptable",
       "Libellé",
       "Montant",
       "Numéro de chèque",
       "Mode de règlement",
       "Commentaires"
    ];
    return headers;

  }

  encaissementsRow(demande)
  {
    var crtRow = [];
   let crtDate= moment(new Date());


    crtRow.push( (this.DemandeService.displayClientNom(demande)+', '+this.DemandeService.displayClientPrenom(demande) ));
     crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
     crtRow.push(crtDate.format(this._Constants.default.dateFormats.exports));
     crtRow.push(crtDate.format(this._Constants.default.dateFormats.exports));

     crtRow.push(this.DemandeService.displayMCPrepaiementOperationNumber(demande));
     //crtRow.push("-");
     crtRow.push(this.DemandeService.displayMCPrepaiementMontantPaye(demande));
     crtRow.push("");
     crtRow.push(this.DemandeService.displayMCPrepaiementModeDeReglement(demande));
     crtRow.push(this.DemandeService.displayMCPrepaiementOperationNumber(demande));

    return crtRow;
  }


  facturesPrepaiementQuery(isArchive:boolean)
  {


    return { exports_encaissements:isArchive};
  }

  facturesPrepaiementFilter(demande)
  {

    return true;
  }

  facturesPrepaiementHeaders()
  {
    var headers =[
      "Date de facturation",
   "Code facture",
   "Mode de règlement",  //PAYPAL
   "Conditions de règlement",
   "Format d’édition",
   "Numéro de contrat",
   "Date de facture",
   "Modèle d’envoi de courriel",
   "Tarif 1",
   "Description du tarif 1",
   "Quantité du tarif 1",
   "Unité du tarif 1",
   "Prix du tarif 1",
   "Taux TvA du tarif 1",
   "Tarif 2",
   "Description du tarif 2",
   "Quantité du tarif 2",
   "Unité du tarif 2",
   "Prix du tarif 2",
   "Taux TvA du tarif 2",
   "Tarif 3",
   "Description du tarif 3",
   "Quantité du tarif 3",
   "Unité du tarif 3",
   "Prix du tarif 3",
   "Taux TvA du tarif 3",
   "Tarif 4",
   "Description du tarif 4",
   "Quantité du tarif 4",
   "Unité du tarif 4",
   "Prix du tarif 4",
   "Taux TvA du tarif 4",
   "Tarif 5",
   "Description du tarif 5",
   "Quantité du tarif 5",
   "Unité du tarif 5",
   "Prix du tarif 5",
   "Taux TvA du tarif 5",
   "Tarif 6",
   "Description du tarif 6",
   "Quantité du tarif 6",
   "Unité du tarif 6",
   "Prix du tarif 6",
   "Taux TvA du tarif 6",
   "Facture de prépaiement",
   "Type",
   "Rappel client A",
   "Date rappel client A",
   "Heure rappel client A",
   "Modèle de mail rappel client A",
   "Rappel client B",
   "Date rappel client B",
   "Heure rappel client B",
   "Modèle de mail rappel client B",
   "Rappel client C",
   "Date rappel client C",
   "Heure rappel client C",
   "Modèle de mail rappel client C",
   "Rappel gestionnaire A",
   "Date rappel gestionnaire A",
   "Heure rappel gestionnaire A",
   "Modèle de mail rappel gestionnaire A",
   "Rappel gestionnaire B",
   "Date rappel gestionnaire B",
   "Heure rappel gestionnaire B",
   "Modèle de mail rappel gestionnaire B",
   "Rappel gestionnaire C",
   "Date rappel gestionnaire C",
   "Heure rappel gestionnaire C",
   "Modèle de mail rappel gestionnaire C"
    ];
    return headers;

  }

  facturesPrepaiementRow(demande)
  {
    var crtRow = [];
   let crtDate= moment(new Date());
   var heureDeRappel = "11:00";


              crtRow.push(crtDate.format(this._Constants.default.dateFormats.exports));
              // crtRow.push("Code facture");
              crtRow.push("");
              crtRow.push("PAYPAL"); // always set to A réception
              // crtRow.push("Mode de règlement");
              crtRow.push("A réception"); // always set to A réception
              // crtRow.push("Format d’édition"); // format d'edition from the service
              // crtRow.push(this.DemandeService.displayMCPrepaiementModeDeReglement(demande));
             // crtRow.push(this.DemandeService.displayServicePrepaymentFormatEdition(demande));
             crtRow.push(this.DemandeService.displayServiceContratPrepaiementEmail(demande));
              crtRow.push(this.DemandeService.displayNumeroDeContrat(demande));
              // crtRow.push("Numéro de contrat");
              crtRow.push(crtDate.format(this._Constants.default.dateFormats.exports));
              crtRow.push(this.DemandeService.displayServiceModeleDeFacturationPrepaiement(demande));

             crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,0));

               crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 1));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 1));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 1));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 1));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 1));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,1));

               crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 2));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 2));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 2));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 2));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 2));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,2));

               crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 3));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 3));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 3));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 3));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 3));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,3));

               crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 4));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 4));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 4));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 4));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 4));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,4));

               crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 5));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 5));
               crtRow.push(this.DemandeService.displayMCTarifQuantity(demande, 5));
               crtRow.push(this.DemandeService.displayMCTarifUnits(demande, 5));
               crtRow.push(this.DemandeService.displayMCTarifPrice(demande, 5));
               crtRow.push(this.DemandeService.displayMCTarifTauxTVA(demande,5));

              crtRow.push(this.DemandeService.displayMCMontantPayeMoinsQueMontantTotal(demande));
              // si montant payé < montant_total (caculated from tarifs) : Oui ? Non



              // crtRow.push(this.DemandeService.displayMCPrepaiementModeDeReglement(demande));
              crtRow.push(this.DemandeService.displayServiceBillingTypePrepayment(demande));
              crtRow.push("Oui"); // always Oui
              crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 2)); //date premiere rencontre - 2 jours
              crtRow.push(heureDeRappel); // 11:00
              crtRow.push("RAPPEL A");
              crtRow.push("Non"); // always Non
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("Non");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("Oui"); //always
              crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 1));//  //date premiere rencontre - 1 jours
              crtRow.push(heureDeRappel); //11:00
              crtRow.push("RAPPEL A");
              crtRow.push("Non");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("Non");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");

    return crtRow;
  }


  employeurDQuery(isArchive:boolean)
  {


    return { exports_employeurD:isArchive};
  }

  employeurDProfileFilter(demande)
  {
    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande))
   {
    return true;
   }else{
     return false;
   }
    // return true;
  }
  employeurDEmploiFilter(demande)
  {

    // return true;
    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande))
   {
    return true;
   }else{
     return false;
   }
  }
  employeurDGainsFilter(demande)
  {
    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande)
      && this.DemandeService.displayMCProfessionalStatutEmployment(demande)==='Employé'
      && this.DemandeService.displayMCProfessionalStatutVacances(demande) === 'Inclus'
  )
   {
    return true;
   }else{
     return false;
   }
    // return true;
  }

  employeurDHeaders()
  {
      var headers =[
        "Nom, Prénom du client",
       "ID Ogust Client",
       "Date de création",
       "Date comptable",
       "Libellé",
       "Montant",
       "Numéro de chèque",
       "Mode de règlement",
       "Commentaires"
      ];
      return headers;
  }

  employeurDProfileRow(demande)
  {
    var crtRow = [];
   let crtDate= moment(new Date());
   var heureDeRappel = "11:00";
     crtRow.push('A');
     crtRow.push('00222445');
     crtRow.push(this.DemandeService.displayMCEmployeurDMatricule(demande));
     crtRow.push(this.DemandeService.displayMCProfessionalNom(demande));
     crtRow.push(this.DemandeService.displayMCProfessionalPrenom(demande));
     crtRow.push('');
     crtRow.push(this.DemandeService.displayMCEmployeurDAssuranceSocial(demande));
     // crtRow.push(this.DemandeService.displayMCDateDebut(demande));
     crtRow.push(this.DemandeService.displayMCEmployeurDDOB(demande));
     crtRow.push('F');
     crtRow.push(this.DemandeService.displayMCProfessionalGenderCode(demande));
     crtRow.push('');
     crtRow.push('');
     crtRow.push('1');
     crtRow.push('');
     crtRow.push('N');
     // crtRow.push('quelle adresse ???');
     // crtRow.push('quelle adresse ???');
     crtRow.push(this.DemandeService.displayMCEmployeurDAddressSet(demande));
       crtRow.push(this.DemandeService.displayMCEmployeurDAddressCity(demande));

     crtRow.push('QUE');
     // crtRow.push('quelle adresse ???');
     crtRow.push(this.DemandeService.displayMCEmployeurDAddressPostal(demande));
     crtRow.push('');
     crtRow.push('1');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('N');




    return crtRow;
  }
  employeurDEmploiRow(demande)
  {
    var crtRow = [];
   let crtDate= moment(new Date());
   var heureDeRappel = "11:00";

    crtRow.push('A');
    crtRow.push('00222445');
    crtRow.push(this.DemandeService.displayMCEmployeurDMatricule(demande));
    crtRow.push('1');
    crtRow.push(this.DemandeService.displayDemandeTypeCode(demande));
    crtRow.push('1');
    crtRow.push(this.DemandeService.displayMCProfessionalStatutEmploymentCode(demande));
    crtRow.push('999');
    crtRow.push(crtDate.format('YYYY/MM/DD'));
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push(this.DemandeService.displayMCProfessionalStatutEmploymentRCCode(demande));
    crtRow.push('7777');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('0.02');
    crtRow.push('1');
    crtRow.push(crtDate.format('YYYY/MM/DD'));
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('QUE');
    crtRow.push('REM');
    crtRow.push('001');
    crtRow.push('');
    crtRow.push(this.DemandeService.displayMCEmployeurDChequeSuccursale(demande));
    crtRow.push(this.DemandeService.displayMCEmployeurDChequeInstitution(demande));
    crtRow.push(this.DemandeService.displayMCEmployeurDChequeCompte(demande));
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push(this.DemandeService.displayMCEmployeurDCheque2or3(demande));
    crtRow.push(this.DemandeService.displayMCProfessionalStatutEmployment1ECode(demande));
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push(this.DemandeService.displayMCProfessionalStatutEmploymentAXCode(demande));
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push('');
    crtRow.push(crtDate.format('YYYY/MM/DD'));



    return crtRow;
  }
  employeurDGainsRow(demande)
  {
    var crtRow = [];
   let crtDate= moment(new Date());
   var heureDeRappel = "11:00";

   crtRow.push('A');
     crtRow.push('00222445');
     crtRow.push(this.DemandeService.displayMCEmployeurDMatricule(demande));
     crtRow.push('G');
     crtRow.push('400');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('4');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('F');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('');
     crtRow.push('N');



    return crtRow;
  }


}
