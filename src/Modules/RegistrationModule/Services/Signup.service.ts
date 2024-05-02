import { Generate } from "../../../Common/Generator";
import { Hash } from "../../../Common/Hash";
import { Validator } from "../../../Common/Validator";
import { Message } from "../../../Messages/Message";
import SignupCollection, { Signupmodel } from "../../../Models/User";

export function SignupService(User: Signupmodel): any {
  if (Validator.Email(User.Email) && Validator.Number(User.Number)) {
    var userdata = SignupCollection.find({
      $or: [{ Email: User.Email }, { Number: User.Number }],
    })
      .then((result) => {
        if (result.length > 0) {
          return Message.Error("User Already Exist");
        } else {
          User._id = Generate.Id(20);
          var Finaldata = Hash(User.Password).then((pass) => {
            User.Password = pass;
            var data = SignupCollection.create(User)
              .then((res) => {
                var { Name, _id} = res;
                var obj: any = {
                  token: Generate.Token({ Id: User._id },process.env.SECRET_KEY,"2m"),
                  res: { Name, _id},
                };

                return Message.Success("User Register Successfully", obj);
              })
              .catch((err) => {
                return Message.Error(
                  err.errorResponse.errmsg,
                  null,
                  err.errorResponse.code
                );
              });
            return data;
          });
          return Finaldata;
        }
      })
      .catch((err) => {
        return Message.Success(
          err.errorResponse.errmsg,
          null,
          err.errorResponse.code
        );
      });
    return userdata;
  } else {
    if (
      Validator.Email(User.Email) == false &&
      Validator.Number(User.Number) == false
    ) {
      return Message.Success("Email and Phone Number is Invalid", null);
    } else {
      if (Validator.Email(User.Email) == false) {
        return Message.Success("Invalid Email", User);
      }
      if (Validator.Number(User.Number) == false) {
        return Message.Success("Invalid Phone Number", User);
      }
    }
  }
}
