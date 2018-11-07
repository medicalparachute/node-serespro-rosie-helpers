import * as moment from 'moment';

export class Cahier {
    // private covered: boolean = false;
    /* Some code in here :) */

    private emptyParameter = "";

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

}
