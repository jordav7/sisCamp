export class Manfun {
  public static parseDate(value: string): Date{
    console.log(value);
    let convertDate = (new Date(value)).getTime();
    console.log(convertDate);
    if(convertDate){
      return new Date(convertDate);
    }
    return new Date();
  }

  //public static convertDateMyDate(): MyDate

}
