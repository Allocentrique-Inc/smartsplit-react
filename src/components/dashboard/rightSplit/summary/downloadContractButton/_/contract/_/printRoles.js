import translations from '../../assets/translations';

export default function printRoles(roles, language) {
  let print = '';
  roles.forEach((role, index) => {
    print += translations.roles[`_${role}`][language];
    if (index !== roles.length - 1) {
      print += ', ';
    }
  });
  return print;
}
