import * as moment from 'moment';

export class Cahier {
    // private covered: boolean = false;
    /* Some code in here :) */

    private emptyParameter = "";


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
