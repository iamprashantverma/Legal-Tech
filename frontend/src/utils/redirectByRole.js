export const redirectByRole = (user) => {
  if (!user?.role) return;

  let path = "/";

  switch (user.role) {
    case "CLIENT":
      path = "/client";
      break;

    case "LAWYER":
      path = "/lawyer";
      break;

    case "ADMIN":
      path = "/admin";
      break;

    case "LEGAL_MANAGER":
      path = "/legal";
      break;

    default:
      path = "/";
  }

  window.location.replace(path);
};
