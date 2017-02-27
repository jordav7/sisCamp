export class Manfun {
  public static parseDate(value: string): Date{
    //console.log(value);
    let convertDate = (new Date(value)).getTime();
    //console.log(convertDate);
    if(convertDate){
      return new Date(convertDate);
    }
    return new Date();
  }

  //public static convertDateMyDate(): MyDate

  public static calculateAge (dateBirth: Date, dateTo: Date): number {
    let ageDifMs = dateTo.getTime() - (dateBirth ? dateBirth.getTime() : dateTo.getTime());
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let edad = Math.abs(ageDate.getUTCFullYear() - 1970);
    return edad;
  }

}
