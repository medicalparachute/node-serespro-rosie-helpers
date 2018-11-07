import * as moment from 'moment';

export class Cahier {
    // private covered: boolean = false;
    /* Some code in here :) */

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


    var nd = moment(date);
    if(typeof format === 'undefined' || format === null || format === '')
    {
      format = this._Constants.default.dateFormats.exports;
    }

    return nd.format(format);
  }

  stringifyPhoneNumber(newVal)
  {
    // don't show braces for empty value
    if (newVal.length == 0) {
      newVal = '';
    }
    // don't show braces for empty groups at the end
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
    }
    return newVal;
  }
 // STUDENT
 displayStudentPrenom(cahier)
 {

    if(cahier != null
         && typeof cahier.student_prenom != 'undefined'
         && cahier.student_prenom != null


    ){
      return cahier.student_prenom;
    }


   return this.emptyParameter;
 }
 displayStudentNom(cahier)
 {
    if(cahier != null
         && typeof cahier.student_nom != 'undefined'
         && cahier.student_nom != null
    ){
      return cahier.student_nom;
    }
   return this.emptyParameter;
 }
 displayStudentFullName(cahier)
 {
   let name = this.displayStudentPrenom(cahier);
   name +=' ';
   name+=this.displayStudentNom(cahier);
   return name;
 }
 displayAnneeScolaire(cahier)
 {
   if(cahier != null
        && typeof cahier.anneeScolaire != 'undefined'
        && cahier.anneeScolaire != null
   ){
     return cahier.anneeScolaire;
   }
  return this.emptyParameter;
 }

 // PARENT
 displayParentPrenom(cahier)
 {
    if(cahier != null
         && typeof cahier.parent_prenom != 'undefined'
         && cahier.parent_prenom != null
    ){
      return cahier.parent_prenom;
    }
   return this.emptyParameter;
 }
 displayParentNom(cahier)
 {
    if(cahier != null
         && typeof cahier.parent_nom != 'undefined'
         && cahier.parent_nom != null
    ){
      return cahier.parent_nom;
    }
   return this.emptyParameter;
 }
 displayParentFullName(cahier)
 {
   let name = this.displayParentPrenom(cahier);
   name +=' ';
   name+=this.displayParentNom(cahier);
   return name;
 }

 displayParentPhone(cahier)
 {
   if(cahier != null
        && typeof cahier.parent_phone != 'undefined'
        && cahier.parent_phone != null
   ){
     return this.stringifyPhoneNumber(cahier.parent_phone);
   }
  return this.emptyParameter;
 }

 displayParentEmail(cahier)
 {
   if(cahier != null
        && typeof cahier.parent_email != 'undefined'
        && cahier.parent_email != null
   ){
     return cahier.parent_email;
   }
  return this.emptyParameter;
 }

 // ENSEIGNANT
 displayEnseignantPrenom(cahier)
 {
    if(cahier != null
         && typeof cahier.enseignant_prenom != 'undefined'
         && cahier.enseignant_prenom != null
    ){
      return cahier.enseignant_prenom;
    }
   return this.emptyParameter;
 }
 displayEnseignantNom(cahier)
 {
    if(cahier != null
         && typeof cahier.enseignant_nom != 'undefined'
         && cahier.enseignant_nom != null
    ){
      return cahier.enseignant_nom;
    }
   return this.emptyParameter;
 }
 displayEnseignantFullName(cahier)
 {
   let name = this.displayEnseignantPrenom(cahier);
   name +=' ';
   name+=this.displayEnseignantNom(cahier);
   return name;
 }

 // Equipe Ecole

 displayResponsableEcolePrenom(cahier)
 {
    if(cahier != null
         && typeof cahier.ecole_prenom != 'undefined'
         && cahier.ecole_prenom != null
    ){
      return cahier.ecole_prenom;
    }
   return this.emptyParameter;
 }
 displayResponsableEcoleNom(cahier)
 {
  if(cahier != null
         && typeof cahier.ecole_nom != 'undefined'
         && cahier.ecole_nom != null
    ){
      return cahier.ecole_nom;
    }
   return this.emptyParameter;
 }
 displayResponsableEcoleFullName(cahier)
 {
   let name = this.displayResponsableEcolePrenom(cahier);
   name +=' ';
   name+=this.displayResponsableEcoleNom(cahier);
   return name;
 }
 displayResponsableEcoleFonction(cahier)
 {
  if(cahier != null
         && typeof cahier.ecole_fonction != 'undefined'
         && cahier.ecole_fonction != null
    ){
      return cahier.ecole_fonction;
    }
   return this.emptyParameter;
 }
 displayResponsableEcoleEmail(cahier)
 {
  if(cahier != null
         && typeof cahier.ecole_email != 'undefined'
         && cahier.ecole_email != null
    ){
      return cahier.ecole_email;
    }
   return this.emptyParameter;
 }
 displayDateEcole(cahier)
 {
   if(cahier != null
          && typeof cahier.date_ecole != 'undefined'
          && cahier.date_ecole != null
     ){
       return this.formatMyDate(cahier.date_ecole, this._Constants.default.dateFormats.exports);
     }
    return this.emptyParameter;

 }
 displayEcoleBesoins(cahier)
 {
   if(cahier != null
          && typeof cahier.description_besoins != 'undefined'
          && cahier.description_besoins != null
     ){
       return cahier.description_besoins;
     }
    return this.emptyParameter;

 }
 displayEcoleInfosImportantes(cahier)
 {
   if(cahier != null
          && typeof cahier.infos_importantes != 'undefined'
          && cahier.infos_importantes != null
     ){
       return cahier.infos_importantes;
     }
    return this.emptyParameter;

 }

}
