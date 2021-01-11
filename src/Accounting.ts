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
    // MB XX ONLY generate for first mandat du client
    let state = this.DemandeService.displayClientIsPremierMandat(demande);
   // console.log('ASASAS state :', state);
    if(state===false)
    {
      return false
    }else{
      return true;
    }

  }

  ficheClientFilterReasons(demande)
  {

    let state = this.DemandeService.displayClientIsPremierMandat(demande);
    if(state===false)
    {
      return 'Ce n\'est pas le premier mandat du client';
    }else{
      return '';
    }
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
      "Interlocuteur : Téléphone professionnel ",
        // -> SAD - EDU -> INTERLOCUTEUR principale
        //  -> READ -> contact payable

      "Interlocuteur : Téléphone domicile",
      "Interlocuteur : Téléphone mobile",
      "Interlocuteur : Adresse courriel",

      "Interlocuteur : Contact principal",
      //Always Oui
      "Interlocuteur : Contact facturation",
      //Always Oui
      "Année scolaire",
      "BLocker sms de relance",
      "Portail Web",
      "OSS"
      // "Courriel automatique de suivi de 1e rencontre",
      // "Modèle de courriel de suivi de 1e rencontre"
    ];
    return headers;

  }

  ficheClientRow(demande)
  {
    var crtRow = [];

    let mcType = this.DemandeService.displayMCType(demande);

        crtRow.push(this.DemandeService.displayClientGender(demande));
        crtRow.push(this.DemandeService.displayClientNom(demande));             // etablissment: Nom de l'etablissement
        crtRow.push(this.DemandeService.displayClientPrenom(demande));          // etablissment publique: CIUSS
                                                                                // -  clinique privee, CPE, ecole, Residence: ajouter 'A/S' + {Civilite} {prenom} {nom} de la personne Responsable de la demande
        crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
        crtRow.push(this.DemandeService.displayClientDOB(demande));             //
        crtRow.push(this.DemandeService.displayClientOrigine(demande));  // MB XX IS IT ORIGINE?
        crtRow.push(this.DemandeService.displayAssignation(demande));
        crtRow.push(this.DemandeService.displayServiceSecteur(demande));


        //crtRow.push(this.DemandeService.displayDomicileAddressExport(demande)); // MB XX displayClientAddressExport MODIFY TO WORK WITH POS
        crtRow.push(this.DemandeService.displayBillingAddressExport(demande));           // etablissement, clinique privee, CPE, ecole, Residence: addresse de la personne PAYABLE
        // crtRow.push(this.DemandeService.displayCourrielEnvoiContrat(demande));


        crtRow.push(this.DemandeService.displayDomicileCodePostal(demande));    // etablissement, clinique privee, CPE, ecole, Residence: addresse de la personne PAYABLE
        crtRow.push('Domicile');
        crtRow.push(this.DemandeService.displayBillingPhoneHome(demande)); // MB XX CHANGE TO INTERLOCUTEUR | etablissement, clinique privee, CPE, ecole, Residence: addresse de la personne PAYABLE
                                                                                // etablissement, clinique privee, CPE, ecole, Residence: PAYABLE use work phone instead of home phone
        crtRow.push('cell');
        crtRow.push(this.DemandeService.displayBillingPhoneCell(demande)); // MB XX CHANGE TO INTERLOCUTEUR



        crtRow.push(this.DemandeService.displayBillingEmail(demande,0)); // MB XX CHANGE TO INTERLOCUTEUR
                                                                                    // etablissement, clinique privee, CPE, ecole, Residence: PAYABLE instead of interlocuteur
        crtRow.push(this.DemandeService.displayInterlocuteurGender(demande));         // etablissement, clinique privee, CPE, ecole, Residence: PAYABLE instead of interlocuteur
        crtRow.push(this.DemandeService.displayInterlocuteurNom(demande));            // etablissement, clinique privee, CPE, ecole, Residence: PAYABLE instead of interlocuteur
        crtRow.push(this.DemandeService.displayInterlocuteurPrenom(demande));           // etablissement, clinique privee, CPE, ecole, Residence: PAYABLE instead of interlocuteur
        crtRow.push(this.DemandeService.displayInterlocuteurFonction(demande));
        crtRow.push(this.DemandeService.displayInterlocuteurOrPayerPhoneByType(demande, 'WORK'));
        crtRow.push(this.DemandeService.displayInterlocuteurOrPayerPhoneByType(demande, 'HOME'));
        crtRow.push(this.DemandeService.displayInterlocuteurOrPayerPhoneByType(demande, 'CELL'));
        crtRow.push(this.DemandeService.displayInterlocuteurOrPayerEmail(demande));
        crtRow.push('Oui');
        crtRow.push('Oui');
        crtRow.push(this.DemandeService.displayAnneeScolaire(demande));

        if(mcType==='READ')
        {
          crtRow.push('Oui');  // blocker sms de relance -> alwyas 'Non' . MB XX missing colonne -> look at Rosie 1.0
        }else{
          crtRow.push('Non');  // blocker sms de relance -> alwyas 'Non' . MB XX missing colonne -> look at Rosie 1.0
        }
        crtRow.push(this.DemandeService.displayServiceClientPortailWeb(demande));
        crtRow.push('Non');  // OSS -> ALWAYS 'Non' . MB XX missing colonne

    return crtRow;
  }


  ficheIntervenantQuery(isArchive:boolean)
  {


    return { exports_fiche_intervenant:isArchive};
  }

  ficheIntervenantFilter(demande)
  {
    // juste le premier mandat qui se fait exporté
    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande)===false)
    {
      return false;
    }

    return true;
  }
  ficheIntervenantFilterReasons(demande)
  {

    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande)===false)
    {
      return 'Ce n\'est pas le premier mandat de l\'intervenant';
    }

    return '';
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
         "Téléphone mobile",
         "Type de téléphone",
         "Téléphone fixe",
         "Email",
         "Compétence (métier)",
         "Doit remettre une feuille de temps sign",
         "Compte rendu obligatoire après chaque r",
         "Portail Web",
         "OSS"
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
          crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));  // SI pas de permis -> matricule (should be automatic)
          crtRow.push(this.DemandeService.displayMCEmployeurDMatricule(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalGender(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDDOB2(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalStatutEmployment(demande));
          crtRow.push(this.DemandeService.displayAssignation(demande));
          crtRow.push(this.DemandeService.displayServiceSecteur(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDAddressSet(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDAddressPostalWithSpace(demande));
          // crtRow.push(this.DemandeService.displayMCEmployeurDProfession(demande));
          crtRow.push(this.DemandeService.displayMCProfessionalMetier(demande)); // MB XX change from service to taking the metier from professionnel
          crtRow.push("Maison");
          crtRow.push(this.DemandeService.displayMCEmployeurDPhoneHome(demande));
          crtRow.push("Cell");
          crtRow.push(this.DemandeService.displayMCEmployeurDPhoneCell(demande));
          crtRow.push(this.DemandeService.displayMCEmployeurDEmail(demande));

          crtRow.push(this.DemandeService.displayMCProfessionalMetier(demande)); // MB XX take metier instead
          crtRow.push(this.DemandeService.displayServiceFeuilleDeTempsSign(demande));
          crtRow.push(this.DemandeService.displayServiceCompteRenduObligatoire(demande));
          crtRow.push(this.DemandeService.displayServiceIntervenantPortailWeb(demande));
          crtRow.push("Non");
    return crtRow;
  }


  contratClientQuery(isArchive:boolean)
  {


    return { exports_contrat_client:isArchive};
  }

  contratClientFilter(demande)
  {
    // always generated
    return true;
  }
  contratClientFilterReasons(demande)
  {

    return '';
  }

  contratClientHeaders()
  {
    var headers =[
      "Nom Prénom du client",
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
      "Numéro de téléphone de l’intervenant",
      "Particularités pour contrat client",
      "Particularités relatives au partenariat",
      "Date de fin",
      "Département",
      "Adresse du lieu de travail (sur 1 ligne)",
      "Heure de début de la 1e journée de travail",
      "Nombre total d'heures par semaine",
      "Horaire",
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
      "Date de 1e rencontre",
      "Mail Satisfaction fin de contrat",
      "Modèle de mail satisfaction",
      "$ par km",
      "$ par km (avant taxes)"
    ];
    return headers;

  }

  contratClientRow(demande)
  {
    var crtRow = [];
    crtRow.push(this.DemandeService.displayClientNom(demande) + ' '+this.DemandeService.displayClientPrenom(demande));
    //


    crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));
    crtRow.push(this.DemandeService.displayNumeroDeContrat(demande));
    crtRow.push(this.DemandeService.displayMCDateDebut(demande));

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


     crtRow.push(this.DemandeService.displayServiceBillingType(demande));
    crtRow.push(this.DemandeService.displayServiceModeDeTransmission(demande));
    crtRow.push(this.DemandeService.displayServiceModeleDeFacturation(demande));

    crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));

// --------------------------------------------------------------------------------------------
//      when MC_READ -> this is null
// --------------------------------------------------------------------------------------------

  let demande_type = this.DemandeService.displayDemandeType(demande)
  let mcType = this.DemandeService.displayMCType(demande);
  if(mcType==='READ')
  {
    crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreLigne1(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreLigne2(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreLigne3(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceName(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
    crtRow.push(''); //  crtRow.push(this.DemandeService.displayMCTarifDureeNormale(demande, 0));
    crtRow.push(''); //  crtRow.push(this.DemandeService.displayMCProfessionalPhoneIfAllowed(demande)); //Numéro de tel de l’intervenant
    crtRow.push(''); //  crtRow.push(this.DemandeService.displayMCParticulariteContratClientService(demande));
    crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteContratClient(demande));

  }else{


    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne1(demande));
    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne2(demande));
    crtRow.push(this.DemandeService.displayLieuDeRencontreLigne3(demande));
    crtRow.push(this.DemandeService.displayServiceName(demande));



    crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));

    crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
    crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));


     crtRow.push(this.DemandeService.displayMCTarifDureeNormale(demande, 0));

     crtRow.push(this.DemandeService.displayMCProfessionalPhoneIfAllowed(demande)); //Numéro de tel de l’intervenant

     crtRow.push(this.DemandeService.displayMCParticulariteContratClientService(demande));
    crtRow.push(this.DemandeService.displayMCParticulariteContratClient(demande));

    }// not mcType READ
// ---------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------
//      only filled when MC_READ . otherwise is null
// --------------------------------------------------------------------------------------------

  //  The rest doesn't apply to Enfant / Adulte

  if(mcType==='READ')
  {


    crtRow.push(this.DemandeService.displayMCDateFin(demande));       // MB XX -> date_fin_date doens't exist? i think it comes from tarifs in etbalissements. This doesn't apply to Enfant / Adulte
    crtRow.push('N/A');//crtRow.push(this.DemandeService.displayEtablissement(demande));   // MB XX ->change to 'department'. get it fgrom POS
                                                                        //     if department is blank -> 'N/A'

    crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande));
    crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
    crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));

    crtRow.push(this.DemandeService.displayDemandeFullHoraire(demande));
    crtRow.push(( this.DemandeService.displayMCResponsableContratPrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableContratNom(demande))); //  MB XX gender prenom nom
    crtRow.push( this.DemandeService.formatPhone(this.DemandeService.displayMCResponsableContratPhone(demande)));  // MB XX put all numbers,not just one

    crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender prenom nom
    crtRow.push( this.DemandeService.formatPhone(this.DemandeService.displayMCResponsableFeuillePhone(demande)));  // MB XX put all numbers,not just one
    crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));

    crtRow.push( this.DemandeService.displayMCParticularitePremiereJourneeTravail(demande));
    crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_client',0));
    crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_client', 1));
    crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_client', 2));
    crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_client', 3));
    // crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_client', 4));
    crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
    crtRow.push( ''); // info relatives a ce contrat a faire appairaitre sur les factures
                        // MB XX -> Nom du requérent: {gender} {prenom} {nom} de la personne assigner au feuille de temps (RESPONSABLE_TEMPS)
                        //    if mc.bon_de_commande is not null -> append: "Bon de commande: {mc.bon_de_commande}"
                        // if not READ => ''

  }else{

      crtRow.push(''); // crtRow.push(this.DemandeService.displayMCDateFin(demande));       // MB XX -> date_fin_date doens't exist? i think it comes from tarifs in etbalissements. This doesn't apply to Enfant / Adulte
      crtRow.push(''); // crtRow.push(this.DemandeService.displayEtablissement(demande));   // MB XX ->change to 'department'. get it fgrom POS
                                                                        //     if department is blank -> 'N/A'

      crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande));
      crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
      crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));

      crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceJoursParSemaine(demande));
      crtRow.push(''); // crtRow.push(( this.DemandeService.displayMCResponsableContratPrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableContratNom(demande))); //  MB XX gender prenom nom
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCResponsableContratPhone(demande));  // MB XX put all numbers,not just one

      crtRow.push(''); // crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender prenom nom
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));  // MB XX put all numbers,not just one
      crtRow.push(''); // crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));

      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratClient(demande, 0));
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratClient(demande, 1));
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratClient(demande, 2));
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratClient(demande, 3));
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratClient(demande, 4));
      crtRow.push(''); // crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
      crtRow.push(''); // crtRow.push( '');

  }
// --------------------------------------------------------------------------------------------


    crtRow.push(this.DemandeService.displayServiceCourrielSuiviClient(demande));
    crtRow.push( this.DemandeService.displayServiceModeleDeSuiviEmailWithAssignation(demande)); // MB xx -> only enfant / adulte
    crtRow.push(this.DemandeService.displayMCDateDebut(demande));
    // crtRow.push('Non');
    crtRow.push(this.DemandeService.displayServiceCourrielSuiviClient(demande));
    crtRow.push(this.DemandeService.displayServiceModeleDeEmailSatisfactionWithAssignation(demande));
    crtRow.push(this.DemandeService.getFraisDeplacementPayeEtablissementValueWithTaxes(demande));
    crtRow.push(this.DemandeService.getFraisDeplacementPayeEtablissementValue(demande));


    return crtRow;
  }


  contratTravailQuery(isArchive:boolean)
  {

    // make two lines if first mandat for professionnel

    return { exports_contrat_travail:isArchive};
  }

  contratTravailFilter(demande)
  {
    return true;
    // if(this.DemandeService.displayMCProfessionnelContratInitial(demande)===false)
    // {
    //   return false
    // }
    // return true;
  }
  contratTravailFilterReasons(demande)
  {

    return '';
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
     "Horaire",
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

    crtRow.push((this.DemandeService.displayMCProfessionalNom(demande)+' '+this.DemandeService.displayMCProfessionalPrenom(demande)));
         crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));
        crtRow.push(this.DemandeService.displayMCDateDebut(demande));
        // crtRow.push('Serespro');
        crtRow.push(this.DemandeService.displayClientIdOgustClient(demande));   // MB XX si le contrat initial -> write ''
        crtRow.push(this.DemandeService.displayAssignation(demande));
        crtRow.push(this.DemandeService.displayServiceContratTravail(demande)); // MB XX  si MC READ === false -> and si contrat initial === true -> (service.secteur.code + ' Contrat initial - ' + professionnel.statut \n NEWLINE \n newline NO! A NEW ROW FOR NEW INTERVENANTS  service.contratTravail
                                                                                  //

                                                                                //           MC READ ===false  -> and si contrat initial === false -> service.contratTravail

                                                                              // MB XX  MC READ === true  -> service.contratTravail + ' ' + [if(tarifs.date_fin_indeterminee === true) -> 'CDI' else -> 'CDD' ]+ ' ' + prof.statut


                                                                              // sinon, get from service.contratTravail


        crtRow.push(this.DemandeService.displayServiceContratTravailEmail(demande));  // // MB XX  si MC READ === false and si contrat initial === true -> 'Contrat initial - '+ prof.statut  + \n newline NO! A NEW ROW FOR NEW INTERVENANTS '+ demande.service.contratTravailEmail.code
                                                                                        //  MB XX  si MC READ === false and si contrat initial === false -> demande.service.contratTravailEmail.code
                                                                                        //  MB XX  si MC READ === true -> demande.service.contratTravailEmail.code + ' - ' prof.statut  + [if frais_deplacement_paye_etablissement===true -> + ' + Feuille deplacement']




        crtRow.push(this.DemandeService.displayMCTauxHoraire(demande));
        crtRow.push(this.DemandeService.displayMCProfessionalStatutVacances(demande));
        crtRow.push(this.DemandeService.displayMCPrimeHoraire(demande));
        crtRow.push(this.DemandeService.displayMCPrimeDeplacement(demande)); // ERROR

// ------------------------------------------------------------------------------------------------------------------------------------------------
//  if (MC_READ === true || (MC READ === false and si contrat initial === true)  )-> leave section  blank
// ------------------------------------------------------------------------------------------------------------------------------------------------

        let mcType = this.DemandeService.displayMCType(demande);
        if(mcType==='READ')
        {
          crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceName(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigneWithName(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteAssignation(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteAssignationService(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteForfaitProfessionnel(demande));
        }else{
          crtRow.push(this.DemandeService.displayServiceName(demande));
          crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigneWithName(demande));
          crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
          crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
          crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteAssignation(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteAssignationService(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteForfaitProfessionnel(demande));
        }


// ------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------
//  if (MC_READ === false) leave blank
// ------------------------------------------------------------------------------------------------------------------------------------------------

      if(mcType==='READ')
      {
        crtRow.push(this.DemandeService.displayMCDateFin(demande));         // MB XX if (tarifs.date_fin_indeterminee===true -> leave blank) else ->  tarifs.date_fin_date
        crtRow.push('N/A'); // departement
        crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande)); // MB XX change to address of POS
        crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));
        crtRow.push(this.DemandeService.displayDemandeFullHoraire(demande));
        crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender + prenom + nom of responsable_feuille
        crtRow.push( this.DemandeService.formatPhone(this.DemandeService.displayMCResponsableFeuillePhone(demande)));  // MB XX display all tel numbers
        crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));        //
        // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 0));
        // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 1));
        // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 2));
        // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 3));
        // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 4));
        crtRow.push( this.DemandeService.displayMCParticularitePremiereJourneeTravail(demande));
        crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_prof',0));
        crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_prof', 1));
        crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_prof', 2));
        crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_prof', 3));
        // crtRow.push( this.DemandeService.displayMCParticulariteContratREADJSONList(demande, 'contrat_prof', 4));
        crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
      }else{
        crtRow.push(''); // crtRow.push(this.DemandeService.displayMCDateFin(demande));         // MB XX if (tarifs.date_fin_indeterminee===true -> leave blank) else ->  tarifs.date_fin_date
        crtRow.push(''); // crtRow.push(this.DemandeService.displayEtablissement(demande));     // MB XX change to name of POS
        crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande)); // MB XX change to address of POS
        crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));
        crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceJoursParSemaine(demande));
        crtRow.push(''); // crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender + prenom + nom of responsable_feuille
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));  // MB XX display all tel numbers
        crtRow.push(''); // crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));        //
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 0));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 1));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 2));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 3));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 4));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
      }

// ------------------------------------------------------------------------------------------------------------------------------------------------

        crtRow.push('Non');
        crtRow.push("Suivi rencontre 1");
        crtRow.push(this.DemandeService.displayMCDateDebut(demande));



    return crtRow;
  }


  contratTravailPremierContratFilter(demande)
  {
    let mcType = this.DemandeService.displayMCType(demande);
    if(mcType==='READ')
    {
      return false;
    }
    if(this.DemandeService.displayMCProfessionnelContratInitial(demande)===false)
    {
      return false
    }
    return true;


    // return true;
  }
  contratTravailPremierContratFilterReasons(demande)
  {

    return '';
  }
  contratTravailPremierContratRow(demande)
  {
    var crtRow = [];

    crtRow.push((this.DemandeService.displayMCProfessionalNom(demande)+' '+this.DemandeService.displayMCProfessionalPrenom(demande)));
         crtRow.push(this.DemandeService.displayMCProfessionalPermis(demande));
        crtRow.push(this.DemandeService.displayMCDateDebut(demande));
        crtRow.push('Serespro');
        crtRow.push(this.DemandeService.displayAssignation(demande));

        crtRow.push(this.DemandeService.displayServiceContratTravailPremierContrat(demande)); // MB XX  si MC READ === false -> and si contrat initial === true -> (service.secteur.code + ' Contrat initial - ' + professionnel.statut \n NEWLINE \n newline NO! A NEW ROW FOR NEW INTERVENANTS  service.contratTravail
                                                                                  //

                                                                                //           MC READ ===false  -> and si contrat initial === false -> service.contratTravail

                                                                              // MB XX  MC READ === true  -> service.contratTravail + ' ' + [if(tarifs.date_fin_indeterminee === true) -> 'CDI' else -> 'CDD' ]+ ' ' + prof.statut


                                                                              // sinon, get from service.contratTravail


        crtRow.push(this.DemandeService.displayServiceContratTravailEmailPremierContrat(demande));  // // MB XX  si MC READ === false and si contrat initial === true -> 'Contrat initial - '+ prof.statut  + \n newline NO! A NEW ROW FOR NEW INTERVENANTS '+ demande.service.contratTravailEmail.code
                                                                                        //  MB XX  si MC READ === false and si contrat initial === false -> demande.service.contratTravailEmail.code
                                                                                        //  MB XX  si MC READ === true -> demande.service.contratTravailEmail.code + ' - ' prof.statut  + [if frais_deplacement_paye_etablissement===true -> + ' + Feuille deplacement']




        crtRow.push(this.DemandeService.displayMCTauxHoraire(demande));
        crtRow.push(this.DemandeService.displayMCProfessionalStatutVacances(demande));
        crtRow.push(this.DemandeService.displayMCPrimeHoraire(demande));
        crtRow.push(this.DemandeService.displayMCPrimeDeplacement(demande)); // ERROR

// ------------------------------------------------------------------------------------------------------------------------------------------------
//  if (MC_READ === true || (MC READ === false and si contrat initial === true)  )-> leave section  blank
// ------------------------------------------------------------------------------------------------------------------------------------------------

        let mcType = this.DemandeService.displayMCType(demande);
        if(mcType==='READ')
        {
          crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceName(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigneWithName(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteAssignation(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteAssignationService(demande));
          crtRow.push(''); // crtRow.push(this.DemandeService.displayMCParticulariteForfaitProfessionnel(demande));
        }else{
          crtRow.push(this.DemandeService.displayServiceName(demande));
          crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigneWithName(demande));
          crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
          crtRow.push(this.DemandeService.displayMCPremiereRencontreDuree(demande));
          crtRow.push(this.DemandeService.displayMCAutresRencontre(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteAssignation(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteAssignationService(demande));
          crtRow.push(this.DemandeService.displayMCParticulariteForfaitProfessionnel(demande));
        }


// ------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------
//  if (MC_READ === false) leave blank
// ------------------------------------------------------------------------------------------------------------------------------------------------

      if(mcType==='READ')
      {
        crtRow.push(this.DemandeService.displayMCDateFin(demande));         // MB XX if (tarifs.date_fin_indeterminee===true -> leave blank) else ->  tarifs.date_fin_date
        crtRow.push(this.DemandeService.displayEtablissement(demande));     // MB XX change to name of POS
        crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande)); // MB XX change to address of POS
        crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));
        crtRow.push(this.DemandeService.displayDemandeFullHoraire(demande));
        crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender + prenom + nom of responsable_feuille
        crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));  // MB XX display all tel numbers
        crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));        //
        crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 0));
        crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 1));
        crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 2));
        crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 3));
        crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 4));
        crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
      }else{
        crtRow.push(''); // crtRow.push(this.DemandeService.displayMCDateFin(demande));         // MB XX if (tarifs.date_fin_indeterminee===true -> leave blank) else ->  tarifs.date_fin_date
        crtRow.push(''); // crtRow.push(this.DemandeService.displayEtablissement(demande));     // MB XX change to name of POS
        crtRow.push(''); // crtRow.push(this.DemandeService.displayLieuDeRencontreUneLigne(demande)); // MB XX change to address of POS
        crtRow.push(''); // crtRow.push(this.DemandeService.displayMCPremiereRencontreHeure(demande));
        crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceHeuresParSemaineCalculated(demande));
        crtRow.push(''); // crtRow.push(this.DemandeService.displayServiceJoursParSemaine(demande));
        crtRow.push(''); // crtRow.push(( this.DemandeService.displayMCResponsableFeuillePrenom(demande)+ ' '+ this.DemandeService.displayMCResponsableFeuilleNom(demande))); // MB XX gender + prenom + nom of responsable_feuille
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCResponsableFeuillePhone(demande));  // MB XX display all tel numbers
        crtRow.push(''); // crtRow.push( this.DemandeService.displaySommaireDesTaches(demande));        //
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 0));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 1));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 2));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 3));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCParticulariteContratTravail(demande, 4));
        crtRow.push(''); // crtRow.push( this.DemandeService.displayMCTarifPreavis(demande, 0));
      }

// ------------------------------------------------------------------------------------------------------------------------------------------------

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

    // only create row if MC.prepayment_first_payment_done == true

    let mcType = this.DemandeService.displayMCType(demande);
    if(mcType==='READ')
    {
      return false;
    }

    if(this.DemandeService.displayMCPrepaiementFirstPaymentDone(demande)===false)
    {
      return false;
    }
    return true;
  }
  encaissementsFilterReasons(demande)
  {
    let mcType = this.DemandeService.displayMCType(demande);
    if(mcType==='READ')
    {
      return 'Le tableau Encaissements ne s\'exporte pas pour les formulaires READ';
    }
    if(this.DemandeService.displayMCPrepaiementFirstPaymentDone(demande)===false)
    {
      return 'Le premier paiement n\'a pas été éffectué';
    }

    return '';
  }

  encaissementsHeaders()
  {
    var headers =[
      "Nom Prénom du client",
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


    crtRow.push( (this.DemandeService.displayClientNom(demande)+' '+this.DemandeService.displayClientPrenom(demande) ));
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
    // if service.billingType.name === A la carte - Pas de Facture de prepaiement -> no row
    // if service.billingType.name === Forfait - toujours Facture de prepaiement -> always row
    // if service.billingType.name === A la carte - Facture de prepaiement conditionnelle
                //    ->  if(mantantpaye < montant de la facture ) ->  create row else do not

                // return false;
    let mcType = this.DemandeService.displayMCType(demande);
    if(mcType==='READ')
    {
      return false;
    }
    let billingType = this.DemandeService.displayServiceBillingTypeName(demande);
    console.log('billingType: ',billingType);
    if(billingType==='À la carte - Pas de facture de prépaiement')
    {
      return false;
    }

    if(billingType==='À la carte - Facture de prépaiement conditionnelle')
    {
      let isMontant = this.DemandeService.displayMCMontantPayeMoinsQueMontantTotal(demande);
      if(isMontant==='Non')
      {
        return false;
      }

    }


    return true;
  }
  facturesPrepaiementFilterReasons(demande)
  {

    let mcType = this.DemandeService.displayMCType(demande);
    if(mcType==='READ')
    {
      return 'Le tableau prépaiement ne s\'exporte pas pour les formulaires READ';
    }
    let billingType = this.DemandeService.displayServiceBillingTypeName(demande);
    if(billingType==='À la carte - Pas de facture de prépaiement')
    {
      return 'Le tableau prépaiement ne s\'exporte pas pour les formulaires À La Carte';
    }

    if(billingType==='À la carte - Facture de prépaiement conditionnel')
    {
      let isMontant = this.DemandeService.displayMCMontantPayeMoinsQueMontantTotal(demande);
      if(isMontant==='Non')
      {
        return 'La facture est conditionnelle, mais le montant payé est moins que le montant total';
      }

    }

    return '';
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
              crtRow.push("");
              crtRow.push("PAYPAL");
              crtRow.push("A réception"); // always set to A réception
              crtRow.push(this.DemandeService.displayServiceModeleDeFacturationPrepaiement(demande));
              crtRow.push(this.DemandeService.displayNumeroDeContrat(demande)); // MB XX review this
              crtRow.push(crtDate.format(this._Constants.default.dateFormats.exports));
              crtRow.push(this.DemandeService.displayServiceContratPrepaiementEmail(demande));
              crtRow.push(this.DemandeService.displayMCTarifCodeOgust(demande, 0));
               crtRow.push(this.DemandeService.displayMCTarifDescriptionFromSubService(demande, 0));   // MB XX -> MAKE SURE WE HAVE SOUS-SERVICE DESCRIPTION
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

//Rappel Client

                crtRow.push(this.DemandeService.displayMCIsRappelA(demande)); // always Oui
                crtRow.push(this.DemandeService.displayTodayMinusDays(demande, -3));
                crtRow.push(heureDeRappel); //11:00
                crtRow.push("J+3");

                crtRow.push(this.DemandeService.displayMCIsRappelB(demande));
                crtRow.push(this.DemandeService.displayMCDateRappelB(demande));
                crtRow.push(heureDeRappel);
                crtRow.push("J-3");

                crtRow.push("Oui");
                crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 2));
                crtRow.push(heureDeRappel);
                crtRow.push("J-2");

                //old


              // crtRow.push("Oui"); // always Oui
              // crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 2)); //date premiere rencontre - 2 jours
              // crtRow.push(heureDeRappel); // 11:00
              // crtRow.push("RAPPEL A");
              // crtRow.push("Non"); // always Non
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("Non");
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("");





//Rappel Gestionnaire

              crtRow.push("Oui");
              crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 1));
              crtRow.push(heureDeRappel);
              crtRow.push("J-1");

              crtRow.push("Non");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");

              crtRow.push("Non");
              crtRow.push("");
              crtRow.push("");
              crtRow.push("");


              // crtRow.push(this.DemandeService.displayMCIsRappelA(demande)); // always Oui
              // crtRow.push(this.DemandeService.displayTodayMinusDays(demande, -3));
              // crtRow.push(heureDeRappel); //11:00
              // crtRow.push("J+3");
              // crtRow.push(this.DemandeService.displayMCIsRappelB(demande));
              // crtRow.push(this.DemandeService.displayMCDateRappelB(demande));
              // crtRow.push(heureDeRappel);
              // crtRow.push("J-3");
              // crtRow.push("Oui");
              // crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 1));
              // crtRow.push(heureDeRappel);
              // crtRow.push("J-1");









// very old

              // crtRow.push(this.DemandeService.displayMCIsRappelA(demande)); // always Oui
              // // let today = moment();
              // crtRow.push(this.DemandeService.displayTodayMinusDays(demande, -3));
              // crtRow.push(heureDeRappel); // 11:00
              // crtRow.push("J+3");
              // crtRow.push(this.DemandeService.displayMCIsRappelB(demande)); // always Non
              // crtRow.push(this.DemandeService.displayMCDateRappelB(demande));
              // crtRow.push(heureDeRappel);
              // crtRow.push("J-3");
              // crtRow.push("Oui");
              // crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 1));
              // crtRow.push(heureDeRappel);
              // crtRow.push("J-1");
              // crtRow.push("Oui"); //always
              // crtRow.push(this.DemandeService.displayMCDateDebutMinusDays(demande, 1));//  //date premiere rencontre - 1 jours
              // crtRow.push(heureDeRappel); //11:00
              // crtRow.push("RAPPEL A");
              // crtRow.push("Non");
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("Non");
              // crtRow.push("");
              // crtRow.push("");
              // crtRow.push("");

    return crtRow;
  }


  employeurDQuery(isArchive:boolean)
  {


    return { exports_employeurD:isArchive};
  }

  employeurDProfileFilter(demande)
  {
    // MB XX -> change this to professionnel.is_premier_mandat. which always changes after wevery mandat
  //  create is_contrat_initial which doesn't change after READ
    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande))
   {
    return true;
   }else{
     return false;
   }
    // return true;
  }
  employeurDProfileFilterReasons(demande)
  {
    return "Ce n'est pas le premier mandat du professionnel";
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
  employeurDEmploiFilterReasons(demande)
  {
    return "Ce n'est pas le premier mandat du professionnel";
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
  employeurDGainsFilterReasons(demande)
  {
    let first=true;
    let reasons='';

    if(this.DemandeService.displayMCEmployeurDIsPremierMandat(demande)===false)
    {
      reasons+="Ce n'est pas le premier mandat du professionnel";
      first=false;
    }
    if(this.DemandeService.displayMCProfessionalStatutEmployment(demande)!=='Employé')
    {
      if(first===false)
      {
        reasons+=" - "
      }
      reasons+="Le statut du professionnel n'est pas Employé";
      first=false;
    }
    if(this.DemandeService.displayMCProfessionalStatutVacances(demande)!=='Inclus')
    {
      if(first===false)
      {
        reasons+=" - "
      }
      reasons+="Les vacances du professionnel n'est pas Inclus";
      first=false;
    }

    return reasons;

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
