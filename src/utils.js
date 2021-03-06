import regComp from "./templates/regComp.html";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {

  const testUser = new User("test", "qwerty123");
  User.save(testUser);
};

export const regUser = function (User, login, password, roll) {

  const newUser = new User(login, password, roll);
  User.save(newUser);
  document.querySelector("#content").innerHTML = regComp;
  
};
