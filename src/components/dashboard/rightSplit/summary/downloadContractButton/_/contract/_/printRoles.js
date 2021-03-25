import translations from '../../assets/translations';

export default function printRoles(roles, language) {
  console.log('PRINT ROLES', roles);
  let print = '';
  roles.forEach((role, index) => {
    print += translations.roles[`_${role}`][language];
    if (index !== roles.length - 1) {
      print += ', ';
    }
  });
  return print;
}
