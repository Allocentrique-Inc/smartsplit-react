export default function printRoles(roles, translations, language) {
  let print = '';
  roles.forEach((role, index) => {
    print += translations[`_${role}`][language];
    if (index !== roles.length - 1) {
      print += ', ';
    }
  });
  return print;
}
