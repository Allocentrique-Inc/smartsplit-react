export default function printRoles(roles) {
  let print = '';
  roles.forEach((role, index) => {
    print += `${role}`;
    if (index !== roles.length - 1) {
      print += ', ';
    }
  });
  return print;
}
