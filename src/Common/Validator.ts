export class Validator {
    public static Email = (email: any) => {
      var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
    };
    public static Number = (number: any) => {
      var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
      return re.test(number);
    };
  }