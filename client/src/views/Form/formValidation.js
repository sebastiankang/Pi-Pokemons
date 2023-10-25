const formValidation = (create) => {
  let errors = {};

  //validacion del name
  //.trim elimina los espacios
  if (!create.name.trim()) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(create.name)) {
    errors.name = "Name can only contain letters and spaces";
  }

  // Validación de life
  if (!create.life) {
    errors.life = "Life is required";
  } else if (create.life < 1) {
    errors.life = "Life must be higher than 1";
  }

  // Validación del attack
  if (!create.attack) {
    errors.attack = "attack is required";
  } else if (create.attack < 1) {
    errors.attack = "attack must be higher than 1";
  }

  // Validación de la defense
  if (!create.defense) {
    errors.defense = "defense is required";
  } else if (create.defense < 1) {
    errors.defense = "defense must be higher than 1";
  }

  // Validación de la image
  if (!create.image) {
    errors.image = "Image is required";
  } else if (!isValidImageUrl(create.image)) {
    errors.image = "Invalid image URL";
  }

  //Función para validar una URL
  function isValidImageUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  }

  return errors;
};

export default formValidation;
