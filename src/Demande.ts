
import * as moment from 'moment';
moment.locale('fr');
export class Demande {
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

    displayDemandeType(demande)
 {

    if(demande != null
         && typeof demande.demande_type != 'undefined'
         && demande.demande_type != null


    ){
      return demande.demande_type;
    }


   return this.emptyParameter;
 }

 displayDemandeTypeCode(demande)
 {
   if(demande != null
         && typeof demande.demande_type != 'undefined'
         && demande.demande_type != null


    ){
     if(demande.demande_type === 'Enfant' || demande.demande_type === 'CPE')
     {
       return '001';
     }
     if(demande.demande_type === 'Adulte')
     {
       return '002';
     }
     return '003';
    }


   return this.emptyParameter;
 }

 displayDemandeDateDebut(demande)
 {

    if(demande != null
         && typeof demande.date_debut_date != 'undefined'
         && demande.date_debut_date != null

    ){
      return this.formatMyDate(demande.date_debut_date, this._Constants.default.dateFormats.exports);//demande.date_debut.date;
    }


   return this.emptyParameter;
 }

 displayCourrielEnvoiContrat(demande)
 {
   var type = this.displayDemandeType(demande);
   if(type !=  this.emptyParameter)
   {
     if(type === 'Enfant'|| type==='Adulte')
     {

       return this.displayPersonneEmail(demande.interlocuteur, 0);  // MB XX change from client to interlocuteur
     }else{

       return this.displayMCResponsableContratEmail(demande);  //MB XX verify this is RESPONSABLE_CONTRAT
     }
   }
   return this.emptyParameter;
 }

 displayCourrielEnvoiFacture(demande)
 {
   var type = this.displayDemandeType(demande);
   if(type !=  this.emptyParameter)
   {
     if(type === 'Enfant'|| type==='Adulte')
     {

       return this.displayPersonneEmail(demande.interlocuteur, 0);  // MB XX change client to interlocuteur
     }else{

       //return this.displayInterlocuteurEmail(demande);        //  MB XX change client to PAYABLE
       return this.displayBillingEmail(demande, 0);
     }
   }

   return this.emptyParameter;
 }

 displayDemandeDateFin(demande)
 {

    if(demande != null
         && typeof demande.date_fin != 'undefined'
         && demande.date_fin != null
         && typeof demande.date_fin.date != 'undefined'
         && demande.date_fin.date != null



    ){
      return this.formatMyDate(demande.date_fin.date, this._Constants.default.dateFormats.exports);//demande.date_fin.date;
    }


   return this.emptyParameter;
 }

 displaySommaireDesTaches(demande)
 {

  if(demande != null
         && typeof demande.sommaire_taches != 'undefined'
         && demande.sommaire_taches != null
         && demande.sommaire_taches != ''
    ){
      return demande.sommaire_taches;
    }


   return this.emptyParameter;

 }

 displayShortID(demande)
 {
     if(demande != null
           && typeof demande.id != 'undefined'
           && demande.id != null

      ){
        return demande.id;
     //   var tmp = demande.id.toString();
     // var size = 3;
     //   return tmp.substr(tmp.length-size, tmp.length);

     }

     return this.emptyParameter;
 }

   displayNumeroDeContrat(demande)
 {

 //   if(demande != null
 //         && typeof demande._id != 'undefined'
 //         && demande._id != null

 //    ){
 //     return demande._id;
 //   }
 // return this.emptyParameter;

     if(demande != null
             && typeof demande.createdAt != 'undefined'
             && demande.createdAt != null

        ){

         var nd = moment(demande.createdAt);
       var out = 'C'+nd.format('YYMMDD')+this.displayShortID(demande);
         return out;
       }
     return this.emptyParameter;


 }


 displayClientIdOgustClient(demande)
 {
    // if(demande != null
    //     && typeof demande.client != 'undefined'
    //     && demande.client != null
    //
    //
    // ){
    //   return this.displayPersonnePhone(demande.client,0)+ this.displayPersonnePhone(demande.client,1) +  this.displayPersonnePhone(demande.client,2);
    // }

    if(demande != null
        && typeof demande.client != 'undefined'
        && demande.client != null
        && typeof demande.client.ogustId != 'undefined'
        && demande.client.ogustId != null

    ){
      return demande.client.ogustId;
    }


   return this.emptyParameter;

 }

 displayClientGender(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.gender != 'undefined'
         && demande.client.gender != null
         && typeof this._Constants.default.sexe[demande.client.gender] != 'undefined'
    ){
      return this._Constants.default.sexe[demande.client.gender].civilite;
    }


   return this.emptyParameter;
 }

 displayClientAge(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.date_of_birth != 'undefined'
         && demande.client.date_of_birth != null

    ){
      // return this._Constants.default.sexe[demande.client.gender].civilite;
      let birthday = new Date(demande.client.date_of_birth);

      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }


   return this.emptyParameter;
 }

 displayClientReference(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.reference != 'undefined'
         && demande.client.reference != null
         && demande.client.reference != ''

    ){
      return demande.client.reference;
    }


   return this.emptyParameter;
 }

 displayClientOrigine(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.origine != 'undefined'
         && demande.client.origine != null
         && demande.client.origine != ''

    ){
      return demande.client.origine;
    }
   return this.emptyParameter;
 }

 displayClientIsPremierMandat(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.is_premier_mandat != 'undefined'
         && demande.client.is_premier_mandat != null
         && demande.client.is_premier_mandat != ''

    ){
      return demande.client.is_premier_mandat;
    }
   return this.emptyParameter;
 }

 displayClientPrenom(demande)
 {

   let demande_type = this.displayDemandeType(demande);

   if(demande_type === 'Clinique Privée' || demande_type === 'CPE')
   {
     return this.displayClientPrenomAS(demande);
   }

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.prenom != 'undefined'
         && demande.client.prenom != null

    ){
      return demande.client.prenom;
    }


   return this.emptyParameter;
 }

 displayClientPrenomAS(demande)
 {

   let str ='A/S ' +  this.displayInterlocuteurGender(demande) + ' ' + this.displayInterlocuteurPrenom(demande) + ' ' + this.displayInterlocuteurNom(demande);
   return str;
 }

 displayClientNom(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.nom != 'undefined'
         && demande.client.nom != null

    ){
      return demande.client.nom;
    }


   return this.emptyParameter;
 }

 displayClientFullName(demande)
 {




   return (this.displayClientPrenom(demande) +' '+ this.displayClientNom(demande));
 }

 displayClientDOB(demande)
 {

    if(demande != null
         && typeof demande.client != 'undefined'
         && demande.client != null
         && typeof demande.client.date_of_birth != 'undefined'
         && demande.client.date_of_birth != null

    ){
      return this.formatMyDate(demande.client.date_of_birth, this._Constants.default.dateFormats.exports);
    }


   return this.emptyParameter;
 }

 displayDomicileAddressApt(demande)
 {
   if(demande != null
         && typeof demande.domicile != 'undefined'
         && demande.domicile != null
         && typeof demande.domicile.address != 'undefined'
         && demande.domicile.address != null
         && typeof demande.domicile.address.apt != 'undefined'
         && demande.domicile.address.apt != null
    ){


     return demande.domicile.address.apt;
   }
 return this.emptyParameter;
 }

 displayClientAddressExport(demande)
 {
   if(typeof demande.client!='undefined'
      && demande.client !=null
    ){
      return this.displayAddressExport(demande.client);
    }
    return this.emptyParameter;
 }

 displayAddressApt(address)
 {
   if(address != null

         && typeof address.apt != 'undefined'
         && address.apt != null
    ){


     return address.apt;
   }
 return this.emptyParameter;
 }

 displayAddressCodePostal(address)
 {
   if(address != null

         && typeof address.postal != 'undefined'
         && address.postal != null
    ){


     return address.postal;
   }
 return this.emptyParameter;
 }

 displayAddressExport(address)
 {
 if(address != null

        && typeof address.number != 'undefined'
        && address.number != null
        && typeof address.street != 'undefined'
        && address.street != null
   ){

   var addr = address.number+", "+address.street;
   var apt =this.displayAddressApt(address);
   if(apt!=this.emptyParameter)
   {
     addr+= ' apt '+apt;
   }
   // var apt = this.
    return addr;
  }
 return this.emptyParameter;
 }



 displayAddressFromPos(person, posIndex)
 {

 }


 displayBillingAddressExport(demande)
 {
   let personne = this.getBillingPerson(demande);
   if(personne!==null)
   {
     let address = this.getPOSAddress(personne, 0);
     if(address!== null )
     {
        return this.displayAddressExport(address);
     }
   }
     return this.emptyParameter;
 }
 displayBillingPostal(demande)
 {
   let personne = this.getBillingPerson(demande);
   if(personne!==null)
   {
     let address = this.getPOSAddress(personne, 0);
     if(address!== null )
     {
        return this.displayAddressCodePostal(address);
     }
   }
     return this.emptyParameter;
 }

  displayDomicileAddressExport(demande)
 {
   return this.displayAddressCodePostal(demande);
   //return this.displayClientAddressExport(demande);


 }
 displayDomicileCodePostal(demande)
 {
 //  if(demande != null
 //         && typeof demande.domicile != 'undefined'
 //         && demande.domicile != null
 //         && typeof demande.domicile.address != 'undefined'
 //         && demande.domicile.address != null
 //         && typeof demande.domicile.address.postal != 'undefined'
 //         && demande.domicile.address.postal != null
 //    ){
 //     return demande.domicile.address.postal;
 //   }
 // return this.emptyParameter;

      // if(demande != null
      //   && typeof demande.client != 'undefined'
      //   && demande.client != null
      // ){
      //      return this.displayAddressCodePostal(demande.client);
      //    }
      //    return this.emptyParameter;

      return this.displayBillingPostal(demande);

 }

 displayAssignation(demande)
 {
   if(demande != null
         && typeof demande.assignedTo != 'undefined'
         && demande.assignedTo != null
         && typeof demande.assignedTo.name_export != 'undefined'
         && demande.assignedTo.name_export != null
         && demande.assignedTo.name_export != ''

    ){
     return demande.assignedTo.name_export;
   }
 return this.emptyParameter;
 }

 displayAssignationName(demande)
 {
   if(demande != null
         && typeof demande.assignedTo != 'undefined'
         && demande.assignedTo != null
         && typeof demande.assignedTo.name != 'undefined'
         && demande.assignedTo.name != null
         && demande.assignedTo.name != ''

    ){
     return demande.assignedTo.name;
   }
 return this.emptyParameter;
 }


 displayClientPhone(client, index)
 {
   if(client != null
         && typeof client.phones != 'undefined'
         && client.phones != null
         && client.phones.length>index
         && index>=0
         && typeof client.phones[index].number != 'undefined'


    ){
     return client.phones[index].number;
   }
 return this.emptyParameter;
 }


 displayPersonneEmail(personne, index)
 {
   if(personne != null
         && typeof personne.emails != 'undefined'
         && personne.emails != null
         && personne.emails.length>index
         && index>=0
         && typeof personne.emails[index].address != 'undefined'


    ){
     return personne.emails[index].address;
   }
 return this.emptyParameter;
 }

 displayPersonneEmailByType(personne, _type)
 {
   if(personne != null
         && typeof personne.emails != 'undefined'
         && personne.emails != null
         && personne.emails.length>0
         //&& index>=0
         //&& typeof personne.emails[index].address != 'undefined'


    ){
      for(let email of personne.emails)
      {
        if(email._type===_type){
          return email.address
        }

      }
    // return personne.emails[index].address;
   }
 return this.emptyParameter;
 }


 displayPersonnePhone(personne, index)
 {
   if(personne != null
         && typeof personne.phones != 'undefined'
         && personne.phones != null
         && personne.phones.length>index
         && index>=0
         && typeof personne.phones[index].number != 'undefined'


    ){
     return personne.phones[index].number;
   }
 return this.emptyParameter;
 }

 // displayPersonnePhoneByType(personne, _type)
 // {
 //   if(personne != null
 //         && typeof personne.phones != 'undefined'
 //         && personne.phones != null
 //         && personne.phones.length>0
 //         //&& index>=0
 //         //&& typeof personne.emails[index].address != 'undefined'
 //
 //
 //    ){
 //      for(let phone of personne.phones)
 //      {
 //        if(phone._type===_type){
 //          return phone.number
 //        }
 //
 //      }
 //    // return personne.emails[index].address;
 //   }
 // return this.emptyParameter;
 // }


 getPersonnePhones(personne)
 {
   if(personne != null
         && typeof personne.phones != 'undefined'
         && personne.phones != null
         && personne.phones.length>0


    ){
      return personne.phones;
    }
    return [];
 }

 displayPersonnePhoneByType(personne, type)
 {
   let phone = this.getPersonnePhoneByType(personne, type);
  return this.displayPhone(phone);
 }

 getPersonnePhoneByType(personne, type)
 {
   let phones = this.getPersonnePhones(personne);
   for(let phone of phones)
   {
     if(phone._type === type)
     {
      return phone
     }
   }

   return null;
 }


 displayPersonnePhoneWork(personne)
 {
   return this.displayPersonnePhoneByType(personne, 'WORK');
 }
 displayPersonnePhoneCell(personne)
 {
   return this.displayPersonnePhoneByType(personne, 'CELL');
 }
 displayPersonnePhoneHome(personne)
 {
   return this.displayPersonnePhoneByType(personne, 'HOME');
 }
displayPhone(phone)
{
  let str = '';
  if(phone!==null && typeof phone.number!=='undefined' && phone.number!==null)
  {
    str+=phone.number;
  }
  if(phone!==null && typeof phone.ext!=='undefined' && phone.ext!==null && phone.ext!=='')
  {
    str+='('+phone.ext+')';
  }

  return str;
}

displayBillingPhoneHome(demande)
{
  let personne = this.getInterlocuteurOrPayerPerson(demande);

  return this.displayPersonnePhoneHome(personne);
}
displayBillingPhoneWork(demande)
{
  let personne = this.getInterlocuteurOrPayerPerson(demande);
  return this.displayPersonnePhoneWork(personne);
}
displayBillingPhoneCell(demande)
{
  let personne = this.getInterlocuteurOrPayerPerson(demande);
  return this.displayPersonnePhoneCell(personne);
}

 displayCellPhone(demande)
 {
   if(demande != null
         && typeof demande.phones != 'undefined'
         && demande.phones != null
         && typeof demande.phones.cell != 'undefined'
         && demande.phones.cell != null
         && typeof demande.phones.cell.number != 'undefined'
         && demande.phones.cell.number != null
         && demande.phones.cell.number != ''

    ){
     return demande.phones.cell.number;
   }
 return this.emptyParameter;
 }

 displayHomePhone(demande)
 {
   if(demande != null
         && typeof demande.phones != 'undefined'
         && demande.phones != null
         && typeof demande.phones.home != 'undefined'
         && demande.phones.home != null
         && typeof demande.phones.home.number != 'undefined'
         && demande.phones.home.number != null
         && demande.phones.home.number != ''

    ){
     return demande.phones.home.number;
   }
 return this.emptyParameter;
 }

 displayWorkPhone(demande)
 {
   if(demande != null
         && typeof demande.phones != 'undefined'
         && demande.phones != null
         && typeof demande.phones.work != 'undefined'
         && demande.phones.work != null
         && typeof demande.phones.work.number != 'undefined'
         && demande.phones.work.number != null
         && demande.phones.work.number != ''

    ){
     return demande.phones.work.number;
   }
 return this.emptyParameter;
 }

 displayPrimaryEmail(demande)
 {
   if(demande != null
         && typeof demande.emails != 'undefined'
         && demande.emails != null
         && typeof demande.emails.primary != 'undefined'
         && demande.emails.primary != null
         && typeof demande.emails.primary.address != 'undefined'
         && demande.emails.primary.address != null
         && demande.emails.primary.address != ''

    ){
     return demande.emails.primary.address;
   }
 return this.emptyParameter;
 }


 displayEmailForPersonne(personne, index)
 {
   if(personne!==null
      && typeof personne.emails!=='undefined'
      && personne.emails!==null  && personne.emails.length>index && index>=0
      && typeof personne.emails[index].address !=='undefined'
      && personne.emails[index].address !==null
    )
    {
      return personne.emails[index].address;
    }
    return this.emptyParameter;
 }
 displayBillingEmail(demande, index)
 {
   let personne = this.getInterlocuteurOrPayerPerson(demande);
   return this.displayEmailForPersonne(personne, index);
 }


displayPersonneGender(personne)
{
  if(personne != null
       && typeof personne.gender != 'undefined'
       && personne.gender != null
       && typeof this._Constants.default.sexe[personne.gender] != 'undefined'
  ){
    return this._Constants.default.sexe[personne.gender].civilite;
  }


 return this.emptyParameter;
}

 displayInterlocuteurGender(demande)
 {

   let personne = this.getInterlocuteurOrPayerPerson(demande);
   return this.displayPersonneGender(personne);

   //  if(demande != null
   //       && typeof demande.interlocuteur != 'undefined'
   //       && demande.interlocuteur != null
   //       && typeof demande.interlocuteur.gender != 'undefined'
   //       && demande.interlocuteur.gender != null
   //       && typeof this._Constants.default.sexe[demande.interlocuteur.gender] != 'undefined'
   //  ){
   //    return this._Constants.default.sexe[demande.interlocuteur.gender].civilite;
   //  }
   //
   //
   // return this.emptyParameter;
 }

 displayInterlocuteurPrenom(demande)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.prenom != 'undefined'
         && demande.interlocuteur.prenom != null
         && demande.interlocuteur.prenom != ''

    ){
      return demande.interlocuteur.prenom;
    }


   return this.emptyParameter;
 }

 displayInterlocuteurNom(demande)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.nom != 'undefined'
         && demande.interlocuteur.nom != null
         && demande.interlocuteur.nom != ''

    ){
      return demande.interlocuteur.nom;
    }


   return this.emptyParameter;
 }

 displayInterlocuteurFullName(demande)
 {
   return (this.displayInterlocuteurPrenom(demande) + ' ' + this.displayInterlocuteurNom(demande))
 }

 displayInterlocuteurFonction(demande)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.fonction != 'undefined'
         && demande.interlocuteur.fonction != null
         && demande.interlocuteur.fonction != ''

    ){
      return demande.interlocuteur.fonction;
    }


   return this.emptyParameter;
 }
 displayInterlocuteurReference(demande)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.reference != 'undefined'
         && demande.interlocuteur.reference != null
         && demande.interlocuteur.reference != ''

    ){
      return demande.interlocuteur.reference;
    }


   return this.emptyParameter;
 }

 displayInterlocuteurEmail(demande)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.emails != 'undefined'
         && demande.interlocuteur.emails != null
         && typeof demande.interlocuteur.emails.primary != 'undefined'
         && demande.interlocuteur.emails.primary != null
         && typeof demande.interlocuteur.emails.primary.address != 'undefined'
         && demande.interlocuteur.emails.primary.address != null
         && demande.interlocuteur.emails.primary.address != ''

    ){
      return demande.interlocuteur.emails.primary.address;
    }


   return this.emptyParameter;
 }

 displayInterlocuteurPhone(demande, index)
 {

    if(demande != null
         && typeof demande.interlocuteur != 'undefined'
         && demande.interlocuteur != null
         && typeof demande.interlocuteur.phones != 'undefined'
         && demande.interlocuteur.phones != null
         && index >=0
         && demande.interlocuteur.phones.length >index


    ){
      return demande.interlocuteur.phones[index].number;
    }


   return this.emptyParameter;
 }

 displayEtablissement(demande)
 {
   let client = this.getClient(demande);
   if(client!==null)
   {
     let pos = this.getPOS(client, 0);
     if(pos!==null && pos.etablissement!=='undefined' && pos.etablissement!==null)
     {
       return pos.etablissement;
     }else{
       return 'N/A';
     }
   }//client notnull


    // if(demande != null
    //      && typeof demande.etablissement != 'undefined'
    //      && demande.etablissement != null
    //      && typeof demande.etablissement.name != 'undefined'
    //      && demande.etablissement.name != null
    //      && demande.etablissement.name != ''
    //
    // ){
    //   return demande.etablissement.name;
    // }
    //

   return 'N/A';//this.emptyParameter;
 }



 displayAnneeScolaire(demande)
 {


    if(demande != null
         && typeof demande.anneeScolaire != 'undefined'
         && demande.anneeScolaire != null
         && demande.anneeScolaire.name != null
         && demande.anneeScolaire.name != ''

    ){
      return demande.anneeScolaire.name;
    }


   return this.emptyParameter;
 }


 displayLieuDeRencontreLigne1(demande)
 {

   return this.displayLieuDeRencontreName(demande);
 }

 displayLieuDeRencontreLigne2(demande)
 {
   var tiret = '';
   if(this.displayLieuDeRencontreApt(demande)!= this.emptyParameter)
   {
     tiret=' - ';
   }

  return ( this.displayLieuDeRencontreApt(demande)+ tiret +this.displayLieuDeRencontreNumber(demande) + ' ' + this.displayLieuDeRencontreStreet(demande) ).toUpperCase();

 }

 displayLieuDeRencontreLigne3(demande)
 {

  return ( this.displayLieuDeRencontreCity(demande) + ' ' +  this.displayLieuDeRencontreProvince(demande) + ' ' + this.displayLieuDeRencontrePostal(demande)).toUpperCase();

 }

 displayLieuDeRencontreUneLigne(demande)
 {

   return (this.displayLieuDeRencontreLigne2(demande) + ', ' + this.displayLieuDeRencontreLigne3(demande)).toUpperCase();
 }

 displayLieuDeRencontreUneLigneWithName(demande)
 {

   return this.displayLieuDeRencontreLigne1(demande) +': '+(this.displayLieuDeRencontreLigne2(demande) + ' ' + this.displayLieuDeRencontreLigne3(demande)).toUpperCase();
 }


  displayLieuDeRencontreNumber(demande)
 {
   if(demande != null
         && typeof demande.rencontre_number != 'undefined'
         && demande.rencontre_number != null
         // && typeof demande.place_and_address.address != 'undefined'
         // && demande.place_and_address.address != null
         // && typeof demande.place_and_address.address.number != 'undefined'
         // && demande.place_and_address.address.number != null
         // && demande.place_and_address.address.number != ''

    ){
      return demande.rencontre_number;

    //number: String,
 // street: String,
 // apt: String,
 // city: String,
 // province: String,
 // postal: String,
    }


   return this.emptyParameter;
 }

 displayLieuDeRencontreStreet(demande)
 {
   if(demande != null
         && typeof demande.rencontre_street != 'undefined'
         && demande.rencontre_street != null

    ){
      return demande.rencontre_street;

    }


   return this.emptyParameter;
 }

 displayLieuDeRencontreApt(demande)
 {
   if(demande != null
         && typeof demande.rencontre_apt != 'undefined'
         && demande.rencontre_apt != null

    ){
      return demande.rencontre_apt;

    }


   return this.emptyParameter;
 }

 displayLieuDeRencontreName(demande)
 {
   if(demande != null
         && typeof demande.rencontre_name != 'undefined'
         && demande.rencontre_name != null

    ){
      return demande.rencontre_name;

    }


   return this.emptyParameter;
 }

 displayLieuDeRencontreCity(demande)
 {
   if(demande != null
         && typeof demande.rencontre_city != 'undefined'
         && demande.rencontre_city != null

    ){
      return demande.rencontre_city;

    }


   return this.emptyParameter;
 }

 displayLieuDeRencontreProvince(demande)
 {
   if(demande != null
         && typeof demande.rencontre_provice != 'undefined'
         && demande.rencontre_provice != null

    ){
      return 'QC';//demande.place_and_address.address.province;

    }


   return this.emptyParameter;
 }

 displayLieuDeRencontrePostal(demande)
 {
   if(demande != null
         && typeof demande.rencontre_postal != 'undefined'
         && demande.rencontre_postal != null

    ){
      return demande.rencontre_postal;

    }


   return this.emptyParameter;
 }



   displayCourrielAutoPremiereRencontre(demande)
 {

   // take from service
   // make one for Client (Contrat Client), and one function for intervenant (Contrat Travail)

   if(demande != null
         && typeof demande.demande_type != 'undefined'
         && demande.demande_type != null

    ){
     if(demande.demande_type === 'Enfant' || demande.demande_type === 'Adulte')
     {
       return 'Oui';
      //return demande.place_and_address.address.postal;
     }
     else{
       return 'Non';
     }

    }


   return this.emptyParameter;


 }

 displayFrequence(demande)
 {
   if(demande != null
         && typeof demande.frequence != 'undefined'
         && demande.frequence != null

    ){
      return demande.frequence;

    }


   return this.emptyParameter;
 }

displayServiceJSON(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null

    ){
     return JSON.stringify(demande.service);
   }
 return this.emptyParameter;
 }


 displayServiceSecteur(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.secteur != 'undefined'
         && demande.service.secteur != null
         && typeof demande.service.secteur.name != 'undefined'
         && demande.service.secteur.name != null
         && demande.service.secteur.name != ''
    ){
     return demande.service.secteur.name;
   }
 return this.emptyParameter;
 }

 displayServiceMCType(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.mandat_comble != 'undefined'
         && demande.service.mandat_comble != null
    ){
     return demande.service.mandat_comble;
   }
 return this.emptyParameter;
 }

 displayServiceName(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.name != 'undefined'
         && demande.service.name != null
         && demande.service.name != ''
    ){
     return demande.service.name;
   }
 return this.emptyParameter;
 }

 displayServiceMetier(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.metier != 'undefined'
         && demande.service.metier != null
         && typeof demande.service.metier.code != 'undefined'
         && demande.service.metier.code != null
         && demande.service.metier.code != ''
    ){
     return demande.service.metier.code;
   }
 return this.emptyParameter;
 }

 displayServiceFeuilleDeTempsSign(demande)
 {
   //return  JSON.stringify(demande.services.service);
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_feuille_de_temps_sign != 'undefined'
         && demande.service.is_feuille_de_temps_sign != null
         && demande.service.is_feuille_de_temps_sign != ''
         && demande.service.is_feuille_de_temps_sign === true
    ){
     return "Oui";
   }
 return "Non";
 }

 displayServiceIntervenantPortailWeb(demande)
 {
   //return  JSON.stringify(demande.services.service);
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_feuille_de_temps_sign != 'undefined'
         && demande.service.is_feuille_de_temps_sign != null
         && demande.service.is_feuille_de_temps_sign != ''
         && demande.service.is_feuille_de_temps_sign === true
    ){
     return "Non";
   }
 return "Oui";
 }
 displayServiceClientPortailWeb(demande)
 {
   //return  JSON.stringify(demande.services.service);
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_portail_web_client != 'undefined'
         && demande.service.is_portail_web_client != null
         && demande.service.is_portail_web_client != ''
         && demande.service.is_portail_web_client === true
    ){
     return "Oui";
   }
 return "Non";
 }

 displayServiceCompteRenduObligatoire(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_compte_rendu_obligatoire != 'undefined'
         && demande.service.is_compte_rendu_obligatoire != null
         && demande.service.is_compte_rendu_obligatoire != ''
         && demande.service.is_compte_rendu_obligatoire === true
    ){
     return "Oui";
   }
 return "Non";
 }


  displayServiceHeuresParSemaineEstime(demande)
 {
   if(demande != null
         && typeof demande.heures_par_semaine_estimation != 'undefined'
         && demande.heures_par_semaine_estimation != null
         && demande.heures_par_semaine_estimation != ''
    ){
     return demande.heures_par_semaine_estimation;
   }
 return this.emptyParameter;
 }

 displayServiceHeuresParSemaineGuaranties(demande)
 {
   if(demande != null
         && typeof demande.heures_par_semaine_garanties != 'undefined'
         && demande.heures_par_semaine_garanties != null
         && demande.heures_par_semaine_garanties != ''
    ){
     return demande.heures_par_semaine_garanties;
   }
 return this.emptyParameter;
 }

  displayServiceJoursParSemaine(demande)
 {
   if(demande != null
         && typeof demande.jours_par_semaine != 'undefined'
         && demande.jours_par_semaine != null
         && demande.jours_par_semaine != ''
    ){
     return demande.jours_par_semaine;
   }
 return this.emptyParameter;
 }

 displayServiceCourrielSuiviClient(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_courriel_suivi_client != 'undefined'
         && demande.service.is_courriel_suivi_client != null
         && demande.service.is_courriel_suivi_client != ''
         && demande.service.is_courriel_suivi_client ===true
    ){
     return "Oui";
   }
 return "Non";

 }
 displayServiceCourrielSuiviIntervenant(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.is_courriel_suivi_intervenant != 'undefined'
         && demande.service.is_courriel_suivi_intervenant != null
         && demande.service.is_courriel_suivi_intervenant != ''
         && demande.service.is_courriel_suivi_intervenant ===true
    ){
     return "Oui";
   }
 return "Non";

 }


 getSubServices(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.subServices != 'undefined'
         && demande.service.subServices != null
    ){
     return demande.service.subServices;
   }
 return [];
 }

 displaySubServiceUnit(subservice)
 {
    if(subservice != null
         && typeof subservice.units != 'undefined'
         &&  subservice.units != null
    ){
     return  subservice.units;
   }
   return this.emptyParameter;
 }
 displaySubServicePrice(subservice)
 {
    if(subservice != null
         && typeof subservice.price != 'undefined'
         &&  subservice.price != null
    ){
     return  subservice.price;
   }
   return 0;
 }
 displaySubServiceQuantity(subservice)
 {
    if(subservice != null
         && typeof subservice.quantity != 'undefined'
         &&  subservice.quantity != null
    ){
     return  subservice.quantity;
   }
   return 0;
 }
 displaySubServiceDuree(subservice)
 {
    if(subservice != null
         && typeof subservice.duree != 'undefined'
         &&  subservice.duree != null
    ){
     return  subservice.duree;
   }
   return 0;
 }
 displayServiceEstimatedPrice(demande)
 {
 



   let priceCount = 0;
   let subservices = this.getSubServices(demande);
   for(let subservice of subservices)
   {
     let unit = this.displaySubServiceUnit(subservice);
     let price = parseFloat(this.displaySubServicePrice(subservice));
     let qty = parseFloat(this.displaySubServiceQuantity(subservice));
     let duree = parseFloat(this.displaySubServiceDuree(subservice));

     if(unit === 'Qte')
     {
       priceCount+= qty * (duree / 60) * price;

     }

     if(unit === 'H')
     {
       priceCount+= qty *  price;
     }
   }
   return priceCount;
 }

 displayParticularitesNotes(demande)
 {
   if(demande != null
         && typeof demande.notes != 'undefined'
         && demande.notes != null
    ){
     return demande.notes ;
   }
 return this.emptyParameter;
 }

 // displayParticularitesPartenariat(demande)
 // {
 //   if(demande != null
 //         && typeof demande.notes != 'undefined'
 //         && demande.notes != null
 //    ){
 //     return demande.notes ;
 //   }
 // return this.emptyParameter;
 // }




 translateCodage(demande, item, index)
 {

   item = item.replace(/tarif_date/g, this.displayMCTarifDate(demande, index, 0));
   item = item.replace(/tarif_heure/g, this.displayMCTarifHeure(demande, index, 0));

      item = item.replace(/prof_prenom/g, this.displayMCProfessionalPrenom(demande));
   item = item.replace(/prof_nom/g, this.displayMCProfessionalNom(demande));
   item = item.replace(/prof_permis/g, this.displayMCProfessionalPermis(demande));
   item = item.replace(/prof_civilite/g, this.displayMCProfessionalGender(demande));
   item = item.replace(/prof_specialisation/g, this.displayMCProfessionalSpeciality(demande));
   // item = item.replace(/;/g, '\;');
    item = item.replace(/\n/g, " ");


   return item;
 }



 displayServiceDescription(demande, index)
 {

   if(demande != null
         && typeof demande.services != 'undefined'
         && demande.services != null
         && typeof demande.services.service != 'undefined'
         && demande.services.service != null
         && typeof demande.services.service.sub_services != 'undefined'
         && demande.services.service.sub_services != null
         && demande.services.service.sub_services != ''
         && demande.services.service.sub_services.length > 0
         && demande.services.service.sub_services.length > index
        && typeof demande.services.service.sub_services[index].description != 'undefined'
        && demande.services.service.sub_services[index].description != null
        && demande.services.service.sub_services[index].description != ''
    ){
     return this.translateCodage(demande, demande.services.service.sub_services[index].description, index);
   }
 return this.emptyParameter;
 }


 displayServiceModeDeTransmission(demande)
 {
   if(demande != null
         && typeof demande.demande_type != 'undefined'
         && demande.demande_type != null
         && demande.demande_type != ''
    ){

     if(demande.demande_type === 'Enfant' || demande.demande_type === 'Adulte')
     {

       if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_mode_de_transmission != 'undefined'
         && demande.mandatComble.particularites_mode_de_transmission != null
         &&  demande.mandatComble.particularites_mode_de_transmission != ''
        )
       {
         return  demande.mandatComble.particularites_mode_de_transmission;
       }else{
         return  this.emptyParameter;
       }


     }else{
       return 'Email';
     }

     //return demande.services.service.contratClient.code;
   }
 return this.emptyParameter;
 }


 getServiceCodeDeContratClient(demande)
 {
   // MB XX si form MC_READ ->
   //                 si date_fin_indeterminee ->
   //                           demande.service.contratClient.code + ' ' + - +' ' + CDI
   //                 si date_fin_indeterminee===false ->
   //                           demande.service.contratClient.code + ' ' + - +' ' + CDD



   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratClient != 'undefined'
         && demande.service.contratClient != null
         && typeof demande.service.contratClient.code != 'undefined'
         && demande.service.contratClient.code != null
         && demande.service.contratClient.code != ''
    ){
     return demande.service.contratClient.code;
   }
   return this.emptyParameter;
 }
 displayServiceCodeDeContratClient(demande)
 {


   let mcType = this.displayMCType(demande);
   let SCT = this.getServiceCodeDeContratClient(demande);
   if(SCT===this.emptyParameter)
   {
     return this.emptyParameter;
   }

   if(mcType==='READ')
   {
     let dateFinIndet = this.getRencontreDateFinIndeterminee(demande, 0,0);
     let str = SCT;
     if(dateFinIndet===true)
     {
       str+=' - CDI'
     }else{
       str+=' - CDD'
     }
     return str;
   }// end READ

   return SCT;
 }

 displayServiceModeleDeSuiviEmail(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.modeleDeSuiviEmail != 'undefined'
         && demande.service.modeleDeSuiviEmail != null
         && typeof demande.service.modeleDeSuiviEmail.code != 'undefined'
         && demande.service.modeleDeSuiviEmail.code != null
         && demande.service.modeleDeSuiviEmail.code != ''
    ){
     return demande.service.modeleDeSuiviEmail.code;
   }
 return this.emptyParameter;
 }

 displayServiceModeleDeSuiviEmailWithAssignation(demande)
 {
   // MB xx -> only enfant / adulte. if not -> return this.emptyParameter;
   let demande_type = this.displayDemandeType(demande);
   if(demande_type==='Enfant' || demande_type==='Adulte')
   {
     var code = this.displayServiceModeleDeSuiviEmail(demande);

     if(code === this.emptyParameter)
     {
       return this.emptyParameter;
     }

     code =  code + ' - ' + this.displayAssignation(demande);
     return code;
   }else{
     return this.emptyParameter;
   }

 }

 displayServiceCodeDeContratClientEmail(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratClientEmail != 'undefined'
         && demande.service.contratClientEmail != null
         && typeof demande.service.contratClientEmail.code != 'undefined'
         && demande.service.contratClientEmail.code != null
         && demande.service.contratClientEmail.code != ''
    ){
     return demande.service.contratClientEmail.code;
   }
 return this.emptyParameter;
 }

 displayServiceCodeDeContratTravail(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratTravail != 'undefined'
         && demande.service.contratTravail != null
         && typeof demande.service.contratTravail.code != 'undefined'
         && demande.service.contratTravail.code != null
         && demande.service.contratTravail.code != ''
    ){
     return demande.service.contratTravail.code;
   }
 return this.emptyParameter;
 }

 displayServiceCodeDeContratTravailEmail(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratTravailEmail != 'undefined'
         && demande.service.contratTravailEmail != null
         && typeof demande.service.contratTravailEmail.code != 'undefined'
         && demande.service.contratTravailEmail.code != null
         && demande.service.contratTravailEmail.code != ''
    ){
     return demande.service.contratTravailEmail.code;
   }
 return this.emptyParameter;
 }

 displayServiceContratPrepaiementEmailCode(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratPrepaiementEmail != 'undefined'
         && demande.service.contratPrepaiementEmail != null
         && typeof demande.service.contratPrepaiementEmail.code != 'undefined'
         && demande.service.contratPrepaiementEmail.code != null
         && demande.service.contratPrepaiementEmail.code != ''
    ){
     return demande.service.contratPrepaiementEmail.code;
   }
 return this.emptyParameter;
 }

  displayServiceContratPrepaiementEmail(demande)
 {
   var isMtnt = this.displayMCMontantPayeMoinsQueMontantTotal(demande);
  if(isMtnt === 'Oui')
  {
    return this.displayServiceContratPrepaiementEmailCode(demande);
  }else{
    return "Facture payée";
  }
 }

 displayServiceModeleDeFacturationPrepaiement(demande)
 {

   // if la facture pas paye a 100%;
   // if paye a 100% -> 'Facture de prépaiement - Facture payée'
   //

   if(this.displayMCMontantPayeMoinsQueMontantTotal(demande)==='Oui')
   {
     return 'Facture de prépaiement';
   }
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.modeleDeFacturationPrepaiement != 'undefined'
         && demande.service.modeleDeFacturationPrepaiement != null
         && typeof demande.service.modeleDeFacturationPrepaiement.code != 'undefined'
         && demande.service.modeleDeFacturationPrepaiement.code != null
         && demande.service.modeleDeFacturationPrepaiement.code != ''
    ){
     return demande.service.modeleDeFacturationPrepaiement.code;
   }
 return this.emptyParameter;
 }


 displayServiceModeleDeFacturation(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.modele_de_facturation != 'undefined'
         && demande.service.modele_de_facturation != null
         && typeof demande.service.modele_de_facturation.code != 'undefined'
         && demande.service.modele_de_facturation.code != null
         && demande.service.modele_de_facturation.code != ''
    ){
     return demande.service.modele_de_facturation.code;
   }
 return this.emptyParameter;
 }

displayServicePrepaymentFormatEdition(demande)
{
  var isMtnt = this.displayMCMontantPayeMoinsQueMontantTotal(demande);
  if(isMtnt === 'Oui')
  {
    return "Facture de prépaiement";
  }else{
    return "SAD-EDU Facture avec confirmation de paiement";
  }
}

getServiceContratTravail(demande)
{
  if(demande != null
        && typeof demande.service != 'undefined'
        && demande.service != null
        && typeof demande.service.contratTravail != 'undefined'
        && demande.service.contratTravail != null
        && typeof demande.service.contratTravail.code != 'undefined'
        && demande.service.contratTravail.code != null
        && demande.service.contratTravail.code != ''
   ){
    return demande.service.contratTravail.code;
  }
return this.emptyParameter;
}


 displayServiceContratTravail(demande)
 {

   let mcType = this.displayMCType(demande);
   let SCT = this.getServiceContratTravail(demande);
   if(SCT===this.emptyParameter)
   {
     return this.emptyParameter;
   }

   if(mcType==='READ')
   {
     let dateFinIndet = this.getRencontreDateFinIndeterminee(demande, 0,0);
     let str = SCT + ' ';
     if(dateFinIndet===true)
     {
       str+='CDI '
     }else{
       str+='CDD '
     }
     str += this.displayMCProfessionalStatutEmployment(demande);
     return str;
     //service.contratTravail + ' ' + [if(tarifs.date_fin_indeterminee === true) -> 'CDI' else -> 'CDD' ]+ ' ' + prof.statut
   }// end READ


   return this.getServiceContratTravail(demande);


   //return this.emptyParameter;
 }

 displayServiceContratTravailPremierContrat(demande)
 {

   let mcType = this.displayMCType(demande);
   let SCT = this.getServiceContratTravail(demande);
   if(SCT===this.emptyParameter)
   {
     return this.emptyParameter;
   }
   if(mcType!=='READ')
   {

     let sectuer = this.displayServiceSecteur(demande);
     //let str = sectuer;
     let str = '';
     str += 'Contrat initial - ';
     str += this.displayMCProfessionalStatutEmployment(demande);
     return str;
  }// not READ

  return this.emptyParameter;
 }

 getServiceContratTravailEmail(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.contratTravailEmail != 'undefined'
         && demande.service.contratTravailEmail != null
         && typeof demande.service.contratTravailEmail.code != 'undefined'
         && demande.service.contratTravailEmail.code != null
         && demande.service.contratTravailEmail.code != ''
    ){
     return demande.service.contratTravailEmail.code;
   }
 return this.emptyParameter;
 }

 getFraisDeplacementPayeEtablissement(demande)
 {
   if(demande != null
       && typeof demande.frais_deplacement_paye_etablissement != 'undefined'
       && demande.frais_deplacement_paye_etablissement != null
    ){
     return demande.frais_deplacement_paye_etablissement;
   }
   return this.emptyParameter;
 }
 displayServiceContratTravailEmail(demande)
 {
   let mcType = this.displayMCType(demande);
   let CTE = this.getServiceContratTravailEmail(demande);
   if(CTE===this.emptyParameter)
   {
     return this.emptyParameter;
   }

   if(mcType==='READ')
   {
     let str = CTE;
     let profStatut = this.displayMCProfessionalStatutEmploymentShort(demande);
     let deplacement = this.getFraisDeplacementPayeEtablissement(demande);
     //profStatut TA or EM

     str += profStatut;
     str += ' Feuille de temps';
     if(deplacement===true)
     {
       str += ' + Feuille deplacement';
     }

     return str;
   }
  // demande.service.contratTravailEmail.code + ' - ' prof.statut  + [if frais_deplacement_paye_etablissement===true -> + ' + Feuille deplacement']


  return CTE;
 }
 displayServiceContratTravailEmailPremierContrat(demande)
 {
   let mcType = this.displayMCType(demande);
   if(mcType!=='READ')
   {
     let str = 'Contrat initial - ';
     let profStatut = this.displayMCProfessionalStatutEmployment(demande);
     str += profStatut;
     return str;
   }

  return this.emptyParameter;
 }

 displayServicePPClient(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.particularitesPartenariatClient != 'undefined'
         && demande.service.particularitesPartenariatClient != null
         && typeof demande.service.particularitesPartenariatClient.description != 'undefined'
         && demande.service.particularitesPartenariatClient.description != null
         && demande.service.particularitesPartenariatClient.description != ''
    ){
     return demande.service.particularitesPartenariatClient.description;
   }
 return this.emptyParameter;
 }

 displayServicePPIntervenant(demande)
 {
   if(demande != null
         && typeof demande.services != 'undefined'
         && demande.services != null
         && typeof demande.services.service != 'undefined'
         && demande.services.service != null
         && typeof demande.services.service.particularitesPartenariatIntervenant != 'undefined'
         && demande.services.service.particularitesPartenariatIntervenant != null
         && typeof demande.services.service.particularitesPartenariatIntervenant.description != 'undefined'
         && demande.services.service.particularitesPartenariatIntervenant.description != null
         && demande.services.service.particularitesPartenariatIntervenant.description != ''
    ){
     return demande.services.service.particularitesPartenariatIntervenant.description;
   }
 return this.emptyParameter;
 }


 displayServiceBillingType(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.billingType != 'undefined'
         && demande.service.billingType != null
         && typeof demande.service.billingType.code != 'undefined'
         && demande.service.billingType.code != null
         && demande.service.billingType.code != ''
    ){
     return demande.service.billingType.code;
   }
 return this.emptyParameter;
 }

 displayServiceBillingTypeName(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.billingType != 'undefined'
         && demande.service.billingType != null
         && typeof demande.service.billingType.name != 'undefined'
         && demande.service.billingType.name != null
         && demande.service.billingType.name != ''
    ){
     return demande.service.billingType.name;
   }
 return this.emptyParameter;
 }

 displayServiceBillingTypePrepayment(demande)
 {
   if(demande != null
         && typeof demande.service != 'undefined'
         && demande.service != null
         && typeof demande.service.billingType != 'undefined'
         && demande.service.billingType != null
         && typeof demande.service.billingType.code != 'undefined'
         && demande.service.billingType.code != null
         && demande.service.billingType.code != ''
    ){

     if(demande.service.billingType.code==='À la carte')
       {
         return 'Facture de prépaiement suivi';
       }
     return demande.service.billingType.code;
   }
 return this.emptyParameter;

 }


 displayMandatCombleJSON(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null

    ){
     return JSON.stringify(demande.mandatComble);
   }
 return this.emptyParameter;
 }

 displayMCType(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.MC_type != 'undefined'
         && demande.mandatComble.MC_type != null
         && demande.mandatComble.MC_type != ''

    ){
     return demande.mandatComble.MC_type;
   }
 return this.emptyParameter;
 }



 displayMCProfessionalName(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.name != 'undefined'
         && demande.mandatComble.professionnel.name != null

    ){
     return demande.mandatComble.professionnel.name;
   }
 return this.emptyParameter;
 }

  displayMCProfessionalNom(demande)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.nom != 'undefined'
         && demande.mandatComble.professionnel.nom != null

    ){
     return demande.mandatComble.professionnel.nom;
   }
 return this.emptyParameter;
 }

   displayMCProfessionalPrenom(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.prenom != 'undefined'
         && demande.mandatComble.professionnel.prenom != null

    ){
     return demande.mandatComble.professionnel.prenom;
   }
 return this.emptyParameter;
 }

displayMCProfessionalMetier(demande)
{
 if(demande != null
       && typeof demande.mandatComble != 'undefined'
       && demande.mandatComble != null
       && typeof demande.mandatComble.professionnel != 'undefined'
       && demande.mandatComble.professionnel != null
       && typeof demande.mandatComble.professionnel.profession_principale != 'undefined'
       && demande.mandatComble.professionnel.profession_principale != null

  ){
   return demande.mandatComble.professionnel.profession_principale;
 }
return this.emptyParameter;
}

 displayMCProfessionalFullName(demande)
{
  return (this.displayMCProfessionalPrenom(demande)+' '+this.displayMCProfessionalNom(demande));
}


displayMCDateDebut(demande)
 {

   return this.displayMCTarifDate(demande, 0,0);
   //  if(demande != null
   //        && typeof demande.mandat_comble != 'undefined'
   //       && demande.mandat_comble != null
   //       && typeof demande.mandat_comble.date_debut != 'undefined'
   //       && demande.mandat_comble.date_debut != null
   //       && typeof demande.mandat_comble.date_debut.date != 'undefined'
   //       && demande.mandat_comble.date_debut.date != null



   //  ){
   //    return this.formatMyDate(demande.mandat_comble.date_debut.date, this._Constants.default.dateFormats.exports);//demande.date_fin.date;
   //  }


   // return this.emptyParameter;
 }

 displayMCDateDebutMinusDays(demande, days)
 {

   var iTarif = 0;
   var iRencontre = 0;

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && typeof demande.mandatComble.tarifs[iTarif].rencontres != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres !=  null
         && demande.mandatComble.tarifs[iTarif].rencontres.length > iRencontre
         && typeof demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != null
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != ''
    ){
  //   let crtDate: moment.Moment = moment(demande.mandat_comble.tarifs[index].date);
     //return crtDate.format('DD/MM/YY');
     var dtt = new Date(demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date);

     dtt.setDate(dtt.getDate()-days);
     return this.formatMyDate(dtt, this._Constants.default.dateFormats.exports)
   // return this.formatMyDate(demande.mandat_comble.tarifs[iTarif].rencontres[iRencontre].date, this._Constants.default.dateFormats.exports);
   }
   return this.emptyParameter;

 }

 displayMCUrgence(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
        && demande.mandatComble != null
        && typeof demande.mandatComble.urgence != 'undefined'
        && demande.mandatComble.urgence != null



   ){
     return demande.mandatComble.urgence;//demande.date_fin.date;
   }
 return this.emptyParameter;
}
displayMCNotesEmail(demande)
{
  if(demande != null
        && typeof demande.mandatComble != 'undefined'
       && demande.mandatComble != null
       && typeof demande.mandatComble.notes_email != 'undefined'
       && demande.mandatComble.notes_email != null



  ){
    return demande.mandatComble.notes_email;//demande.date_fin.date;
  }
return this.emptyParameter;
}




 displayMCDateFin(demande)
 {

   // MB XX -> take this from tarifs.
   // if date_fin_indeterminee === true -> return '';
   let finIndetermine = this.getRencontreDateFinIndeterminee(demande, 0,0);
   let dateFin = this.getRencontreDateFinIndeterminee(demande, 0,0);

   if(finIndetermine===false)
   {
     return this.formatMyDate(dateFin, this._Constants.default.dateFormats.exports);
   }else{
     return 'Indéterminé'
   }
   // return this.emptyParameter;
    //
    // if(demande != null
    //       && typeof demande.mandatComble != 'undefined'
    //      && demande.mandatComble != null
    //      && typeof demande.mandatComble.date_fin_date != 'undefined'
    //      && demande.mandatComble.date_fin_date != null
    //
    //
    //
    // ){
    //   return this.formatMyDate(demande.mandatComble.date_fin_date, this._Constants.default.dateFormats.exports);//demande.date_fin.date;
    // }


  // return this.emptyParameter;
 }


 // displayMCParticulariteContratClient(demande)
 // {
 //   if(demande != null
 //         && typeof demande.mandatComble != 'undefined'
 //         && demande.mandatComble != null
 //         && typeof demande.mandatComble.particularites_contrat_client != 'undefined'
 //         && demande.mandatComble.particularites_contrat_client != null
 //         && demande.mandatComble.particularites_contrat_client != ''
 //
 //    ){
 //     return demande.mandatComble.particularites_contrat_client;
 //   }
 // return this.emptyParameter;
 // }

 displayMCParticulariteContratClient(demande, index)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_contrat_client != 'undefined'
         && demande.mandatComble.particularites_contrat_client != null
         && demande.mandatComble.particularites_contrat_client != ''
         && demande.mandatComble.particularites_contrat_client.length > 0
         && demande.mandatComble.particularites_contrat_client.length > index

    ){
     return demande.mandatComble.particularites_contrat_client[index];
   }
 return this.emptyParameter;
 }

 displayMCParticulariteContratClientREAD(demande, index)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_contrat_client_read != 'undefined'
         && demande.mandatComble.particularites_contrat_client_read != null
         && demande.mandatComble.particularites_contrat_client_read != ''
         && demande.mandatComble.particularites_contrat_client_read.length > 0
         && demande.mandatComble.particularites_contrat_client_read.length > index

    ){
     return demande.mandatComble.particularites_contrat_client_read[index];
   }
 return this.emptyParameter;
 }



 displayMCParticulariteForfaitProfessionnel(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_forfait_professionnel != 'undefined'
         && demande.mandatComble.particularites_forfait_professionnel != null
         && demande.mandatComble.particularites_forfait_professionnel != ''

    ){
     return demande.mandatComble.particularites_forfait_professionnel;
   }
 return this.emptyParameter;
 }

 displayMCParticulariteAssignation(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_assignation != 'undefined'
         && demande.mandatComble.particularites_assignation != null
         && demande.mandatComble.particularites_assignation != ''

    ){
     return demande.mandatComble.particularites_assignation;
   }
 return this.emptyParameter;
 }

 displayMCParticulariteAssignationService(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_assignation_service != 'undefined'
         && demande.mandatComble.particularites_assignation_service != null
         && demande.mandatComble.particularites_assignation_service != ''

    ){
     return demande.mandatComble.particularites_assignation_service;
   }
 return this.emptyParameter;
 }

 displayMCParticulariteAssignationPartenariat(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_assignation_partenariat != 'undefined'
         && demande.mandatComble.particularites_assignation_partenariat != null
         && demande.mandatComble.particularites_assignation_partenariat != ''

    ){
     return demande.mandatComble.particularites_assignation_partenariat;
   }
 return this.emptyParameter;
 }



 displayMCParticulariteContratClientService(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_contrat_client_service != 'undefined'
         && demande.mandatComble.particularites_contrat_client_service != null
         && demande.mandatComble.particularites_contrat_client_service != ''

    ){
     return demande.mandatComble.particularites_contrat_client_service;
   }
 return this.emptyParameter;
 }


 displayMCParticulariteAutres(demande, index)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_autres != 'undefined'
         && demande.mandatComble.particularites_autres != null
         && demande.mandatComble.particularites_autres != ''
         && demande.mandatComble.particularites_autres.length > 0
         && demande.mandatComble.particularites_autres.length > index

    ){
     return demande.mandatComble.particularites_autres[index];
   }
 return this.emptyParameter;
 }

 displayMCParticulariteContratTravail(demande, index)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.particularites_contrat_travail != 'undefined'
         && demande.mandatComble.particularites_contrat_travail != null
         && demande.mandatComble.particularites_contrat_travail != ''
         && demande.mandatComble.particularites_contrat_travail.length > 0
         && demande.mandatComble.particularites_contrat_travail.length > index

    ){
     return demande.mandatComble.particularites_contrat_travail[index];
   }
 return this.emptyParameter;
 }


 displayMCProfessionalPermis(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.numero_de_permis != 'undefined'
         && demande.mandatComble.professionnel.numero_de_permis != null

    ){
     return demande.mandatComble.professionnel.numero_de_permis;
   }
 return this.emptyParameter;
 }

 displayMCProfessionalSpeciality(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.speciality != 'undefined'
         && demande.mandatComble.professionnel.speciality != null

    ){
     return demande.mandatComble.professionnel.speciality;
   }
 return this.emptyParameter;
 }

 displayMCProfessionalGender(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.gender != 'undefined'
         && demande.mandatComble.professionnel.gender != null
         && typeof this._Constants.default.sexe[demande.mandatComble.professionnel.gender] != 'undefined'
         // && typeof demande.mandat_comble.professionnel.gender.export != 'undefined'
         // && demande.mandat_comble.professionnel.gender.export != null

    ){
     return this._Constants.default.sexe[demande.mandatComble.professionnel.gender].export;
   }
 return this.emptyParameter;
 }

  displayMCProfessionalGenderCode(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.gender != 'undefined'
         && demande.mandatComble.professionnel.gender != null
         && typeof this._Constants.default.sexe[demande.mandatComble.professionnel.gender] != 'undefined'
         // && typeof demande.mandat_comble.professionnel.gender.code != 'undefined'
         // && demande.mandat_comble.professionnel.gender.code != null

    ){
     return this._Constants.default.sexe[demande.mandatComble.professionnel.gender].code;
   }
 return this.emptyParameter;
 }

 displayMCProfessionalStatutEmployment(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.professionel_statut != 'undefined'
         && demande.mandatComble.professionnel.professionel_statut != null
         && demande.mandatComble.professionnel.professionel_statut != ''

    ){
     return demande.mandatComble.professionnel.professionel_statut;
   }
 return this.emptyParameter;
 }
 displayMCProfessionalStatutEmploymentShort(demande)
 {

   let profStatus = this.displayMCProfessionalStatutEmployment(demande);
   if(profStatus==='Travailleur autonome')
   {
     return 'TA';
   }
   if(profStatus==='Employé')
   {
     return 'EM';
   }
   return this.emptyParameter;
 }

 displayMCProfessionalStatutEmploymentCode(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.professionel_statut != 'undefined'
         && demande.mandatComble.professionnel.professionel_statut != null
         && demande.mandatComble.professionnel.professionel_statut != ''

    ){
     //return demande.mandat_comble.professionnel_statut.professionel_statut;
     if(demande.mandatComble.professionnel.professionel_statut === 'Employé')
     {
       return '1';
     }
     return '2';
   }
 return this.emptyParameter;
 }
 displayMCProfessionalStatutEmploymentRCCode(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.professionel_statut != 'undefined'
         && demande.mandatComble.professionnel.professionel_statut != null
         && demande.mandatComble.professionnel.professionel_statut != ''

    ){
     //return demande.mandat_comble.professionnel_statut.professionel_statut;
     if(demande.mandatComble.professionnel.professionel_statut === 'Employé')
     {
       return 'R';
     }
     return 'C';
   }
 return this.emptyParameter;
 }
 displayMCProfessionalStatutEmployment1ECode(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.professionel_statut != 'undefined'
         && demande.mandatComble.professionnel.professionel_statut != null
         && demande.mandatComble.professionnel.professionel_statut != ''

    ){
     //return demande.mandat_comble.professionnel_statut.professionel_statut;
     if(demande.mandatComble.professionnel.professionel_statut === 'Employé')
     {
       return '1';
     }
     return 'E';
   }
 return this.emptyParameter;
 }
 displayMCProfessionalStatutEmploymentAXCode(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.professionel_statut != 'undefined'
         && demande.mandatComble.professionnel.professionel_statut != null
         && demande.mandatComble.professionnel.professionel_statut != ''

    ){
     //return demande.mandat_comble.professionnel_statut.professionel_statut;
     if(demande.mandatComble.professionnel.professionel_statut === 'Employé')
     {
       return 'A';
     }
     return 'X';
   }
 return this.emptyParameter;
 }

 displayMCProfessionalStatutVacances(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.statut_vacances != 'undefined'
         && demande.mandatComble.professionnel.statut_vacances != null
         && demande.mandatComble.professionnel.statut_vacances != ''

    ){
     return demande.mandatComble.professionnel.statut_vacances;
   }
 return this.emptyParameter;
 }

 displayMCEmployeurDIsPremierMandat(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.employeurd_is_premier_mandat != 'undefined'
         && demande.mandatComble.professionnel.employeurd_is_premier_mandat != null
         && demande.mandatComble.professionnel.employeurd_is_premier_mandat != ''
         && demande.mandatComble.professionnel.employeurd_is_premier_mandat === true
    ){
     return true;
   }
 return false;
 }
 displayMCProfessionnelContratInitial(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.is_contrat_initial != 'undefined'
         && demande.mandatComble.professionnel.is_contrat_initial != null
         && demande.mandatComble.professionnel.is_contrat_initial != ''
         && demande.mandatComble.professionnel.is_contrat_initial === true
    ){
     return true;
   }
 return false;
 }



 displayMCEmployeurDMatricule(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.matricule != 'undefined'
         && demande.mandatComble.professionnel.matricule != null
         && demande.mandatComble.professionnel.matricule != ''

    ){
     return demande.mandatComble.professionnel.matricule;
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDDOB(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.date_of_birth != 'undefined'
         && demande.mandatComble.professionnel.date_of_birth != null
         && demande.mandatComble.professionnel.date_of_birth != ''

    ){
     // return demande.mandat_comble.employeurD.dob;
  return this.formatMyDate(demande.mandatComble.professionnel.date_of_birth, 'YYYY-MM-DD');
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDDOB2(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.date_of_birth != 'undefined'
         && demande.mandatComble.professionnel.date_of_birth != null
         && demande.mandatComble.professionnel.date_of_birth != ''

    ){
     // return demande.mandat_comble.employeurD.dob;
  return this.formatMyDate(demande.mandatComble.professionnel.date_of_birth, 'DD/MM/YYYY');
   }
 return this.emptyParameter;
 }

 displayMCEmployeurDAddressStreet(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.street != 'undefined'
         && demande.mandatComble.professionnel.street != null



    ){
      return demande.mandatComble.professionnel.street;
   }
   return this.emptyParameter;
 }
 displayMCEmployeurDAddressNumber(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.number != 'undefined'
         && demande.mandatComble.professionnel.number != null



    ){
      return demande.mandatComble.professionnel.number;
   }
   return this.emptyParameter;
 }
 displayMCEmployeurDAddressApt(demande)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.apt != 'undefined'
         && demande.mandatComble.professionnel.apt != null



    ){
      return demande.mandatComble.professionnel.apt;
   }
   return this.emptyParameter;
 }
 displayMCEmployeurDAddressCity(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.city != 'undefined'
         && demande.mandatComble.professionnel.city != null



    ){
      return demande.mandatComble.professionnel.city;
   }
   return this.emptyParameter;

   // if(demande != null
   //       && typeof demande.mandat_comble != 'undefined'
   //       && demande.mandat_comble != null
   //       && typeof demande.mandat_comble.employeurD != 'undefined'
   //       && demande.mandat_comble.employeurD != null
   //       && typeof demande.mandat_comble.employeurD.place_and_address != 'undefined'
   //       && demande.mandat_comble.employeurD.place_and_address != null
   //       && typeof demande.mandat_comble.employeurD.place_and_address.address != 'undefined'
   //       && demande.mandat_comble.employeurD.place_and_address.address != null
   //       && typeof demande.mandat_comble.employeurD.place_and_address.address.city != 'undefined'
   //       && demande.mandat_comble.employeurD.place_and_address.address.city != null
   //
   //
   //
   //  ){
   //    return demande.mandat_comble.employeurD.place_and_address.address.city;
   // }
   // return this.emptyParameter;
 }
 displayMCEmployeurDAddressProvince(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.employeurD != 'undefined'
         && demande.mandatComble.employeurD != null
         && typeof demande.mandatComble.employeurD.place_and_address != 'undefined'
         && demande.mandatComble.employeurD.place_and_address != null
         && typeof demande.mandatComble.employeurD.place_and_address.address != 'undefined'
         && demande.mandatComble.employeurD.place_and_address.address != null
         && typeof demande.mandatComble.employeurD.place_and_address.address.province != 'undefined'
         && demande.mandatComble.employeurD.place_and_address.address.province != null



    ){
      return demande.mandatComble.employeurD.place_and_address.address.province;
   }
   return this.emptyParameter;
 }
 displayMCEmployeurDAddressPostal(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.postal != 'undefined'
         && demande.mandatComble.professionnel.postal  != null



    ){
      return (demande.mandatComble.professionnel.postal ).replace(/\s+/g, '');
   }
   return this.emptyParameter;
 }
 displayMCEmployeurDAddressPostalWithSpace(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.postal != 'undefined'
         && demande.mandatComble.professionnel.postal  != null



    ){
      return demande.mandatComble.professionnel.postal ;
   }
   return this.emptyParameter;
 }

 displayMCEmployeurDAddressOneLine(demande)
 {
   var addr = '';
   addr+=this.displayMCEmployeurDAddressNumber(demande);
   addr+=', ';
   addr+=this.displayMCEmployeurDAddressStreet(demande);
   addr+=' ';
   addr+=this.displayMCEmployeurDAddressApt(demande);
   addr+=' ';
   addr+=this.displayMCEmployeurDAddressCity(demande);
   addr+=' ';
   addr+=this.displayMCEmployeurDAddressProvince(demande);
   addr+=' ';
   addr+=this.displayMCEmployeurDAddressPostal(demande);


   return addr;
 }


 displayMCEmployeurDAddressSet(demande)
 {
   var addr = '';
   addr+=this.displayMCEmployeurDAddressNumber(demande);
   addr+=', ';
   addr+=this.displayMCEmployeurDAddressStreet(demande);
   addr+=' ';
   addr+=this.displayMCEmployeurDAddressApt(demande);


   return addr;
 }

 displayMCEmployeurDAssuranceSocial(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.assurance_social != 'undefined'
         && demande.mandatComble.professionnel.assurance_social != null
         && demande.mandatComble.professionnel.assurance_social != ''

    ){
     return demande.mandatComble.professionnel.assurance_social;
   }
 return this.emptyParameter;
 }

 displayMCEmployeurDChequeSuccursale(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.specimen_cheque_succursale != 'undefined'
         && demande.mandatComble.professionnel.specimen_cheque_succursale != null
         && demande.mandatComble.professionnel.specimen_cheque_succursale != ''

    ){
     return demande.mandatComble.professionnel.specimen_cheque_succursale;
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDChequeInstitution(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.specimen_cheque_institution != 'undefined'
         && demande.mandatComble.professionnel.specimen_cheque_institution != null
         && demande.mandatComble.professionnel.specimen_cheque_institution != ''

    ){
     return demande.mandatComble.professionnel.specimen_cheque_institution;
   }
 return this.emptyParameter;
 }


 displayMCEmployeurDChequeCompte(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.specimen_cheque_compte != 'undefined'
         && demande.mandatComble.professionnel.specimen_cheque_institution != null
         && demande.mandatComble.professionnel.specimen_cheque_compte != ''

    ){
     return demande.mandatComble.professionnel.specimen_cheque_compte;
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDCheque2or3(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.specimen_cheque_compte != 'undefined'
         && demande.mandatComble.professionnel.specimen_cheque_institution != null
         && demande.mandatComble.professionnel.specimen_cheque_compte != ''

    ){
     return '2';
   }
 return '3';
 }

 displayMCEmployeurDProfession(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.profession != 'undefined'
         && demande.mandatComble.professionnel.profession != null
         && demande.mandatComble.professionnel.profession != ''

    ){
     return demande.mandatComble.professionnel.profession;
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDCompetences(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.competences != 'undefined'
         && demande.mandatComble.professionnel.competences != null
         && demande.mandatComble.professionnel.competences != ''

    ){
     return demande.mandatComble.professionnel.competences;
   }
 return this.emptyParameter;
 }

 displayMCEmployeurDPhoneHome(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null


    ){
      return this.displayPersonnePhone(demande.mandatComble.professionnel,0);
   }
 return this.emptyParameter;
 }

 displayMCEmployeurDPhoneCell(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null


    ){
      return this.displayPersonnePhone(demande.mandatComble.professionnel,1);
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDPhoneWork(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null


    ){
      return this.displayPersonnePhone(demande.mandatComble.professionnel,2);
   }
 return this.emptyParameter;
 }
 displayMCEmployeurDEmail(demande)
 {
   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null


    ){
      return this.displayPersonneEmail(demande.mandatComble.professionnel,0);
   }
 return this.emptyParameter;
 }




displayMCMontantPayeMoinsQueMontantTotal(demande)
{

 var amountPaid = parseInt( this.displayMCPrepaiementMontantPaye(demande));
 var amountTotal  =this.countMCTarifMontantTotal(demande);

 if(amountPaid < amountTotal)
 {
   return "Oui";
 }else{
   return "Non";
 }

}


 displayMCTarifJSON(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index

    ){
     return JSON.stringify(demande.mandatComble.tarifs[index]);
   }
   return this.emptyParameter;
 }


 getRawMCTarif(demande)
 {
    if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0

    ){

      return demande.mandatComble.tarifs;

   }
   return null;
 }

 getRawMCTarifIndex(demande, index)
 {
    let tarifs = this.getRawMCTarif(demande);
    if(tarifs!==null && index>0 && index<tarifs.length)
    {
      return tarifs[index];
    }
   return null;
 }
 getRawMCTarifRencontre(demande, iTarif)
 {
   let tarif = this.getRawMCTarifIndex(demande, iTarif);
   if(tarif!==null && typeof tarif.rencontres!=='undefined')
   {
     return tarif.rencontres;
   }
   return null;
 }
 getRawMCTarifRencontreIndex(demande, iTarif, iRencontre)
 {
   let rencontres = this.getRawMCTarifRencontre(demande, iTarif);
   if(rencontres!==null && iRencontre>0 && iRencontre<rencontres.length)
   {
     return rencontres[iRencontre];
   }
   return null;
 }

 getRencontreDateFinIndeterminee(demande, iTarif, iRencontre)
 {
   let rencontre = this.getRawMCTarifRencontreIndex(demande, iTarif,iRencontre);
   if(rencontre!==null && typeof rencontre.date_fin_indeterminee!=='undefined' && rencontre.date_fin_indeterminee!==null)
   {
     return rencontre.date_fin_indeterminee;
   }
   return null;
 }
 getRencontreDateFin(demande, iTarif, iRencontre)
 {
   let rencontre = this.getRawMCTarifRencontreIndex(demande, iTarif,iRencontre);
   if(rencontre!==null && typeof rencontre.date_fin_date!=='undefined' && rencontre.date_fin_date!==null)
   {
     return rencontre.date_fin_date;
   }
   return null;
 }

 countMCTarifMontantTotal(demande)
 {

   var MCType = this.displayMCType(demande);

   if(MCType==='ALaCarte')
   {
     return this.countMCTartifMontantTotalCarte(demande);
   }else{
     return this.countMCTartifMontantTotalBanque(demande);
   }

 }

 countMCTartifMontantTotalBanque(demande)
 {
    var tarifs = this.getRawMCTarif(demande);
     if(tarifs!=null)
      {
        var crtAmount = 0;
      //var controlVal = this.parameterFormGroup.value;

       for(let tarif of tarifs)
       {
           var crtQty = tarif.quantity;
            var crtTarif = tarif.price;

            if(typeof crtTarif!= 'undefined'
               && crtTarif!= null
               && crtTarif!= ''
               && crtTarif>0
               && typeof crtQty!= 'undefined'
               && crtQty!= null
               && crtQty!= ''
               && crtQty>0
               ){
               crtAmount += crtTarif*crtQty;
             }



       }


     return crtAmount;

   }// tarifs not null
   return 0;
 }

 countMCTartifMontantTotalCarte(demande)
 {


  var tarifs = this.getRawMCTarif(demande);

  if(tarifs!=null)
  {

    var crtAmount = 0;
    for(let tarif of tarifs)
    {
      var crtTarif = tarif.price;
         for(let rencontre of tarif.rencontres)
         {

           // var crtTarif = rencontre.price; //bug, is this deprecated?
           var crtDuree = rencontre.duree;




           if(typeof crtTarif!= 'undefined'
             && crtTarif!= null
             && crtTarif!= ''
             && crtTarif>0
             && typeof crtDuree!= 'undefined'
             && crtDuree!= null
             && crtDuree!= ''
             && crtDuree>0
             ){
             crtAmount += crtTarif*crtDuree/60;
           }
         }
     }

     return crtAmount;


  }// tarifs not null


   return 0;
 }

 displayMCTarifDescription(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].description != 'undefined'
         && demande.mandatComble.tarifs[index].description != null
         && demande.mandatComble.tarifs[index].description != ''
    ){
     return this.translateCodage(demande, demande.mandatComble.tarifs[index].description, index);
   }
   return this.emptyParameter;
 }

 displayMCTarifPreavis(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].date_fin_indeterminee != 'undefined'
         && demande.mandatComble.tarifs[index].date_fin_indeterminee != null
         && demande.mandatComble.tarifs[index].date_fin_indeterminee != false
         && typeof demande.mandatComble.tarifs[index].preavis != 'undefined'
         && demande.mandatComble.tarifs[index].preavis != null
         && demande.mandatComble.tarifs[index].preavis != ''
    ){
     return demande.mandatComble.tarifs[index].preavis;
   }
   return this.emptyParameter;
 }

 displayMCTarifDate(demande, iTarif, iRencontre)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && typeof demande.mandatComble.tarifs[iTarif].rencontres != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres !=  null
         && demande.mandatComble.tarifs[iTarif].rencontres.length > iRencontre
         && typeof demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != null
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != ''
    ){
  //   let crtDate: moment.Moment = moment(demande.mandat_comble.tarifs[index].date);
     //return crtDate.format('DD/MM/YY');
    return this.formatMyDate(demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date, this._Constants.default.dateFormats.exports);
   }
   return this.emptyParameter;
 }

 displayMCTarifDureeNormale(demande, iTarif)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && typeof demande.mandatComble.tarifs[iTarif].duree_normale != 'undefined'
         && demande.mandatComble.tarifs[iTarif].duree_normale !=  null
         && demande.mandatComble.tarifs[iTarif].duree_normale !=  ''
    ){
  //   let crtDate: moment.Moment = moment(demande.mandat_comble.tarifs[index].date);
     //return crtDate.format('DD/MM/YY');
    return demande.mandatComble.tarifs[iTarif].duree_normale;
   }
   return this.emptyParameter;
 }

 displayMCTarifDateWritten(demande, iTarif, iRencontre)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && typeof demande.mandatComble.tarifs[iTarif].rencontres != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres !=  null
         && demande.mandatComble.tarifs[iTarif].rencontres.length > iRencontre
         && typeof demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != null
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date  != ''
    ){
     let crtDate: moment.Moment = moment(demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].date);
     return crtDate.format('dddd DD MMMM YYYY');
   }
   return this.emptyParameter;
 }

 displayMCTarifHeure(demande, iTarif, iRencontre)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > iTarif
         && typeof demande.mandatComble.tarifs[iTarif].rencontres != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres !=  null
         && demande.mandatComble.tarifs[iTarif].rencontres.length > iRencontre
         && typeof demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].heure != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].heure  != null
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].heure  != ''
    ){
     return demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].heure ;
   }
   return this.emptyParameter;
 }

 displayMCTarifDuree(demande, iTarif, iRencontre)
 {

   if(demande != null
          && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > iTarif
         && typeof demande.mandatComble.tarifs[iTarif].rencontres != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres !=  null
         && demande.mandatComble.tarifs[iTarif].rencontres.length > iRencontre
         && typeof demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].duree != 'undefined'
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].duree  != null
         && demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].duree  != ''
    ){
     return demande.mandatComble.tarifs[iTarif].rencontres[iRencontre].duree;
   }
   return this.emptyParameter;
 }

 displayMCTarifQuantityContratClient(demande, index)
 {

   // A la carte | Eval -> qty in service
   // Banque D'heure -> MC




   // var MCType = this.displayMCType(demande);

   // if(MCType === 'ALaCarte')
   // {
   //   var duree = this.displayMCTarifDuree(demande, index, 0);
   //   if(duree === this.emptyParameter)
   //   {
   //     return this.emptyParameter;
   //   }
   //   return duree/60;
   // }



   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].quantity != 'undefined'
         && demande.mandatComble.tarifs[index].quantity != null
         && demande.mandatComble.tarifs[index].quantity != ''
    ){
     return demande.mandatComble.tarifs[index].quantity;
   }
   return this.emptyParameter;
 }

 displayMCTarifQuantity(demande, index)
 {

   // A la carte -> duree premiere rencontre / 60
   //

   var MCType = this.displayMCType(demande);

   if(MCType === 'ALaCarte')
   {
     var duree = this.displayMCTarifDuree(demande, index, 0);
     if(duree === this.emptyParameter)
     {
       return this.emptyParameter;
     }
     return duree/60;
   }



   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].quantity != 'undefined'
         && demande.mandatComble.tarifs[index].quantity != null
         && demande.mandatComble.tarifs[index].quantity != ''
    ){
     return demande.mandatComble.tarifs[index].quantity;
   }
   return this.emptyParameter;
 }

 displayMCTarifUnits(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].units != 'undefined'
         && demande.mandatComble.tarifs[index].units != null
         && demande.mandatComble.tarifs[index].units != ''
    ){
     return demande.mandatComble.tarifs[index].units;
   }
   return this.emptyParameter;
 }

 displayMCTarifCodeOgust(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].codeOgust != 'undefined'
         && demande.mandatComble.tarifs[index].codeOgust != null
         && demande.mandatComble.tarifs[index].codeOgust != ''
    ){
     return demande.mandatComble.tarifs[index].codeOgust;
   }
   return this.emptyParameter;
 }

 displayMCTarifPrice(demande, index)
 {

   if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
         && typeof demande.mandatComble.tarifs[index].price != 'undefined'
         && demande.mandatComble.tarifs[index].price != null
         && demande.mandatComble.tarifs[index].price != ''

    ){
     return demande.mandatComble.tarifs[index].price;
   }
   return this.emptyParameter;
 }

 displayMCTarifTauxTVA(demande, index)
 {

   if(demande != null
         && typeof demande.demande_type != 'undefined'
         && demande.demande_type != null
         && demande.demande_type != ''
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
    ){
    // return demande.mandat_comble.tarifs[index].price.value;

        if(demande.demande_type === 'Enfant' || demande.demande_type === 'Adulte')
        {
          return 'Sans taxes';
        }else{
          return 'TPS/TVQ';
        }
   }
   return this.emptyParameter;
 }

  displayMCTarifDescriptionFromSubService(demande, index)
  {
    if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
        //  && typeof demande.mandatComble.tarifs[index].subService != 'undefined'
        //  && demande.mandatComble.tarifs[index].subService != null
        //  && typeof demande.mandatComble.tarifs[index].subService.description != 'undefined'
        // && demande.mandatComble.tarifs[index].subService.description != null
        //  && demande.mandatComble.tarifs[index].subService.description != ''

        && typeof demande.mandatComble.tarifs[index].description != 'undefined'
        && demande.mandatComble.tarifs[index].description != null
        && demande.mandatComble.tarifs[index].description != ''
    ){
     return this.translateCodage(demande, demande.mandatComble.tarifs[index].description, index);
   }
   return this.emptyParameter;
  }

  displayMCRencontre(demande, index)
  {
    if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.tarifs != 'undefined'
         && demande.mandatComble.tarifs != null
         && demande.mandatComble.tarifs != ''
         && demande.mandatComble.tarifs.length > 0
         && demande.mandatComble.tarifs.length > index
    ){

      var item = '';
      item += this.displayMCTarifDateWritten(demande, index, 0);
      item += ', ';
      item += this.displayMCTarifHeure(demande, index, 0);
      item += ', ';
      item += this.displayMCTarifDuree(demande, index, 0) +' minutes';
     // item += ' minutes';

      return item;
    }else{
      return '';
    }


  }

  displayMCPremiereRencontreDuree(demande)
   {
     return this.displayMCTarifDuree(demande, 0, 0);
   }

    // displayMCPremiereRencontreHeure(demande)
   // {
   //         if(demande != null
   //             && typeof demande.mandat_comble != 'undefined'
   //             && demande.mandat_comble != null
   //             && typeof demande.mandat_comble.heure_premiere_rencontre != 'undefined'
   //             && demande.mandat_comble.heure_premiere_rencontre != null
   //             && demande.mandat_comble.heure_premiere_rencontre != ''
   //        ){
   //         return demande.mandat_comble.heure_premiere_rencontre;
   //       }
   //       return this.emptyParameter;

   // }
   displayMCPremiereRencontreHeure(demande)
   {
         //   if(demande != null
         //       && typeof demande.mandat_comble != 'undefined'
         //       && demande.mandat_comble != null
         //       && typeof demande.mandat_comble.heure_premiere_rencontre != 'undefined'
         //       && demande.mandat_comble.heure_premiere_rencontre != null
         //       && demande.mandat_comble.heure_premiere_rencontre != ''
         //  ){
         //   return demande.mandat_comble.heure_premiere_rencontre;
         // }
         // return this.emptyParameter;
          return this.displayMCTarifHeure(demande, 0, 0);

   }

   displayMCAutresRencontre(demande)
   {
     //return this.displayMCRencontre(demande, 0);

     var item = '';
     for(var i=1; i<6; i++)
     {
       var tmp = this.displayMCRencontre(demande, i);
       if(tmp != '')
       {
         if(i>1)
         {
           item += ' & ';
         }
         item += tmp;
       }
     }

     if(item === '')
     {
       item = 'N/A';
     }
     return item;
   }




  displayMCPrepaiementFirstPaymentDone(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.prepayment_first_payment_done != 'undefined'
         && demande.mandatComble.prepayment_first_payment_done != null
    ){
    // return ;
      return demande.mandatComble.prepayment_first_payment_done;
   }
   return this.emptyParameter;
   }

   displayMCPrepaiementMontantPaye(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.prepayment_first_payment_done != 'undefined'
         && demande.mandatComble.prepayment_first_payment_done != null
         && typeof demande.mandatComble.prepayment_amount_paid != 'undefined'
         && demande.mandatComble.prepayment_amount_paid != null
    ){
    // return ;
      if(demande.mandatComble.prepayment_first_payment_done === true)
      {
        return demande.mandatComble.prepayment_amount_paid;
      }else{
        return 0;
      }
   }
   return 0;
   }

   displayMCPrepaiementOperationNumber(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.prepayment_first_payment_done != 'undefined'
         && demande.mandatComble.prepayment_first_payment_done != null
         && typeof demande.mandatComble.prepayment_operation_number != 'undefined'
         && demande.mandatComble.prepayment_operation_number != null
    ){
    // return ;
      if(demande.mandatComble.prepayment_first_payment_done === true)
      {
        return demande.mandatComble.prepayment_operation_number;
      }else{
        return '-';
      }
   }
   return this.emptyParameter;
   }

   displayMCPrepaiementModeDeReglement(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.prepayment_first_payment_done != 'undefined'
         && demande.mandatComble.prepayment_first_payment_done != null
    ){
    // return ;
      if(demande.mandatComble.prepayment_first_payment_done === true)
      {
        //return demande.mandat_comble.prepayment.operation_number;
        if(typeof demande.mandatComble.prepayment_payment_mode != 'undefined'
         && demande.mandatComble.prepayment_payment_mode != null
        ){
          return demande.mandatComble.prepayment_payment_mode;
        }else{
           return this.emptyParameter;
        }



      }else{

          if(typeof demande.mandatComble.prepayment_entente_payment != 'undefined'
           && demande.mandatComble.prepayment_entente_payment != null
          ){
            return demande.mandatComble.prepayment_entente_payment;
          }else{
             return this.emptyParameter;
          }

      }
   }
   return this.emptyParameter;
   }


    displayMCResponsableFeuillePrenom(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.responsableTemps != 'undefined'
               && demande.mandatComble.responsableTemps != null
               && typeof demande.mandatComble.responsableTemps.prenom != 'undefined'
               && demande.mandatComble.responsableTemps.prenom != null
               && demande.mandatComble.responsableTemps.prenom != ''


          ){
           return demande.mandatComble.responsableTemps.prenom;
         }
         return this.emptyParameter;

   }

   displayMCResponsableFeuilleNom(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.responsableTemps != 'undefined'
         && demande.mandatComble.responsableTemps != null
         && typeof demande.mandatComble.responsableTemps.nom != 'undefined'
         && demande.mandatComble.responsableTemps.nom != null
         && demande.mandatComble.responsableTemps.nom != ''


    ){
     return demande.mandatComble.responsableTemps.nom;
   }
   return this.emptyParameter;

   }

   displayMCResponsableFeuilleEmail(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.responsableTemps != 'undefined'
               && demande.mandatComble.responsableTemps != null

          ){
           return this.displayPersonneEmail(demande.mandatComble.responsableTemps, 0);
         }
         return this.emptyParameter;

   }

   displayMCResponsableFeuillePhone(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.responsableTemps != 'undefined'
         && demande.mandatComble.responsableTemps != null

    ){
     return this.displayPersonnePhone(demande.mandatComble.responsableTemps, 0);
   }
   return this.emptyParameter;

   }





   displayMCTauxHoraire(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.taux_horaire != 'undefined'
               && demande.mandatComble.taux_horaire != null
               && demande.mandatComble.taux_horaire != ''
          ){
           return demande.mandatComble.taux_horaire;
         }
         return this.emptyParameter;

   }

   displayMCPrimeHoraire(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.prime_horaire != 'undefined'
               && demande.mandatComble.prime_horaire != null
               && demande.mandatComble.prime_horaire != ''
          ){
           return demande.mandatComble.prime_horaire;
         }
         return this.emptyParameter;

   }


   displayMCPrimeDeplacement(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.prime_intervention != 'undefined'
               && demande.mandatComble.prime_intervention != null
               && demande.mandatComble.prime_intervention != ''
          ){
           return demande.mandatComble.prime_intervention;
         }
         return this.emptyParameter;

   }

   displayMCDocumentAJoindreContratTravail(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.document_a_joindre_contrat_travail != 'undefined'
               && demande.mandatComble.document_a_joindre_contrat_travail != null
               && demande.mandatComble.document_a_joindre_contrat_travail != ''
          ){
           return demande.mandatComble.document_a_joindre_contrat_travail;
         }
         return this.emptyParameter;

   }




    displayMCResponsableContratPrenom(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.responsableContrat != 'undefined'
         && demande.mandatComble.responsableContrat != null
         && typeof demande.mandatComble.responsableContrat.prenom != 'undefined'
         && demande.mandatComble.responsableContrat.prenom != null
         && demande.mandatComble.responsableContrat.prenom != ''


    ){
     return demande.mandatComble.responsableContrat.prenom;
   }
   return this.emptyParameter;

   }

   displayMCResponsableContratNom(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.responsableContrat != 'undefined'
               && demande.mandatComble.responsableContrat != null
               && typeof demande.mandatComble.responsableContrat.nom != 'undefined'
               && demande.mandatComble.responsableContrat.nom != null
               && demande.mandatComble.responsableContrat.nom != ''


          ){
           return demande.mandatComble.responsableContrat.nom;
         }
         return this.emptyParameter;

   }

   displayMCResponsableContratEmail(demande)
   {
           if(demande != null
               && typeof demande.mandatComble != 'undefined'
               && demande.mandatComble != null
               && typeof demande.mandatComble.responsableContrat != 'undefined'
               && demande.mandatComble.responsableContrat != null

          ){
           return this.displayPersonneEmail(demande.mandatComble.responsableContrat, 0);   // MB XX make sure its RESPONSABLE SIGNATURE DU CONTRAT
         }
         return this.emptyParameter;

   }

   displayMCResponsableContratPhone(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.responsableContrat != 'undefined'
         && demande.mandatComble.responsableContrat != null

    ){
     return this.displayPersonnePhone(demande.mandatComble.responsableContrat, 0);
   }
   return this.emptyParameter;


   }

   displayMCNeedsVerificationConduite(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.needs_verification_conduite != 'undefined'
         && demande.mandatComble.needs_verification_conduite != null
         && demande.mandatComble.needs_verification_conduite === true

    ){
     return 'Oui';
   }
   return 'Non';


   }
   displayMCPaymentVerificationConduite(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.payment_verification_conduite != 'undefined'
         && demande.mandatComble.payment_verification_conduite != null

    ){
     return demande.mandatComble.payment_verification_conduite;
   }
   return this.emptyParameter;


   }

   displayMCProfessionnelPremierMandat(demande)
   {
     if( this.displayMCEmployeurDIsPremierMandat(demande))
     {
       return "Oui";
     }else{
       return "Non";
     }
   //   if(demande != null
   //       && typeof demande.mandatComble != 'undefined'
   //       && demande.mandatComble != null
   //       && typeof demande.mandatComble.professionnel_first_mandat != 'undefined'
   //       && demande.mandatComble.professionnel_first_mandat != null
   //       && demande.mandatComble.professionnel_first_mandat === true
   //
   //  ){
   //   return 'Oui';
   // }
   // return 'Non';


   }

   displayMCProfessionnelSpecimenChequePresent(demande)
   {
     if(demande != null
         && typeof demande.mandatComble != 'undefined'
         && demande.mandatComble != null
         && typeof demande.mandatComble.professionnel != 'undefined'
         && demande.mandatComble.professionnel != null
         && typeof demande.mandatComble.professionnel.specimen_cheque_present != 'undefined'
         && demande.mandatComble.professionnel.specimen_cheque_present != null
         && demande.mandatComble.professionnel.specimen_cheque_present === true

    ){
     return 'Oui';
   }
   return 'Non';


   }


   displayPartnerName(demande)
   {
     if(demande != null
         && typeof demande.partner != 'undefined'
         && demande.partner != null
         && typeof demande.partner.name != 'undefined'
         && demande.partner.name != null

    ){
     return demande.partner.name;
   }
   return this.emptyParameter;
   }




    getPOS(personne, index)
    {
      if(personne != null
             && typeof personne.pointDeServices != 'undefined'
             && personne.pointDeServices != null
             && personne.pointDeServices.length >0
             && personne.pointDeServices.length >index
        ){
          return personne.pointDeServices[index];
        }

        return null;
    }

    getPOSAddress(personne, index)
    {
      let pos = this.getPOS(personne, index);
      if(pos!==null && typeof pos.address!=='undefined' && pos.address!==null)
      {
        return pos.address;
      }
      return null;
    }


     getClient(demande)
     {
       if(demande != null
              && typeof demande.client != 'undefined'
              && demande.client != null
         ){
           return demande.client;
         }
         return null;
     }

     getInterlocuteur(demande)
     {

       if(demande != null
              && typeof demande.interlocuteur != 'undefined'
              && demande.interlocuteur != null
         ){

           return demande.interlocuteur;
         }
         return null;
     }
     getPayer(demande)
     {
       if(demande != null
              && typeof demande.mandatComble != 'undefined'
              && demande.mandatComble != null
              && typeof demande.mandatComble.payer != 'undefined'
              && demande.mandatComble.payer != null
         ){
           return demande.mandatComble.payer;
         }
         return null;
     }

     getBillingPerson(demande)
     {
       // let personne = null;
       let demande_type = this.displayDemandeType(demande);
       if(demande_type === 'Enfant' || demande_type === 'Adulte')
       {
         return this.getClient(demande);
        // return this.displayClientPrenomAS(demande);
        }else{
          return this.getPayer(demande);
        }

      //  return null;


     }

     getInterlocuteurOrPayerPerson(demande)
     {
       let demande_type = this.displayDemandeType(demande);
       if(demande_type === 'Enfant' || demande_type === 'Adulte')
       {


         return this.getInterlocuteur(demande);
        // return this.displayClientPrenomAS(demande);
        }else{
          return this.getPayer(demande);
        }
     }


     displayInterlocuteurOrPayerEmail(demande)
     {
       let person = this.getInterlocuteurOrPayerPerson(demande);
       return this.displayPersonneEmail(person, 0);
     }

     displayInterlocuteurOrPayerPhoneByType(demande, _type)
     {
       let person = this.getInterlocuteurOrPayerPerson(demande);
       return this.displayPersonnePhoneByType(person, _type);
     }





}
