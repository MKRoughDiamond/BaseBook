export const SETID = 'SETID';
export const SETPW = 'SETPW';
export const NEWID = 'NEWID';
export const NEWPW = 'NEWPW';
export const RETYPEPW = 'RETYPEPW';
export const TOMAIN = 'TOMAIN';
export const TOSIGNUP = 'TOSIGNUP';

export function setid(value) {
  return {
    type : SETID,
    ID : value
  };
}

export function setpw(value) {
  return {
    type : SETPW,
    PW : value
  };
}

export function newid(value) {
  return {
    type : NEWID,
    newID : value
  };
}

export function newpw(value) {
  return {
    type : NEWPW,
    newPW : value
  };
}

export function retypepw(value) {
  return {
    type : RETYPEPW,
    retypePW : value
  };
}

export function tomain() {
  return {
    type : TOMAIN
  };
}

export function tosignup() {
  return {
    type : TOSIGNUP
  };
}
