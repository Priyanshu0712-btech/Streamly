const generateAvatar = (fullName) => {
  const colors = [
    "1abc9c",
    "3498db",
    "9b59b6",
    "e67e22",
    "e74c3c",
    "2ecc71",
    "f39c12",
    "8e44ad",
  ];

  const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName
  )}&background=${randomColor}&color=fff&size=200`;
};

export default generateAvatar;