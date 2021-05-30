
export function ValidateEmail(email: string) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailformat.test(email)) {
    return (true)
  }
  return (false) // invalid email format
}


export function ValidatePassword(password: string, username?:string) {
  var result = {
    check: false,
    helperText: ''
  }
  if(password.length <= 6){
    result.helperText = 'Mật khẩu dài từ 6 đến 20 ký tự';
    return result
  }
  var passw= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if(!passw.test(password)) {
    result.helperText = 'Mật khẩu phải tối thiểu một chữ cái viêt hoa, 1 chữ thường và 1 số.';
    return result
  }
  if(username !== undefined){
    if(password.includes(username)){
      result.helperText = 'Mật khẩu phải không được bao gồm tên đăng nhập';
      return result
    }
  }
  result.check = true;
  return result // valid password
}