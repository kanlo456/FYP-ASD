import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate: string = localStorage.getItem("expiration") || "";
  console.log(storedExpirationDate);
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  console.log(duration);
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    localStorage.removeItem("token");
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    console.log("Redirecting");
    return redirect("/auth");
  }
  return "";
}
