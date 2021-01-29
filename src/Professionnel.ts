
import * as moment from 'moment';
import 'moment/locale/fr';

import { isNil } from 'lodash';
moment.locale('fr');
export class Professionnel {

  private emptyParameter = "";

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



  formatMyDate(date, format)
  {


    moment.locale('fr');
    var nd = moment(date);
    if(typeof format === 'undefined' || format === null || format === '')
    {
      format = this._Constants.default.dateFormats.exports;
    }

    return nd.format(format);
  }

  formatPhone=function(newVal)
  {

      if (isNil(newVal) || newVal.length == 0) {
        newVal = '';
      }

      else if (newVal.length <= 3) {

        newVal = newVal.replace(/^(\d{0,3})/, '($1)');

      } else if (newVal.length <= 6) {

        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');

      } else {

        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');

      }

      return newVal;

    }

    displayProfessionnelAddress(prof)
    {
      if(!isNil(prof) && !isNil(prof.place)&&!isNil(prof.place.formatted_address )){
        return prof.place.formatted_address ;
      }
      return this.emptyParameter;
    }

    displayProfessionnelAnneeGraduation(prof)
    {
      if(!isNil(prof) && !isNil(prof.graduation_year)){
        return prof.graduation_year;
      }
      return this.emptyParameter;
    }

    displayProfessionnelGraduationType(prof)
    {
      if(!isNil(prof) && !isNil(prof.graduation_type) ){
        return prof.graduation_type;
      }

      return this.emptyParameter;
    }

    getProfIsGraduated(prof)
    {
      if(!isNil(prof) && !isNil(prof.is_graduated) ){
        return prof.is_graduated;
      }

      return false;
    }


    displayProfessionnelSpecimenChequeValue(prof)
    {
      if(!isNil(prof) && !isNil(prof.specimen_cheque_present)){
        return prof.specimen_cheque_present;
      }
      return false;
    }
    displayProfessionnelSpecimenCheque(prof)
    {
      if(this.displayProfessionnelSpecimenChequeValue(prof)){
        return 'Oui';
      }
      return 'Non';
    }

    getProfessionnelClienteleDesiree(prof)
    {
      if(!isNil(prof) && !isNil(prof.clientele_desiree_multi)){
        return prof.clientele_desiree_multi;
      }
      return [];
    }

    displayProfessionnelAssignedToName(prof)
    {
      if(!isNil(prof) && !isNil(prof.assignedTo) && !isNil(prof.assignedTo.name) ){
        return prof.assignedTo.name;
      }

      return this.emptyParameter;
    }

    getProfessionnelDateOfBirth(prof)
    {
      if(!isNil(prof) && !isNil(prof.date_of_birth) ){
        return prof.date_of_birth;
      }

      return null;
    }

    getProfessionnelDateDernierContrat(prof)
    {
      if(!isNil(prof) && !isNil(prof.dernier_contrat) ){
        return prof.dernier_contrat;
      }

      return null;
    }


    getProfessionnelDepartmentList(prof)
    {
      if(!isNil(prof) && !isNil(prof.departement_list) ){
        return prof.departement_list;
      }

      return [];
    }

    getProfessionnelLangues(prof)
    {
      if(!isNil(prof) && !isNil(prof.langues) ){
        return prof.langues;
      }

      return [];
    }

    displayProfessionnelListe(prof)
    {
      if(!isNil(prof) && !isNil(prof.liste) ){
        return prof.liste;
      }

      return this.emptyParameter;
    }

    displayProfessionnelPrenom(prof)
    {
      if(!isNil(prof) && !isNil(prof.prenom) ){
        return prof.prenom;
      }

      return this.emptyParameter;
    }


    displayProfessionnelNom(prof)
    {
      if(!isNil(prof) && !isNil(prof.nom) ){
        return prof.nom;
      }

      return this.emptyParameter;
    }

    displayProfessionnelNotes(prof)
    {
      if(!isNil(prof) && !isNil(prof.notes) ){
        return prof.notes;
      }

      return this.emptyParameter;
    }

    displayProfessionnelOrdre(prof)
    {
      if(!isNil(prof) && !isNil(prof.ordre) ){
        return prof.ordre;
      }

      return this.emptyParameter;
    }

    getProfessionnelPrimeHoraire(prof)
    {
      if(!isNil(prof) && !isNil(prof.prime_horaire) ){
        return prof.prime_horaire;
      }

      return [];
    }

    getProfessionnelPrimeIntervention(prof)
    {
      if(!isNil(prof) && !isNil(prof.prime_intervention) ){
        return prof.prime_intervention;
      }

      return [];
    }

    displayProfessionnelProfessionPrincipale(prof)
    {
      if(!isNil(prof) && !isNil(prof.profession_principale) ){
        return prof.profession_principale;
      }

      return this.emptyParameter;
    }

    getProfessionnelReadExperienceAcquise(prof)
    {
      if(!isNil(prof) && !isNil(prof.read_experience_acquise) ){
        return prof.read_experience_acquise;
      }

      return [];
    }

    getProfessionnelReadFormationAdditionnelle(prof)
    {
      if(!isNil(prof) && !isNil(prof.read_formation_additionnelle) ){
        return prof.read_formation_additionnelle;
      }

      return [];
    }

    displayProfessionnelStatut(prof)
    {
      if(!isNil(prof) && !isNil(prof.professionel_statut) ){
        return prof.professionel_statut;
      }

      return this.emptyParameter;
    }

    getProfessionnelStatutEmploi(prof)
    {
      if(!isNil(prof) && !isNil(prof.statut_emploi) ){
        return prof.statut_emploi;
      }

      return [];
    }

    getProfessionnelTauxHoraire(prof)
    {
      if(!isNil(prof) && !isNil(prof.taux_horaire) ){
        return prof.taux_horaire;
      }

      return [];
    }

    getProfessionneTypeDispoMulti(prof)
    {
      if(!isNil(prof) && !isNil(prof.type_disponibilite_multi) ){
        return prof.type_disponibilite_multi;
      }

      return [];
    }

    getProfessionneUniversityMulti(prof)
    {
      if(!isNil(prof) && !isNil(prof.university_multi) ){
        return prof.university_multi;
      }

      return [];
    }















}
