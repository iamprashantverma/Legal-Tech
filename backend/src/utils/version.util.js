export function nextVersion(current = '0.0') {
  
  let [major, minor] = current.split('.').map(Number);

  minor += 1;

  if (minor > 9) {
      major += 1;
      minor = 0;
    }

  return `${major}.${minor}`;

}
